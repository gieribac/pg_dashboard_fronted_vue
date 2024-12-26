import { ref, Ref} from 'vue';
import AdminLoginData from '../interfaces/AdminLoginData';

const url: string = 'http://127.0.0.1:8000/api/adminlog/login';
export default class AuthService {
    private jwt: Ref<String>;
    private error: Ref<String>;

    constructor(){
        this.jwt = ref('');
        this.error =  ref('');
    }

    getJwt = (): Ref<String> => {
        return this.jwt;
    }
    getError = (): Ref<String> => {
        return this.error;
    }

    async login(obj:AdminLoginData): Promise<boolean> {
        try {
            const response = await (await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj)
            })).json();
            
            if ('error' in response) {
                this.error.value = 'Login Failed';
                return false;  
            }
    
            this.jwt.value = response.token;
            return true;
        } catch (e) {
            this.error.value = 'Login Failed';
            return false;
        }
    }
    
}

// {
//     "message": "Inicio de sesión exitoso",
//     "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2FkbWlubG9nL2xvZ2luIiwiaWF0IjoxNzM0NTgxMDA1LCJleHAiOjE3MzQ1ODExODUsIm5iZiI6MTczNDU4MTAwNSwianRpIjoiRkNrWVY2MXd4MVVTZW42byIsInN1YiI6IjYiLCJwcnYiOiJkZjg4M2RiOTdiZDA1ZWY4ZmY4NTA4MmQ2ODZjNDVlODMyZTU5M2E5In0._QXy2Vj54jNXwdBDxrIyPD4DH2n83zRmaj7F7VLxod8",
//     "admin": {
//       "id": 6,
//       "username": "drociorv",
//       "email": "drrvw@gmail.com"
//     }
//   } 

// {
    //     "name": "judaa",
    //     "no_doc": "102184771",
    //     "email": "yeicoafqw@gmail.com",
    //     "username": "juraameloqwq",
    //     "password": "drrb121e13",
    //     "main": true
    //   }
    