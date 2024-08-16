import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebsocketStore } from './websocketStore'

const START_COMMAND = 'start_power_analysis'

export const useKeyTracesStore = defineStore('keyTracesStore', () => {
  const websocketStore = useWebsocketStore()
  const key1Array = ref([])
  const key2Array = ref([])
  const key3Array = ref([])

  /**
   * Update the local store of power data for all 3 keys used in the glitching test.
   * @param {Array<number>} array1 The power data for the first key used in the key glitch test
   * @param {Array<number>} array2 The power data for the second key used in the key glitch test
   * @param {Array<number>} array3 The power data for the third key used in the key glitch test
   */
  function updateKeyArrays(array1, array2, array3) {
    console.log('useKeyTracesStore.updateKeyArrays()')
    console.log(array1)
    console.log(array2)
    console.log(array3)

    key1Array.value = array1
    key2Array.value = array2
    key3Array.value = array3
  }

  /**
   * Sends a request to the Glitchy board to begin a power analysis of the 3 keys and stream results.
   */
  function startAnalysis() {
    websocketStore.send(START_COMMAND)
  }

  return {
    key1Array,
    key2Array,
    key3Array,
    updateKeyArrays,
    startAnalysis
  }
})
