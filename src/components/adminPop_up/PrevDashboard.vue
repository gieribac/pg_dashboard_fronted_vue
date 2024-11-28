<script setup lang="ts">
import { ref, Ref, defineEmits } from 'vue';

const emit = defineEmits(["pd"])
const alClick = ():void => {
    emit("pd", m.value)

}
let m:Ref<Boolean> = ref(false);
</script>

<template>
    <div class="overlay">
    <div class="popup">
        <h3 class="popup__h3">Previsualización        
        </h3>
        <div class="button popup__btn">
            <button class="btn" type="button" @click="alClick">
                <span class="material-symbols-outlined">close</span>Cerrar
            </button>
        </div>
        <div class="popup__dash">
            <iframe title="pa" src="https://app.powerbi.com/view?r=eyJrIjoiMDA3YjZlZmYtMmZhNC00Y2NmLTg1ZjktMjAwM2Y4MjNlYzZjIiwidCI6ImZjMDA1NDdhLTI0YmItNGU0Zi05ZDYxLTczZmNhNWViOWRmMyIsImMiOjR9" frameborder="0" allowFullScreen="true">
            </iframe> 
        </div>
        <p class="info-s info popup__title"><strong class="strong-s">Título:</strong><input disabled="true" type="text" class="text-s" value=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, aspernatur nisi. Aperiam optio odit modi quo. Officiis magnam odit possimus? Reiciendis dolorem laboriosam ullam pariatur! Molestiae error tempora fuga eos!" > </p>
        <p class="info popup__observaciones"><strong>Observaciones:</strong>  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni, eaque vitae ducimus ea quam aperiam et! Officia aspernatur iste eum maiores ducimus inventore doloremque veritatis? Accusantium dolores dignissimos. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni, eaque vitae ducimus ea quam aperiam et! Officia aspernatur iste eum maiores ducimus inventore doloremque veritatis? Accusantium dolores dignissimos </p>
        <div class="info popup__lugar"><strong class="strong-s">Lugar: </strong><input disabled="true" type="text" class="text-s" value=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, aspernatur nisi. Aperiam optio odit modi quo. Officiis magnam odit possimus? Reiciendis dolorem laboriosam ullam pariatur! Molestiae error tempora fuga eos!" ></div>
        <p class="info popup__autor"><strong class="strong-s">Autor:</strong><input disabled="true" type="text" class="text-s" value=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, aspernatur nisi. Aperiam optio odit modi quo. Officiis magnam odit possimus? Reiciendis dolorem laboriosam ullam pariatur! Molestiae error tempora fuga eos!" > </p>
        <p class="info popup__creado"><strong class="strong-s">Creado:</strong><input disabled="true" type="text" class="text-s" value=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, aspernatur nisi. Aperiam optio odit modi quo. Officiis magnam odit possimus? Reiciendis dolorem laboriosam ullam pariatur! Molestiae error tempora fuga eos!" > </p>    
        <p class="info popup__modificado"><strong class="strong-s">Modificado:</strong><input disabled="true" type="text" class="text-s" value=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error, aspernatur nisi. Aperiam optio odit modi quo. Officiis magnam odit possimus? Reiciendis dolorem laboriosam ullam pariatur! Molestiae error tempora fuga eos!" ></p> 
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
    width: 100%;
    height: 70vh;
    border-radius: 10px;
    margin: auto;
}

.info{
    text-align: left;
    font-size: 14px;
    margin: 0 ;
    padding: 0 ;
    line-height: 1;
}
.info > .strong-s {
    width: 80px;
    display: inline-block;
}
.info-s {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
}

.text-s{
    width: 75%;
    overflow-x: auto;
    height: 16px;
    border: none;
    background: transparent; 
    outline: none; 
    color: inherit;
    font: inherit;
    padding: 0; 
    margin: 0;
    cursor: text;
    position: relative;
    top: 2px;
}
@media (max-width: 768px) {
    iframe {
        height: 50vh;
    }
}

</style>
