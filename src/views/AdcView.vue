<script setup>
import { faArrowCircleRight, faGear, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onBeforeMount, ref } from 'vue'
import { useAdcStore } from '@/stores/adcStore'
import router from '@/router'
import cardBase from '@/components/cards/cardBase.vue'
import ToggleButton from '@/components/controls/ToggleButton.vue'

const adcStore = useAdcStore()
const streamEnabled = ref(false)

const onToggleStream = () => {
  streamEnabled.value = !streamEnabled.value
  if (streamEnabled.value) {
    adcStore.startStream()
  } else {
    adcStore.stopStream()
  }
}

onBeforeMount(() => {
  adcStore.stopStream()
})

const onNavToAnalysis = () => {
  router.push('/power-analysis')
}
</script>

<template>
  <div class="adc-activity">
    <div class="activity-title">
      <FontAwesomeIcon class="activity-title-icon" :icon="faGear"></FontAwesomeIcon>
      <h1>Analysis Setup</h1>
    </div>
    <div class="content">
      <div class="setup-controls">
        <p>
          Enable the stream and adjust the hardware settings until get an amp gain of ~2.5v and bias
          of ~0.5v.<br /><br />Once calibrated, go to the analysis page to begin your attack.
        </p>
        <span class="toggle-input-wrapper">
          Stream {{ streamEnabled ? 'Enabled' : 'Disabled' }}
          <ToggleButton :state="streamEnabled" @onStateToggle="onToggleStream"></ToggleButton>
        </span>
        <button @click="onNavToAnalysis">
          Go To Analysis
          <FontAwesomeIcon style="margin-left: 10px" :icon="faArrowCircleRight"></FontAwesomeIcon>
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
          <apexchart :options="adcStore.ampChartOptions" :series="adcStore.ampData"></apexchart>
        </cardBase>
        <cardBase>
          <apexchart :options="adcStore.biasChartOptions" :series="adcStore.biasData"></apexchart>
        </cardBase>
      </div>
    </div>
  </div>
</template>

<style scoped>
.graph-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 200px;
  color: var(--dark-theme-button-color);
}

.adc-activity {
  width: 90vw;
  display: flex;
  flex-direction: column;
  max-width: inherit;
}

.toggle-input-wrapper {
  display: flex;
  align-items: center;
  margin: 20px 10px 0 0;
  justify-content: space-between;
}

@media (min-width: 768px) {
  .graph-wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .adc-activity .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .setup-controls {
    max-width: 300px;
    margin-right: 10%;
    height: 100%;
    padding-top: 10px;
  }

  .card-base {
    width: 100%;
  }

  .card-base .vue-apexcharts {
    width: 100%;
    height: 100%;
  }
}
</style>
