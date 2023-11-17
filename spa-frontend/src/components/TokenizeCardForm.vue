<template>
  <div class="container">
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <input v-model="email" type="email" placeholder="Email" required>
        <input v-model="cardNumber" type="text" placeholder="Card Number" required>
        <input v-model="cvv" type="text" placeholder="CVV" required>
        <input v-model="expirationMonth" type="text" placeholder="Expiration Month" required>
        <input v-model="expirationYear" type="text" placeholder="Expiration Year" required>
        <button type="submit">Tokenize Card</button>
      </form>
    </div>
     <!-- Tabla para mostrar la respuesta de la API -->
    <table v-if="apiResponse">
      <thead>
        <tr>
          <th>Token generado para consultas</th>>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ apiResponse }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      cardNumber: '',
      cvv: '',
      expirationMonth: '',
      expirationYear: '',
      apiResponse: null,
    }
  },
  methods: {
    async submitForm() {
      const cardData = {
        email: this.email,
        card_number: this.cardNumber,
        cvv: this.cvv,
        expiration_month: this.expirationMonth,
        expiration_year: this.expirationYear
      };
      try {
        const response = await axios.post('http://localhost:3000/tokenize', cardData, {
          headers: { 'Token': 'pk_test_LsRBJkejzCOEEWOsw' }
        });
        this.apiResponse = JSON.stringify(response.data, null, 2); // formatear la respuesta para visualización
      } catch (error) {
        if (error.response) {
          // La respuesta que se recibió si el servidor respondió con un estado fuera del rango 2xx
          this.apiResponse = JSON.stringify(error.response.data, null, 2);
        } else if (error.request) {
          // La petición fue hecha pero no se recibió respuesta
          this.apiResponse = 'The request was made but no response was received';
        } else {
          // Algo falló al configurar la petición
          this.apiResponse = error.message;
        }
      }
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: space-between;
}

.form-container {
  /* estilos para el formulario */
}

.response-container {
  /* estilos para el panel de respuesta */
  margin-left: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  max-width: 300px;
}

pre {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.75rem;
  overflow-x: auto; /* asegura que el contenido no desborde horizontalmente */
}
</style>
