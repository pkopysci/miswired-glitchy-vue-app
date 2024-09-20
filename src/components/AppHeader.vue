<script setup>
import logo from '@/assets/glitch-logo.png'
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <span>
      <RouterLink to="/">
        <img :src="logo" alt="Glitch App" />
        <span class="logo-text">Glitchy</span>
      </RouterLink>
    </span>
    <!-- Hamburger Icon -->
    <input class="side-menu" type="checkbox" id="side-menu" />
    <label class="hamb" for="side-menu"><span class="hamb-line"></span></label>
    <nav class="nav">
      <ul class="menu">
        <li>
          <RouterLink to="/" activeClass="link-active">Home</RouterLink>
        </li>
        <li><RouterLink activeClass="link-active" to="glitch">Glitch</RouterLink></li>
        <li><RouterLink activeClass="link-active" to="adc">Power Setup</RouterLink></li>
        <li>
          <RouterLink activeClass="link-active" to="power-analysis">Power Analysis</RouterLink>
        </li>
        <li><RouterLink activeClass="link-active" to="about-us">About</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header-wrapper {
  background-color: var(--dark-theme-bg);
}

.app-header {
  color: var(--dark-theme-color);
  padding: 20px;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
}

.app-header img {
  max-width: 45px;
}

.logo-text {
  font-size: 1.6em;
  margin-left: 5px;
}

/* Nav menu */
.nav {
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  /*background-color: var(--dark-theme-bg);*/
  background-color: black;
  max-height: 0;
  transition: max-height 0.3s ease-out;
  z-index: 1000;
}
.menu a {
  display: block;
  padding: 10px;
}
.menu a:hover {
  background-color: var(--dark-theme-active);
  color: var(--dark-theme-bg);
}

/* Menu Icon */
.hamb {
  cursor: pointer;
  float: right;
  padding: 25px;
}

.hamb-line {
  background: var(--dark-theme-color);
  display: block;
  height: 2px;
  position: relative;
  width: 24px;
}

.hamb-line::before,
.hamb-line::after {
  background: var(--dark-theme-color);
  content: '';
  display: block;
  height: 100%;
  position: absolute;
  transition: all 0.2s ease-out;
  width: 100%;
}
.hamb-line::before {
  top: 5px;
}
.hamb-line::after {
  top: -5px;
}

/* Hide checkbox */
.side-menu {
  display: none;
}

/* Toggle menu icon */
.side-menu:checked ~ nav {
  max-height: 100%;
}
.side-menu:checked ~ .hamb .hamb-line {
  background: transparent;
}
.side-menu:checked ~ .hamb .hamb-line::before {
  transform: rotate(-45deg);
  top: 0;
}
.side-menu:checked ~ .hamb .hamb-line::after {
  transform: rotate(45deg);
  top: 0;
}

body:has(.side-menu:checked) {
  overflow: hidden;
}

/* Responsiveness */
@media (min-width: 768px) {
  .nav {
    max-height: none;
    top: 0;
    position: relative;
    float: right;
    width: fit-content;
    background-color: transparent;
  }

  .nav ul,
  li {
    display: inline-block;
  }
  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav a:hover {
    background-color: transparent;
    color: var(--dark-theme-active);
  }

  .hamb {
    display: none;
  }
}
</style>
