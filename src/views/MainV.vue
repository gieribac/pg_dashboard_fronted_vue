<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { ref, Ref, onMounted } from 'vue';
  import MenuComponent from '../components/MenuComponent.vue';
  import RegPopup from '../components/mainPop_up/RegPopup.vue';
  import LoginPopup from '../components/mainPop_up/LoginPopup.vue';
  import PostService from '../services/PostService';
  import DashboardMain from '../components/DashboardMain.vue';
  import AlertPop_up from '../components/AlertPopup.vue';
  import AdminRegData from '../interfaces/AdminRegData';
  import TriggerAlertClass from '../class/TriggerAlertClass';
  import AdminLoginData from '../interfaces/AdminLoginData';  
  import AuthService from '../services/AuthService';
  import InfoPopup from '../components/mainPop_up/InfoPopup.vue';
  import AdminService from '../services/AdminService';
  const router = useRouter();
  let lg_: AdminLoginData = {username:'', password: ''};
  const handleClose = () => {
    triggerAlert.set_showAlert(ref(false));
    if (triggerAlert.get_sm() === 'Sesión iniciada'){      
      router.push({name:'AdminV'})
    }
  };

    // Función para montar la alerta
  const login= async (datalogin: AdminLoginData) => {
    try {    
      const auth = new AuthService();
      const success = await auth.login(datalogin);
      triggerAlert.set_showAlert(ref(true));
      if (success) {
        triggerAlert.set_sms(true,'Sesión iniciada');
        return
      } else {
        triggerAlert.set_sms(false,'Error en login');
      }
    } catch (e) {
        triggerAlert.set_sms(false,'Login fallido');
    }
  };

  const register = async (rg: AdminRegData) => {
    try {
      const adminService = new AdminService();
      const { registerUser, success } = await adminService.useRegisterService();
      await registerUser(rg);
      triggerAlert.set_showAlert(ref(true));
      if (success.value) {
        triggerAlert.set_sms(true,'Registro exitoso');
      } else {
        triggerAlert.set_sms(false,'Registro fallido');
      }
    } catch (e) {
      console.log(e);
      triggerAlert.set_sms(false,'Registro falló');
    }
  };

  const service = new PostService();
  const posts = service.getPublicPosts();
  onMounted(async () => {
    await service.fetchAllPublics();
    console.log('posts',posts)
  })

  const showRegisterPopup: Ref<boolean> = ref(false);
  const showLoginPopup: Ref<boolean> = ref(false);
  const showInfoPopup: Ref<boolean> = ref(false);
  const triggerAlert = new TriggerAlertClass;
  // Métodos para abrir y cerrar cada pop-up
  const registerPop_up = ():void => {
    showRegisterPopup.value = true;
    showLoginPopup.value = false;
    showInfoPopup.value = false;
  };

  const closeRegisterPop_up = ():void => {
    showRegisterPopup.value = false;
  };

  const loginPop_up = ():void => {
    showLoginPopup.value = true;
    showRegisterPopup.value = false;
    showInfoPopup.value = false;
  };

  const closeLoginPop_up = ():void => {
    showLoginPopup.value = false;
  };
  
  const closed = ():void => {
    showInfoPopup.value = false;
    showLoginPopup.value = false;
    showRegisterPopup.value = false;
  };

  const showInfo = ():void => {
    showInfoPopup.value = !showInfoPopup.value;
    showLoginPopup.value = false;
    showRegisterPopup.value = false;
  };  

</script>

<template>
  <div class="background">
    <MenuComponent @in="loginPop_up" @rg="registerPop_up" @cl="closed" @info="showInfo" :datalogin="lg_" @cs="closed"/>
    <RegPopup @pd="closeRegisterPop_up" @rgd="register" v-if="showRegisterPopup" class="popup"/>
    <LoginPopup @pd="closeLoginPop_up" @lg="login" v-if="showLoginPopup" class="popup"/>
    <DashboardMain
        v-for="(post, index) in posts"
        :key="index"   
        :EXISTING_DASHBOARD="post"
      />
    <AlertPop_up 
      v-if="triggerAlert.get_showAlert()" 
      :sm="triggerAlert.get_sm()" 
      :smstatus="triggerAlert.get_smstatus()"
      @close="handleClose"
    />
    <InfoPopup>
    <div  v-if="showInfoPopup" class="info_popup" >
        <div class="info">
            <p>Este prototipo software permite la visualización de las métricas de cobertura del servicio de radiodifusión digital a través de un aplicativo web.</p>
            <p>Interactúe con el dashboard para ver a detalle las métricas.</p>
            <div class="button__container">
              <button id="acceptinfo" @click="showInfo" class="button accept">Aceptar</button>
            </div>
        </div>
      </div>
    </InfoPopup>
  </div>
</template>

<style scoped>
/* Aplica un fondo a todo el sitio */
.background {
  
  min-height: 100vh; /* Ocupa toda la altura de la pantalla */
  width: 100%;
}

/* Estilos existentes */
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





