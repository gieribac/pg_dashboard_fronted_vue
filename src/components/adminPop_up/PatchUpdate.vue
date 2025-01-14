
<script setup lang="ts">
//componente para actualizar datos del usuario actual
    import { ref, Ref} from 'vue';
    import { useVuelidate } from '@vuelidate/core';
    import { required, numeric, alpha, minLength, maxLength, email, alphaNum } from '@vuelidate/validators';
    import AdminRegData from '../../interfaces/AdminRegData';
    import { EMPTY_ADMIN } from '../constantInfo/empty_admin';
    // Props

const props = withDefaults(
  defineProps<{
    EXISTING_ADMIN?: AdminRegData;
  }>(),
  {
    EXISTING_ADMIN: () => EMPTY_ADMIN as AdminRegData, // Por defecto, el objeto es EMPTY_DASHBOARD
  }
);
    // Reactive state
    const registerForm = ref<AdminRegData>({ ...props.EXISTING_ADMIN }); 

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
        }
    }
    const v_reg$ = useVuelidate(rulesRegData, registerForm);
    const submitRegister = ():void => {
        // Manejar el envío del formulario de registro aquí
        console.log('Datos de registro:', JSON.stringify(registerForm.value));       
        closeRegister();
    }
    //emit
    const passChangePopup: Ref<boolean> = ref(false);
    const emit = defineEmits(["flag"]);
    const closeRegister = ():void => {
            emit("flag", passChangePopup.value);
    }
</script>
<template>
    <div class="overlay">
    <!-- Formulario de registro (Pop-up) -->
  <div class="popup">
      <h3>Actualizar Administrador</h3>
      <form @submit.prevent="submitRegister">
        
        <input type="text" v-model="registerForm.name"  />
        <label for="name" class="form-label">Nombre </label>


        <input type="text" id="NoDoc"  v-model="registerForm.no_doc">
        
        <label for="no_doc" class="form-label">No. documento </label>
        <input type="email" v-model="registerForm.email"  />
        <label for="email" class="form-label">Email </label>
        
        <input type="text" v-model="registerForm.username"  />
        <label for="user" class="form-label">Usuario</label>
        <div class="button__container">
          <button class="accept" type="submit" :disabled="v_reg$.$invalid" >Aceptar</button>
          <button class="cancel" type="button" @click="closeRegister">Cancelar</button>
        </div>        
      </form>
    </div></div>
</template>
<style scoped>
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
.read-the-docs {
  color: #888;
}
.overlay .popup form {
    display: flex;
    flex-direction: column;
    justify-content: left; 
    text-align: left;
    
}
.overlay .popup form input {
    margin-bottom: 0;
}
.form-label{
    font-size: 14px;
    width: 80%;
}
</style>
