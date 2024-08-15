import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebsocketStore } from './websocketStore'

const START_COMMAND = 'enable_adc_stream'
const STOP_COMMAND = 'disable_adc_stream'

export const useAdcStore = defineStore('acdStore', () => {
  const websocketStore = useWebsocketStore()

  /**
   * Actual output from the Glitchy board to the controller.
   */
  const lastAmpInVolts = ref(0)

  /**
   * The current bias set for attempting to power glitch the controller.
   */
  const lastBiasVolts = ref(0)

  /**
   * Update the current lastAmpInVolts state.
   * @param {number} value the output power, in volts, that the current state will be set to.
   */
  function updateLastAmp(value) {
    console.log('adcsStore.updateLastAmp(' + value + ')')
    lastAmpInVolts.value = value
  }

  /**
   * Update the lastBiasVolts state value.
   * @param {number} value the bias that has been set on the glitch board
   */
  function updateLastBias(value) {
    console.log('adscStore.updateLastBias(' + value + ')')
    lastBiasVolts.value = value
  }

  /**
   * Request to start streaming power data from Glitchy board.
   * NOTE: the websocket store must be initialized and connected.
   */
  function startStream() {
    websocketStore.send(START_COMMAND)
  }

  /**
   * Request to stop streaming power data from Glitchy board.
   * NOTE: the websocket store must be initialized and connected.
   */
  function stopStream() {
    websocketStore.send(STOP_COMMAND)
  }

  return {
    lastAmpInVolts,
    lastBiasVolts,
    updateLastAmp,
    updateLastBias,
    startStream,
    stopStream
  }
})
