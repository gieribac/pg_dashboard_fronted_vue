<script setup lang="ts">
import { ref, Ref} from 'vue';
import Dashboard_Data from '../interfaces/DashboardData';
import { EMPTY_DASHBOARD } from '../components/constantInfo/empty_dashboard';

const props = withDefaults(
  defineProps<{
    EXISTING_DASHBOARD?: Dashboard_Data;
  }>(),
  {
    EXISTING_DASHBOARD: () => EMPTY_DASHBOARD as Dashboard_Data, // Por defecto, el objeto es EMPTY_DASHBOARD
  }
);
const formatDate = (originalDate: string): string => {
    const cleanedDate: string = originalDate.replace(/\.\d+Z$/, "Z");
    const dateObject: Date = new Date(cleanedDate);
    return `${dateObject.toLocaleDateString()} ${dateObject.toLocaleTimeString()}`;
};
const preview: Ref<Boolean> = ref(false);
const handleViewDashboard = (): void => {
        preview.value = !preview.value;
    };   

const created: string = typeof(props.EXISTING_DASHBOARD.created_at) === "string" ? 
    formatDate(props.EXISTING_DASHBOARD.created_at): "";
const updated: string = typeof(props.EXISTING_DASHBOARD.updated_at) === "string" ? 
    formatDate(props.EXISTING_DASHBOARD.updated_at): "";

</script>

<template>
    <div class="fullscreen">
        <div class="fullscreen__dash">
            <button :class="{btn_active: preview}" class=" btn btn-primary ver" type="button" @click="handleViewDashboard ">
                            <span class="material-symbols-outlined">{{preview ? 'visibility_off': 'visibility'}}</span>
                            
            </button>
            <iframe  v-if="preview"
                title="pa"
                :src="props.EXISTING_DASHBOARD.urlDashboard"
                frameborder="0"
                allowfullscreen="true"
            ></iframe>
        </div>
        <p class="info-s info fullscreen__title">
            <strong class="strong-s">Título: </strong>{{ props.EXISTING_DASHBOARD.title }}
        </p>
        <p class="info fullscreen__observaciones">
            <strong>Observaciones: </strong>{{ props.EXISTING_DASHBOARD.description }}
        </p>
        <p class="info info-s fullscreen__lugar">
            <strong class="strong-s">Lugar: </strong>{{ props.EXISTING_DASHBOARD.place }}
        </p>
        <p class="info info-s fullscreen__autor">
            <strong class="strong-s">Autor: </strong>{{ props.EXISTING_DASHBOARD.author }}
        </p>
        <p class="info info-s fullscreen__creado">
            <strong class="strong-s">Creado: </strong>{{ created }}
        </p>
        <p class="info info-s fullscreen__modificado">
            <strong class="strong-s">Modificado: </strong>{{ updated }}
        </p>
    </div>
</template>
<style scoped>
.fullscreen {
    display: grid;
    width: 100%;
    background-color: #dbdfe1;
    padding: 10px;
    box-sizing: border-box;
    grid-template-areas:
        "a12 a12 a12"
        "a12 a12 a12"
        "a13 a24 a24"
        "a14 a24 a24"
        "a15 a24 a24"
        "a16 a24 a24"
        "a17 a24 a24";
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 40px 1fr repeat(5, auto);
    margin-bottom: 1em;
    border-radius: 5px;
    margin: 0.5rem 0 0.5rem 0;
}


.btn {
    background-color: #3066be;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 40px;
    margin-bottom: 5px;
}
.btn_active {
    background-color: #3c3744;
}

.fullscreen__dash {
    grid-area: a12;
}

iframe {
    width: 100%;
    border-radius: 5px;
    margin: auto;
    aspect-ratio: 16/9;
}

.fullscreen__title {
    grid-area: a13;
}

.fullscreen__lugar {
    grid-area: a14;
}

.fullscreen__autor {
    grid-area: a15;
}

.fullscreen__creado {
    grid-area: a16;
}

.fullscreen__modificado {
    grid-area: a17;
}

.fullscreen__observaciones {
    grid-area: a24;
    height: 100px;
    overflow-y: auto;
}

.info {
    text-align: left;
    font-size: 14px;
    margin: 0;
    padding: 0;
    line-height: 1.5;
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
