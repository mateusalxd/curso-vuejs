<template>
  <nav>
    <ul>
      <li v-for="(rota, posicao) of rotas" v-bind:key="posicao">
        <router-link :to="rota.path||'/'">{{rota.name}}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "meu-menu",
  props: {
    rotas: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
</style>