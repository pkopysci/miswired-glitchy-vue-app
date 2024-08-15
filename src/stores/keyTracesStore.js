import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebsocketStore } from './websocketStore'

const START_COMMAND = 'start_power_analysis'

export const useKeyTracesStore = defineStore('keyTracesStore', () => {
  const websocketStore = useWebsocketStore()
  const key1Array = ref([])
  const key2Array = ref([])
  const key3Array = ref([])

  function updateKeyArrays(array1, array2, array3) {
    console.log('useKeyTracesStore.updateKeyArrays()')
    console.log(array1)
    console.log(array2)
    console.log(array3)

    key1Array.value = array1
    key2Array.value = array2
    key3Array.value = array3
  }

  function startAnalysis() {
    websocketStore.send(START_COMMAND)
  }

  function stopAnalysis() {
    console.log('keyTraceStore.stopAnalysis()')
  }

  return {
    key1Array,
    key2Array,
    key3Array,
    updateKeyArrays,
    startAnalysis,
    stopAnalysis
  }
})
