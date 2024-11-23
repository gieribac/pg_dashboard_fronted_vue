<script lang="ts" setup>
import { ref, Ref, onMounted } from 'vue';
import PostService from '../services/PostService';
import Dashboard_Data from '../interfaces/DashboardData';
const tag: string = '<iframe title="pa" src="" frameborder="0" allowFullScreen="true">';
let visibilidad: Ref<Boolean> = ref(false);


//servicio
    const service = new PostService();
    const posts = service.getPosts();

    onMounted(async () => {await service.fetchAll()})

class DashboardData implements Dashboard_Data {
    post: boolean;
    title: string;
    description: string;
    place: string;
    urlDashboard: string;

    constructor() {
        this.post = true;
        this.title = "Nombre ";
        this.description = "Descripción ";
        this.place = "Lugar";
        this.urlDashboard = "URL ";
    }
}

// Crear una instancia de DashboardData con datos iniciales
const dashboardDataInstance = new DashboardData();

// Crear un ref para almacenar los datos del formulario y hacerlos reactivos
const dashboardDataForm = ref<Dashboard_Data>({
    post: dashboardDataInstance.post,
    title: dashboardDataInstance.title,
    description: dashboardDataInstance.description,
    place: dashboardDataInstance.place,
    urlDashboard: dashboardDataInstance.urlDashboard
});

// Función para manejar el envío del formulario
function handleSubmit() {
    console.log("Datos enviados:", dashboardDataForm.value);
    // Lógica adicional para manejar los datos del formulario
}

const visualizarDashboard = (): void => {
    visibilidad.value = !visibilidad.value;
}
</script>
<template>
    <h2>Actualización de dashboards</h2>
    <div class="main_div form">
        <form @submit.prevent="handleSubmit">
            <div class="form_div checkbox">
                <label for="checkbox" class="form-label">Publicar</label>
                <input class="form-control" type="checkbox" id="checkbox" v-model="dashboardDataForm.post" />
            </div>

            <div class="form_div">
                <label for="nombre" class="form-label">Titulo</label>
                <textarea rows="1" type="text" class="form-control" v-model="dashboardDataForm.title"
                    :placeholder="dashboardDataInstance.title"></textarea>
            </div>

            <div class="form_div">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea class="form-control"  rows="1" v-model="dashboardDataForm.description"
                    :placeholder="dashboardDataInstance.description"></textarea>
            </div>

            <div class="form_div">
                <label for="lugar" class="form-label">Lugar</label>
                <textarea rows="1" type="text" class="form-control"  v-model="dashboardDataForm.place"
                    :placeholder="dashboardDataInstance.place"></textarea>
            </div>

            <div class="form_div">
                <label for="dashboard" class="form-label">Dashboard</label>
                <textarea rows="1" type="text" class="form-control" v-model="dashboardDataForm.urlDashboard"
                    :placeholder="dashboardDataInstance.urlDashboard"></textarea>
            </div>
            <div class="container_btn">
                <div class="button">
                    <button type="submit" class="btn btn-primary">
                        <span class="material-symbols-outlined">upload</span>Cargar
                    </button>
                </div>
                <div class="button button--visibilidad" v-show="visibilidad">
                    <button class=" btn btn-primary" type="button" @click="visualizarDashboard">
                        <span class="material-symbols-outlined">visibility</span>Ver
                    </button>
                </div>
                <div class="button button--visibilidad" v-show="!visibilidad">
                    <button class="btn btn-primary button--ocultar" type="button" @click="visualizarDashboard">
                        <span class="material-symbols-outlined">visibility_off</span>Ocultar
                    </button>
                </div>
            </div>

        </form>

    </div>
    <div class="prueba">
        <ul>
            <li v-for="p in posts" :key="p.id">{{p.title}}</li>
        </ul>
    </div>
</template>



<style scoped>
h2 {
    font-size: 18px;
    background-color: #e9ecef;
    padding: .5rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    margin-top: 1em;
}

.main_div {
    padding: .2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0;

    >* {
        margin: 2px;
    }

}

.container_btn {
    display: flex;
    flex-direction: row;

    .button {
        margin-right: 2px;
        padding: 2px
    }

    button {
        display: flex;
        flex-direction: column;
        width: 80px;
        height: 56px;
        margin-bottom: 2px;
    }

}

.button--ocultar {
    background-color: #3c3744;
}

.form {
  background-color: #e9ecef;
  padding-top: 4px;
  form {
    display: flex;
    flex-direction: row;
    
  }
}
@media (max-width: 1130px) {
    .form {
        background-color: #e9ecef;
        padding-left: 0;
        padding-right: 0;

        >* {
            margin: 0 2px;
            font-size: 11px;
        }

        form {
            display: flex;
            flex-direction: row;

            .checkbox {
                width: 10px;

                #checkbox {
                    display: flex;
                    position: relative;
                    bottom: 5px;
                    right: 60px;
                }

                label {
                    position: relative;
                    right: 37px;
                }
            }

            .form_div {
                width: auto;

                textarea {
                    border-radius: 3px;
                    padding: 0.1rem;
                    min-width: 90px;
                    margin: 0;
                }

                label {
                    margin-bottom: 0.1em;
                    margin: 0 1px;
                }
            }

            .container_btn {
                .button {
                    width: auto;
                    padding: 0;

                    button {
                        padding-left: 0;
                        width: 60px;
                        height: 40px;
                        justify-content: center;
                        text-align: center;
                    }

                    >* {
                        padding: 0
                    }
                }
            }

        }


    }
}

@media (max-width: 800px) {
    .form {
        padding-top: 1em;
        flex-direction: column;
        justify-content: start;

        form {
            flex-direction: column;

            .checkbox {

                #checkbox {
                    position: relative;
                    bottom: 5px;
                    right: 92px;
                }

                label {
                    position: relative;
                    right: 0
                }
            }

            .form_div {

                textarea {
                    width: 200px;
                }
            }
        }
    }


}
</style>