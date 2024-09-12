import { ref, onMounted, onBeforeUnmount } from 'vue'
import { defineStore } from 'pinia'
import { useWebsocketStore } from './websocketStore'

export const useAdcStore = defineStore('acdStore', () => {
  const websocketStore = useWebsocketStore()

  const ampChartOptions = ref({
    title: {
      text: 'Amp Output',
      align: 'center',
      style: {
        fontFamily: 'lato',
        color: '#02a570'
      }
    },
    colors: ['#02a570', '#FFFFFF', '#A1a1a1'],
    chart: {
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: { speed: 1000 }
      },
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    stroke: { curve: 'smooth' },
    xaxis: {
      type: 'numeric',
      range: 5000,
      labels: {
        show: false
      }
    },
    yaxis: {
      // min: 0,
      // max: 1,
      labels: {
        formatter: function (val, index) {
          return val.toFixed(2)
        }
      }
    },
    legend: { show: false }
  })

  const biasChartOptions = ref({
    title: {
      text: 'Bias Output',
      align: 'center',
      style: {
        fontFamily: 'lato',
        color: '#02a570'
      }
    },
    colors: ['#02a570', '#FFFFFF', '#A1a1a1'],
    chart: {
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: { speed: 1000 }
      },
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    stroke: { curve: 'smooth' },
    xaxis: {
      type: 'numeric',
      range: 5000,
      labels: {
        show: false
      }
    },
    yaxis: {
      // min: 0,
      // max: 1,
      labels: {
        formatter: function (val, index) {
          return val.toFixed(2)
        }
      }
    },
    legend: { show: false }
  })

  const ampDataPoints = ref([])
  const ampData = ref([{ data: ampDataPoints }])

  const biasDataPoints = ref([])
  const biasData = ref([{ data: biasDataPoints }])

  onMounted(() => {
    // clear memory after 2 minutes to prevent leaks and/or excessive array length
    setInterval(() => {
      ampDataPoints.value = []
      biasDataPoints.value = []
    }, 120000)
  })

  onBeforeUnmount(() => {
    ampDataPoints.value = []
    biasDataPoints.value = []
  })

  /**
   * Update the collection of data points for Amp visualization
   * @param {number} value the output power, in volts, that the current state will be set to.
   */
  function updateLastAmp(value) {
    ampDataPoints.value.push({ x: Date.now(), y: value })
  }

  /**
   * Update the bias level for visualization.
   * @param {number} value the bias that has been set on the glitch board
   */
  function updateLastBias(value) {
    biasDataPoints.value.push({ x: Date.now(), y: value })
  }

  /**
   * Request to start streaming power data from Glitchy board.
   * NOTE: the websocket store must be initialized and connected.
   */
  function startStream() {
    websocketStore.send({
      CommsVersion: 1.1,
      PacketType: 'enable_adc_stream'
    })
  }

  /**
   * Request to stop streaming power data from Glitchy board.
   * NOTE: the websocket store must be initialized and connected.
   */
  function stopStream() {
    websocketStore.send({
      CommsVersion: 1.1,
      PacketType: 'disable_adc_stream'
    })
  }

  return {
    ampChartOptions,
    biasChartOptions,
    ampData,
    biasData,
    updateLastAmp,
    updateLastBias,
    startStream,
    stopStream
  }
})
