
 <script setup lang="ts">
    import { useVuelidate } from '@vuelidate/core';
    import { required, minLength, maxLength } from '@vuelidate/validators';
    import { ref, Ref, computed, defineProps, withDefaults } from 'vue';
    import Dashboard_Data from '../interfaces/DashboardData';
    import { EMPTY_DASHBOARD } from '../components/constantInfo/empty_dashboard';
    import PrevDashboard from '../components/adminPop_up/PrevDashboard.vue';
// Props

const props = withDefaults(
  defineProps<{
    flag: boolean;//true is form1, false is form2
    EXISTING_DASHBOARD?: Dashboard_Data;
  }>(),
  {
    flag: false, // Por defecto, la bandera es false
    EXISTING_DASHBOARD: () => EMPTY_DASHBOARD as Dashboard_Data, // Por defecto, el objeto es EMPTY_DASHBOARD
  }
);

//Emits
const emit = defineEmits(["sendDash","deleteDash"])

    // Constants 

    const initialData: Dashboard_Data = props.flag ? EMPTY_DASHBOARD : props.EXISTING_DASHBOARD;
    const preview: Ref<Boolean> = ref(false);
    // Reactive state
    const dashboardDataForm = ref<Dashboard_Data>({ ...initialData });
    
    // Validation rules
    const rulesDashboardData = {
    title: { required, minLength: minLength(3), maxLength: maxLength(30) },
    description: { required, maxLength: maxLength(2000) },
    place: { required, minLength: minLength(3), maxLength: maxLength(30) },
    urlDashboard: { required, maxLength: maxLength(400) },
    };
    
    // Initialize validation
    const v_reg$ = useVuelidate(rulesDashboardData, dashboardDataForm);
    
    // Computed properties
    const hasNoChanges = computed((): boolean => {
    return JSON.stringify(dashboardDataForm.value) === JSON.stringify(props.EXISTING_DASHBOARD);
    });
    
    // Utility to get differences
    const buildDiffObject = (original: Dashboard_Data, updated: Dashboard_Data): any => {
        if (props.flag) {
            return updated;
        }
        const diff: any = {}; // Objeto para almacenar las diferencias
        for (const key in original) {
                const typedKey = key as keyof Dashboard_Data; // Garantizar que 'key' es válido
                // Verificar que el valor ha cambiado y no es undefined
                if (original[typedKey] !== updated[typedKey] && updated[typedKey] !== undefined) {
                    diff[typedKey] = updated[typedKey];
                }
        }
        return diff;
    };
    
    // Methods
    const handleSubmit = (): void => {
        const differences = buildDiffObject(props.EXISTING_DASHBOARD, dashboardDataForm.value);
        console.log("Changes submitted:", differences);
        if (props.flag) {
            emit("sendDash", differences);
        } else {
            emit("sendDash", props.EXISTING_DASHBOARD.id, differences);
        }
        
        // Reset form to initial state
        dashboardDataForm.value = { ...initialData };
    };
        
    const handleViewDashboard = (): void => {
        preview.value = !preview.value;
    };      
    
    const handleDestroyDashboard = (): void => {
        console.log("Dashboard destroyed");
        emit("deleteDash", props.EXISTING_DASHBOARD.id);
    };

 </script>
 <template>
    <PrevDashboard @close="handleViewDashboard" v-if="preview" :EXISTING_DASHBOARD="EXISTING_DASHBOARD"/>
    <div class="container__main">
        <p v-if="props.flag">Diligenciar todos los campos</p>
        <p v-if="!props.flag">Actualizar lo necesario</p>
        <div class="main_div form">
            <form class="container__main__s1" @submit.prevent="handleSubmit">
                <div class="form_div">
                    <label for="title" class="form-label">Titulo</label>
                    <input v-if="props.flag" class="form-control  form__input" type="text" name="title" id="title" v-model="dashboardDataForm.title">
                    <input v-if="!props.flag" class="form-control form__input" type="text" name="title" id="title" v-model="dashboardDataForm.title">
                </div>
                <div class="form_div">
                    <label for="descripcion" class="form-label">Observaciones</label>
                    <textarea  v-if="props.flag" name="descripcion" class="form-control  form__input " id="descripcion" rows="3"
                        v-model="dashboardDataForm.description"></textarea>
                    <textarea v-if="!props.flag" name="descripcion"  class="form-control form__input " id="descripcion" rows="3"
                    v-model="dashboardDataForm.description"></textarea>
                </div>
                <div class="form_div">
                    <label for="lugar" class="form-label ">Lugar</label>
                    <input v-if="props.flag" class="form-control " type="text" name="lugar" id="lugar" v-model="dashboardDataForm.place">
                    <input v-if="!props.flag" class="form-control form__input " type="text" name="lugar" id="lugar" v-model="dashboardDataForm.place">
                </div>
                <div class="form_div">
                    <label for="url" class="form-label">Dashboard (URL)</label>
                    <input  v-if="props.flag" class="form-control form__input " type="text" name="url" id="url" v-model="dashboardDataForm.urlDashboard">
                    <input  v-if="!props.flag" class="form-control form__input " type="text" name="url" id="url" v-model="dashboardDataForm.urlDashboard">
                </div>
                <div class="form_div ">
                    <label for="checkbox" class="form-label" name="checkbox">Publicar</label>
                    <div class="form-control--inputcheckbox form-control ">
                        <input v-if="props.flag" class="inputcheckbox " type="checkbox" id="" name="checkbox" 
                            v-model="dashboardDataForm.post">
                        <input v-if="!props.flag" class="inputcheckbox" type="checkbox" id="checkbox" name="checkbox" v-model="dashboardDataForm.post" 
                        >
                    </div>
                </div>
                <div class="container-button">
                    <div class="button">
                        <button v-if="props.flag" type="submit" class="btn btn-primary" :disabled="v_reg$.$invalid">
                            <span class="material-symbols-outlined">upload</span>Cargar
                        </button>
                        <button v-if="!props.flag" type="submit" class="btn btn-primary" :disabled="!!hasNoChanges || v_reg$.$invalid">
                            <span class="material-symbols-outlined">upload</span>Cargar
                        </button>
                    </div>
                    <div class="button button--visibilidad" v-if="!props.flag">
                        <button class=" btn btn-primary ver" type="button" @click="handleViewDashboard ">
                            <span class="material-symbols-outlined">visibility</span>Ver
                        </button>
                    </div>
                    <div class="button" v-if="!props.flag">
                        <button class="btn btn-primary delete" type="button" @click="handleDestroyDashboard">
                            <span class="material-symbols-outlined">delete</span>Eliminar
                        </button>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>
