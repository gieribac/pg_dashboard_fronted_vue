// ../services/PostService.ts
import {ref, Ref} from 'vue';
import Authorization from '../interfaces/AuthorizedData';
const url: string = 'http://127.0.0.1:8000/api/authorized/';
class PostService { //clase de servicio para consumo de api
    private authoriationData: Ref<Authorization[]>
    constructor() {
        // this.authoriationData = ref([]);
        this.authoriationData = ref<Authorization[]>([])
    }

    //getter para post
    getauthoriationData (): Ref<Authorization[]> {
        return this.authoriationData
    }

    //metodos de clase
    //metodo para pedir la informacion al endpoint y disponerla 
    async fetchAll(): Promise<void>{ 
        try {
            
            const response: Response = await fetch (url);
            const json: Authorization[] = await response.json();
            this.authoriationData.value = json;
        } catch (e){
            console.log(e)
        }
    }
}
export default PostService;