<script setup lang='ts'>
import { Ref, ref } from 'vue';
import { required, numeric,  minLength, maxLength, email, alphaNum, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import {EMPTY_ADMIN} from '../constantInfo/empty_admin';
import AdminRegData from '../../interfaces/AdminRegData';
// objetos con las reglas de validación
// Regla personalizada para aceptar letras y espacios
const alphaSpaces = helpers.withMessage(
  'El nombre solo puede contener letras y espacios',
  (value: string) => /^[A-Za-z\s]+$/.test(value)
);

const rulesRegData = {
  name: {
    required, alphaSpaces, minLength: minLength(5), maxLength: maxLength(30)
  },
  no_doc: {
    required, numeric, minLength: minLength(6), maxLength: maxLength(12)
  },
  email: {
    required, email
  },
  username: {
    required, alphaNum, minLength: minLength(3), maxLength: maxLength(16)
  },
  password: {
    required,  minLength: minLength(6), maxLength: maxLength(25)
  }
}
// Formulario reactivo
type ValidatedAdmin = AdminRegData & { password: string };
const registerForm = ref<ValidatedAdmin>(EMPTY_ADMIN);

// crear el objeto de validación
const v_reg$ = useVuelidate(rulesRegData, registerForm);

const submitRegister = ():void => {
  // Manejar el envío del formulario de registro aquí
  // console.log('Datos de registro:', JSON.stringify(registerForm.value));
  emit("rgd", registerForm.value);
  emit("pd",m.value);
};

const emit = defineEmits(["pd","rgd"])
const alClick = ():void => {
    emit("pd", m.value);
}
let m:Ref<Boolean> = ref(false);
</script>

<template>
  <div class="popup">
      <h3>Registro</h3>
      <form @submit.prevent="submitRegister">
        <input id="reg_name" type="text" placeholder="Nombre" v-model="registerForm.name"  />
        <input id="reg_doc" type="text" placeholder="No. documento" v-model="registerForm.no_doc">
        <input id="reg_email" type="email" placeholder="E-mail" v-model="registerForm.email"  />
        <input id="reg_user" type="text" placeholder="Usuario" v-model="registerForm.username"  />
        <input id="reg_pass" type="password" placeholder="Contraseña" v-model="registerForm.password" required />
        <div class="button__container">
          <button id="reg_submit" class="accept" type="submit" :disabled="v_reg$.$invalid" >Aceptar</button>
          <button id="reg_cancel" class="cancel" type="button" @click="alClick">Cancelar</button>
        </div>        
      </form>
    </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fbfff1;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  z-index: 1000;
  width: 20%;
  min-width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.popup:hover {
  background-color: #fbfff1;
}

/* Formulario dentro del popup */
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

/* Contenedor de botones en el popup */
.popup .button__container {
  display: flex;
  flex-direction: row;
}

.popup .button__container button {
  display: flex;
  width: 50%;
  height: 2em;
  margin: 0.3em;
  align-items: center;
  justify-content: center;
}

.popup .button__container .accept {
  background-color: #090c9b;
  color: #fbfff1;
}

.popup .button__container .accept:disabled {
  cursor: not-allowed; 
  opacity: 0.6; 
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

/* Responsividad para botones */
@media (max-width: 1200px) {
  .popup .button__container {
    flex-direction: column;
  }
  
  .popup .button__container button {
    width: 80%;
  }
}
</style>