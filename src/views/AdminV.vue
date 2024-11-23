<!-- 1. crear poppup para cambiar contraseñam y  para eliminar usuario pidiendo contraseña.
2. crear componente para cargar mapa con las obciones de actualizar y de eliminar, por defecto el dashboard asociado no es visibles pero se añade una obcion para verlo.
3. en mainv crear obcion de informacon y componente carga de dashbard con su informacion adicional. por defecto el dashboard asociado no es visibles pero se añade una obcion para verlo. -->

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, alpha, minLength, maxLength } from '@vuelidate/validators';
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import Dashboard_Data from '../interfaces/DashboardData';
import ChangePass from '../components/adminPop_up/ChangePass.vue';
import DestroyUser from '../components/adminPop_up/DestroyUser.vue';
import QueryResult from '../components/QueryResult.vue';
import PatchUpdate from '../components/adminPop_up/PatchUpdate.vue';
import FormD from '../components/FormD.vue';

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

const ver: Ref<boolean> = ref(true);
const destroyUserPopup1: Ref<boolean> = ref(false);
const patchUpdatePopup1: Ref<boolean> = ref(false);
const passChangePopup1: Ref<boolean> = ref(false);
const otorgarAutorizacion: Ref<boolean> = ref(true);

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

const eliminarUsuario = (): void => {
  // Lógica para eliminar el usuario
  router.push({ name: 'MainV' });
}

const cerrarSesion = (): void => {
  // Lógica para cerrar sesión
  router.push({ name: 'MainV' });
}

const open_destroyUserPop_up = (): void => {
  destroyUserPopup1.value = true;
  patchUpdatePopup1.value = false;
  passChangePopup1.value = false;
}

const open_passChangePop_up = (): void => {
  passChangePopup1.value = true;
  destroyUserPopup1.value = false;
  patchUpdatePopup1.value = false;
}

const open_patchUpdatePop_up = (): void => {
  patchUpdatePopup1.value = true;
  destroyUserPopup1.value = false;
  passChangePopup1.value = false;
}

const close_destroyUserPop_up = (destroyUserPopup: Boolean) => {
  if (destroyUserPopup) {
    destroyUserPopup1.value = false;
  }
}

const close_passChangePop_up = (passChangePopup: Boolean) => {
  if (passChangePopup) {
    passChangePopup1.value = false;
  }
}

const close_patchUpdatePop_up = (patchUpdatePopup: Boolean) => {
  if (patchUpdatePopup) {
    patchUpdatePopup1.value = false;
  }
}

const m_open = (): void => {
  ver.value = !ver.value;
}
const m_close = (): void => {
  ver.value = true;
}
</script>
<template>
  <div class="container__main">

    <h2 >Carga de dashboards</h2>
    <div class="containter__main--containerform">
      <p>Diligenciar todos los campos</p>
      <FormD />
      <div class="button container__main--ao">
        <button type="submit" class="btn btn-primary" :disabled="v_reg$.$invalid">
          <span class="material-symbols-outlined">upload
          </span>Cargar
        </button>
      </div>
    </div>

    <h2>Edición de dashboards</h2>
    <div class="containter__main--containerform">
      <p>Actualizar lo necesario</p>

      <FormD/>
      <div class="container-button">
        <div class="button">
                    <button type="submit" class="btn btn-primary">
                        <span class="material-symbols-outlined">upload</span>Cargar
                    </button>
                </div>
      <div class="button button--visibilidad" v-show="visibilidad">
        <button class=" btn btn-primary" type="button" @click="visualizarDashboard">
          <span class="material-symbols-outlined">visibility</span>Ver
        </button>
      </div>
      <div class="button button--visibilidad" v-show="!visibilidad">
        <button class="btn btn-primary button--ocultar" type="button" @click="visualizarDashboard">
          <span class="material-symbols-outlined">visibility_off</span>Ocultar
        </button>
      </div>      
      </div>
    </div>
    <ChangePass @click="close_passChangePop_up" v-if="passChangePopup1" />
    <PatchUpdate @click="close_patchUpdatePop_up" v-if="patchUpdatePopup1" />
    <DestroyUser @click="close_destroyUserPop_up" v-if="destroyUserPopup1" />
  </div>

</template>
<style>
.containter__main {
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.container__main h2, .containter__main--containerform{
  width: 61.81%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15px;
  background-color: #dbdfe1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  padding: 5px 0;
}

.container__main h2 {
  font-size: 18px;
  background-color: #c9e2f9;
  padding: .5rem 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  margin-top: 1em;
}

.container__main .container__main__s1 {
  margin-left: 0;
  margin-right: 0;
}

.container-button{
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
}

.container__main .container__main__s1 .form_div .form-label,
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
@media (max-width: 768px) {
  .container__main h2, .containter__main--containerform {
    width: 85.5%;
  }
}
</style>