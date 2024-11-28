<script setup lang="ts">
    import { ref, Ref} from 'vue';
    import { useVuelidate } from '@vuelidate/core';
    import AdminRegData from '../../interfaces/AdminRegData';
    import { required, numeric, alpha, minLength, maxLength, email, alphaNum } from '@vuelidate/validators';

    
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
    const registerForm = ref<AdminRegData>({ name: '', no_doc: '', email: '', username: '', password: '' });
    const v_reg$ = useVuelidate(rulesRegData, registerForm);
    const submitRegister = ():void => {
        // Manejar el envío del formulario de registro aquí
        console.log('Datos de registro:', JSON.stringify(registerForm.value));
        //emit
        const passChangePopup: Ref<boolean> = ref(false);
        const emit = defineEmits(["flag"]);

        const closeRegister = ():void => {
            emit("flag", passChangePopup.value);
        }
    }

</script>
<template>
    <div class="overlay">
    <!-- Formulario de registro (Pop-up) -->
  <div class="popup">
      <h3>Actualizar registro</h3>
      <form @submit.prevent="submitRegister">
        <input type="text" placeholder="Nombre" v-model="registerForm.name"  />
        <input type="text" id="NoDoc" placeholder="No. documento" v-model="registerForm.no_doc">
        <input type="email" placeholder="E-mail" v-model="registerForm.email"  />
        <input type="text" placeholder="Usuario" v-model="registerForm.username"  />
        <input type="password" placeholder="Contraseña" v-model="registerForm.password" required />
;        <div class="button__container">
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
</style>
