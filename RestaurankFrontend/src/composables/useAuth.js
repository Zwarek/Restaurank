import { ref } from 'vue'

const error = ref(null)

export function useAuth() {
    const registerUser = async (userData) => {
        error.value = null

        if (userData.password !== userData.confirmPassword) {
            error.value = 'Hasła nie są takie same.'
            return false
        }

        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            })

            if (!response.ok) {
                const resData = await response.json()
                error.value = resData.detail || 'Błąd podczas rejestracji.'
                return false
            }

            return true
        } catch (err) {
            error.value = 'Nie udało się połączyć z serwerem.'
            return false
        }
    }

    return { registerUser, error }
}

export async function loginUser(credentials) {
    try {
        const response = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Błędne dane logowania.");
        }

        return { success: true, user: data.user };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

