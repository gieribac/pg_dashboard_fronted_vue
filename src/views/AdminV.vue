<!-- 1. crear poppup para cambiar contraseñam y  para eliminar usuario pidiendo contraseña.
2. crear componente para cargar mapa con las obciones de actualizar y de eliminar, por defecto el dashboard asociado no es visibles pero se añade una obcion para verlo.
3. en mainv crear obcion de informacon y componente carga de dashbard con su informacion adicional. por defecto el dashboard asociado no es visibles pero se añade una obcion para verlo. -->

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, alpha, minLength, maxLength } from '@vuelidate/validators';
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import ChangePass from '../components/adminPop_up/ChangePass.vue';
import DestroyUser from '../components/adminPop_up/DestroyUser.vue';
import QueryResult from '../components/QueryResult.vue';

// Crear referencia al router
const router = useRouter();

const destroyUserPopup1: Ref<boolean> = ref(false);
const passChangePopup1: Ref<boolean> = ref(false);

interface dashboardData {
  name: string;
  description: string;
  place: string;
  dashboard: string;
  post: boolean;
}

const rulesDashboardData = {
  name: {
    required, alpha, minLength: minLength(5), maxLength: maxLength(20)
  },
  description: {
    required, maxLength: maxLength(2000)
  },
  place: {
    required, alpha, minLength: minLength(5), maxLength: maxLength(20)
  },
  dashboard: {
    required, maxLength: maxLength(300)
  }
}

const dashboardDataForm = ref<dashboardData>({
  name: '',
  description: '',
  place: '',
  dashboard: '',
  post: true
})
// crear el objeto de validación

const v_reg$ = useVuelidate(rulesDashboardData, dashboardDataForm);

const handleSubmit = (): void => {
  console.log('Datos de registro:', JSON.stringify(dashboardDataForm.value));
  dashboardDataForm.value = {
    name: '',
    description: '',
    place: '',
    dashboard: '',
    post: true
  }
}


const eliminarUsuario = (): void => {
  // Lógica para eliminar el usuario
  router.push({ name: 'MainV' });
}

const cerrarSesion = (): void => {
  // Lógica para cerrar sesión
  router.push({ name: 'MainV' });
}

const close_passChangePop_up = (passChangePopup: Boolean) => {
  if (passChangePopup) {
    passChangePopup1.value = false;
    destroyUserPopup1.value = false;
  }
}

const open_passChangePop_up = (): void => {
  passChangePopup1.value = true;
}

const close_destroyUserPop_up = (destroyUserPopup: Boolean) => {
  if (destroyUserPopup) {
    destroyUserPopup1.value = false;
    passChangePopup1.value = false;
  }
}

const open_destroyUserPop_up = (): void => {
  destroyUserPopup1.value = true;
}
</script>
<template>
  <nav class="main_div head">
    <ul class="main_div_ul">
      <li>
        <h1>Administrador</h1>
      </li>
      <li class="li_">
        <RouterLink class="li" :to="{ name: 'MainV' }">
          <p>Regresar</p>
        </RouterLink>
      </li>
      <li class="li_" @click="open_passChangePop_up">
        <p>Cambiar contraseña</p>
      </li>
      <li class="li_" @click="open_destroyUserPop_up">
        <p>Eliminar Usuario</p>
      </li>
      <li class="li_" @click="cerrarSesion">
        <p>Cerrar Sesión</p>
      </li>
    </ul>
  </nav>
  <h2>Carga de dashboards de Power BI</h2>
  <div class="main_div form">
    
    <form @submit.prevent="handleSubmit">
      <div class="form_div checkbox">
        <label for="checkbox" class="form-label">Publicar</label>
        <input class="form-control" type="checkbox" id="checkbox" checked="true" v-model="dashboardDataForm.post">
      </div>
      <div class="form_div">
        <label for="nombre" class="form-label">Nombre</label>
        <textarea rows="1" type="text" class="form-control" id="nombre" v-model="dashboardDataForm.name">
            </textarea>
      </div>
      <div class="form_div">
        <label for="descripcion" class="form-label">Descripción</label>
        <textarea class="form-control" id="descripcion" rows="1" v-model="dashboardDataForm.description"></textarea>
      </div>
      <div class="form_div">
        <label for="lugar" class="form-label">Lugar</label>
        <textarea rows="1" type="text" class="form-control" id="lugar" v-model="dashboardDataForm.place"></textarea>
      </div>
      <div class="form_div">
        <label for="lugar" class="form-label">Dashboard (URL)</label>
        <textarea rows="1" type="text" class="form-control" id="lugar" v-model="dashboardDataForm.dashboard"></textarea>
      </div>
      <div class="button">
        <button type="submit" class="btn btn-primary" :disabled="v_reg$.$invalid">
          <span class="material-symbols-outlined">upload
          </span>Cargar
        </button>
      </div>
    </form>
  </div>
  <ChangePass @click="close_passChangePop_up" v-if="passChangePopup1" />
  <DestroyUser @click="close_destroyUserPop_up" v-if="destroyUserPopup1" />
  <QueryResult />
