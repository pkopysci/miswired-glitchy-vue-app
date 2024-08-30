<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
</script>

<template>
  <div class="footer">
    <div class="footer-item-wrapper">
      <a href="https://miswired.io/glitchy/" target="blank">
        <FontAwesomeIcon class="icon-style footer-icon" :icon="faGlobe" />
        <span class="link-label">miswired.io</span>
      </a>
    </div>
    <div class="footer-item-wrapper">
      <a href="https://github.com/miswired/glitchy" target="blank">
        <FontAwesomeIcon class="icon-style footer-icon" :icon="faGithub" />
        <span class="link-label">Glitchy Repo</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.footer {
  height: 100%;
  background-color: var(--dark-theme-black);
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: fit-content;
}

.icon-style {
  height: 30px;
}

.link-label {
  display: none;
}

.footer-item-wrapper a:hover {
  color: var(--dark-theme-active);
}

@media (min-width: 768px) {
  .link-label {
    display: block;
  }

  .footer-icon {
    margin-bottom: 20px;
  }

  .footer-item-wrapper a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
