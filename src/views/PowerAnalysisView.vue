<script setup>
import router from '@/router'
import cardBase from '@/components/cards/cardBase.vue'
import {
  faArrowCircleLeft,
  faChartLine,
  faLink,
  faPowerOff,
  faArrowsSpin
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useKeyTracesStore } from '@/stores/keyTracesStore'

const keyTraceStore = useKeyTracesStore()

const onBackToSetup = () => {
  router.push('/adc')
}

const onStartAnalysis = () => {
  keyTraceStore.startAnalysis()
}
</script>

<template>
  <div class="power-activity">
    <div class="activity-title">
      <FontAwesomeIcon class="activity-title-icon" :icon="faChartLine"></FontAwesomeIcon>
      <h1>Power Analysis</h1>
    </div>
    <div class="content">
      <div class="setup-controls">
        <p>
          The program will press each key on the Arduino, capturing the power traces. You may have
          to run the test a couple times to compare and see a clear difference.
        </p>
        <button @click="onStartAnalysis">
          <FontAwesomeIcon style="margin-right: 10px" :icon="faPowerOff"></FontAwesomeIcon>
          Start Analysis
        </button>
        <button @click="onBackToSetup">
          <FontAwesomeIcon style="margin-right: 10px" :icon="faArrowCircleLeft"></FontAwesomeIcon>
          Back to Setup
        </button>
        <a
          href="https://github.com/miswired/glitchy/wiki/Guide-%E2%80%90-First-Power-Analysis-Attack"
          target="blank"
        >
          <FontAwesomeIcon style="margin-right: 10px" :icon="faLink"></FontAwesomeIcon>
          Wiki Guide
        </a>
      </div>
      <div class="graph-wrapper">
        <cardBase>
          <div class="graph-card" style="min-width: 300px" v-if="keyTraceStore.analysisRunning">
            <FontAwesomeIcon
              class="spinner"
              style="font-size: 1.5em"
              :icon="faArrowsSpin"
            ></FontAwesomeIcon>
            <h2 style="margin-top: 10px">Running...</h2>
          </div>
          <div v-else class="graph-card" style="min-width: 300px">
            <apexchart
              :options="keyTraceStore.graphConfig"
              :series="keyTraceStore.seriesCollection"
            ></apexchart>
          </div>
        </cardBase>
      </div>
    </div>
  </div>
</template>

<style scoped>
.power-activity {
  width: 90vw;
  display: flex;
  flex-direction: column;
  max-width: inherit;
}

.graph-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: var(--dark-theme-button-color);
}

@media (min-width: 768px) {
  .power-activity .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }

  .setup-controls {
    max-width: 300px;
    height: 100%;
    padding-top: 10px;
  }

  .graph-wrapper {
    width: 70%;
    display: flex;
    flex-direction: column;
  }

  .card-base {
    width: 100%;
    max-width: 100%;
  }

  .card-base .vue-apexcharts {
    width: 100%;
    height: 100%;
  }
}
</style>
