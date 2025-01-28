import AuthService from './AuthService';
import { jwtDecode } from 'jwt-decode'; // Importación con llaves para jwtDecode
import DecodedToken from '../interfaces/DecodedToken';
const authService = new AuthService();

export function returnToken(): string {
  const token: string | undefined = authService.getTokenFromCookie();
  if (typeof(token) === 'string') {
    return token;
  }
  return 'token undefined';
}
  
export function isAuthenticated(): boolean {
  const token = authService.getTokenFromCookie();
  return token !== undefined && token !== ''; // Autenticado si el token existe y no está vacío
}

export function getDecodedToken():DecodedToken | null {
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

export function isTokenValid(): boolean {
  // Obtén el token desde la cookie
  const token = authService.getTokenFromCookie();    
  if (!token) {
    return false; // No hay token disponible
  }  
  try {
    // Decodifica el payload del token (parte intermedia del JWT)
    const payloadBase64 = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    // Verifica la fecha de expiración del token
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    return decodedPayload.exp > currentTime;
  } catch (e) {
    console.error('Error al validar el token:', e);
    return false; // Token inválido o corrupto
  }
}