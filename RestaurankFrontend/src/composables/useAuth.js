import { ref } from 'vue'

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
const userData = ref(JSON.parse(localStorage.getItem('userData')) || null)

export function useAuth() {
    function login(user) {
        isLoggedIn.value = true
        userData.value = user
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userData', JSON.stringify(user))
    }

    function logout() {
        isLoggedIn.value = false
        userData.value = null
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userData')
    }

    return {
        isLoggedIn,
        userData,
        login,
        logout
    }
}
