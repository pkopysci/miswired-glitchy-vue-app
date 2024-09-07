import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAdcStore } from './adcStore'
import { useKeyTracesStore } from './keyTracesStore'
import { useGlitchStore } from './glitchStore'
import ReconnectingWebSocket from 'reconnecting-websocket'

export const useWebsocketStore = defineStore('websocketStore', () => {
  const adcStore = useAdcStore()
  const keyTracesStore = useKeyTracesStore()
  const glitchStore = useGlitchStore()

  /**
   * The websocket object used to communicate with the board logic.
   */
  const websocket = ref(null)

  /**
   * true = the websocket has been created and is ready to connect, false = not yet ready for connection.
   */
  const initialized = ref(false)

  /**
   * true = the websocket is connected with the Glitchy board, false = not connected.
   */
  const connected = ref(false)

  /**
   * the user-defined host of the board to connect to.
   */
  const host = ref('')

  const responseActions = {
    ADCStream: (rx) => {
      try {
        adcStore.updateLastAmp(rx.LastAmpInVolts)
        adcStore.updateLastBias(rx.LastBiasVolts)
      } catch (error) {
        console.error(
          'websocketStore - failed to update ADCStream response action: ' + error.message
        )
      }
    },
    KeyTraces: (rx) => {
      keyTracesStore.updateKeyArrays(rx.key_1_array, rx.key_2_array, rx.key_3_array)
    },
    UpdateGlitchStatus: (rx) => {
      glitchStore.updateGlitchStatus(rx.running, rx.success, rx.try_number, rx.delay_value)
    }
  }

  /**
   * Attempt to connect to the Glitchy board at the host/ip provided when calling initialize().
   * Logs an error to console if the store has not been initialized.
   */
  function open() {
    if (!initialized.value || websocket.value == null) {
      console.error('websocketStore.open() - Call initialize() first.')
      return
    }

    console.log('opening socket to ' + host.value)
    websocket.value.reconnect()
  }

  /**
   * Close the active connection. Does nothing if the store has not been initialized.
   */
  function close() {
    if (!initialized.value || websocket.value == null) return
    this.websocket.close()
  }

  /**
   * Completely destroy the active connection and sets the websocket state to null.
   */
  function killSocket() {
    initialized.value = false
    websocket.value?.close()
    websocket.value = null
  }

  /**
   * Kills any active websocket, creates a new socket object with the provided host argument, and assigns event listeners.
   * This does not initiate a connection with the board (call open() for that).
   * Logs an error to console if 'host' is undefined or empty (length < 1).
   * @param {string} host the ws:// address used to connect to the Glitchy board.
   */
  function initialize(serverHost) {
    if (!serverHost || serverHost.length < 1) {
      console.error('websocketStore.initialize() - host cannot be undefined or empty.')
      return
    }

    killSocket()
    host.value = serverHost
    websocket.value = new ReconnectingWebSocket(host.value, [], {
      debug: false,
      startClosed: true
    })

    websocket.value.addEventListener('open', () => {
      console.log('websocketStore - open event handler')
      connected.value = true
    })

    websocket.value.addEventListener('close', () => {
      console.log('websocketStore - close event handler')
      connected.value = false
    })

    websocket.value.addEventListener('message', (msg) => {
      try {
        let parsedRx = JSON.parse(msg.data)
        responseActions[parsedRx.PacketType](parsedRx)
      } catch (error) {
        console.error('websocketstore - failed to parse response. Reason: ' + error.message)
      }
    })

    websocket.value.addEventListener('error', (error) => {
      console.error('Error encountered with board communication:')
      console.error(error)
    })

    initialized.value = true
  }

  function send(message) {
    if (!initialized.value || !connected.value) {
      console.error('websocketStore.send() - not initialized or not connected.')
      return
    }

    if (!message) {
      console.error('websocketStore.send() - message cannot be undefined.')
      return
    }

    websocket.value.send(message)
  }

  return {
    websocket,
    initialized,
    connected,
    host,
    open,
    close,
    killSocket,
    initialize,
    send
  }
})
