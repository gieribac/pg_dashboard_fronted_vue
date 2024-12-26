<script setup lang="ts">
import { ref, Ref, onMounted } from 'vue';
import MenuComponent from '../components/MenuComponent.vue';
import regPopup from '../components/mainPop_up/regPopup.vue';
import loginPopup from '../components/mainPop_up/loginPopup.vue';
import PostService from '../services/PostService';
import DashboardMain from '../components/DashboardMain.vue';
import AlertPop_up from '../components/AlertPop_up.vue';
import SMClass from '../class/SMClass';
import AuthService from '../services/AuthService';
import AdminLoginData from '../interfaces/AdminLoginData';
import AdminRegData from '../interfaces/AdminRegData';
import useRegisterService from '../services/RegisterService'

const sm = new SMClass();
const showAlert: Ref<boolean> = ref(false);
const handleClose = () => {
  showAlert.value = false;
};

// Función para montar la alerta
const triggerAlertlogin = async (lg: AdminLoginData) => {
  try {
    const auth = new AuthService();
    const success = await auth.login(lg);
    showAlert.value = true;
    sm.status = success;
    console.log(success)
    if (success) {
      sm.message = 'Sesión iniciada';
    } else {
      sm.message = 'Error en login';
    }
  } catch (e) {
      sm.message = 'Error en login';
  }
};

const triggerAlertRg = async (rg: AdminRegData) => {
  try {
    const { registerUser, success } = useRegisterService();
    await registerUser(rg);
    showAlert.value = true;
    sm.status = success.value;
    if (success.value) {
      sm.message = 'Registro exitoso';
    } else {
      sm.message = 'Registro fallido';
    }
  } catch (e) {
    console.log(e);
    sm.message = 'Registro fallido';
  }
};

const service = new PostService();
const posts = service.getPosts();
onMounted(async () => {
  await service.fetchAll();

})

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
  <regPopup @pd="closeRegister" @rgd="triggerAlertRg" v-if="showRegisterPopup" class="popup"/>
  <loginPopup @pd="closeLogin" @lg="triggerAlertlogin" v-if="showLoginPopup" class="popup"/>
  <DashboardMain
      v-for="(post, index) in posts"
      :key="index"   
      :EXISTING_DASHBOARD="post"
    />
  <AlertPop_up v-if="showAlert" :shortMessage="sm"  @close="handleClose"/>

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
</style>





