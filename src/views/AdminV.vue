<!-- 1. crear poppup para cambiar contraseñam y  para eliminar usuario pidiendo contraseña. 
2. crear componente para cargar mapa con las obciones de actualizar y de eliminar, por defecto el dashboard asociado no es visibles pero se añade una obcion para verlo.
3. en adminv crear obcion de informacon y componente carga de dashbard con su informacion adicional. por defecto el dashboard asociado no es visibles pero se añade una obcion para verlo. 

4. crear logica de componente AdminV, administrador principal puede otorgar permisos y aliminar cualquier cuenta de administrador, administradoy comun solo puede eliminar su propia cuenta.
check_circle
error
-->

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, alpha, minLength, maxLength } from '@vuelidate/validators';
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import Dashboard_Data from '../interfaces/DashboardData';
import ChangePass from '../components/adminPop_up/ChangePass.vue';
import DestroyUser from '../components/adminPop_up/DestroyUser.vue';
import PatchUpdate from '../components/adminPop_up/PatchUpdate.vue';
import PrevDashboard from '../components/adminPop_up/PrevDashboard.vue';
import FormD from '../components/FormD.vue';
import MenuComponent from '../components/MenuComponent.vue';
import ManageAuthorizations from '../components/adminPop_up/ManageAuthorizations.vue';
import AlertPop_up from '../components/AlertPop_up.vue';

//consts
const dataEmpty: Dashboard_Data = {
  post: true,
  author: '',
  title: '',
  description: '',
  place: '',
  urlDashboard: ''
}
// Crear referencia al router
const router = useRouter();

const destroyUserPopup1: Ref<boolean> = ref(false);
const patchUpdatePopup1: Ref<boolean> = ref(false);
const passChangePopup1: Ref<boolean> = ref(false);
const statusOA: Ref<boolean> = ref(false);
const otorgarAutorizacion: Ref<boolean> = ref(true);
let statusPupupAlert: boolean = false;//true: good; false: error

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

const dashboardDataForm = ref<Dashboard_Data>(dataEmpty);
const dForm: boolean = true;//true is Form1, false is form2
// crear el objeto de validación

const v_reg$ = useVuelidate(rulesDashboardData, dashboardDataForm);

const handleSubmit = (): void => {
  console.log('Datos de registro:', JSON.stringify(dashboardDataForm.value));
  dashboardDataForm.value = dataEmpty;
}

  const preview: Ref<Boolean> = ref(false);
  const openPreview  = (m: boolean): void => {
    preview.value = !preview.value;
  }
  const fRegresar = (): void => {
    router.push({ name: 'MainV' });
  }
  const fChange = (): void => {
    passChangePopup1.value = !passChangePopup1.value;
    destroyUserPopup1.value = false;
    patchUpdatePopup1.value = false;
    statusOA.value = false;
  }
  const fPatch = (): void => {
    patchUpdatePopup1.value = !patchUpdatePopup1.value;
    destroyUserPopup1.value = false;
    passChangePopup1.value = false;
    statusOA.value = false;
  }
  const fDestroy = (): void => {
    destroyUserPopup1.value = !destroyUserPopup1.value;
    patchUpdatePopup1.value = false;
    passChangePopup1.value = false;
    statusOA.value = false;
  }
  const fAutorizar = (): void => {
    statusOA.value = !statusOA.value;
    destroyUserPopup1.value = false;
    patchUpdatePopup1.value = false;
    passChangePopup1.value = false;
  }
  const fLogout = (): void => {
    alert('cerrar sesión');
    router.push({ name: 'MainV' });
  }
const showAlert: Ref<boolean> = ref(false);

// Función para montar la alerta
const triggerAlert = (status: boolean):void => {
    showAlert.value = true;
    statusPupupAlert = status;
};
// triggerAlert(false)
// Maneja el cierre de la alerta desde el hijo
const handleClose = () => {
  showAlert.value = false;
  
};

</script>
<template>
  <div class="cont__main">
    <h2 >Carga de dashboards</h2>      
    <FormD :flag="dForm"/>
    <h2>Edición de dashboards</h2>   
    <FormD @prev="openPreview" :flag="!dForm"/>
    <ChangePass @click="fChange" v-if="passChangePopup1" />
    <PatchUpdate @click="fPatch" v-if="patchUpdatePopup1" />
    <DestroyUser @click="fDestroy" v-if="destroyUserPopup1" />
    <ManageAuthorizations @flag="fAutorizar" v-if="statusOA"/>
    <MenuComponent @eRegresar="fRegresar" @eChange="fChange" @ePatch="fPatch" @eDestroy="fDestroy" @eAutorizar="fAutorizar" @eLogout="fLogout" /> 
    <AlertPop_up v-if="showAlert" :gj="statusPupupAlert" @close="handleClose"/>

  </div>
  
  <PrevDashboard @pd="openPreview" v-show="preview"/>
  
</template>
<style scoped>
.cont__main {
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cont__main h2 {
  font-size: 18px;
  background-color: #c9e2f9;
  padding: .5rem 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  margin-top: 1em;
  width: 61.81vw;
  margin: auto;
}

.const__main {
  width: 100vw;
  margin: auto;
  background-color: red;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid red;
}
@media (max-width: 768px) {
  .cont__main h2 {
    width: 85.5%;
  }
} 
</style>