<style scoped>
.containter__main  {
    width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;      
}

.container__main .main_div {
    width: 100%;
    margin: auto;
    padding: 10px 0 10px 0;
}

.container__main .main_div .container__main__s1 {
    margin-left: 0;
    margin-right: 0;
}

.container__main .main_div .container__main__s1 .form_div {
    width: 100%;
    height: auto;
    margin: auto;
    padding: 0;
    display: flex;
    justify-content: center;
    flex-direction: column-reverse;

}

.container__main .main_div .container__main__s1 .form_div .form-label,
.form-control {
    width: 100%;
    text-align: left;

}

.container__main .main_div .container__main__s1 .form_div .form-label {
    margin-bottom: 7px
}

.btn {
    background-color: #3066be;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}


.container__main .main_div .container__main__s1 {
  margin-left: 0;
  margin-right: 0;
}


.container__main .main_div .container__main__s1 .form_div .form-label,
.form-control {
  width: 61.81%;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

.btn {
  display: flex;
  flex-direction: column;
  margin: auto;
}
.container-button{
  width: 61.81%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 auto;
  
}
.container-button .btn{
    font-size: 14px;
    width: 77.6px;
    height: 48px;
    padding: 0;
    margin: auto 2px;
}

.delete {
    background-color: #3c3744
}
.container__main{
    width: 61.81vw;
    margin: 1em auto;
    background-color: #dbdfe1;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    padding:0;
    border-radius: 15px;
}

.form__input::placeholder {
    color: black;
}

.form__input {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-size: 14px;
}
@media (max-width: 768px) {

    .container__main 
    {
        width: 85.5%;
    }
    .container__main .main_div .container__main__s1 .form_div .form-label,
    .form-control {
        width: 85.5%;
    }
    .container-button .btn{
        font-size: 10px;
        width: 63px;
        height: 39px;
        padding: 0;
        margin: auto 2px;
    }
    .container-button .btn span {
        font-size: 18px;
    }
}
</style>