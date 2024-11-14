<script setup lang="ts">

import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { defineEmits, ref, Ref} from 'vue';

const destroyUserPopup: Ref<boolean> = ref(false);

interface passChangeData { 
    pass1: string;
    pass2: string;
}

const rulespassChangeDataData = {
    pass1: {
        required,  minLength: minLength(6), maxLength: maxLength(10)
    },
    pass2: {
        required,  minLength: minLength(6), maxLength: maxLength(10)
    }
}

const passChangeDataForm = ref<passChangeData>({
        pass1: '',
        pass2: ''
})

// crear el objeto de validación

const v_passChange$ = useVuelidate(rulespassChangeDataData,  passChangeDataForm);

//metodos 
//emit
const emit = defineEmits(["flag"])
const close_passChangePop_up = ():void => {
      emit("flag",destroyUserPopup.value)
}

const submitPassChange = ():void => {
    console.log('Datos de registro:', JSON.stringify(passChangeDataForm.value));
}

</script>

<template>
     <!-- Formulario de cambio de contraseña (Pop-up) -->
     <!-- <div class="popup">
      <h3>Eliminar usuario actual</h3>
      <form @submit.prevent="submitPassChange">
        <input type="password" placeholder="Contraseña" v-model="passChangeDataForm.pass1"  />
        <input type="password" placeholder="Confirmar contraseña" v-model="passChangeDataForm.pass2" required />
        <div class="button__container">
          <button class="accept" type="submit" :disabled="v_passChange$.$invalid">Aceptar</button>
          <button class="cancel" type="button" @click="close_passChangePop_up">Cancelar</button>  
        </div>        
      </form>
    </div> -->
    <div class="popup">
      <h3 class="popup__son son--h3">Eliminar usuario actual</h3>
      <form class="popup__son son--form" @submit.prevent="submitPassChange">
        <input type="son--form__son son--form--password" placeholder="Contraseña" v-model="passChangeDataForm.pass1"  />
        <input type="son--form__son son--form--password" placeholder="Confirmar contraseña" v-model="passChangeDataForm.pass2" required />
        <div class="son--form__son son--form__son--button_container">
          <button class="accept" type="submit" :disabled="v_passChange$.$invalid">Aceptar</button>
          <button class="cancel" type="button" @click="close_passChangePop_up">Cancelar</button>  
        </div>        
      </form>
    </div>
</template>
<style>
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
</style>