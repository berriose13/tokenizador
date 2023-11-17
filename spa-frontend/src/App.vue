<template>
  <div id="app">
    <TokenizeCardForm />
    <RetrieveCardForm />
  </div>
  <div class="developer-signature">
    Desarrollado por Eleazar Berrios - 
    <a href="mailto:eleazar.berrios@unmsm.edu.pe">eleazar.berrios@unmsm.edu.pe</a>
  </div>
</template>

<script>
import TokenizeCardForm from './components/TokenizeCardForm.vue';
import RetrieveCardForm from './components/RetrieveCardForm.vue';

export default {
  name: 'App',
  components: {
    TokenizeCardForm,
    RetrieveCardForm
  }
}
</script>
<style>
  /* Resto de tus estilos */

  .developer-signature {
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 10px;
    font-size: 0.9em; /* ajusta el tamaño de la fuente como desees */
    font-family: 'Times New Roman', serif; /* o cualquier otra fuente elegante que prefieras */
    background-color: rgba(255, 255, 255, 0.7); /* un fondo ligero para legibilidad */
    color: #333; /* color del texto */
    z-index: 1000; /* asegura que el texto se muestre sobre otros elementos */
  }

  .developer-signature a {
    color: #333;
    text-decoration: none;
  }

  .developer-signature a:hover {
    text-decoration: underline;
  }
</style>