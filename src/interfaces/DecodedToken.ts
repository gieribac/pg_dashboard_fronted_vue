export default interface DecodedToken {
    sub: string; // ID del usuario
    main: boolean; // Campos adicionales
    name: string; 
    no_doc: string;
    email:string;
    username: string;
}