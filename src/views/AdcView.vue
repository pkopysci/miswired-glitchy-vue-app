<script setup>
import router from '@/router'
import cardBase from '@/components/cards/cardBase.vue'
import ToggleButton from '@/components/controls/ToggleButton.vue'
import { faArrowCircleRight, faGear, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const streamEnabled = ref(false)
const onToggleStream = () => {
  console.log('TODO: AdcView.onToggleStream()')
  streamEnabled.value = !streamEnabled.value
}

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
          <div class="graph-card">This is a placeholder for visualizations</div>
        </cardBase>
        <cardBase>
          <div class="graph-card">This is a placeholder for visualizations</div>
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
}
</style>
