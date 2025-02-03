<!--
Forma de uso
import ShortMessageAP from '../interfaces/ShortMessageAP';
import AlertPop_up from '../components/AlertPop_up.vue';
import SMClass from '../../class/SMClass';
const sm = new SMClass();
const showAlert: Ref<boolean> = ref(false);
const handleClose = () => {
  showAlert.value = false;
};

// Función para montar la alerta
const triggerAlert = (status_: boolean, message_: string):void => {
  showAlert.value = true;
  sm.status = status_;
  sm.message = message_;
};
triggerAlert(true, "exito");

<AlertPop_up v-if="showAlert" :shortMessage="sm"  @close="handleClose"/>
-->
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  
  // Reactive state for the visibility of the alert
  const visible = ref(true);

  const emit = defineEmits(['close']);

  // Cierre manual
  const closeAlert = () => {
    console.log(prop.sm)
    emit('close',true);
    console.log("closea")
  };

  // Cierre automático
  let timeoutId: ReturnType<typeof setTimeout>;

  onMounted(() => {
    timeoutId = setTimeout(closeAlert, 2000);
  });

  onUnmounted(() => {
    clearTimeout(timeoutId);
  });

  const prop = withDefaults(
  defineProps<{
    sm: string;
    smstatus: boolean;
  }>(),
  {
    sm: '',
    smstatus: false
  }
);
</script>
  <template>
    <div class="overlay" v-if="visible">
    <div class="alert">
      <div class="alert__content">
        <span class="alert__icon material-symbols-outlined" :class="prop.smstatus ? 'check_circle': 'error'">{{prop.smstatus ? "check_circle": "error"}}</span>
        <p class="alert__message">{{prop.sm}}</p>
        <button id="btn-alert" class="alert__button" @click="closeAlert">Aceptar</button>
        
      </div>
    </div>
    </div>
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
  .alert {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 15%;
    height: min-content;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
    z-index: 1000;
  }
  
  .alert__content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .alert__content >* {
    padding: 0;
    margin: 0
  }
  
  .alert__icon {
    font-size: 2rem;
  }
  
  .alert__message {
    font-size: 0.8rem;
    font-weight: bold;
    margin: 0;
  }
  
  .alert__button {
    padding: 5px 10px;
    font-size: 12px;
    height: 2em;
    width: min-content;
    color:  black;
    background-color: #dbdfe1;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .alert__button:hover {
    background-color: gray;
  }
  .code {
    font-size: 10px;
    margin: 0
  }
  .check_circle{
    color: blue;
  }
  .error{
    color: red;
  }

  </style>
  