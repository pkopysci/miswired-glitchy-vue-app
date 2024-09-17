import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useWebsocketStore } from './websocketStore'

export const useKeyTracesStore = defineStore('keyTracesStore', () => {
  const websocketStore = useWebsocketStore()

  const graphConfig = ref({
    title: { enabled: false },
    colors: ['rgba(1, 165, 111, 0.5)', 'rgba(160, 35, 52, 0.5)', 'rgba(118, 149, 255, 0.5)'],
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
      // range: 5000,
      labels: { show: false }
    },
    yaxis: {
      title: { text: 'Volts' },
      // min: 1.0,
      // max: 4.0,
      labels: { show: true }
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

  const analysisRunning = ref(false)

  /**
   * Update the local store of power data for all 3 keys used in the glitching test.
   * @param {Array<number>} array1 The power data for the first key used in the key glitch test
   * @param {Array<number>} array2 The power data for the second key used in the key glitch test
   * @param {Array<number>} array3 The power data for the third key used in the key glitch test
   */
  function updateKeyArrays(array1, array2, array3) {
    console.log('useKeyTracesStore.updateKeyArrays()')

    let newKey1Data = []
    array1.forEach((point, index) => {
      let adjustedPoint = point > 0 ? point / 1000 : point
      newKey1Data.push({ x: index, y: adjustedPoint })
    })

    let newkey2Data = []
    array2.forEach((point, index) => {
      let adjustedPoint = point > 0 ? point / 1000 : point
      newkey2Data.push({ x: index, y: adjustedPoint })
    })

    let newkey3Data = []
    array3.forEach((point, index) => {
      let adjustedPoint = point > 0 ? point / 1000 : point
      newkey3Data.push({ x: index, y: adjustedPoint })
    })

    analysisRunning.value = false

    key1DataPoints.value = newKey1Data
    key2DataPoints.value = newkey2Data
    key3DataPoints.value = newkey3Data
  }

  /**
   * Sends a request to the Glitchy board to begin a power analysis of the 3 keys and stream results.
   */
  function startAnalysis() {
    analysisRunning.value = true
    websocketStore.send({
      CommsVersion: 1.1,
      PacketType: 'start_power_analysis'
    })
  }

  return {
    graphConfig,
    seriesCollection,
    analysisRunning,
    updateKeyArrays,
    startAnalysis
  }
})
