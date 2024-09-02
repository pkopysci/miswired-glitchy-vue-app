<script setup>
import cardBase from '@/components/cards/cardBase.vue'
import {
  faBoltLightning,
  faLink,
  faArrowsSpin,
  faCircleCheck
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'

const testRunning = ref(false)
const firstTestRan = ref(false)

const startDelay = ref(800)
const stepDelay = ref(300)
const attemptDelay = ref(200)

// testing value
const testResult = ref(false)

const onStartTest = () => {
  console.log('GlitchView.onStartTest()')
  testRunning.value = true
  firstTestRan.value = true
  // testing timer
  setTimeout(() => {
    testResult.value = true
    testRunning.value = false
  }, 5000)
}
</script>

<template>
  <div class="glitch-activity">
    <div class="activity-title">
      <FontAwesomeIcon class="activity-title-icon" :icon="faBoltLightning"></FontAwesomeIcon>
      <h1>Power Glitching</h1>
    </div>
    <div class="content">
      <div class="glitch-form">
        <h2>Test Parameters</h2>
        <p>Enter delay parameters to use during the test.</p>
        <form v-on:submit.prevent="onStartTest">
          <p class="label-wrap"><label>Start Delay (nanoseconds)</label></p>
          <p><input type="number" required v-model="startDelay" /></p>

          <p class="label-wrap"><label>Step Delay (nanoseconds)</label></p>
          <p><input type="number" required v-model="stepDelay" /></p>

          <p class="label-wrap">
            <label>Delay Between Attempts (Milliseconds)</label>
          </p>
          <p><input type="number" required v-model="attemptDelay" /></p>
          <button type="submit">{{ firstTestRan ? 'Run New Test' : 'Run Test' }}</button>
        </form>
        <a
          href="https://github.com/miswired/glitchy/wiki/Guide-%E2%80%90-First-Power-Glitching-Attack"
          target="blank"
        >
          <FontAwesomeIcon style="margin-right: 10px" :icon="faLink"></FontAwesomeIcon>
          Wiki Guide
        </a>
      </div>
      <div class="result-container">
        <cardBase>
          <div class="results-card" v-if="testRunning">
            <FontAwesomeIcon
              class="spinner"
              style="font-size: 1.5em"
              :icon="faArrowsSpin"
            ></FontAwesomeIcon>
            <h2 style="margin-top: 10px">Running...</h2>
          </div>

          <div class="results-card" v-if="!testRunning && !firstTestRan">
            <h2>Run a test to see results.</h2>
          </div>

          <div class="results-card" v-if="!testRunning && firstTestRan">
            <span style="display: flex">
              <FontAwesomeIcon
                style="margin-right: 10px; font-size: 1.2em"
                :icon="faCircleCheck"
              ></FontAwesomeIcon>
              <h2>Success!</h2>
            </span>
            <table>
              <tr>
                <th>Delay</th>
                <th># of Tries</th>
              </tr>
              <tr>
                <td>810ns</td>
                <td>5</td>
              </tr>
            </table>
          </div>
        </cardBase>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glitch-activity {
  width: 90vw;
  display: flex;
  flex-direction: column;
  max-width: inherit;
}

.glitch-form {
  display: flex;
  flex-direction: column;
}
.glitch-form h2 {
  font-weight: bold;
  margin-bottom: 10px;
}
.glitch-form input {
  max-width: 50px;
}
.glitch-form button {
  width: 100%;
  margin: 20px 0;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.glitch-form a {
  color: white;
  background-color: var(--dark-theme-button-color);
  border: none;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 0;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.glitch-form a:hover {
  cursor: pointer;
  background-color: var(--dark-theme-button-hover);
}

.label-wrap {
  margin-top: 20px;
}

.result-container {
  color: var(--dark-theme-button-color);
}

.results-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.results-card h2 {
  font-size: 1.2em;
}
.results-card table {
  margin-top: 20px;
  border-radius: 10px;
  border: 1px solid var(--dark-theme-button-color);
  width: 100%;
}
.results-card th {
  background-color: var(--dark-theme-button-color);
  color: white;
  padding: 20px;
  border: 1px solid var(--dark-theme-button-color);
}
.results-card td {
  border: 1px solid var(--dark-theme-button-color);
  padding: 20px;
  color: var(--dark-theme-black);
  text-align: center;
  vertical-align: middle;
}

@media (min-width: 768px) {
  .glitch-activity .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .glitch-form {
    margin-right: 100px;
  }

  .results-card {
    min-width: 300px;
    min-height: 200px;
  }
}
</style>
