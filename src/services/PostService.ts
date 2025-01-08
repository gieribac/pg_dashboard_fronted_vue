import { ref, Ref } from 'vue';
import Dashboard_Data from '../interfaces/DashboardData';
import { getDecodedToken } from './authHelpers';
import DecodedToken from '../interfaces/DecodedToken';
const url: string = 'http://127.0.0.1:8000/api/maps';

class PostService {
    private posts: Ref<Dashboard_Data[]>;

    constructor() {
        this.posts = ref<Dashboard_Data[]>([]);
    }

    // Getter para posts
    getPosts(): Ref<Dashboard_Data[]> {
        return this.posts;
    }

    // Método para obtener todos los posts
    async fetchAll(): Promise<void> {
        try {
            const response: Response = await fetch(url);
            const json: Dashboard_Data[] = await response.json();
            this.posts.value = json;
        } catch (e) {
            console.error('Error fetching posts: ', e);
        }
    }

    // Método para crear un nuevo post
    async createPost(postData: Partial<Dashboard_Data>): Promise<Dashboard_Data | null> {
        try {
            const decodedToken: DecodedToken | null = getDecodedToken();
            let data: Partial<Dashboard_Data>;
            if (decodedToken !== null) {
               data = Object.assign(postData, {author: decodedToken.name})
            } else {
                throw new Error('token decoded null');
            }
            console.log(JSON.stringify(data));
            const response: Response = await fetch(`${url}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`Error creating post: ${response.status}`);
            }
            const newPost: Dashboard_Data = await response.json();
            this.posts.value.push(newPost); // Agregar el nuevo post a la lista local
            return newPost;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    // Método para eliminar un post
    async deletePost(id: string): Promise<boolean> {
        try {
            const response: Response = await fetch(`${url}/${id}`, {
                method: 'DELETE',
            });

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
            const decodedToken: DecodedToken | null = getDecodedToken();
            let data: Partial<Dashboard_Data>;
            if (decodedToken !== null) {
               data = Object.assign(updateData, {author: decodedToken.name})
            } else {
                throw new Error('token decoded null');
            }
            console.log(`updated whidht id ${id} and data ${ JSON.stringify(data)}`)
            const response: Response = await fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(`Error updating post: ${response.status}`);
            }

            const updatedPost: Dashboard_Data = await response.json();

            // Actualizar el post localmente
            const index = this.posts.value.findIndex(post => post.id === id);
            if (index !== -1) {
                this.posts.value[index] = { ...this.posts.value[index], ...updateData };
            }

            return updatedPost;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

export default PostService;
