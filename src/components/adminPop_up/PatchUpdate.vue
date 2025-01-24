
<script setup lang="ts">
//componente para actualizar datos del usuario actual
    import { ref, Ref, computed} from 'vue';
    import { useVuelidate } from '@vuelidate/core';
    import { required, numeric, alpha, minLength, maxLength, email, alphaNum } from '@vuelidate/validators';
    import AdminRegData from '../../interfaces/AdminRegData';
    import { EMPTY_ADMIN } from '../constantInfo/empty_admin';
    // Props

const props = withDefaults(
  defineProps<{
    EXISTING_ADMIN?: Ref<AdminRegData>;
  }>(),
  {
    EXISTING_ADMIN: () => ref<AdminRegData>(EMPTY_ADMIN) as Ref<AdminRegData>, // Por defecto, el objeto es EMPTY_DASHBOARD
  }
);
    // Reactive state
    const registerForm = ref<AdminRegData>({...props.EXISTING_ADMIN.value}); 

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
    const buildDiffObject = (original: AdminRegData, updated: AdminRegData): any => {
        const diff: any = {}; // Objeto para almacenar las diferencias
        for (const key in original) {
                const typedKey = key as keyof AdminRegData; // Garantizar que 'key' es válido
                // Verificar que el valor ha cambiado y no es undefined
                if (original[typedKey] !== updated[typedKey] && updated[typedKey] !== undefined) {
                    diff[typedKey] = updated[typedKey];
                }
        }
        return diff;
    };

    const v_reg$ = useVuelidate(rulesRegData, registerForm);
    const submitRegister = ():void => {
        // Manejar el envío del formulario de registro aquí
        console.log('Datos de registro:', JSON.stringify(registerForm.value));
        const differences = buildDiffObject(props.EXISTING_ADMIN.value, registerForm.value);    
        emit("sendData", differences);
        closeRegister();
    }
    // Computed properties
    const hasNoChanges = computed((): boolean => {
    return JSON.stringify(registerForm.value) === JSON.stringify(props.EXISTING_ADMIN.value);
    });

    //emit
    const passChangePopup: Ref<boolean> = ref(false);
    const emit = defineEmits(["flag","sendData"]);
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
          <button class="accept btn" type="submit" :disabled="!!hasNoChanges || v_reg$.$invalid" >Aceptar</button>
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
.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>
