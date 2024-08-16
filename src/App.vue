<script setup>
import { onBeforeUnmount, onMounted } from 'vue'
import { useWebsocketStore } from './stores/websocketStore'
import AppHeader from './components/AppHeader.vue'

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
  <AppHeader></AppHeader>
  <RouterView></RouterView>
</template>
