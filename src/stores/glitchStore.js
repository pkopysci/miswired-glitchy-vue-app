import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebsocketStore } from './websocketStore'

const START_GLITCH_COMMAND = 'start_glitching'

export const useGlitchStore = defineStore('glitchStore', () => {
  const websocketStore = useWebsocketStore()

  const result = ref(false)
  const running = ref(false)
  const numberOfAttempts = ref(0)
  const delayValue = ref(0)

  /**
   *
   * @param {boolean} isRunning true = test is active, false = test is idle.
   * @param {boolean} glitchResult true = Glitching attempt was successfull, false = not yet able to glitch power.
   * @param {number} numTries Total number of attempts for the current glitching session.
   * @param {number} delay time since last glitch attempt, in nanoseconds (ns).
   */
  function updateGlitchStatus(isRunning, glitchResult, numTries, delay) {
    console.log(
      `glitchStore.updateGlitchStatus(${isRunning}, ${glitchResult}, ${numTries}, ${delay})`
    )

    result.value = glitchResult
    running.value = isRunning
    numberOfAttempts.value = numTries
    delayValue.value = delay
  }

  /**
   * Sends a request to the control board to begin the power glitching hack and stream results.
   */
  function startGlitchAttempt() {
    websocketStore.send(START_GLITCH_COMMAND)
  }

  return {
    result,
    running,
    numberOfAttempts,
    delayValue,
    updateGlitchStatus,
    startGlitchAttempt
  }
})
