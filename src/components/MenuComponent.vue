<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric, alpha, minLength, maxLength, email, alphaNum, helpers } from '@vuelidate/validators';
import AdminRegData from '../interfaces/AdminRegData';
import AdminLoginData from '../interfaces/AdminLoginData';
const isOpen = ref(false);
const passwordRegex = helpers.regex(/^[\x21-\x7E]/);

const toggleDropdown =  ():void => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    showRegisterPopup.value = false;
    showLoginPopup.value = false;
  } 
};
//estado para controlar la visibilidad de parrafos del menu
const showParagraph1: Ref<boolean> = ref(false);
const showParagraph2: Ref<boolean> = ref(false);

// Estados para controlar la visibilidad de cada pop-up
const showRegisterPopup: Ref<boolean> = ref(false);
const showLoginPopup: Ref<boolean> = ref(false);

// objetos con las reglas de validación
const rulesRegData = {
  name: {
    required, alpha, minLength: minLength(5), maxLength: maxLength(30)
  },
  no_doc: {
    required, numeric, minLength: minLength(6), maxLength: maxLength(12)
  },
  email: {
    required, email
  },
  username: {
    required, alphaNum, minLength: minLength(3), maxLength: maxLength(10)
  },
  password: {
    required,  minLength: minLength(6), maxLength: maxLength(10)
  }
}

const rulesLoginData = {
  username: {
    required, alphaNum, minLength: minLength(3), maxLength: maxLength(10)
  },
  password: {
    required, passwordRegex, minLength: minLength(6), maxLength: maxLength(10)
  }
}

// Formularios reactivos para cada pop-up
const registerForm = ref<AdminRegData>({ name: '', no_doc: '', email: '', username: '', password: '' });

const loginForm = ref<AdminLoginData>({ username: '', password: '' });

// crear el objeto de validación
const v_reg$ = useVuelidate(rulesRegData, registerForm);
const v_login$ = useVuelidate(rulesLoginData, loginForm);

// Métodos para abrir y cerrar cada pop-up
const register = ():void => {
  showRegisterPopup.value = true;
  showLoginPopup.value = false;
};

const closeRegister = ():void => {
  showRegisterPopup.value = false;
};

const login = ():void => {
  showLoginPopup.value = true;
  showRegisterPopup.value = false;
};

const closeLogin = ():void => {
  showLoginPopup.value = false;
};

// metodos para renderizar letreros de menu
const handleMouseEnter1 = ():void => {
  showParagraph1.value = true;
}

const handleMouseLeave1 = ():void => {
  showParagraph1.value = false;
}

const handleMouseEnter2 = ():void => {
  showParagraph2.value = true;
}

const handleMouseLeave2 = ():void => {
  showParagraph2.value = false;
}

// Métodos de envío
const submitRegister = ():void => {
  // Manejar el envío del formulario de registro aquí
  console.log('Datos de registro:', JSON.stringify(registerForm.value));
  closeRegister();
};

const submitLogin = ():void => {
  // Manejar el envío del formulario de inicio de sesión aquí
  console.log('Datos de inicio de sesión:', JSON.stringify(loginForm.value));
  closeLogin();
};

</script>

<template>
  <div class="dropdown">
    <button class="hamburguesa" @click="toggleDropdown">
      <span class="material-symbols-outlined">
        menu
      </span>
    </button>
    <ul v-if="isOpen" class="dropdown-content">
      <li @click="register">
        <p v-show="showParagraph1">Registrarse</p>
        <div class="li_container" @mouseenter="handleMouseEnter1" @mouseleave="handleMouseLeave1" >
          <span class="material-symbols-outlined">
          app_registration
          </span>
        </div>       
      </li>
      <li @click="login">
        <p v-show="showParagraph2">Ingresar</p>
        <div class="li_container" @mouseenter="handleMouseEnter2" @mouseleave="handleMouseLeave2">
          <span class="material-symbols-outlined">
          login
          </span>
        </div>
      </li>
    </ul>
  </div>
  <!-- Formulario de registro (Pop-up) -->
  <div v-if="showRegisterPopup" class="popup">
      <h3>Registro</h3>
      <form @submit.prevent="submitRegister">
        <input type="text" placeholder="Nombre" v-model="registerForm.name"  />
        <input type="text" id="NoDoc" placeholder="No. documento" v-model="registerForm.no_doc">
        <input type="email" placeholder="Correo" v-model="registerForm.email"  />
        <input type="text" placeholder="Usuario" v-model="registerForm.username"  />
        <input type="password" placeholder="Contraseña" v-model="registerForm.password" required />
        <div class="button__container">
          <button class="accept" type="submit" :disabled="v_reg$.$invalid" >Aceptar</button>
          <button class="cancel" type="button" @click="closeRegister">Cancelar</button>
        </div>        
      </form>
    </div>
    <!-- Formulario de inicio de sesión (Pop-up) -->
    <div v-if="showLoginPopup" class="popup">
      <h3>Iniciar Sesión</h3>
      <form @submit.prevent="submitLogin">
        <input type="text" placeholder="Usuario" v-model="loginForm.username"  />
        <input type="password" placeholder="Contraseña" v-model="loginForm.password" required />
        <div class="button__container">
          <button class="accept" type="submit" :disabled="v_login$.$invalid">Aceptar</button>
          <button class="cancel" type="button" @click="closeLogin">Cancelar</button>  
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
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width:20%;
  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
      width: 80%;
      margin: 0.5em;
    }
    .button__container {
      display: flex;
      flex-direction: row;
      button {
        display: flex;
        width: 50%;
        height: 2em;
        margin: 0.3em;        
        align-items: center;
        justify-content: center;
      }
      .accept{
        background-color: #090c9b;
        color: #fbfff1;
        &:hover {
        background-color: #3066be;
        }
      }
      .cancel{
        background-color: #3c3744;
        color: #fbfff1;
        &:hover {
        background-color: #3066be;
        }
      }
    }  
    @media (max-width: 1200px) { 
    .button__container  {
      flex-direction: column;
      button {
        width: 80%;
      }
    }
    } 
  }  
}

.dropdown {
  position: fixed;
  top: 10px;
  right: 10px;
  display: inline-block;
  z-index: 500;
  
}

button {
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;  
}
button[disabled] {
  background-color: gray;
  cursor: not-allowed;
  opacity: 0.5;
}
.dropdown-content {
  display: none;
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  right: 0px;
  top: 37px;  
  
} .material-symbols-outlined{
  background-color: unset;
}

.li_container {
  color: white;
  text-decoration: none;
  display: block;
  cursor: pointer;
  border-radius: 50%;
  background-color: #3066be;
  height: 50px;
  width: 50px; 
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  position: relative;
  &:hover {
    background-color: #090c9b;
  }
}

ul {  
  list-style: none;
  padding: 0;
  span {
  position: relative;
  top: 12px;
  right: 0px; 
  } 
  li {
    display: flex;
    flex-direction: row;  
    height: 53px;    
    float: right;
    p {
      padding-right: 7px;
      text-align: right;
      width: 110px;       
      text-shadow: 1px 1px 3px rgb(255, 255, 255), -1px -1px 3px rgb(255, 255, 255); 
    }
  }
} 

.dropdown-content {
  display: block ;
}
button:focus {
  outline: none;
}

.hamburguesa {
  background-color: #3066be;
  border-radius: 50%;
  height: 50px;
  width: 50px;  
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  > span {
    position: relative;
    left: -7px;
    top: 1px;
  }
  &:hover{
    background-color: #090c9b;
  }
}
.popup:hover{
    background-color: #fbfff1;
    
}
</style>
