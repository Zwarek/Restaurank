<script setup>

import { useRoute } from "vue-router";
import logoPath from "@/assets/logo.png";

const route = useRoute();

</script>

<template>

<div class="navbar-container">
  <nav class="navbar">
    <div class="navbar-logo">
      <router-link to="/">
        <img :src="logoPath" alt="logo" />
      </router-link>
    </div>
    <ul class="navbar-links">
      <li><router-link to="/">Strona główna</router-link></li>
      <li><router-link to="/login">Zaloguj się</router-link></li>
      <li><router-link to="/register">Zarejestruj</router-link></li>
      <li><router-link to="/user-panel">Panel użytkownika</router-link></li>
    </ul>
  </nav>
</div>

</template>


<style scoped>

@import "../styles/navbar.css";

</style>