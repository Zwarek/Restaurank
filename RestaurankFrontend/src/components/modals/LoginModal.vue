<template>
  <div class="modal-overlay">
    <div class="modal">
      <button class="modal-close" @click="$emit('close')">✖</button>
      <h2 class="modal-title">Logowanie</h2>

      <input
          v-model="username"
          type="text"
          placeholder="Nazwa użytkownika"
          class="input"
      />
      <input
          v-model="password"
          type="password"
          placeholder="Hasło"
          class="input"
      />

      <button class="submit-btn" @click="handleLogin">Zaloguj się</button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { loginUser } from "@/composables/useAuth";

const username = ref("");
const password = ref("");
const errorMessage = ref("");

const handleLogin = async () => {
  const { success, message } = await loginUser({
    username: username.value,
    password: password.value,
  });

  if (!success) {
    errorMessage.value = message;
    return;
  }

  location.reload();
};
</script>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50;
}
.modal {
  @apply bg-purple-700 p-6 rounded-xl w-[90%] max-w-md shadow-xl text-white relative;
}
.modal-close {
  @apply absolute top-2 right-3 text-white text-xl;
}
.modal-title {
  @apply text-center text-yellow-400 font-bold text-xl mb-4;
}
.input {
  @apply w-full mb-3 p-2 rounded-md text-black;
}
.submit-btn {
  @apply w-full bg-orange-500 text-white font-bold py-2 rounded hover:bg-orange-600;
}
.error-message {
  @apply text-center text-pink-300 mt-2;
}
</style>
