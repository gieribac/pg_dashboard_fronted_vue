<script setup lang="ts">
  import { ref, Ref, onMounted } from 'vue';
  import MenuComponent from '../components/MenuComponent.vue';
  import RegPopup from '../components/mainPop_up/RegPopup.vue';
  import LoginPopup from '../components/mainPop_up/LoginPopup.vue';
  import PostService from '../services/PostService';
  import DashboardMain from '../components/DashboardMain.vue';
  import AlertPop_up from '../components/AlertPop_up.vue';
  import SMClass from '../class/SMClass';
  import AdminRegData from '../interfaces/AdminRegData';
  import useRegisterService from '../services/RegisterService'
  import AdminLoginData from '../interfaces/AdminLoginData';
  import AuthService from '../services/AuthService';
  import { useRouter } from 'vue-router';
import AdminService from '../services/RegisterService';
  const router = useRouter();
  let lg_: AdminLoginData = {username:'', password: ''};
  let flagLoginToAdminV = false;
  const sm = new SMClass();
  const showAlert: Ref<boolean> = ref(false);
  const handleClose = () => {
    showAlert.value = false;
    if (flagLoginToAdminV){router.push({name:'AdminV'})}
  };

  const triggerAlert = (status_: boolean, message_: string):void => {
    showAlert.value = true;
    sm.status = status_;
    sm.message = message_;
  };

    // Función para montar la alerta
  const login= async (datalogin: AdminLoginData) => {
    try {    
      const auth = new AuthService();
      const success = await auth.login(datalogin);
      showAlert.value = true;
      if (success) {
        flagLoginToAdminV = true;
        triggerAlert(true,'Sesión iniciada');
        return
      } else {
        triggerAlert(false,'Error en login');
      }
    } catch (e) {
        triggerAlert(false,'Login fallido');
    }
  };

  const triggerAlertRg = async (rg: AdminRegData) => {
    try {
      const adminService = new AdminService();
      const { registerUser, success } = await adminService.useRegisterService();
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
      sm.message = 'Registro falló';
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
  const registerPop_up = ():void => {
    showRegisterPopup.value = true;
    showLoginPopup.value = false;
  };

  const closeRegisterPop_up = ():void => {
    showRegisterPopup.value = false;
  };

  const loginPop_up = ():void => {
    showLoginPopup.value = true;
    showRegisterPopup.value = false;
  };

  const closeLoginPop_up = ():void => {
    showLoginPopup.value = false;
  };
  
  const closed = ():void => {
    showLoginPopup.value = false;
    showRegisterPopup.value = false;
  };

  const showInfo = ():void => {
    alert("mostranfo información")
  };
</script>

<template>
  <MenuComponent @in="loginPop_up" @rg="registerPop_up" @cl="closed" @info="showInfo" :datalogin="lg_"/>
  <regPopup @pd="closeRegisterPop_up" @rgd="triggerAlertRg" v-if="showRegisterPopup" class="popup"/>
  <loginPopup @pd="closeLoginPop_up" @lg="login" v-if="showLoginPopup" class="popup"/>
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





