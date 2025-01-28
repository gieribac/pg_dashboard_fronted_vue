<script setup lang='ts'>
//Pop-up Autorizaciones
    import { useVuelidate } from '@vuelidate/core';
    import { ref, Ref, computed} from 'vue';
    import { required, minLength, maxLength, numeric, email } from '@vuelidate/validators';
    import { EMPTY_MASDATA } from '../constantInfo/empty_masdata';
    import MAData from '../../interfaces/MAData';
    
    const props = withDefaults(
        defineProps<{
        AUTHORIZATIONS?: Ref<MAData[]>;
    }>(),
    {
        AUTHORIZATIONS: () => ref<MAData[]>([EMPTY_MASDATA]) as Ref<MAData[]>
    }
    );

    const activeTab = ref<boolean>(false);
    const rulesMADataData = {
        no_doc: {
            required, numeric, minLength: minLength(6), maxLength: maxLength(12)
        },
        email: {
            required, email
        }
    }

    const DataForm = ref<MAData>({
        no_doc: '',
        email: ''
    })

    // crear el objeto de validación
    const v_passChange$ = useVuelidate(rulesMADataData, DataForm);

    //metodos 
    //emit
    const emit = defineEmits(["flag","dataMA","delMA"])
    const close_MAPop_up = (): void => {
        emit("flag", true)
    }

    const submitManageA = (): void => {
        console.log('Datos de registro:', JSON.stringify(DataForm.value));
        activeTab.value =  !activeTab.value;
        emit("dataMA",DataForm.value);
        
    }
    const submitDestroyA = (id_?:  number ): void => { 
        if (id_){
            emit("delMA",id_)
            console.log('submitDestroyA', id_); 
        }                    
    }

    const formatDate = (originalDate: string): string => {
        const cleanedDate: string = originalDate.replace(/\.\d+Z$/, "Z");
        const dateObject: Date = new Date(cleanedDate);
        return `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`;
    };
  
    const AUTHORIZATIONS = computed(() => {
        return (props.AUTHORIZATIONS.value || []).map((authorization) => {
            return {
            ...authorization, // Copia el objeto original
            created_at: typeof authorization.created_at === "string" 
                ? formatDate(authorization.created_at) 
                : ""         
            };
        });
    });
 
</script>

<template>
    <div class="overlay">
        <div class="popup"> 
    <!-- Contenedor de pestañas -->
    <div class="popup__tabs">
        <div class="popup__tab" :class="{active: !activeTab}" @click="activeTab=!activeTab">Autorizar</div>
        <div class="popup__tab" :class="{active: activeTab}" @click="activeTab=!activeTab" >Autorizaciones</div>
    </div>

    <!-- Pestaña 1 -->
    <form class="popup__pest form form-aut" v-show="!activeTab" @submit.prevent="submitManageA">
        <input type="text" placeholder="No. documento" v-model="DataForm.no_doc" />
        <input type="email" placeholder="E-mail" v-model="DataForm.email" required />
        <div class="button__container">
        <button class="accept" type="submit" :disabled="v_passChange$.$invalid" >Aceptar</button>
        
        </div>
    </form>

    <!-- Pestaña 2 -->
    <div class="popup__pest container-control-registro"  v-show="activeTab">
        <div class="control-registro">
        <div class="registros">
            <div class="registro" v-for="(authorization, id) in AUTHORIZATIONS" :key="id">
                <p><strong>No. doc: </strong></p>
                <p>{{authorization.no_doc}}</p>
                <details>
                    <p><strong>Email: </strong></p>
                    <p>{{authorization.email}}</p>
                    <p><strong>Fecha creado: </strong></p>
                    <p>{{authorization.created_at}}</p>
                </details>
                <span class="destroy-authorization material-symbols-outlined" 
                    @click="submitDestroyA(authorization.id)">
                    delete
                </span>
            </div>
        </div>
        </div>
    </div>
    <div class="button__container">
    <button class="cancel" type="button" @click="close_MAPop_up">Cancelar</button></div>
    </div>
</div>
</template>

<style scoped>

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .popup__tabs {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border-bottom: 2px solid #ddd;
    }

    .popup__tab {
    flex: 1;
    text-align: center;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    border-bottom: 2px solid transparent;
    transition: all 0.3s;
    }

    .popup__tab.active {
    border-bottom: 2px solid #090c9b;
    color: #090c9b;
    }

    .popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fbfff1;
        padding: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        z-index: 1000;
        width: 40%;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 20%;
        min-height: 31%;
        justify-content: center;
    }
    .popup form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .popup form input {
        width: 80%;
        margin: 0.5em;
    }

    .popup .button__container {
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .popup .button__container button {
        display: flex;
        width: 70px;
        height: 2em;
        margin: 0.3em;
        align-items: center;
        justify-content: center;
    }

    .popup .button__container .accept {
        background-color: #090c9b;
        color: #fbfff1;
    }

    .popup .button__container .accept:hover {
        background-color: #3066be;
    }

    .popup .button__container .cancel {
        background-color: #3c3744;
        color: #fbfff1;
    }

    .popup .button__container .cancel:hover {
        background-color: #3066be;
    }

    .container-control-registro {
        width: 100%;
    }

    .container-control-registro span {
        cursor: pointer;
        background-color: #3c3744;
        width: min-content;
        color: white;
        border-radius: 3px;
        font-size: 20px;
        margin: 0;
        padding: 2px;

    }

    .control-registro {
        display: flex;
        flex-direction: column;
    }

    h3 {
        margin: 0.2em;
    }

    .control-registro .registros {
        width: 100%;
        margin: auto;
        justify-content: center;
        display: flex;
        flex-wrap: wrap;
        gap: 2px;
        max-height: 60vh;
        overflow-y: auto;

    }

    .control-registro .registro {
        font-size: 12px;
        border: solid 1px gray;
        border-radius: 5px;
        padding: 0 3px 0 3px;
        height: min-content;
        width: min-content;
        flex-grow: 0;
        box-sizing: border-box;
        text-align: left;
    }

    .control-registro .registro * {
        margin: 3px auto;
        display: block;
    }
    .accept:disabled {
    cursor: not-allowed; 
    opacity: 0.6; 
    }
    @media (max-width: 768px) {
        .popup .button__container {
            flex-direction: column;
        }

        .popup .button__container button {
            width: 30%;
        }
    }
</style>