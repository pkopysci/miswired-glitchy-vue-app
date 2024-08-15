<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useWebsocketStore } from './stores/websocketStore'
import { useAdcStore } from './stores/adcStore'

const websocketStore = useWebsocketStore()
const adcStore = useAdcStore()

const startStream = () => {
  adcStore.startStream()
}

const stopStream = () => {
  adcStore.stopStream()
}

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
  <button @click="startStream">Start Stream</button>
  <button @click="stopStream">Stop Stream</button>
</template>

<style scoped></style>
