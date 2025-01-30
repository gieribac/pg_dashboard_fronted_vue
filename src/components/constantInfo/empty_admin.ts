import AdminRegData from "../../interfaces/AdminRegData";
type ValidatedAdmin = AdminRegData & { password: string };
export const EMPTY_ADMIN: ValidatedAdmin = {    
    name: '',
    no_doc: '',
    email: '',
    username: '',
    password: ''
};