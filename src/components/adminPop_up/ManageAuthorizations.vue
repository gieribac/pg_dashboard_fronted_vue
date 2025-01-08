<script setup lang='ts'>
//Pop-up Autorizar Nuevo
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, maxLength, numeric, email } from '@vuelidate/validators';
import { defineEmits, ref, Ref } from 'vue';

const dataFormPopup: Ref<boolean> = ref(false);
const statusQueryPupup: Ref<boolean> = ref(false);
interface MAData {
    no_doc: string;
    email: string;
}

const rulesMADataData = {
    no_doc: {
        required, numeric, minLength: minLength(6), maxLength: maxLength(12)
    },
    email: {
        required, email
    }
}

const DataForm = ref<MAData>({
    no_doc: '',
    email: ''
})

// crear el objeto de validación
const v_passChange$ = useVuelidate(rulesMADataData, DataForm);

//metodos 
//emit
const emit = defineEmits(["flag"])
const close_passChangePop_up = (): void => {
    emit("flag", dataFormPopup.value)
}

const submitManageA = (): void => {
    console.log('Datos de registro:', JSON.stringify(DataForm.value));
}
const submitDestroyA = (id_: number, ndoc_: string, email_: string): void => {
    const objet: object = {
        id: id_,
        ndoc: ndoc_,
        email: email_
    };
    alert(objet);
}

const setQueryAutorization = (): void => {
    activeTab.value = false;
    statusQueryPupup.value = !statusQueryPupup.value;
    close_passChangePop_up;
}
const activeTab:Ref<Boolean> = ref(false);

</script>

<template>
    <div class="overlay">
        <div class="popup"> 
    <!-- Contenedor de pestañas -->
    <div class="popup__tabs">
        <div class="popup__tab" :class="{active: !activeTab}" @click="activeTab=!activeTab">Autorizar</div>
        <div class="popup__tab" :class="{active: activeTab}" @click="activeTab=!activeTab" >Autorizaciones</div>
    </div>

    <!-- Pestaña 1 -->
    <form class="popup__pest form form-aut" v-show="!activeTab" @submit.prevent="submitManageA">
        <input type="text" placeholder="No. documento" v-model="DataForm.no_doc" />
        <input type="email" placeholder="E-mail" v-model="DataForm.email" required />
        <div class="button__container">
        <button class="accept" type="submit" :disabled="v_passChange$.$invalid" @click="setQueryAutorization">Aceptar</button>
        <button class="cancel" type="button" @click="close_passChangePop_up">Cancelar</button>
        </div>
    </form>

    <!-- Pestaña 2 -->
    <div class="popup__pest container-control-registro"  v-show="activeTab">
        <div class="control-registro">
        <div class="registros">
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <details>
                <p><strong>Fecha creado</strong></p>
                <p>01/01/01</p>
            </details>

            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>
            <div class="registro">
            <p><strong>No. doc: </strong></p>
            <p>#####</p>
            <p><strong>Email: </strong></p>
            <p>qwerty@gmail.com</p>
            <span class="destroy-authorization material-symbols-outlined" 
                @click="submitDestroyA(1, '#####', 'qwerty@gmail.com')">delete</span>
            </div>

        </div>
        <div class="button__container button__container--pest2">
        <button class="cancel" type="button" @click="close_passChangePop_up">Cancelar</button>
        </div></div>
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

.popup__tabs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 2px solid #ddd;
}

.popup__tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
}

.popup__tab.active {
  border-bottom: 2px solid #090c9b;
  color: #090c9b;
}

.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fbfff1;
    padding: 10px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    z-index: 1000;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 20%;
    min-height: 31%;
    justify-content: center;
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
    width: 100%;
    align-items: center;
    justify-content: center;
}

.popup .button__container button {
    display: flex;
    width: 70px;
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

.container-control-registro {
    width: 100%;
}

.container-control-registro span {
    cursor: pointer;
    background-color: #3c3744;
    width: min-content;
    color: white;
    border-radius: 3px;
    font-size: 20px;
    margin: 0;
    padding: 2px;

}

.control-registro {
    display: flex;
    flex-direction: column;
}

h3 {
    margin: 0.2em;
}

.control-registro .registros {
    width: 100%;
    margin: auto;
    justify-content: center;
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    max-height: 60vh;
    overflow-y: auto;

}

.control-registro .registro {
    font-size: 12px;
    border: solid 1px gray;
    border-radius: 5px;
    padding: 0 3px 0 3px;
    height: min-content;
    width: min-content;
    flex-grow: 0;
    box-sizing: border-box;
    text-align: left;
}

.control-registro .registro * {
    margin: 3px auto;
    display: block;
}

@media (max-width: 768px) {
    .popup .button__container {
        flex-direction: column;
    }

    .popup .button__container button {
        width: 30%;
    }
}
</style>