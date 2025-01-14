import { ref, Ref } from 'vue';
import { getDecodedToken } from './authHelpers';
import AdminRegData from '../interfaces/AdminRegData';
import DecodedToken from '../interfaces/DecodedToken';
const url: string = 'http://127.0.0.1:8000/api/admin/';
export default class AdminService {
    private admins: Ref<AdminRegData[]>;

    constructor() {
        this.admins = ref<AdminRegData[]>([]);
        this.admin = ref<AdminRegData | undefined>(undefined);
    }

    // Getter para admins
    getAdmins(): Ref<AdminRegData[]> {
        return this.admins;
    }
 
    // Método para obtener todos 
    async fetchAll(): Promise<void> {
        try {
            const response: Response = await fetch(url);
            const json: AdminRegData[] = await response.json();
            this.admins.value = json;
        } catch (e) {
            console.error('Error fetching admins: ', e);
        }
    }

    // Método para registrar admin
    async useRegisterService() {
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
   
    //Método para eliminar un admin
    async deleteAdmin(id: string): Promise<boolean | null> {
        try {
            const response: Response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error deleting admin: ${response.status}`);
            }
            // Remover el post localmente
            this.admins.value = this.admins.value.filter(admin => admin.id !== id);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    // Método para actualizar un admin
    async updateAdmin(updateData: Partial<AdminRegData>, id: string): Promise<AdminRegData | null> {
        try {
            const decodedToken: DecodedToken | null = getDecodedToken();
            let data: Partial<AdminRegData>;
            if (decodedToken !== null) {
               data = Object.assign(updateData, {author: decodedToken.name})
            } else {
                throw new Error('token decoded null');
            }
            console.log(`updated whidht id ${id} and data ${ JSON.stringify(data)}`)
            const response: Response = await fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`Error updating admin: ${response.status}`);
            }
            const updatedAdmin: AdminRegData = await response.json();
            // Actualizar el post localmente
            const index = this.admins.value.findIndex(admin => admin.id === id);
            if (index !== -1) {
                this.admins.value[index] = { ...this.admins.value[index], ...updateData };
            }
            return updatedAdmin;
        } catch (e) {
            console.error(e);
            return null;
        }
    
    }
}