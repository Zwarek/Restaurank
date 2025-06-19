<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-[#5D16A6] text-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
      <button class="absolute top-3 right-4 text-white text-xl" @click="$emit('close')">✖</button>
      <h2 class="text-center text-2xl font-bold mb-4 text-[#F7B801]">Rejestracja</h2>

      <input v-model="firstName" placeholder="Imię" class="input-field" required />
      <input v-model="lastName" placeholder="Nazwisko" class="input-field" required />
      <input v-model="username" placeholder="Nazwa użytkownika" class="input-field" required />
      <input v-model="email" type="email" placeholder="Email" class="input-field" required />

      <div class="flex gap-2">
        <input v-model="password" type="password" placeholder="Hasło" class="input-field w-1/2" required />
        <input v-model="confirmPassword" type="password" placeholder="Potwierdź hasło" class="input-field w-1/2" required />
      </div>

      <div class="grid grid-cols-2 gap-x-4 text-sm mt-2">
        <p :class="passwordCriteria.length ? 'text-green-400' : 'text-gray-300'">✔️ Min. 8 znaków</p>
        <p :class="passwordCriteria.lowercase ? 'text-green-400' : 'text-gray-300'">✔️ Mała litera (a–z)</p>
        <p :class="passwordCriteria.uppercase ? 'text-green-400' : 'text-gray-300'">✔️ Wielka litera (A–Z)</p>
        <p :class="passwordCriteria.number ? 'text-green-400' : 'text-gray-300'">✔️ Cyfra (0–9)</p>
        <p :class="passwordCriteria.special ? 'text-green-400' : 'text-gray-300'">✔️ Znak specjalny (!@#)</p>
        <p :class="passwordCriteria.match ? 'text-green-400' : 'text-gray-300'">✔️ Hasła są identyczne</p>
      </div>

      <select v-model="country" class="input-field mt-3" required>
        <option disabled value="">Wybierz kraj</option>
        <option v-for="(c, code) in countries" :key="code" :value="c.name">
          {{ c.name }}
        </option>
      </select>

      <div class="flex gap-2">
        <input v-model="postalCode" placeholder="Kod pocztowy" class="input-field w-1/3" required />
        <input v-model="city" placeholder="Miasto" class="input-field w-2/3" required />
      </div>

      <input v-model="street" placeholder="Ulica i numer domu" class="input-field" required />

      <button @click="handleRegister" class="bg-[#F18701] text-white font-semibold w-full mt-4 py-2 rounded-lg hover:bg-orange-600">
        Zarejestruj się
      </button>

      <p v-if="error" class="text-red-400 text-sm text-center mt-2">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth.js'
import { countries } from 'countries-list'

const { registerUser, error } = useAuth()

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const country = ref('')
const city = ref('')
const postalCode = ref('')
const street = ref('')

const passwordCriteria = computed(() => ({
  length: password.value.length >= 8,
  lowercase: /[a-z]/.test(password.value),
  uppercase: /[A-Z]/.test(password.value),
  number: /[0-9]/.test(password.value),
  special: /[!@#$%^&*(),.?":{}|<>]/.test(password.value),
  match: password.value !== '' && password.value === confirmPassword.value
}))

const handleRegister = async () => {
  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
    address: {
      street: street.value,
      city: city.value,
      postalCode: postalCode.value,
      country: country.value,
    },
  }

  const success = await registerUser(userData)
  if (success) {
    alert('Rejestracja zakończona sukcesem!')
    window.location.reload()
  }
}
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-2 mt-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-[#F7B801];
}
</style>
