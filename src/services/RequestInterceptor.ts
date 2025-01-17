import { isTokenValid } from '../services/authHelpers'; 
import Cookies from 'js-cookie'; // Para acceder a las cookies
import { useRouter } from 'vue-router'; // Para redirigir

// Tipos para las opciones de fetch
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function fetchWithAuth<T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const router = useRouter();

  // Verifica si el token es válido
  if (!isTokenValid()) {
    router.push({ name: 'MainV' }); // Redirige al usuario a la página de inicio
    throw new Error('Token vencido');
  }

  // Agrega el token a las cabeceras (si es necesario)
  const token = Cookies.get('token');
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`, // Asegúrate de que el backend espera el token en esta cabecera
  };

  // Realiza la solicitud con fetch
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    router.push({ name: 'MainV' }); // Redirige si el token es inválido desde el servidor
    throw new Error('No autorizado. Token inválido o vencido');
  }

  // Retorna la respuesta en formato JSON
  return response.json() as Promise<T>;
}