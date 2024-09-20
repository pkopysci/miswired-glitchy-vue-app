<script setup>
import { faIdBadge } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import alertCard from '@/components/cards/AlertCard.vue'
</script>

<template>
  <div class="about-us">
    <div class="about-title">
      <span class="contact-info">
        <FontAwesomeIcon
          class="activity-title-icon"
          style="margin-right: 10px"
          :icon="faIdBadge"
        ></FontAwesomeIcon>
        <h1>About Glitchy</h1>
      </span>
    </div>
    <div class="center-content">
      <alertCard style="width: fit-content; margin: auto">
        <p class="versioning">
          Firmware Version:
          <span class="callout">1.0.0</span>
        </p>
        <p>
          User Interface Version:
          <span class="callout">1.0.0</span>
        </p>
      </alertCard>
      <span class="licensing-info">
        <p>
          Glitchy is an open source project created by the
          <a href="https://miswired.io/glitchy/" target="_blank">miswired team</a>.
        </p>
        <p>
          Released under the
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank"
            >CC BY-SA 4.0 License</a
          >.
        </p>

        <p>
          Glitchy is designed to introduce two hardware exploitation techniques to get you started
          into the world of hardware hacking.
        </p>
      </span>

      <div class="licensing-info"></div>
    </div>
  </div>
</template>

<style scoped>
.about-us {
  width: 90vw;
  display: flex;
  flex-direction: column;
  max-width: inherit;
}

.about-us a {
  color: var(--dark-theme-active);
}

.about-title {
  width: 100%;
  margin-bottom: 20px;
}

.callout {
  color: var(--dark-theme-active);
  font-weight: bold;
}

.versioning {
  margin-bottom: 10px;
}

.contact-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.licensing-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.licensing-info p {
  margin: 10px 0;
}
</style>