</template>
<style>

h2{
  font-size: 18px;
  background-color: #c9e2f9;
  padding: .5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  margin-top: 1em;
}
ul li {
  text-align: right;
  list-style: none;
}

.li_ {
  text-decoration: none;
  display: block;
  cursor: pointer;
  position: relative;
  margin: 0;
  &:hover {
    font-weight: bold;
  }
  a {
    all: unset;
  }
  p {
    line-height: 0.3;
  }
}

.main_div {
  background-color: #e9ecef;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 15px;
  margin-bottom: 1em;
}

.nav-link {
  color: black;
  text-decoration: none;
  margin: 3rem 1rem;
  padding: 3rem 1rem;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: #dbdfe1;
}

.form {
  align-items: center;
  background-color: #c9e2f9;
  height: 60px;
  padding-top: 4px;
  form {
    height: auto;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;    
  }
}

.form-control:focus {
  border-color: #86b7fe;
  box-shadow: none;
}

.form_div {
  width: 180px;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
  text-align: left;

  .form-control {
    border-radius: 5px;
    border: 1px solid #ced4da;
    padding: 0.5rem;
    min-width: 170px;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0 2px;
  }

  label {
    text-align: left;
    margin-bottom: 0.2em;
    margin: 0 2px;
    display: inline-block;
    align-self: flex-start
  }
}

.checkbox {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  text-align: left;
  margin-left: 0;
  padding-left: 0;
  align-items: flex-start;
  width: 90px;
  #checkbox {
    display: flex;
    position: relative;
    bottom: 7px;
    right: 77px;
  }
}
.button {
  
  display: flex;
  flex-direction: column;
  padding-left: 0;
  button {
    display: flex;
    flex-direction: column;
    width: 80px;
    height: 56px;
  }
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

.head {
  height: 140px;
  padding: 10px;  
}
h1 {
  font-size: 22px;
  color: #3066be;
}
@media (max-width: 1130px) {
    .form {
        form {
            display: flex;
            flex-direction: column;

            /* >* {
                margin: 0 2px;
            } */
        }
    }

    .main_div {
        padding-left: 0;
        padding-right: 0;
    }

    .form_div {
        width: auto;

        .form-control {
            border-radius: 3px;
            padding: 0.1rem;
            min-width: 90px;
            margin: 0;
        }
    }

    * {
        font-size: 11px;
    }
    .checkbox {
        width: 10px;

        #checkbox {
            display: flex;
            position: relative;
            bottom: 5px;
            right: 60px;
        }

        label {
            position: relative;
            right: 37px;
        }
    }
    .button{
      width: 60px;
    }
 }

@media (max-width: 800px) {
    .main_div {
        padding-top: 1em;
        flex-direction: column;
        justify-content: start;
        height: auto;
        padding-bottom: 2px;
    }
    form {
            display: flex;
            flex-direction: column;
        }
    .checkbox{
        #checkbox {
            position: relative;
            bottom: 5px;
            right: 92px;
        }
        label{
            position: relative;
            right: 0
        }
    }
    .form-control{
        width: 200px;
    }
}


</style>