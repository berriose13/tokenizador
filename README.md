# SPA para Tokenización y Recuperación de Tarjetas

Este proyecto consiste en un backend desarrollado en TypeScript y un frontend implementado con Vue.js. Permite a los usuarios tokenizar información de tarjetas de crédito y luego recuperarla utilizando un token generado.

## Comenzando

Estas instrucciones te proporcionarán una copia del proyecto en funcionamiento en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (https://nodejs.org/)
- Redis (https://redis.io/download)
- Vue CLI (https://cli.vuejs.org/)

### Instalación

Instala las dependencias y configura el backend:

cd ts-backend
npm install

### Configuración de Redis

Asegúrate de tener Redis en ejecución localmente en el puerto por defecto (6379). Puedes descargar Redis y seguir las instrucciones de instalación en su sitio web oficial. En la mayoría de los sistemas, puedes iniciar Redis con el siguiente comando:

redis-server

### Ejecución del backend

Inicia el servidor de backend en el puerto `3000`:

npm start

### Configuración del frontend

Instala las dependencias del frontend:

cd spa-frontend
npm install

Inicia la aplicación frontend:

npm run serve

La aplicación estará disponible en `http://localhost:8080`.

## Uso

- Para tokenizar la información de una tarjeta, llena los campos requeridos en el formulario y presiona el botón "Tokenize Card".
- Para recuperar la información de una tarjeta tokenizada, introduce el token en el formulario correspondiente y presiona "Retrieve Card Data".

## Desarrollado con

- Vue.js - El framework web usado
- Express - El framework de servidor para Node.js
- Redis - Almacenamiento de clave-valor para la gestión de tokens

## Autor

- **Eleazar Berrios**