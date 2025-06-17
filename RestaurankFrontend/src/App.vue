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
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const showLogin = ref(false)
const showRegister = ref(false)

onMounted(() => {
  const map = L.map('map')

  navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        map.setView([lat, lon], 15)

        L.marker([lat, lon]).addTo(map).bindPopup('Jesteś tutaj').openPopup()
      },
      () => {
        map.setView([52.2297, 21.0122], 13) // domyślnie Warszawa
      }
  )

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  map.zoomControl.setPosition('bottomright')
})

</script>
