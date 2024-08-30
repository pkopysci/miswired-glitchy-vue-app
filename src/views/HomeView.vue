<script setup>
import alertCard from '@/components/cards/alertCard.vue'
import actionCard from '@/components/cards/ActionCard.vue'
import router from '@/router'

const onGlitchActionButton = () => {
  router.push('/glitch')
}

const onAnalysisActionButton = () => {
  console.log('onAnalysisActionButton()')
  router.push('/adc')
}
</script>

<template>
  <div class="home-content">
    <alertCard>
      <h1>FW 1.0 (Early Access)</h1>
      <p>
        This is the glitchy, DEFCON 32 early access version, meaning the base functionality works,
        but there is a lot of polishing and features being worked on still. I want to thank you for
        your support. If you have any comments, bugs, or would like to contribute a pull request,
        please check out
        <a href="https://miswired.io/glitchy" target="blank">miswired.io/glitchy</a> and the
        <a href="https://github.com/miswired/glitchy" target="blank">github repo</a>. You may also
        want to download and flash the latest version of the software.
      </p>
    </alertCard>
    <div class="home-info">
      <h1>Learn Hardware Hacking</h1>
      <p>
        This board is designed to introduce two hardware exploitation techniques to get you started
        into the world of hardware hacking. It’s setup to perform power glitching and power
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
