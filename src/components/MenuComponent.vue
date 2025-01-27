<script setup lang="ts">
  import { listEmmits } from '../components/constantInfo/listEmmits';
  import { ref, Ref} from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import AlertPop_up from '../components/AlertPop_up.vue';
  import AuthService from '../services/AuthService';
  import TriggerAlertClass from '../class/TriggerAlertClass';
  const router = useRouter();
  const handleClose = () => {
    triggerAlert.set_showAlert(ref(false));
    triggerAlert.get_smstatus() ? router.push({ name: 'MainV' }): router.push({ name: 'AdminV'});

  };

  // instancia para montar la alerta
  const triggerAlert = new TriggerAlertClass;

  const logOut = async () => {
    try {
      const auth = new AuthService();
      const exito = await auth.logout();
      triggerAlert.set_showAlert(ref(true));
      if (exito) {
        triggerAlert.set_sms(true, "Sesión cerrada");
      } else {
        triggerAlert.set_sms(false, "Fallo cerrando sesión");
      }
    } catch (e) {
      triggerAlert.set_sms(false, "Fallo cerrando sesión");
    }
  }

  // Props
  const prop = defineProps({
    adminMain: {
        type: Boolean,
        default: false, // true = adminMain. false  = anyAdmin
    }
  });

  //estado para version del menu
  const menu: Boolean = useRoute().name ==='MainV';
  //estados reactivos para controlar la visibilidad de parrafos del menu
  const showParagraph = ref(Array(9).fill(false));

  // metodos para renderizar letreros de menu

  const handleMouseEnter = (num: number):void => {
    showParagraph.value[num] = true;
  }

  const handleMouseLeave = (num: number):void => {
    showParagraph.value[num] = false;
  }

  //emits
  const emit = defineEmits(listEmmits);

  // Estados reactivos para los valores de los emmits
  const m = ref(Array(9).fill(false));

  //estado reactivo del toggle
  const isOpen: Ref<boolean> = ref(false);

  // Función para emitir emmits
  const alClick = (num: number): void => {
    emit(listEmmits[num], m.value[num])
  };

  // Función para manejar el toggle y emitir "cl"
  const toggleDropdown = (): void => {
    isOpen.value = !isOpen.value;
    if (!isOpen.value) {
      emit(listEmmits[2], m.value[2]);
    }
  };
</script>

<template>
  <div class="dropdown">
    <button class="hamburguesa" @click="toggleDropdown">
      <span class="material-symbols-outlined">
        menu
      </span>
    </button>
    <ul v-if="isOpen && menu" class="dropdown-content">
      <li @click="alClick(0)">
        <p v-show="showParagraph[0]">Ingresar</p>
        <div class="li_container" @mouseenter="handleMouseEnter(0)" @mouseleave="handleMouseLeave(0)" >
          <span class="material-symbols-outlined">
            login
          </span>
        </div>       
      </li>
      <li @click="alClick(1)">
        <p v-show="showParagraph[1]">Registrarse</p>
        <div class="li_container" @mouseenter="handleMouseEnter(1)" @mouseleave="handleMouseLeave(1)">
          <span class="material-symbols-outlined">
            app_registration
          </span>
        </div>
      </li>
      <li @click="logOut()">
        <p v-show="showParagraph[3]">Cerrar Sesion</p>
        <div class="li_container" @mouseenter="handleMouseEnter(3)" @mouseleave="handleMouseLeave(3)">
          <span class="material-symbols-outlined">
          logout
          </span>
        </div>
      </li>
      <li @click="alClick(3)">
        <p v-show="showParagraph[4]">Información</p>
        <div class="li_container" @mouseenter="handleMouseEnter(4)" @mouseleave="handleMouseLeave(4)">
          <span class="material-symbols-outlined">
          info
          </span>
        </div>
      </li>
    </ul>
    <ul v-if="isOpen && !menu" class="dropdown-content">
      <li @click="alClick(4)">
        <p v-show="showParagraph[5]">Regresar a inicio</p>
        <div class="li_container" @mouseenter="handleMouseEnter(5)" @mouseleave="handleMouseLeave(5)" >
          <span class="material-symbols-outlined">
            arrow_back
          </span>
        </div>       
      </li>
      <li @click="alClick(5)">
        <p v-show="showParagraph[6]">Cambiar contraseña</p>
        <div class="li_container" @mouseenter="handleMouseEnter(6)" @mouseleave="handleMouseLeave(6)">
          <span class="material-symbols-outlined">
            password
          </span>
        </div>
      </li>
      <li @click="alClick(6)">
        <p v-show="showParagraph[7]">Actualizar administrador</p>
        <div class="li_container" @mouseenter="handleMouseEnter(7)" @mouseleave="handleMouseLeave(7)">
          <span class="material-symbols-outlined">
            published_with_changes
          </span>
        </div>
      </li>
      <li @click="alClick(7)">
        <p v-show="showParagraph[8]">Eliminar cuenta</p>
        <div class="li_container" @mouseenter="handleMouseEnter(8)" @mouseleave="handleMouseLeave(8)">
          <span class="material-symbols-outlined">
            person_remove
          </span>
        </div>
      </li>
      <li v-show="prop.adminMain" @click="alClick(8)">
        <p v-show="showParagraph[9]">Autorizaciones</p>
        <div class="li_container" @mouseenter="handleMouseEnter(9)" @mouseleave="handleMouseLeave(9)">
          <span class="material-symbols-outlined">
            settings_accessibility
          </span>
        </div>
      </li>
      <li @click="logOut()">
        <p v-show="showParagraph[10]">Cerrar sesión</p>
        <div class="li_container" @mouseenter="handleMouseEnter(10)" @mouseleave="handleMouseLeave(10)">
          <span class="material-symbols-outlined">
          logOut
          </span>
        </div>
      </li>
    </ul>
  </div>
  <AlertPop_up 
    v-if="triggerAlert.get_showAlert()" 
    :sm="triggerAlert.get_sm()" 
    :smstatus="triggerAlert.get_smstatus()"
    @close="handleClose"
  />      
</template>

<style scoped>
/* Dropdown Estilos */
.dropdown {
  position: fixed;
  top: 10px;
  right: 10px;
  display: inline-block;
  width: 50px;
  z-index: 500;
}

.dropdown-content {
  border-radius: 8px;
  position: absolute;
  z-index: 1;
  right: 0px;
  top: 37px;
  list-style: none;
  padding: 0;
  width: 50px;
  display: block
}

/* Botón genérico */
button {
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button[disabled] {
  background-color: gray;
  cursor: not-allowed;
  opacity: 0.5;
}

button:focus {
  outline: none;
}

/* Hamburguesa */
.hamburguesa {
  background-color: #3066be;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.hamburguesa > span {
  position: relative;
  left: -7px;
  top: 1px;
}

.hamburguesa:hover {
  background-color: #090c9b;
}

/* Iconos */
.material-symbols-outlined {
  background-color: unset;
}

/* Contenedor de lista */
.li_container {
  color: white;
  text-decoration: none;
  display: block;
  cursor: pointer;
  border-radius: 50%;
  background-color: #3066be;
  height: 50px;
  width: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  position: relative;
}

.li_container:hover {
  background-color: #090c9b;
}

/* Listas */

ul span {
  position: relative;
  top: 12px;
  right: 0;
}

ul li {
  display: flex;
  flex-direction: row;
  height: 53px;
  float: right;
}

ul li p {
  padding-right: 7px;
  text-align: right;
  width: 110px;
  text-shadow: 1px 1px 3px rgb(255, 255, 255), -1px -1px 3px rgb(255, 255, 255);
}

</style>
