import { ref, Ref } from 'vue';
import AdminRegData from '../interfaces/AdminRegData';
const url: string = 'http://127.0.0.1:8000/api/admin/';
export default function useRegisterService() {
    const isLoading: Ref<boolean> = ref(false);
    const error: Ref<string | null> = ref(null);
    const success: Ref<boolean> = ref(false);

    const registerUser = async (userData: AdminRegData): Promise<void> => {
        isLoading.value = true;
        error.value = null;
        success.value = false;
        console.log(JSON.stringify(userData));
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro.');
            }

            success.value = true;
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Error desconocido.';
        } finally {
            isLoading.value = false;
        }
    };

    return {
        registerUser,
        isLoading,
        error,
        success,
    };
} 