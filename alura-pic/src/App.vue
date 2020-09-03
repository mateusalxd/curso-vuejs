<template>
  <div class="corpo">
    <meu-menu :rotas="routes" />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "./components/menu/Menu.vue";
import { routes } from './routes'
export default {
  components: {
    "meu-menu": Menu,
  },
  data() {
    return {routes: routes.filter(rota => rota.menu)}
  }
};
</script>

<style>
.corpo {
  font-family: Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}
</style>
