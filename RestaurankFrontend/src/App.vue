<template>
  <div class="h-screen w-screen relative overflow-hidden">
    <Navbar
        :isLoggedIn="isLoggedIn"
        @logout="logout"
        @open-login="showLogin = true"
        @open-register="showRegister = true"
    />
    <div id="map" class="leaflet-map"></div>

    <LoginModal
        v-if="showLogin"
        @close="showLogin = false"
        @login-success="user => { login(user); showLogin = false }"
    />

    <RegisterModal
        v-if="showRegister"
        @close="showRegister = false"
        @register-success="user => { login(user); showRegister = false }"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import LoginModal from './components/modals/LoginModal.vue'
import RegisterModal from './components/modals/RegisterModal.vue'
import { useAuth } from './composables/useAuth'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import hereIcon from './assets/markers/here.png'

const showLogin = ref(false)
const showRegister = ref(false)

const { isLoggedIn, login, logout } = useAuth()

onMounted(() => {
  const map = L.map('map')

  navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        map.setView([lat, lon], 15)

        const userMarker = L.icon({
          iconUrl: hereIcon,
          iconSize: [40, 50],
          iconAnchor: [17, 34],
          popupAnchor: [0, -34]
        })

        L.marker([lat, lon], { icon: userMarker })
            .addTo(map)
            .bindPopup('Jesteś tutaj')
            .openPopup()
      },
      () => {
        map.setView([52.2297, 21.0122], 13)
      }
  )

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  map.zoomControl.setPosition('bottomright')
})
</script>

