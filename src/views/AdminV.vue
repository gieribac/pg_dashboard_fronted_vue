<script setup lang="ts">
  import { ref, Ref, onMounted } from 'vue';
  import router from '../router';
  import ChangePass from '../components/adminPop_up/ChangePass.vue';
  import DestroyUser from '../components/adminPop_up/DestroyUser.vue';
  import PatchUpdate from '../components/adminPop_up/PatchUpdate.vue';
  import FormD from '../components/FormD.vue';
  import MenuComponent from '../components/MenuComponent.vue';
  import ManageAuthorizations from '../components/adminPop_up/ManageAuthorizations.vue';
  import AlertPop_up from '../components/AlertPop_up.vue';
  import SMClass from '../class/SMClass';
  import PostService from '../services/PostService';
  const service = new PostService();
  const posts = service.getPosts();
  onMounted(async () => {
    await service.fetchAll();
  })
  //consts
  const destroyUserPopup1: Ref<boolean> = ref(false);
  const patchUpdatePopup1: Ref<boolean> = ref(false);
  const passChangePopup1: Ref<boolean> = ref(false);
  const statusOA: Ref<boolean> = ref(false);
  const otorgarAutorizacion: boolean = true;
  const sm = new SMClass();

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
  const showAlert: Ref<boolean> = ref(false);

  // // Función para montar la alerta
  const triggerAlert = (status_: boolean, message_: string):void => {
    showAlert.value = true;
    sm.status = status_;
    sm.message = message_;
  };
  // Maneja el cierre de la alerta desde el hijo
  const handleClose = () => {
    showAlert.value = false;
  };

</script>
<template>
  <div class="cont__main">
    <h2 >Carga de dashboards</h2>
    <FormD :flag="dForm" />
    <h2>Edición de dashboards</h2>
    <FormD
      v-for="(post, index) in posts"
      :key="index"      
      :flag="!dForm"
      :EXISTING_DASHBOARD="post"
    />
    <ChangePass @click="fChange" v-if="passChangePopup1" />
    <PatchUpdate @click="fPatch" v-if="patchUpdatePopup1" />
    <DestroyUser @click="fDestroy" v-if="destroyUserPopup1" />
    <ManageAuthorizations @flag="fAutorizar" v-if="statusOA"/>
    <MenuComponent :adminMain="otorgarAutorizacion" @eRegresar="fRegresar" @eChange="fChange" @ePatch="fPatch" @eDestroy="fDestroy" @eAutorizar="fAutorizar"/>
    <AlertPop_up v-if="showAlert" :shortMessage="sm"  @close="handleClose"/>

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