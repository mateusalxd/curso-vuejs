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
export default {
  data() {
    return {
      titulo: "Alurapic",
      fotos: [
        {
          url:
            "http://data.biovet.com.br/file/2018/10/29/H104520-F00000-V006-2000x0.jpeg",
          titulo: "cachorro",
        },
        {
          url:
            "http://data.biovet.com.br/file/2018/10/29/H104520-F00000-V006-2000x0.jpeg",
          titulo: "Cachorrão",
        },
      ],
    };
  },
};
</script>

<style>
</style>
