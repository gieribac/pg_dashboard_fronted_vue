const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Cambia esto según el puerto de tu Vue 3 (Vite usa 5173)
    // supportFile: "cypress/support/e2e.ts",
    defaultCommandTimeout: 10000,
    supportFile: false,
    experimentalSessionAndOrigin: true
  },
});

