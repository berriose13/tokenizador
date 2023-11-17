<template>
  <div>
    <form @submit.prevent="retrieveCard">
      <input v-model="token" type="text" placeholder="Token" required>
      <button type="submit">Retrieve Card Data</button>
    </form>
    <!-- Tabla para mostrar la respuesta de la API -->
    <table v-if="cardData">
      <thead>
        <tr>
          <th>Email</th>
          <th>Card Number</th>
          <th>CVV</th>
          <th>Expiration Month</th>
          <th>Expiration Year</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ cardData.email }}</td>
          <td>{{ cardData.card_number }}</td>
          <td>{{ cardData.cvv }}</td>
          <td>{{ cardData.expiration_month }}</td>
          <td>{{ cardData.expiration_year }}</td>
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
      token: '',
      cardData: null // Almacenará los datos de la tarjeta recibidos de la API
    }
  },
  methods: {
    async retrieveCard() {
      try {
        const response = await axios.get('http://localhost:3000/retrieve-card', {
          headers: { 'Token': 'pk_test_LsRBJkejzCOEEWOsw' },
          params: { token: this.token }
        });
        this.cardData = response.data; // Guardamos los datos de la tarjeta para mostrarlos en la tabla
      } catch (error) {
        console.error(error);
        // Manejar el error
        this.cardData = null; // Asegurarse de que no se muestren datos antiguos si hay un error
      }
    }
  }
}
</script>

<style>
/* Estilos básicos para la tabla */
table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>