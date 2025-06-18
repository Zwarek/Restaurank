<template>
  <div class="h-screen w-screen relative overflow-hidden">
    <Navbar @open-login="showLogin = true" @open-register="showRegister = true" />
    <div id="map" class="leaflet-map"></div>
    <LoginModal v-if="showLogin" @close="showLogin = false" />
    <RegisterModal v-if="showRegister" @close="showRegister = false" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import LoginModal from './components/modals/LoginModal.vue'
import RegisterModal from './components/modals/RegisterModal.vue'
import { useMap } from './composables/useMap.js'
import 'leaflet/dist/leaflet.css'

const showLogin = ref(false)
const showRegister = ref(false)

const { initMap } = useMap()

onMounted(() => {
  initMap('map')
})
</script>

<style>
#map.leaflet-map {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  height: 100%;
  width: 100%;
}
</style>
