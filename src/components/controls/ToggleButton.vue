<script setup>
defineProps(['state'])
defineEmits(['onStateToggle'])
</script>

<template>
  <label class="switch">
    <input
      v-bind:checked="state"
      :class="{ active: state }"
      type="checkbox"
      @click="$emit('onStateToggle')"
    />
    <span class="slider round"></span>
  </label>
</template>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--dark-theme-color);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: var(--dark-theme-bg);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.active + .slider {
  background-color: var(--dark-theme-button-color);
}

.active + .slider:before {
  -webkit-transform: translateX(55px);
  -ms-transform: translateX(55px);
  transform: translateX(55px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
