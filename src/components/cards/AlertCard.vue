<script setup></script>
<template>
  <div class="alert-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.alert-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: solid 1px var(--dark-theme-active);
  padding: 20px;
  background-color: var(--dark-theme-card-bg-dark);
}
</style>
