<script setup lang='ts'>
import { ref, Ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength,  alphaNum } from '@vuelidate/validators';
import AdminLoginData from '../../interfaces/AdminLoginData';
const rulesLoginData = {
  username: {
    required, alphaNum, minLength: minLength(3), maxLength: maxLength(16)
  },
  password: {
    required,  minLength: minLength(6), maxLength: maxLength(25)
  }
}
// Formulario reactivo
const loginForm = ref<AdminLoginData>({ username: '', password: '' });

// crear el objeto de validación
 const v_login$ = useVuelidate(rulesLoginData, loginForm);
// Métodos de envío

const submitLogin = () :void => {
  console.log('submitLogin')
  emit("pd", m);
  emit("lg", loginForm.value);
};

const emit = defineEmits(["pd","lg"])
const alClick = ():void => {
  emit("pd", m);
}
let m:Ref<Boolean> = ref(false);
</script>

<template>
  <div class="popup">
      <h3>Iniciar Sesión</h3>
      <form @submit.prevent="submitLogin">
        <input type="text" placeholder="Username" v-model="loginForm.username"  />
        <input type="password" placeholder="Contraseña" v-model="loginForm.password" required />
        <div class="button__container">
          <button class="accept" type="submit" :disabled="v_login$.$invalid">Aceptar</button>
          <button class="cancel" type="button" @click="alClick">Cancelar</button>  
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