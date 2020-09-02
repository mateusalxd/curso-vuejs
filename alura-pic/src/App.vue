<template>
  <div>
    <h1>{{ titulo }}</h1>
    <ul>
      <li v-for="(foto, posicao) of fotos" :key="posicao">
        <img :src="foto.url" :alt="foto.titulo" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
    };
  },
  created() {
    axios.get("http://localhost:3000/v1/fotos").then(
      (fotos) => (this.fotos = fotos.data),
      (err) => console.log(err)
    );
  },
};
</script>

<style>
</style>
