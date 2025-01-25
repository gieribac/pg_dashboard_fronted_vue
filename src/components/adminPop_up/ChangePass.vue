<script setup lang=   "ts">

import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength } from '@vuelidate/validators';
import { ref, Ref, computed} from 'vue';

const passChangePopup: Ref<boolean> = ref(false);

interface passChangeData { 
    pass1: string;
    pass2: string;
    pass22: string;
}

const rulespassChangeDataData = {
    pass1: {
        required,  minLength: minLength(6), maxLength: maxLength(25)
    },
    pass2: {
        required,  minLength: minLength(6), maxLength: maxLength(25)
    },
    pass22: {
        required,  minLength: minLength(6), maxLength: maxLength(25)
    }
}

const passChangeDataForm = ref<passChangeData>({
        pass1: '',
        pass2: '',
        pass22: ''
})

// crear el objeto de validación

const v_passChange$ = useVuelidate(rulespassChangeDataData,  passChangeDataForm);

//metodos 
//emit
const emit = defineEmits(["flag","datacp"])
const close_passChangePop_up = ():void => {
    emit("flag", passChangePopup.value)
}

const auxValidatePass = computed(() => {
  return passChangeDataForm.value.pass2 !== passChangeDataForm.value.pass22;
});
const submitPassChange = ():void => {
    console.log('Datos de registro:', JSON.stringify(passChangeDataForm.value));
    const { pass22, ...copiedObject } = passChangeDataForm.value;
    emit('datacp',copiedObject);
    close_passChangePop_up();
}

</script>

<template>
  <div class="overlay">
 
  
     <!-- Formulario de cambio de contraseña (Pop-up) -->
     <div class="popup">
      <h3>Cambio de Contraseña</h3>
      <form @submit.prevent="submitPassChange">
        <input type="password" placeholder="Contraseña actual" v-model="passChangeDataForm.pass1"  />
        <input type="password" placeholder="Contraseña nueva" v-model="passChangeDataForm.pass2" required />
        <input type="password" placeholder="Confirmar contraseña nueva" v-model="passChangeDataForm.pass22" required />
        <div class="button__container">
          <button class="accept btn" type="submit" :disabled="v_passChange$.$invalid ||auxValidatePass">Aceptar</button>
          <button class="cancel" type="button" @click="close_passChangePop_up">Cancelar</button>  
        </div>        
      </form>
    </div></div>
</template>
<style>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

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
  min-width: 20%;
}

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
.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
@media (max-width: 1200px) {
  .popup .button__container {
    flex-direction: column;
  }

  .popup .button__container button {
    width: 80%;
  }
}

</style>