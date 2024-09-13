<script setup>
import cardBase from '@/components/cards/cardBase.vue'
import { useGlitchStore } from '@/stores/glitchStore'
import {
  faBoltLightning,
  faLink,
  faArrowsSpin,
  faCircleCheck,
  faFrown
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed, onBeforeMount, ref, watch } from 'vue'

const glitchStore = useGlitchStore()
const firstTestRan = ref(false)

const startLength = ref(0)
const endLength = ref(0)
const stepSize = ref(0)
const attemptDelay = ref(0)
const maxAttempts = ref(0)

// form validation
const startLengthValid = computed(() => startLength.value >= 15 && startLength.value < 4294967295)
const endLengthValid = computed(
  () => endLength.value > startLength.value && endLength.value < 4294967295
)
const stepSizeValid = computed(() => stepSize.value > 0)
const attemptDelayValid = computed(() => attemptDelay.value > 0)
const maxAttemptsValid = computed(() => maxAttempts.value > 0)
const formValid = computed(
  () =>
    startLengthValid.value &&
    endLengthValid.value &&
    stepSizeValid.value &&
    attemptDelayValid.value &&
    maxAttemptsValid.value
)

onBeforeMount(() => {
  glitchStore.getCurrentParameters()
  startLength.value = glitchStore.parameters.startTime
  endLength.value = glitchStore.parameters.endTime
  stepSize.value = glitchStore.parameters.increaseAmount
  attemptDelay.value = glitchStore.parameters.delay
  maxAttempts.value = glitchStore.parameters.maxAttempts
})

watch(glitchStore.parameters, () => {
  startLength.value = glitchStore.parameters.startTime
  endLength.value = glitchStore.parameters.endTime
  stepSize.value = glitchStore.parameters.increaseAmount
  attemptDelay.value = glitchStore.parameters.delay
  maxAttempts.value = glitchStore.parameters.maxAttempts
})

const onStartTest = () => {
  console.log('GlitchView.onStartTest()')
  if (!formValid.value) {
    return
  }

  glitchStore.startGlitchAttempt(
    startLength.value,
    endLength.value,
    stepSize.value,
    attemptDelay.value,
    maxAttempts.value
  )

  firstTestRan.value = true
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
          <p class="label-wrap">
            <label :class="startLengthValid ? '' : 'glitch-form-error'" for="startLength">
              Start Length (nanoseconds)
              <span v-if="!startLengthValid"> - Required, must be positive and at least 15ns.</span>
            </label>
          </p>
          <p><input id="startLength" type="number" required v-model="startLength" /></p>

          <p class="label-wrap">
            <label for="endLength" :class="endLengthValid ? '' : 'glitch-form-error'">
              End Length (nanoseconds)
              <span v-if="!endLengthValid">
                - Required, must be positive and greater than start length.</span
              >
            </label>
          </p>
          <p><input id="endLength" type="number" required v-model="endLength" /></p>

          <p class="label-wrap">
            <label :class="stepSizeValid ? '' : 'glitch-form-error'" for="stepSize">
              Step Delay (nanoseconds)
              <span v-if="!stepSizeValid"> - Required, must be positive.</span>
            </label>
          </p>
          <p><input type="number" id="stepSize" required v-model="stepSize" /></p>

          <p class="label-wrap">
            <label for="attemptDelay" :class="attemptDelayValid ? '' : 'glitch-form-error'">
              Delay Between Attempts (Milliseconds)
              <span v-if="!attemptDelayValid"> - Required, must be positive.</span>
            </label>
          </p>
          <p><input type="number" id="attemptDelay" required v-model="attemptDelay" /></p>

          <p class="label-wrap">
            <label for="maxAttempts" :class="maxAttemptsValid ? '' : 'glitch-form-error'">
              Attempts Per Length
              <span v-if="!maxAttemptsValid"> - Required, must be positive.</span>
            </label>
          </p>
          <p><input type="number" id="maxAttempts" required v-model="maxAttempts" /></p>

          <button :disabled="!formValid" type="submit">
            {{ firstTestRan ? 'Run New Test' : 'Run Test' }}
          </button>
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
          <div class="results-card" v-if="glitchStore.running">
            <FontAwesomeIcon
              class="spinner"
              style="font-size: 1.5em"
              :icon="faArrowsSpin"
            ></FontAwesomeIcon>
            <h2 style="margin-top: 10px">Running...</h2>
            <p>
              Attempt {{ glitchStore.numberOfAttempts }} with delay of
              {{ glitchStore.delayValue }}ns
            </p>
          </div>

          <div class="results-card" v-if="!glitchStore.running && !firstTestRan">
            <h2>Run a test to see results.</h2>
          </div>

          <div class="results-card" v-if="!glitchStore.running && firstTestRan">
            <span style="display: flex">
              <FontAwesomeIcon
                style="margin-right: 10px; font-size: 1.2em"
                :icon="glitchStore.result ? faCircleCheck : faFrown"
              ></FontAwesomeIcon>
              <h2 v-if="glitchStore.result">Success!</h2>
              <h2 v-else>Attack Failed</h2>
            </span>
            <table>
              <tr>
                <th>Delay</th>
                <th># of Tries</th>
              </tr>
              <tr>
                <td>{{ glitchStore.delayValue }}ns</td>
                <td>{{ glitchStore.numberOfAttempts }}</td>
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
.glitch-form button:disabled,
.glitch-form button[disabled] {
  background-color: var(--dark-theme-button-hover);
  color: slategrey;
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

.glitch-form-error {
  color: var(--dark-theme-alert);
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
.results-card p {
  margin-top: 10px;
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
