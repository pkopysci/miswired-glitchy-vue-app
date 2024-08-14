import { ref } from 'vue'
import { defineStore } from 'pinia'
import ReconnectingWebSocket from 'reconnecting-websocket'

export const useWebsocketStore = defineStore('websocketStore', () => {
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

  /**
   * Attempt to connect to the Glitchy board at the host/ip provided when calling initialize().
   * Logs an error to console if the store has not been initialized.
   */
  function open() {
    if (!initialized.value || websocket.value == null) {
      console.error('websocketStore.open() - Call initialize() first.')
      return
    }

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
  function initialize(host) {
    if (!host || host.length < 1) {
      console.error('websocketStore.initialize() - host cannt be undefined or empty.')
      return
    }

    killSocket()
    websocket.value = new ReconnectingWebSocket(host, [], {
      debug: false,
      startClosed: true
    })

    websocket.value.addEventListener('open', () => {
      console.log('websocketStore.js - open event handler')
      connected.value = true
    })

    websocket.value.addEventListener('close', () => {
      console.log('websocketStore.js - close event handler')
      connected.value = false
    })

    websocket.value.addEventListener('message', (msg) => {
      console.log('websocketStore.js = message event handler:')
      console.log(msg)
    })

    initialized.value = true
  }

  return {
    websocket,
    initialized,
    connected,
    host,
    open,
    close,
    killSocket,
    initialize
  }
})
