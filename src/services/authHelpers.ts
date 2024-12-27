import AuthService from './AuthService';

export function isAuthenticated(): boolean {
    const authService = new AuthService();
    const token = authService.getTokenFromCookie();
    return token !== undefined && token !== ''; // Autenticado si el token existe y no está vacío
}