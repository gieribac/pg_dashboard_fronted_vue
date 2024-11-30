<!-- 
 0. añadir la opcion de borrar el respectivo dashboard
 1. hay que decidir si utilizar logica de form1 o form2 mediante heredar props
 2. si es form 1 se haran validaciones y envio por metodo post, si es form2 solo se validan campos editados y se envian mediante patch
3. hay que procesar la data que se mostrara en placeholder a los form 2 en el componente padre AdminV para desestructurar el arreglo y usar v-for 
4. pendiente crear reutilizar componente del menu hamburquesa tanto en pagina MainV como en AdminV
 -->

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { ref, Ref, computed, defineProps, defineEmits } from 'vue';;
import Dashboard_Data from '../interfaces/DashboardData';

const prop = defineProps({
    flag: {//true is form for post, false is for patch
        type: Boolean,
        default: false, // Valor predeterminado
    },
});

//consts
const prevDashboard: Ref<Boolean> = ref(true);
const dataEmpty: Dashboard_Data = {
    post: true,
    author: '',
    title: '',
    description: '',
    place: '',
    urlDashboard: ''
}
//reglas para validacion del formulario post
const rulesDashboardData = {
    title: {
        required,  minLength: minLength(3), maxLength: maxLength(30)
    },
    description: {
        required, maxLength: maxLength(2000)
    },
    place: {
        required,  minLength: minLength(3), maxLength: maxLength(30)
    },
    urlDashboard: {
        required, maxLength: maxLength(400)
    }
}
//reglas para validacion del formulario patch

const rulesDashboardData2 = {
    title: {
        minLength: minLength(3), maxLength: maxLength(30)
    },
    description: {
        maxLength: maxLength(2000)
    },
    place: {
        minLength: minLength(3), maxLength: maxLength(30)
    },
    urlDashboard: {
        maxLength: maxLength(400)
    }
}
const isAnyFieldFilled: Ref<Boolean> = computed((): boolean => {
  return !!dashboardDataForm.value.title || 
         !!dashboardDataForm.value.description || 
         !!dashboardDataForm.value.place || 
         !!dashboardDataForm.value.urlDashboard;
});
const objbd2: Dashboard_Data = {
    title: "saved title",
    description: "saved onbservatios",
    place: "saved lugar",
    urlDashboard: "saved url",
    post: true
}
const objbd2String: string = JSON.stringify(objbd2);
let initialData: Dashboard_Data;
prop.flag ? initialData=dataEmpty : initialData = objbd2;
const dashboardDataForm = ref<Dashboard_Data>(initialData);
const v_reg2$ = useVuelidate(rulesDashboardData2, dashboardDataForm);
const v_reg$ = useVuelidate(rulesDashboardData, dashboardDataForm);
const notchanges: Ref<Boolean> = computed(():boolean=>{return JSON.stringify(dashboardDataForm.value)==objbd2String});
const notempty: Ref<Boolean> = computed(():boolean=>{
    let list: boolean[] = [];
    list.push(dashboardDataForm.value.title.length > 2);
    list.push(dashboardDataForm.value.description.length > 2);
    list.push(dashboardDataForm.value.place.length > 2);
    list.push(dashboardDataForm.value.urlDashboard.length > 10);
    const resp: boolean = list.every(elemento => elemento === true);
    return resp;
});

const handleSubmit = (): void => {
    console.clear()
    console.log('dashboardDataForm:', JSON.stringify(dashboardDataForm.value));
    console.log('objbd2:', objbd2String);
    // console.log('anyFieldFilled', isAnyFieldFilled.value);
    dashboardDataForm.value = initialData;
    console.log(notchanges.value);
}

const emit = defineEmits(["prev"]);
const visualizarDashboard = (): void => {
    emit("prev", prevDashboard.value);
}    

const destroyDashboard = (): void =>{}

