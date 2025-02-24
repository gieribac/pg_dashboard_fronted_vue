<script setup lang="ts">
  import { ref, Ref, onMounted} from 'vue';
  import { getDecodedToken } from '../services/authHelpers';  
  import { EMPTY_ADMIN } from '../components/constantInfo/empty_admin';
  import router from '../router';
  import ChangePass from '../components/adminPop_up/ChangePass.vue';
  import DestroyUser from '../components/adminPop_up/DestroyUser.vue';
  import PatchUpdate from '../components/adminPop_up/PatchUpdate.vue';
  import FormD from '../components/FormD.vue';
  import MenuComponent from '../components/MenuComponent.vue';
  import ManageAuthorizations from '../components/adminPop_up/Authorizations.vue';  
  import MAData from '../interfaces/MAData';
  import AlertPop_up from '../components/AlertPopup.vue';
  import Dashboard_Data from '../interfaces/DashboardData';
  import PostService from '../services/PostService';
  import DecodedToken from '../interfaces/DecodedToken';
  import AdminRegData from '../interfaces/AdminRegData';
  import AdminService from '../services/AdminService';
  import AuthService from '../services/AuthService';
  import TriggerAlertClass from '../class/TriggerAlertClass';
  import AuthorizedService from '../services/AuthorizedService'; 
  
     //service for dashboards in FormD
  const service = new PostService();
  const posts = service.getPosts();
  //service for authorizations
  const serviceMAData = new AuthorizedService;
  let authorizations = ref<MAData[]>([]);
  authorizations = serviceMAData.getAuthoriationsData();
  onMounted(async () => {
    await Promise.all([
      service.fetchAll(),
      serviceMAData.fetchAll()
    ]);
  })
  //service for sendDataAdmin 
  const serviceAdmin = new AdminService;
  //service for sendDataChangePass
  const serviceAdminAuth = new AuthService;
  
  //consts
  const decodedToken: DecodedToken | null = getDecodedToken();
  const destroyUserPopup1: Ref<boolean> = ref(false);
  const patchUpdatePopup1: Ref<boolean> = ref(false);
  const passChangePopup1: Ref<boolean> = ref(false);
  const statusOA: Ref<boolean> = ref(false);
  let otorgarAutorizacion: boolean = false;
  let flag_updateDataView: Ref<boolean> = ref(false);
  let dataAdmin: AdminRegData = EMPTY_ADMIN;
  if (decodedToken !== null) {
    otorgarAutorizacion = decodedToken.main === 1; 
    const {name, no_doc, email, username} = decodedToken;
    dataAdmin = {name: name, no_doc: no_doc, email: email, username: username};
  }

  const dForm: boolean = true;//true is Form1, false is form2
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

  // instancia para montar la alerta
  const triggerAlert = new TriggerAlertClass;

  // Maneja el cierre de la alerta desde el hijo
  const handleClose = () : void => {
    const flag_to_main: boolean = ['clave actualizada', 'cuenta eliminada'].includes(triggerAlert.get_sm());
    console.log(' handleClose ')
    if (flag_to_main) {     
      fRegresar()
    }
    triggerAlert.set_showAlert(ref(false));
  };
  const updateDash = async (data: Dashboard_Data, id: string): Promise<void> => {
    try {
      const service = new PostService();
      const success = await service.updatePost(data, id); 
      triggerAlert.set_showAlert(ref(true));
      if (success) {
        triggerAlert.set_sms(true,'Datos actualizados');
        await updateDataView();
        return
      } else {
        triggerAlert.set_sms(false,'Actualizanción fallida');
      }
    } catch (e) {
      console.log('Error actualizando: ',e);
      triggerAlert.set_sms(false,'Error actualizando');
    }
  }
  const destroyDash = async (id: string): Promise<void> => {
    try {
      const success = await service.deletePost(id); 
      triggerAlert.set_showAlert(ref(true));
      if (success) {
        triggerAlert.set_sms(true,'Dashboard Eliminado');
        await updateDataView();        
        return
      } else {
        triggerAlert.set_sms(false,'Fallido: eliminar');
      }
    } catch (e) {
      console.log('Error al eliminar: ',e);
      triggerAlert.set_sms(false,'Error al eliminar');
    }
  }
  const sendDash = async (data: Dashboard_Data): Promise<void> => {    
    try {
      const success = await service.createPost(data);
      triggerAlert.set_showAlert(ref(true));
      if (success) {
        triggerAlert.set_sms(true,'Dashboard Cargado');
        await updateDataView();
        return
      } else {
        triggerAlert.set_sms(false,'Fallido: Cargar Dashboard');
      }
    } catch (e) {
      triggerAlert.set_sms(false,'Error al Cargar');
      console.log('Error al Cargar Dashboard: ',e);
    }
  }
  const updateDataView = async () : Promise<void> => {    
      flag_updateDataView.value = !flag_updateDataView.value;  
      await service.fetchAll()   
  }
  const sendDataUpdateAdmin = async (data:  Partial<AdminRegData>): Promise<void> => {
    try {
      const success = await serviceAdmin.updateAdmin(data); 
      triggerAlert.set_showAlert(ref(true));   
      if (success) {
        Object.assign(dataAdmin,success.map);
        triggerAlert.set_sms(true,'Datos actualizados');
        return
      } else {
        triggerAlert.set_sms(false,'Fallido: actualizar datos');
      }
    } catch (e) {
      console.log('Error al Cargar datos de Admin: ',e);
      triggerAlert.set_sms(false,'Error al Cargar datos');
    }
  }
  const changeP = async (data: object): Promise<void> => {
    try {
      const success = await serviceAdminAuth.changePass(data);
      triggerAlert.set_showAlert(ref(true));
      if (success) {
        triggerAlert.set_sms(true,'clave actualizada');
      } else {
        triggerAlert.set_sms(false,'error actualizando clave');
      }
    } catch (error) {
      triggerAlert.set_sms(false,'error: clave no actualizada');
    }
  }

  const delAccount = async (data: object): Promise<void> => {
    try {
      const success = await serviceAdminAuth.deleteAdmin(data);
      triggerAlert.set_showAlert(ref(true));
      if (success) {
        triggerAlert.set_sms(true,'cuenta eliminada');
      } else {
        triggerAlert.set_sms(false,'error eliminando cuenta');
      }
    } catch (error) {
      triggerAlert.set_sms(false,'error: cuenta no eliminada');
    }
  }

  const sendAuthorization = async (data: MAData): Promise<void> => {
    try {
      const success = await serviceMAData.regAuthorization(data);
      triggerAlert.set_showAlert(ref(true));
      if (success) {
        triggerAlert.set_sms(true,'autorización cargada');
      } else {
        triggerAlert.set_sms(false,'error cargando autorización');
      }
    } catch (error) {
      triggerAlert.set_sms(false,'error: autorización no cargada');
    }
  }
  
  const removeAuthorization = async (id: number): Promise<void> => {
    try {
      const success = await serviceMAData.deleteAuthorization(id);
      triggerAlert.set_showAlert(ref(true));
      if (success) {
        triggerAlert.set_sms(true,'autorización eliminada');
      } else {
        triggerAlert.set_sms(false,'error eliminando autorización');
      }
    } catch (error) {
      triggerAlert.set_sms(false,'error: autorización no eliminada');
    }
  }

