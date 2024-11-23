// ../services/PostService.ts
import {ref, Ref} from 'vue';
import Dashboard_Data from '../interfaces/DashboardData';
const url: string = 'http://localhost:8000/api/maps';
class PostService { //clase de servicio para consumo de api
	private posts: Ref<Dashboard_Data[]>
	constructor() {
        // this.posts = ref([]);
        this.posts = ref<Dashboard_Data[]>([])
    }

    //getter para post
    getPosts (): Ref<Dashboard_Data[]> {
        return this.posts
    }

    //metodos de clase
    //metodo para pedir la informacion al endpoint y disponerla 
    async fetchAll(): Promise<void>{ 
        try {
            
            const response: Response = await fetch (url);
            const json: Dashboard_Data[] = await response.json();
            this.posts.value = json;
        } catch (e){
            console.log(e)
        }
    }
}
export default PostService;