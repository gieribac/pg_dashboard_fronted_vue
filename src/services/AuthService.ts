import { ref, Ref } from 'vue';
import Cookies from 'js-cookie'; // Importar js-cookie
import AdminLoginData from '../interfaces/AdminLoginData';

const loginUrl: string = 'http://127.0.0.1:8000/api/adminlog/login';
const logoutUrl: string = 'http://127.0.0.1:8000/api/adminlog/logout';
const meUrl: string = 'http://127.0.0.1:8000/api/adminlog/me';

export default class AuthService {
    private jwt: Ref<string>;
    private error: Ref<string>;

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
            const response = await (await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj),
            })).json();

            if ('error' in response) {
                this.error.value = 'Login Failed';
                return false;
            }

            // Guardar el token en una cookie
            this.jwt.value = response.token;
            this.setTokenInCookie(response.token);

            return true;
        } catch (e) {
            this.error.value = 'Login Failed';
            return false;
        }
    }

    // Método para guardar el token en una cookie
    private setTokenInCookie(token: string): void {
        Cookies.set('jwt_token', token, { 
            expires: 7, // Expira en 7 días
            secure: true, // Solo en HTTPS
            sameSite: 'None', // Estrictamente en el mismo sitio
        });
    }

    // Método para obtener el token desde la cookie
    getTokenFromCookie(): string | undefined {
        return Cookies.get('jwt_token');
    }

    // Método para eliminar la cookie
    clearTokenFromCookie(): void {
        Cookies.remove('jwt_token');
    }

    async logout(): Promise<boolean> {
        try {
            const token = this.getTokenFromCookie();
            if (!token) {
                this.error.value = 'No token found';
                return false;
            }

            const response = await fetch(logoutUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({}), // Body vacío
            });

            if (!response.ok) {
                this.error.value = 'Logout Failed';
                return false;
            }

            // Eliminar el token en memoria y en la cookie
            this.jwt.value = '';
            this.clearTokenFromCookie();

            return true;
        } catch (e) {
            this.error.value = 'Logout Failed';
            return false;
        }
    }

    async me(): Promise<boolean> {
        try {
            const token = this.getTokenFromCookie();
            if (!token) {
                this.error.value = 'No token found';
                return false;
            }

            const response = await fetch(meUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({}), // Body vacío
            });

            if (!response.ok) {
                this.error.value = 'Logout Failed';
                return false;
            }

            // Eliminar el token en memoria y en la cookie
            this.jwt.value = '';
            this.clearTokenFromCookie();

            return true;
        } catch (e) {
            this.error.value = 'Logout Failed';
            return false;
        }
    }
}


    