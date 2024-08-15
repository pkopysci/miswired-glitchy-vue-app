import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlitchStore = defineStore('glitchStore', () => {
  const result = ref(false)
  const running = ref(false)
  const numberOfAttempts = ref(0)
  const delayValue = ref(0)

  function updateGlitchStatus(isRunning, glitchResult, numTries, delay) {
    console.log(
      `glitchStore.updateGlitchStatus(${isRunning}, ${glitchResult}, ${numTries}, ${delay})`
    )

    result.value = glitchResult
    running.value = isRunning
    numberOfAttempts.value = numTries
    delayValue.value = delay
  }

  function startGlitchAttempt() {
    console.log('TODO: glitchStore.startGlitchAttempt()')
  }

  function stopGlitchAttempt() {
    console.log('TODO: glitchStore.stopGlitchAttempt')
  }

  return {
    result,
    running,
    numberOfAttempts,
    delayValue,
    updateGlitchStatus,
    startGlitchAttempt,
    stopGlitchAttempt
  }
})
