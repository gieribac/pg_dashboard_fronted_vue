<script setup lang='ts'>

</script>

<template>
    <slot/>
    
</template>

<style >
  .info_popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fbfff1;
    padding: 20px 30px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    z-index: 1000;
    width: 20%;
    min-width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Contenedor de botones en el popup */
  .info_popup .button__container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .info_popup .button__container button {
    display: flex;
    width: 50%;
    height: 2em;
    margin: 0.3em;
    align-items: center;
    justify-content: center;
  }

  .info_popup .button__container .accept {
    background-color: #090c9b;
    color: #fbfff1;
    width: min-content;
    padding: 0 5%;

  }
  .info_popup .button__container .accept:disabled {
    cursor: not-allowed; 
    opacity: 0.6; 
  }

  .info_popup .button__container .accept:hover {
    background-color: #3066be;
  }

</style>