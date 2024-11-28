<script setup lang="ts">
import MenuComponent from '../components/MenuComponent.vue';
import regPopup from '../components/mainPop_up/regPopup.vue';
import loginPopup from '../components/mainPop_up/loginPopup.vue';
import { ref, Ref } from 'vue';

const showRegisterPopup: Ref<boolean> = ref(false);
const showLoginPopup: Ref<boolean> = ref(false);

// Métodos para abrir y cerrar cada pop-up
const register = ():void => {
  showRegisterPopup.value = true;
  showLoginPopup.value = false;
};

const closeRegister = (m: Boolean):void => {
  showRegisterPopup.value = false;
};

const login = (m: Boolean):void => {
  showLoginPopup.value = true;
  showRegisterPopup.value = false;
};

const closeLogin = (m: Boolean):void => {
  showLoginPopup.value = false;
};

const closed = (m: Boolean):void => {
  showLoginPopup.value = false;
  showRegisterPopup.value = false;
};

const logOut = (m: Boolean):void => {
  alert("cerrando sesion")
};
const showInfo = (m: Boolean):void => {
  alert("mostranfo información")
};
</script>

<template>
<MenuComponent @in="login" @rg="register" @cl="closed" @cs="logOut" @info="showInfo"/>
<!-- <iframe title="pa" src="https://app.powerbi.com/view?r=eyJrIjoiMDA3YjZlZmYtMmZhNC00Y2NmLTg1ZjktMjAwM2Y4MjNlYzZjIiwidCI6ImZjMDA1NDdhLTI0YmItNGU0Zi05ZDYxLTczZmNhNWViOWRmMyIsImMiOjR9" frameborder="0" allowFullScreen="true">
</iframe> -->
 <!-- Formulario de registro (Pop-up) -->
 <regPopup @pd="closeRegister" v-if="showRegisterPopup" class="popup"/>
         <!-- Formulario de inicio de sesión (Pop-up) -->
  <loginPopup @pd="closeLogin" v-if="showLoginPopup" class="popup"/>
</template>
<style scoped>

iframe {
        height: 90vh;
        width: 100%;      
    };
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
</style>





