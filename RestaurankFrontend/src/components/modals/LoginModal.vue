<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-40"></div>
    <div class="bg-purple-800 text-white p-6 rounded-2xl z-50 w-[90%] max-w-md relative shadow-lg">
      <button class="absolute top-2 right-3 text-white text-xl" @click="$emit('close')">×</button>
      <h2 class="text-2xl font-bold mb-4 text-center text-white">Logowanie</h2>

      <div class="space-y-4">
        <input v-model="formData.email" type="email" placeholder="Email" class="input-style" />
        <input v-model="formData.password" type="password" placeholder="Hasło" class="input-style" />

        <button @click="login" class="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition">
          Zaloguj się
        </button>

        <p v-if="error" class="text-red-400 text-sm pt-1 text-center">Błędny email lub hasło.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  email: '',
  password: ''
})

const error = ref(false)

function login() {
  console.log('Logowanie:', formData.value)
  error.value = false
}
</script>

<style scoped>
.input-style {
  @apply w-full px-3 py-2 rounded-md text-black focus:outline-none;
}
</style>
