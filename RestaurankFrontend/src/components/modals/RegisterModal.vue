<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-40"></div>
    <div class="bg-purple-800 text-white p-6 rounded-2xl z-50 w-[90%] max-w-lg relative shadow-lg">
      <button class="absolute top-2 right-3 text-white text-xl" @click="$emit('close')">×</button>
      <h2 class="text-2xl font-bold mb-4 text-center text-white">Rejestracja</h2>

      <div class="space-y-3">
        <input v-model="formData.firstName" type="text" placeholder="Imię" class="input-style" />
        <input v-model="formData.lastName" type="text" placeholder="Nazwisko" class="input-style" />
        <input v-model="formData.username" type="text" placeholder="Nazwa użytkownika" class="input-style" />
        <input v-model="formData.email" type="email" placeholder="Email" class="input-style" />

        <div class="flex gap-2">
          <input v-model="formData.password" type="password" placeholder="Hasło" class="input-style w-1/2" />
          <input v-model="formData.confirmPassword" type="password" placeholder="Powtórz hasło" class="input-style w-1/2" />
        </div>

        <div class="flex flex-wrap gap-4 text-sm px-1 py-2">
          <div class="w-[48%] space-y-1">
            <p :class="ruleClass(passwordRules.length)">✔ Min. 8 znaków</p>
            <p :class="ruleClass(passwordRules.uppercase)">✔ Wielka litera (A–Z)</p>
            <p :class="ruleClass(passwordRules.special)">✔ Znak specjalny (!@#)</p>
          </div>
          <div class="w-[48%] space-y-1">
            <p :class="ruleClass(passwordRules.lowercase)">✔ Mała litera (a–z)</p>
            <p :class="ruleClass(passwordRules.digit)">✔ Cyfra (0–9)</p>
            <p :class="ruleClass(passwordRules.match)">✔ Hasła są identyczne</p>
          </div>
        </div>

        <select v-model="formData.country" class="input-style text-black">
          <option disabled value="">Wybierz kraj</option>
          <option v-for="(info, code) in countryList" :key="code" :value="info.name">
            {{ info.name }}
          </option>
        </select>

        <div class="flex gap-2">
          <input v-model="formData.postcode" type="text" placeholder="Kod pocztowy" class="input-style w-1/2" />
          <input v-model="formData.city" type="text" placeholder="Miasto" class="input-style w-1/2" />
        </div>

        <input v-model="formData.street" type="text" placeholder="Ulica i numer" class="input-style" />

        <button @click="register" class="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition">Zarejestruj się</button>

        <p v-if="error" class="text-red-400 text-sm pt-1 text-center">Błąd podczas rejestracji.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { countries } from 'countries-list'

const formData = ref({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  country: '',
  postcode: '',
  city: '',
  street: ''
})

const error = ref(false)
const countryList = countries

const passwordRules = computed(() => {
  const p = formData.value.password
  return {
    length: p.length >= 8,
    uppercase: /[A-Z]/.test(p),
    lowercase: /[a-z]/.test(p),
    digit: /[0-9]/.test(p),
    special: /[!@#]/.test(p),
    match: p === formData.value.confirmPassword
  }
})

function ruleClass(valid) {
  return valid ? 'text-green-400' : 'text-red-400'
}

function register() {
  if (Object.values(passwordRules.value).every(Boolean)) {
    console.log('Dane do rejestracji:', formData.value)
    error.value = false
  } else {
    error.value = true
  }
}
</script>

<style scoped>
.input-style {
  @apply w-full px-3 py-2 rounded-md text-black focus:outline-none;
}
</style>