</script>
<template>
  <div class="cont__main">
    <h2 >Carga de dashboards</h2>
    <FormD 
      :flag="dForm"  
      @sendDash="sendDash" 
      :flagWatchData="ref(false)" 
    />
    <h2>Edición de dashboards</h2>
    <FormD
      v-for="(post, index) in posts"
      :key="index"      
      :flag="!dForm"
      :EXISTING_DASHBOARD="ref(post)"
      :flagWatchData="ref(flag_updateDataView)"
      @sendDash="updateDash"
      @deleteDash="destroyDash"
    />
    <ChangePass @flag="fChange" 
      @datacp="changeP"
      v-if="passChangePopup1" 
    />
    <PatchUpdate @flag="fPatch" 
      v-if="patchUpdatePopup1" 
      :EXISTING_ADMIN="ref(dataAdmin)" 
      @sendData="sendDataUpdateAdmin"
    />
    <DestroyUser @flag="fDestroy" @datadestroy="delAccount" v-if="destroyUserPopup1" />
    <ManageAuthorizations 
      v-if="statusOA"
      :AUTHORIZATIONS="ref(authorizations)" 
      @flag="fAutorizar" 
      @dataMA="sendAuthorization" 
      @delMA="removeAuthorization"
    />
    <MenuComponent :adminMain="otorgarAutorizacion" @eRegresar="fRegresar" @eChange="fChange" @ePatch="fPatch" @eDestroy="fDestroy" @eAutorizar="fAutorizar"/>
    <AlertPop_up 
      v-if="triggerAlert.get_showAlert()" 
      :sm="triggerAlert.get_sm()" 
      :smstatus="triggerAlert.get_smstatus()"
      @close="handleClose"
    />

  </div>

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