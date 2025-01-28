<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { isTokenValid } from './services/authHelpers';
  const router = useRouter();
  const verifyToken = () => {
    if (!isTokenValid()) {
      router.push({ name: 'MainV' }); // Redirige al inicio si el token no es válido
    }
  };
  onMounted(() => {
    // Verificar token cada 21 minutos
    verifyToken(); // Verificación inicial
    setInterval(verifyToken, 21 * 60 * 1000); // Cada 21 minutos
  });
</script>

<template>
  <router-view/>

</template>

<style scoped> 

</style>
