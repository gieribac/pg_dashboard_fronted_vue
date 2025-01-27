import {ref, Ref} from 'vue';
import { isTokenValid } from '../services/authHelpers'; 
import { useRouter } from 'vue-router'; // Para redirigir
import { returnToken } from './authHelpers';
import MAData from '../interfaces/MAData';
const url: string = 'http://127.0.0.1:8000/api/authorized/';

class AuthorizedService { //clase de servicio para consumo de api
    private authoriationsData: Ref<MAData[]>;
    private router = useRouter();
    constructor() {
        // this.authoriationsData = ref([]);
        this.authoriationsData = ref<MAData[]>([])
    }
    private routerToMain(){
        this.router.push({ name: 'MainV' });
    }
    //getter para post
    getAuthoriationsData (): Ref<MAData[]> {
        return this.authoriationsData
    }

    //metodos de clase
    //metodo para pedir la informacion al endpoint y disponerla 
    async fetchAll(): Promise<void>{ 
        try { 
            if (!isTokenValid()) {
                this.routerToMain(); // Redirige al usuario a la página de inicio
                throw new Error('Token vencido');
            }   
            const token: string = returnToken();
            const response: Response = await fetch (url,{                
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.status === 401) {
                this.routerToMain(); // Redirige si el token es inválido desde el servidor
                throw new Error('No autorizado. Token inválido o vencido');
            }
            const json = await response.json();
            const jsonData: MAData[]  = json.data;
            this.authoriationsData.value = jsonData;
            console.log(this.authoriationsData.value)
        } catch (e){
            console.log(e)
        }
    }

    // Método para registrar authorization
    async regAuthorization(data: MAData): Promise<boolean> {         
        try {
            if (!isTokenValid()) {
                this.routerToMain(); // Redirige al usuario a la página de inicio
                throw new Error('Token vencido');
            }
            const token: string = returnToken();
            const response = await fetch(url, {
                method: 'POST',
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
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error en el registro.');
            } 
            return true;   
        } catch (err) {
            console.log(err);
            return false;
        } 
    };

       
        //Método para eliminar un admin (destroy)
        async deleteAuthorization(id: string): Promise<boolean> {
            try {
                if (!isTokenValid()) {
                    this.routerToMain(); // Redirige al usuario a la página de inicio
                    throw new Error('Token vencido');
                }
                const token: string = returnToken();
                const response: Response = await fetch(`${url}/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.status === 401) {
                    this.router.push({ name: 'MainV' }); // Redirige si el token es inválido desde el servidor
                    throw new Error('No autorizado. Token inválido o vencido');
                  }
    
                if (!response.ok) {
                    throw new Error(`Error deleting data: ${response.status}`);
                }
                // Remover el data localmente
                this.authoriationsData.value = this.authoriationsData.value.filter(authorization => authorization.id !== id);
                return true;
            } catch (e) {
                console.error(e);
                return false;
            }
        }
}
export default AuthorizedService;