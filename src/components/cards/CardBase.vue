<script setup></script>
<template>
  <div class="card-base">
    <slot></slot>
  </div>
</template>
<style>
.card-base {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  display: flex;
  border-radius: 10px;
  padding: 20px;
  justify-content: start;
  align-items: start;
  background: white;
  margin: 10px 0;
}
</style>
