<template>
  <div>
    <h1 class="centralizado">{{ titulo }}</h1>
    <input
      type="search"
      class="filtro"
      placeholder="digite aqui seu filtro"
      v-on:input="filtro = $event.target.value"
    />
    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="(foto, posicao) of fotosComFiltro" :key="posicao">
        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
          <template v-slot:rodape>
            <meu-botao 
            @botao-clicado="removerFoto(foto)"
            tipo="button" 
            label="REMOVER" 
            :confirmacao="true" 
            estilo="perigo" />
          </template>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Painel from "../shared/painel/Painel.vue";
import ImagemResponsiva from "../shared/imagem-responsival/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
export default {
  components: {
    "meu-botao": Botao,
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
  },
  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let expressao = new RegExp(this.filtro.trim(), "i");
        return this.fotos.filter((foto) => expressao.test(foto.titulo));
      } else {
        return this.fotos;
      }
    },
  },
  methods: {
    removerFoto(foto) {
      alert(`A foto ${foto.titulo} foi removida.`);
    },
  },
  data() {
    return {
      titulo: "Alurapic",
      fotos: [],
      filtro: "",
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
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>
