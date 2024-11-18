// ../services/PostService.ts
import {ref, Ref} from 'vue';
import IPost from '../interfaces/DashboardData';
const url: string = 'http://localhost:8000/api/maps';
class PostService { //clase de servicio para consumo de api
	private posts: Ref<IPost[]>
	constructor() {
        // this.posts = ref([]);
        this.posts = ref<IPost[]>([])
    }

    //getter para post
    getPosts (): Ref<IPost[]> {
        return this.posts
    }

    //metodos de clase
    //metodo para pedir la informacion al endpoint y disponerla 
    async fetchAll(): Promise<void>{ 
        try {
            
            const response: Response = await fetch (url);
            const json: IPost = await response.json();
            this.posts.value = json;
        } catch (e){
            console.log(e)
        }
    }
}
export default PostService;