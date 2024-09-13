import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebsocketStore } from './websocketStore'

export const useGlitchStore = defineStore('glitchStore', () => {
  const websocketStore = useWebsocketStore()

  const result = ref(false)
  const running = ref(false)
  const numberOfAttempts = ref(0)
  const delayValue = ref(0)

  const parameters = ref({
    startTime: 15,
    endTime: 800,
    delay: 5,
    increaseAmount: 10,
    maxAttempts: 50
  })

  /**
   *
   * @param {boolean} isRunning true = test is active, false = test is idle.
   * @param {boolean} glitchResult true = Glitching attempt was successfull, false = not yet able to glitch power.
   * @param {number} numTries Total number of attempts for the current glitching session.
   * @param {number} delay time since last glitch attempt, in nanoseconds (ns).
   */
  function updateGlitchStatus(isRunning, glitchResult, numTries, delay) {
    result.value = glitchResult
    running.value = isRunning
    numberOfAttempts.value = numTries
    delayValue.value = delay
  }

  function updateGlitchParameters(rxObject) {
    parameters.value.startTime = rxObject.start_time_ns
    parameters.value.endTime = rxObject.stop_time_ns
    parameters.value.delay = rxObject.delay_between_glitches_ms
    parameters.value.increaseAmount = rxObject.step_size_ns
    parameters.value.maxAttempts = rxObject.retry_times
  }

  function getCurrentParameters() {
    websocketStore.send({
      CommsVersion: 1.1,
      PacketType: 'get_glitch_param'
    })
  }

  /**
   * Sends a request to the control board to begin the power glitching hack and stream results.
   * @param {number} startLength The amount of time (nanoseconds) that the first glitch will last.
   * @param {number} endLength The amound of time (nanoseconds) that the last glitch will last.
   * @param {number} stepDelay How much (in nanoseconds) to increase the glitch length for each attempt.
   * @param {number} attemptDelay The amount of time (milliseconds) that each glitch will last.
   * @param {number} numAttempts The total number of glitch attempts to try before stopping.
   */
  function startGlitchAttempt(startLength, endLength, stepSize, attemptDelay, numAttempts) {
    // send configuration
    websocketStore.send({
      CommsVersion: 1.1,
      PacketType: 'set_glitch_param',
      start_time_ns: startLength,
      stop_time_ns: endLength,
      delay_between_glitches_ms: attemptDelay,
      step_size_ns: stepSize,
      retry_times: numAttempts
    })

    // send start command
    websocketStore.send({
      CommsVersion: 1.1,
      PacketType: 'start_glitching'
    })
  }

  return {
    result,
    running,
    numberOfAttempts,
    delayValue,
    parameters,
    updateGlitchStatus,
    updateGlitchParameters,
    startGlitchAttempt,
    getCurrentParameters
  }
})
