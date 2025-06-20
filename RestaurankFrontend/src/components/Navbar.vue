<template>
  <nav class="navbar-custom flex justify-between items-center w-full bg-purple-700 px-6 py-4 text-white">
    <img src="@/assets/logo.svg" alt="Restaurank logo" class="h-14 w-auto" />

    <div class="flex items-center space-x-4">
      <input
          type="text"
          placeholder="Szukaj restauracji..."
          class="px-3 py-1 rounded-md text-black focus:outline-none"
      />

      <template v-if="isLoggedIn">
        <button @click="$emit('open-user-panel')" class="hover:underline">Panel użytkownika</button>
        <button @click="$emit('logout')" class="hover:underline">Wyloguj</button>
      </template>

      <template v-else>
        <button @click="$emit('open-login')" class="hover:underline">Zaloguj</button>
        <button @click="$emit('open-register')" class="hover:underline">Zarejestruj</button>
      </template>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  isLoggedIn: Boolean
})
</script>