</script>
<template>
    <div class="container__main">
        <p v-if="prop.flag">Diligenciar todos los campos</p>
        <p v-if="!prop.flag">Actualizar lo necesario</p>
        <div class="main_div form">
            <form class="container__main__s1" @submit.prevent="handleSubmit">
                <div class="form_div">
                    <label for="title" class="form-label">Titulo</label>
                    <input v-if="prop.flag" class="form-control" type="text" name="title" id="title" v-model="dashboardDataForm.title">
                    <input v-if="!prop.flag" class="form-control form__input" type="text" name="title" id="title" v-model="dashboardDataForm.title">
                </div>
                <div class="form_div">
                    <label for="descripcion" class="form-label">Observaciones</label>
                    <textarea  v-if="prop.flag" name="descripcion" class="form-control " id="descripcion" rows="3"
                        v-model="dashboardDataForm.description"></textarea>
                    <textarea v-if="!prop.flag" name="descripcion"  class="form-control form__input " id="descripcion" rows="3"
                    v-model="dashboardDataForm.description"></textarea>
                </div>
                <div class="form_div">
                    <label for="lugar" class="form-label ">Lugar</label>
                    <input v-if="prop.flag" class="form-control " type="text" name="lugar" id="lugar" v-model="dashboardDataForm.place">
                    <input v-if="!prop.flag" class="form-control form__input " type="text" name="lugar" id="lugar" v-model="dashboardDataForm.place">
                </div>
                <div class="form_div">
                    <label for="url" class="form-label">Dashboard (URL)</label>
                    <input  v-if="prop.flag" class="form-control form__input " type="text" name="url" id="url" v-model="dashboardDataForm.urlDashboard">
                    <input  v-if="!prop.flag" class="form-control form__input " type="text" name="url" id="url" v-model="dashboardDataForm.urlDashboard">
                </div>
                <div class="form_div ">
                    <label for="checkbox" class="form-label" name="checkbox">Publicar</label>
                    <div class="form-control--inputcheckbox form-control ">
                        <input v-if="prop.flag" class="inputcheckbox " type="checkbox" id="checkbox" name="checkbox" 
                            v-model="dashboardDataForm.post">
                        <input v-if="!prop.flag" class="inputcheckbox" type="checkbox" id="checkbox" name="checkbox" v-model="dashboardDataForm.post"
                        >
                    </div>
                </div>
                <div class="container-button">
                    <div class="button">
                        <button v-if="prop.flag" type="submit" class="btn btn-primary" :disabled="v_reg$.$invalid">
                            <span class="material-symbols-outlined">upload</span>Cargar
                        </button>
                        <button v-if="!prop.flag" type="submit" class="btn btn-primary" :disabled="!(!v_reg$.$invalid && !!isAnyFieldFilled && !notchanges)">
                            <span class="material-symbols-outlined">upload</span>Cargar
                        </button>
                    </div>
                    <div class="button button--visibilidad" v-if="!prop.flag">
                        <button class=" btn btn-primary ver" type="button" @click="visualizarDashboard">
                            <span class="material-symbols-outlined">visibility</span>Ver
                        </button>
                    </div>
                    <div class="button" v-if="!prop.flag">
                        <button class="btn btn-primary delete" type="button" @click="destroyDashboard">
                            <span class="material-symbols-outlined">delete</span>Eliminar
                        </button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>
<style scoped>
.containter__main  {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;      
}

.container__main .main_div {
    width: 100%;
    margin: auto;
    padding: 10px 0 10px 0;
}

.container__main .main_div .container__main__s1 {
    margin-left: 0;
    margin-right: 0;
}

.container__main .main_div .container__main__s1 .form_div {
    width: 100%;
    height: auto;
    margin: auto;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-direction: column-reverse;

}

.container__main .main_div .container__main__s1 .form_div .form-label,
.form-control {
    width: 100%;
    text-align: left;

}

.container__main .main_div .container__main__s1 .form_div .form-label {
    margin-bottom: 7px
}

.btn {
    background-color: #3066be;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}


.container__main .main_div .container__main__s1 {
  margin-left: 0;
  margin-right: 0;
}


.container__main .main_div .container__main__s1 .form_div .form-label,
.form-control {
  width: 61.81%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.btn {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.container-button{
  width: 61.81%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  
}
.container-button .btn{
    font-size: 14px;
    width: 77.6px;
    height: 48px;
    padding: 0;
    margin: auto 2px;
}

.delete {
    background-color: #3c3744
}
.container__main{
    width: 61.81vw;
    margin: 1em auto;
    background-color: #dbdfe1;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    padding:0;
    border-radius: 15px;
}

.form__input::placeholder {
    color: black;
}

@media (max-width: 768px) {

    .container__main 
    {
        width: 85.5%;
    }
    .container__main .main_div .container__main__s1 .form_div .form-label,
    .form-control {
        width: 85.5%;
    }
    .container-button .btn{
        font-size: 10px;
        width: 63px;
        height: 39px;
        padding: 0;
        margin: auto 2px;
    }
    .container-button .btn span {
        font-size: 18px;
    }
}
</style>