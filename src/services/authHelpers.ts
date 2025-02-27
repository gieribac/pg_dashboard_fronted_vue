
import { jwtDecode } from 'jwt-decode'; // Importación con llaves para jwtDecode
import Cookies from 'js-cookie'; // Importar js-cookie
import DecodedToken from '../interfaces/DecodedToken';


export function returnToken(): string {
  const token: string | undefined = getTokenFromCookie();
  if (typeof(token) === 'string') {
    return token;
  }
  return 'token undefined';
}

// Método para guardar el token en una cookie
export function setTokenInCookie(token: string): void {
  const oneHour: number = 1 / 24;
  Cookies.set('jwt_token', token, { 
      expires: oneHour, // Expira en 1 hora 
      secure: true, // Solo en HTTPS
      sameSite: 'None', // Estrictamente en el mismo sitio
  });
}
  
export function isAuthenticated(): boolean {
  const token = getTokenFromCookie();
  return token !== undefined && token !== ''; // Autenticado si el token existe y no está vacío
}

export function getDecodedToken():DecodedToken | null {
    const token = getTokenFromCookie();
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
    // Método para obtener el token desde la cookie
  export function getTokenFromCookie(): string | undefined {
      return Cookies.get('jwt_token');
  }

  // Método para eliminar la cookie
  export function clearTokenFromCookie(): void {
      Cookies.remove('jwt_token');
  }

export function isTokenValid(): boolean {
  // Obtén el token desde la cookie
  const token = getTokenFromCookie();    
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