<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useWebsocketStore } from './stores/websocketStore'

const websocketStore = useWebsocketStore()

onMounted(() => {
  console.log('app.onMounted()')
  websocketStore.initialize(`ws://${window.location.hostname}/ws`) // make this user-privded?
  websocketStore.open()
})

onBeforeUnmount(() => {
  websocketStore.killSocket()
})
</script>

<template>
  <h1>Hello, Glitchy Vue!</h1>
</template>

<style scoped></style>
