import { ref, Ref } from 'vue';
import AdminLoginData from '../interfaces/AdminLoginData';
import { getDecodedToken, isTokenValid, returnToken, setTokenInCookie ,getTokenFromCookie ,clearTokenFromCookie} from './authHelpers';
import { useRouter } from 'vue-router'; // Para redirigir
import DecodedToken from '../interfaces/DecodedToken';
const urlAdminAuth: string = 'http://127.0.0.1:8000/api/adminlog/';

export default class AuthService {
    private jwt: Ref<string>;
    private error: Ref<string>;
    private router = useRouter();
    private routerToMain(){
        this.router.push({ name: 'MainV' });
    }
    constructor() {
        this.jwt = ref('');
        this.error = ref('');
    }

    getJwt = (): Ref<string> => {
        return this.jwt;
    }

    getError = (): Ref<string> => {
        return this.error;
    }

    async login(obj: AdminLoginData): Promise<boolean> {
        try {
            const response = await fetch( `${urlAdminAuth}login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            });
            const responseJson = await response.json();
            if (!response.ok) {
                this.error.value = 'Login Failed';
                return false;
            }

            // Guardar el token en una cookie
            this.jwt.value = responseJson.token;
            setTokenInCookie(responseJson.token);

            return true;
        } catch (e) {
            this.error.value = 'Login Failed';
            return false;
        }  
    }

    async logout(): Promise<boolean> {
        try {
            const token = getTokenFromCookie();
            if (!token) {
                this.error.value = 'No token found';
                return false;
            }

            const response = await fetch( `${urlAdminAuth}logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },                
                body: JSON.stringify({}), // Body vacío
            });

            if (!response.ok) {
                this.error.value = 'Logout Failed';
                return false;
            }

            // Eliminar el token en memoria y en la cookie
            this.jwt.value = '';
            clearTokenFromCookie();

            return true;
        } catch (e) {
            this.error.value = 'Logout Failed';
            return false;
        }
    }

    async me(): Promise<boolean> {
        try {

            const token = getTokenFromCookie();
            console.log('token'+token);
            if (!token) {
                this.error.value = 'No token found';
                return false;
            }

            const response = await fetch(`${urlAdminAuth}me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                this.error.value = 'Logout Failed';
                console.log('Logout Failed')
                // Eliminar el token en memoria y en la cookie
                this.jwt.value = '';
                clearTokenFromCookie();
                return false;
            }
            return true;
        } catch (e) {
            this.error.value = 'Logout Failed';
            return false;
        }
    }

    async changePass(obj: object): Promise<boolean> {
        try{
            const token = getTokenFromCookie();
            if (!token) {
                this.error.value = 'No token found';
                return false;
            }
            console.log(JSON.stringify(obj));
            console.log(token);
            const response = await fetch(`${urlAdminAuth}updatepassword`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },                
                body: JSON.stringify(obj), 
            });
            if (!response.ok) {
                this.error.value = 'Logout Failed';
                return false;
            }
            console.log(obj);
            return true
        } catch (e){
            this.error.value = 'Change Pass Failed';
            return false;
        }
    }
        //Método para eliminar un admin (destroy)
    async deleteAdmin(data: object): Promise<boolean | null> {
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
            const token: string = returnToken();
            const response: Response = await fetch(`${urlAdminAuth}${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },                
                body: JSON.stringify(data)
            });
            if (response.status === 401) {
                this.router.push({ name: 'MainV' }); // Redirige si el token es inválido desde el servidor
                throw new Error('No autorizado. Token inválido o vencido');
              }

            if (!response.ok) {
                throw new Error(`Error deleting admin: ${response.status}`);
            }
            console.log(JSON.stringify(data));
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }
}


    