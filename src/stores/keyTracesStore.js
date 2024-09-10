import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebsocketStore } from './websocketStore'

const START_COMMAND = 'start_power_analysis'

export const useKeyTracesStore = defineStore('keyTracesStore', () => {
  const websocketStore = useWebsocketStore()

  const graphConfig = ref({
    title: { enabled: false },
    colors: ['#02a570', '#A02334', '#7695FF'],
    chart: {
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: { speed: 1000 }
      },
      toolbar: { show: false },
      zoom: { enabled: false },
      dataLabels: {
        enabled: false
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      title: { text: 'Samples' },
      type: 'numeric',
      range: 5000,
      labels: { show: false }
    },
    yaxis: {
      title: { text: 'Volts' },
      labels: { show: true },
      min: 0,
      max: 5
    }
  })

  const key1DataPoints = ref([])
  const key2DataPoints = ref([])
  const key3DataPoints = ref([])

  const seriesCollection = ref([
    { name: 'Key 1', data: key1DataPoints },
    { name: 'Key 2', data: key2DataPoints },
    { name: 'Key 3', data: key3DataPoints }
  ])

  /**
   * Update the local store of power data for all 3 keys used in the glitching test.
   * @param {Array<number>} array1 The power data for the first key used in the key glitch test
   * @param {Array<number>} array2 The power data for the second key used in the key glitch test
   * @param {Array<number>} array3 The power data for the third key used in the key glitch test
   */
  function updateKeyArrays(array1, array2, array3) {
    console.log('TODO: useKeyTracesStore.updateKeyArrays()')
    console.log(array1)
  }

  /**
   * Sends a request to the Glitchy board to begin a power analysis of the 3 keys and stream results.
   */
  function startAnalysis() {
    websocketStore.send(START_COMMAND)
  }

  return {
    graphConfig,
    seriesCollection,
    updateKeyArrays,
    startAnalysis
  }
})
