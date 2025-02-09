import { ref, Ref } from 'vue';
import Dashboard_Data from '../interfaces/DashboardData';
import { getDecodedToken, returnToken } from './authHelpers';
import DecodedToken from '../interfaces/DecodedToken';
import { isTokenValid } from '../services/authHelpers'; 
import { useRouter } from 'vue-router'; // Para redirigir
const url: string = 'http://127.0.0.1:8000/api/maps/';

class PostService {
    private router = useRouter();
    private posts: Ref<Dashboard_Data[]>;
    private publicPosts: Ref<Dashboard_Data[]>;
    constructor() {
        this.posts = ref<Dashboard_Data[]>([]);
        this.publicPosts = ref<Dashboard_Data[]>([]);
    }
    private routerToMain(){
        this.router.push({ name: 'MainV' });
    }
    // Getter para posts
    getPosts(): Ref<Dashboard_Data[]> {
        return this.posts;
    }
    getPublicPosts(): Ref<Dashboard_Data[]> {
        return this.publicPosts;
    }

    // Método para obtener todos los posts
    async fetchAll(): Promise<void> {
        try {
            const response: Response = await fetch(url);
            const json = await response.json();
            if (Array.isArray(json)){
              this.posts.value = json;  
            }            
        } catch (e) {
            this.posts.value = []; 
            console.error('Error fetching posts: ', e);
        }
    }
    async fetchAllPublics(): Promise<void> {
        try {
            const response: Response = await fetch(`${url}?filter=public`);
            const json = await response.json();
            if (Array.isArray(json)){
              this.publicPosts.value = json;  
            }            
        } catch (e) {
            this.publicPosts.value = []; 
            console.error('Error fetching posts: ', e);
        }
    }

    // Método para crear un nuevo post
    async createPost(postData: Partial<Dashboard_Data>): Promise<Dashboard_Data | null> {
        try {
            if (!isTokenValid()) {
                this.routerToMain(); // Redirige al usuario a la página de inicio
                throw new Error('Token vencido');
            }
            const decodedToken: DecodedToken | null = getDecodedToken();
            const token: string = returnToken();
            let data: Partial<Dashboard_Data>;
            if (decodedToken !== null) {
               data = Object.assign(postData, {author: decodedToken.name})
            } else {
                throw new Error('token decoded null');
            }
            console.log(JSON.stringify(data));
            console.log('token',token);
            const response: Response = await fetch(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            if (response.status === 401) {
                this.routerToMain(); // Redirige si el token es inválido desde el servidor
                throw new Error('No autorizado. Token inválido o vencido');
            }
            if (!response.ok) {
                throw new Error(`Error creating post: ${response.status}`);
            }
            const newPost = await response.json();
            if (newPost?.map) {
                this.posts.value.push(newPost.map); // Agregar el nuevo post a la lista local
            }
            return newPost;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    // Método para eliminar un post
    async deletePost(id: string): Promise<boolean> {
        try {
            // Verifica si el token es válido
            if (!isTokenValid()) {
                this.routerToMain(); // Redirige al usuario a la página de inicio
                throw new Error('Token vencido');
            }
            const token: string = returnToken();
            const response: Response = await fetch(`${url}${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 401) {
                this.routerToMain(); // Redirige si el token es inválido desde el servidor
                throw new Error('No autorizado. Token inválido o vencido');
            }
            if (!response.ok) {
                throw new Error(`Error deleting post: ${response.status}`);
            }
            // Remover el post localmente
            this.posts.value = this.posts.value.filter(post => post.id !== id);
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    // Método para actualizar un post
    async updatePost(updateData: Partial<Dashboard_Data>, id: string): Promise<Dashboard_Data | null> {
        try {
            if (!isTokenValid()) {
            this.routerToMain(); // Redirige al usuario a la página de inicio
            throw new Error('Token vencido');
            }
        
            const decodedToken: DecodedToken | null = getDecodedToken();
            let data: Partial<Dashboard_Data>;
            const token: string = returnToken();
            if (decodedToken !== null) {
               data = Object.assign(updateData, {author: decodedToken.name})
            } else {
                throw new Error('token decoded null');
            }
            console.log(`updated whidht id ${id} and data ${ JSON.stringify(data)}`)
            const response: Response = await fetch(`${url}${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            if (response.status === 401) {
                this.routerToMain(); // Redirige si el token es inválido desde el servidor
                throw new Error('No autorizado. Token inválido o vencido');
            }
            if (!response.ok) {
                throw new Error(`Error updating post: ${response.status}`);
            }

            const updatedPost = await response.json();
            console.log('updatedPost.data',updatedPost.map);
            // Actualizar el post localmente
            const index = this.posts.value.findIndex(post => post.id === id);
            if (index !== -1 && updatedPost?.map) {
                this.posts.value.splice(index, 1, { ...this.posts.value[index], ...updatedPost.map });
            }
            

            return updatedPost;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

export default PostService;
