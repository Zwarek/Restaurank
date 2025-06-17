<template>
  <nav class="navbar-custom flex justify-between items-center w-full">
    <div class="text-2xl font-bold">Restaurank 🍽️</div>
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
