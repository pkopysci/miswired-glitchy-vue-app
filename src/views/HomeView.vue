<script setup>
import actionCard from '@/components/cards/ActionCard.vue'
import alertCard from '@/components/cards/AlertCard.vue'
import router from '@/router'

const onGlitchActionButton = () => {
  router.push('/glitch')
}

const onAnalysisActionButton = () => {
  router.push('/adc')
}
</script>

<template>
  <div class="home-content">
    <div class="home-info">
      <h1>Learn Hardware Hacking</h1>
      <p>
        This board is designed to introduce two hardware exploitation techniques to get you started
        into the world of hardware hacking. It is setup to perform power glitching and power
        analysis.
      </p>
    </div>
    <div class="actions">
      <actionCard
        titleIcon="bolt"
        titleLabel="Power Glitching"
        text="Break the execution cycle of a chip allowing you to bypass checks that would otherwise fail, like password checks."
        buttonLabel="Start Glitching"
        @onActionButtonSelect="onGlitchActionButton"
      ></actionCard>
      <actionCard
        titleIcon="chart"
        titleLabel="Power Analysis"
        text="Power analysis lets you pull hidden information from a chip, such as which buttons to press for a password."
        buttonLabel="Get Started"
        @onActionButtonSelect="onAnalysisActionButton"
      ></actionCard>
    </div>
  </div>
</template>

<style scoped>
.home-content {
  display: flex;
  flex-direction: column;
}
.home-content a {
  color: var(--dark-theme-active);
}

.home-content h1 {
  margin-bottom: 20px;
}

.home-info {
  margin: 20px;
}

@media (min-width: 768px) {
  .actions {
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
  }
}
</style>
