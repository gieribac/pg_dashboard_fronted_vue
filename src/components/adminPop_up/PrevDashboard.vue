<script setup lang="ts">
import { ref, Ref, defineEmits, withDefaults, defineProps } from 'vue';
import Dashboard_Data from '../../interfaces/DashboardData';
import { EMPTY_DASHBOARD } from '../../components/constantInfo/empty_dashboard';

const props = withDefaults(
  defineProps<{
    EXISTING_DASHBOARD?: Dashboard_Data;
  }>(),
  {
    EXISTING_DASHBOARD: () => EMPTY_DASHBOARD as Dashboard_Data, // Por defecto, el objeto es EMPTY_DASHBOARD
  }
);
const emit = defineEmits(["close"])
const alClickClose = () :void => {
    emit("close", m.value)
}
let m:Ref<Boolean> = ref(false);
const formatDate = (originalDate: string): string => {
    const cleanedDate: string = originalDate.replace(/\.\d+Z$/, "Z");
    const dateObject: Date = new Date(cleanedDate);
    return `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`;
};

const created: string = typeof(props.EXISTING_DASHBOARD.created_at) == "string" ? 
    formatDate(props.EXISTING_DASHBOARD.created_at): "";
const updated: string = typeof(props.EXISTING_DASHBOARD.updated_at) == "string" ? 
    formatDate(props.EXISTING_DASHBOARD.updated_at): "";

</script>

<template>
    <div class="overlay">
    <div class="popup">
        <h3 class="popup__h3">{{props.EXISTING_DASHBOARD.title}}        
        </h3>
        <div class="button popup__btn">
            <button class="btn" type="button" @click="alClickClose">
                <span class="material-symbols-outlined">close</span>Cerrar
            </button>
        </div>
        <div class="popup__dash">
            <iframe title="pa" :src="props.EXISTING_DASHBOARD.urlDashboard" frameborder="0" allowFullScreen="true">
            </iframe> 

        </div>
        <p class="info-s info popup__title"><strong class="strong-s">Título: </strong>{{props.EXISTING_DASHBOARD.title}}</p>
        <p class="info popup__observaciones"><strong>Observaciones: </strong> {{props.EXISTING_DASHBOARD.description}} </p>
        <p class="info info-s popup__lugar"><strong class="strong-s">Lugar: </strong>{{props.EXISTING_DASHBOARD.place}}</p>
        <p class="info info-s popup__autor"><strong class="strong-s">Autor: </strong>{{props.EXISTING_DASHBOARD.author}}</p>
        <p class="info info-s popup__creado"><strong class="strong-s">Creado: </strong>{{created}}</p>    
        <p class="info info-s popup__modificado"><strong class="strong-s">Modificado: </strong>{{updated}}</p> 
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
.popup {
    position: fixed;    
    width: 90%;
    height: 90vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #dbdfe1; 
    padding: 5px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    display:grid;
    grid-template-areas:    "a11 a11 a11"
                            "a12 a12 a12"
                            "a13 a24 a24"
                            "a14 a24 a24"
                            "a15 a24 a24"
                            "a16 a24 a24"
                            "a17 a24 a24";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 45px 1fr repeat(5, 16px);
}
.popup .popup__h3 {
    grid-area: a11;
}
.popup .popup__btn {
    position: absolute;
    right: 5px;
    top: 5px;
}

.btn {
    background-color: #3c3744;;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #FFF;
    width: 65px;
    height: 40px;
    font-size: 12px;
}
.popup .popup__dash{
    grid-area: a12;
}
.popup .popup__title{ 
    grid-area: a13;
}
.popup .popup__lugar{ 
    grid-area: a14;
}
.popup .popup__autor{ 
    grid-area: a15;
}
.popup .popup__creado{ 
    grid-area: a16;
}
.popup .popup__modificado{
    grid-area: a17;
    }
.popup .popup__observaciones{
    grid-area: a24;
    height: 75px;
    overflow-y: auto;
}

iframe {
    height: 70vh;
    border-radius: 10px;
    margin: auto;
    aspect-ratio: 16/9;
}

.info{
    text-align: left;
    font-size: 14px;
    margin: 0 ;
    padding: 0 ;
    line-height: 1;
}
.info > .strong-s {
    width: 85px;
    display: inline-block;
}
.info-s {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
}

@media (max-width: 768px) {
    iframe {
        height: 50vh;
    }
}

</style>
