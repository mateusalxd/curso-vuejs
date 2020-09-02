<template>
  <div class="corpo">
    <h1 class="centralizado">{{ titulo }}</h1>
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="(foto, posicao) of fotos" :key="posicao">
        <meu-painel :titulo="foto.titulo">
          <img class="imagem-responsiva" :src="foto.url" :alt="foto.titulo" />
          <template v-slot:rodape>Posição da imagem {{posicao}}</template>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Painel from "./components/shared/painel/Painel.vue";
export default {
  components: {
    "meu-painel": Painel,
  },

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

<style scoped>
.corpo {
  font-family: Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}

.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.imagem-responsiva {
  width: 100%;
}
</style>
