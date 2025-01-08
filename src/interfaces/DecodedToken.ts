export default interface DecodedToken {
    sub: string; // ID del usuario
    main: number; // Campo adicional en tu token,
    name: string; 
}