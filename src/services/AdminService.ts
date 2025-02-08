import { ref, Ref } from 'vue';
import { getDecodedToken } from './authHelpers';
import AdminRegData from '../interfaces/AdminRegData';
import DecodedToken from '../interfaces/DecodedToken';
import { isTokenValid, returnToken  } from './authHelpers'; 
import { useRouter } from 'vue-router'; // Para redirigir
import BaseAdminData from '../interfaces/BaseAdminData';
const url: string = 'http://127.0.0.1:8000/api/admin/';
export default class AdminService {
    private admins: Ref<AdminRegData[]>;
    private router = useRouter();
    constructor() {
        this.admins = ref<AdminRegData[]>([]);
    }
    private routerToMain(){
        this.router.push({ name: 'MainV' });
    }
    // Getter para admins
    getAdmins(): Ref<AdminRegData[]> {
        return this.admins;
    }
 
    // Método para obtener todos (show)
    async fetchAll(): Promise<void> {
        try {
            if (!isTokenValid()) {
                this.routerToMain(); // Redirige al usuario a la página de inicio
                throw new Error('Token vencido');
            } 
            const token: string = returnToken();
            const response: Response = await fetch(url,{
                headers: {
                    'Authorization': `Bearer ${token}`
                },}
            );                     
            if (response.status === 401) {
                this.routerToMain(); // Redirige si el token es inválido desde el servidor
                throw new Error('No autorizado. Token inválido o vencido');
            }
            const json: AdminRegData[] = await response.json();
            this.admins.value = json;
        } catch (e) {
            console.error('Error fetching admins: ', e);
        }
    }

    // Método para registrar admin (store)
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

    // Método para actualizar un admin (updatePartial)
    async updateAdmin(data: Partial<AdminRegData>): Promise<BaseAdminData | null> {
        try {
            if (!isTokenValid()) {
                this.routerToMain(); // Redirige al usuario a la página de inicio
                throw new Error('Token vencido');
            }
            const decodedToken: DecodedToken | null = getDecodedToken();
            let id: string | undefined = undefined;
            if (decodedToken !== null) {
                id = decodedToken.sub;
            } else {
                throw new Error('token decoded null');
            }
            console.log(`updated whidht id ${id} and data ${ JSON.stringify(data)}`)
            const token: string = returnToken();
            const response: Response = await fetch(`${url}${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            if (response.status === 401) {
                this.routerToMain(); // Redirige si el token es inválido desde el servidor
                throw new Error('No autorizado. Token inválido o vencido');
            }
            if (!response.ok) {
                throw new Error(`Error updating admin: ${response.status}`);
            }
            const responseJson = await response.json();
            console.log(responseJson)
            return responseJson;
        } catch (e) {
            console.error(e);
            return null;
        }
    
    }
}