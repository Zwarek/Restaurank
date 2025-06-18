<template>
  <nav class="navbar-custom flex justify-between items-center w-full">
    <div class="flex items-center">
      <img src="../assets/logo.svg" alt="Logo Restaurank" class="logo-img" />
    </div>
    <div class="flex items-center space-x-4">
      <input
          type="text"
          placeholder="Szukaj restauracji..."
          class="px-3 py-1 rounded-md text-black focus:outline-none"
      />
      <button @click="$emit('open-login')">Zaloguj</button>
      <button @click="$emit('open-register')">Zarejestruj</button>
    </div>
  </nav>
</template>
