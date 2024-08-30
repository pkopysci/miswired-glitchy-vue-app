<script setup>
import cardBase from '@/components/cards/cardBase.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBoltLightning,
  faChartLine,
  faGear,
  faArrowAltCircleRight,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'
defineProps(['titleIcon', 'titleLabel', 'text', 'buttonLabel'])
defineEmits(['onActionButtonSelect'])

const findIcon = (tag) => {
  switch (tag) {
    case 'gear':
      return faGear
    case 'bolt':
      return faBoltLightning
    case 'chart':
      return faChartLine
    default:
      return faTriangleExclamation
  }
}
</script>

<template>
  <cardBase>
    <div class="card-title">
      <FontAwesomeIcon class="card-title-icon" :icon="findIcon(titleIcon)"></FontAwesomeIcon>
      <h2>{{ titleLabel }}</h2>
    </div>
    <p class="card-text">{{ text }}</p>
    <button class="card-button" @click="$emit('onActionButtonSelect')">
      {{ buttonLabel }}
      <FontAwesomeIcon :icon="faArrowAltCircleRight"></FontAwesomeIcon>
    </button>
  </cardBase>
</template>

<style scoped>
.card-title {
  display: flex;
  font-size: 1.5em;
  width: 100%;
  align-items: center;
  color: var(--dark-theme-button-color);
  margin-bottom: 20px;
}
.card-title h2 {
  margin-left: 10px;
}
.card-text {
  color: black;
}

.card-button {
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
  border: none;
  font-size: 1.2em;
}
</style>
