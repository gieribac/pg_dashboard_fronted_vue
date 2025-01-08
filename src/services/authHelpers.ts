import AuthService from './AuthService';
import { jwtDecode } from 'jwt-decode'; // Importación con llaves para jwtDecode
import DecodedToken from '../interfaces/DecodedToken';
const authService = new AuthService();

export function isAuthenticated(): boolean {
    const token = authService.getTokenFromCookie();
    return token !== undefined && token !== ''; // Autenticado si el token existe y no está vacío
}



export function getDecodedToken(): DecodedToken | null {
    const token = authService.getTokenFromCookie();

    if (!token) {
        return null; // Retorna null si no hay token
    }

    try {
        return jwtDecode<DecodedToken>(token); // Decodifica el token y retorna el objeto
    } catch (error) {
        console.error('Error decoding token:', error); // Manejo de errores en caso de token inválido
        return null; // Retorna null si ocurre un error
    }
}
