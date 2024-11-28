<!-- 
 0. añadir la opcion de borrar el respectivo dashboard
 1. hay que decidir si utilizar logica de form1 o form2 mediante heredar props
 2. si es form 1 se haran validaciones y envio por metodo post, si es form2 solo se validan campos editados y se envian mediante patch
3. hay que procesar la data que se mostrara en placeholder a los form 2 en el componente padre AdminV para desestructurar el arreglo y usar v-for 
4. pendiente crear reutilizar componente del menu hamburquesa tanto en pagina MainV como en AdminV
 -->

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, alpha, minLength, maxLength } from '@vuelidate/validators';
import { ref, Ref, defineProps, defineEmits } from 'vue';;
import Dashboard_Data from '../interfaces/DashboardData';
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

const rulesDashboardData = {
    title: {
        required, alpha, minLength: minLength(5), maxLength: maxLength(20)
    },
    description: {
        required, maxLength: maxLength(2000)
    },
    place: {
        required, alpha, minLength: minLength(5), maxLength: maxLength(20)
    },
    urlDashboard: {
        required, maxLength: maxLength(400)
    }
}

const dashboardDataForm = ref<Dashboard_Data>(dataEmpty)
// crear el objeto de validación

const v_reg$ = useVuelidate(rulesDashboardData, dashboardDataForm);

const handleSubmit = (): void => {
    console.log('Datos de registro:', JSON.stringify(dashboardDataForm.value));
    dashboardDataForm.value = dataEmpty;
}


const props = defineProps({
    flag: {
        type: Boolean,
        default: false, // Valor predeterminado
    },
});

const emit = defineEmits(["prev"]);
const visualizarDashboard = (): void => {
    emit("prev", prevDashboard.value);
    
}    

const destroyDashboard = (): void =>{}

</script>
<template>
    <div class="container__main">
        <p v-show="flag">Diligenciar todos los campos</p>
        <p v-show="!flag">Actualizar lo necesario</p>
        <div class="main_div form">
            <form class="container__main__s1" @submit.prevent="handleSubmit">
                <div class="form_div">
                    <label for="title" class="form-label">Titulo</label>
                    <input class="form-control" type="text" name="" id="title" v-model="dashboardDataForm.title">
                </div>
                <div class="form_div">
                    <label for="descripcion" class="form-label">Observaciones</label>
                    <textarea class="form-control" id="descripcion" rows="3"
                        v-model="dashboardDataForm.description"></textarea>
                </div>
                <div class="form_div">
                    <label for="lugar" class="form-label">Lugar</label>
                    <input class="form-control" type="text" name="" id="lugar" v-model="dashboardDataForm.place">
                </div>
                <div class="form_div">
                    <label for="url" class="form-label">Dashboard (URL)</label>
                    <input class="form-control" type="text" name="" id="url" v-model="dashboardDataForm.urlDashboard">
                </div>
                <div class="form_div ">
                    <label for="checkbox" class="form-label" name="checkbox">Publicar</label>
                    <div class="form-control--inputcheckbox form-control">
                        <input class="inputcheckbox" type="checkbox" id="checkbox" name="checkbox" checked="true"
                            v-model="dashboardDataForm.post">
                    </div>

                </div>
                <div class="container-button">
                    <div class="button">
                        <button type="submit" class="btn btn-primary">
                            <span class="material-symbols-outlined">upload</span>Cargar
                        </button>
                    </div>
                    <div class="button button--visibilidad" v-show="!flag">
                        <button class=" btn btn-primary ver" type="button" @click="visualizarDashboard">
                            <span class="material-symbols-outlined">visibility</span>Ver
                        </button>
                    </div>
                    <div class="button" v-show="!flag">
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