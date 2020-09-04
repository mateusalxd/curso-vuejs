<template>
  <button :type="tipo" class="botao" :class="estiloDoBotao" @click="emiteClique()">{{label}}</button>
</template>

<script>
export default {
  name: "meu-botao",
  props: {
    tipo: { type: String, required: true },
    confirmacao: { type: Boolean, required: false },
    estilo: { type: String, required: false },
    label: { type: String, required: true },
  },
  methods: {
    emiteClique() {
      if (this.confirmacao) {
        if (confirm("Deseja realizar a ação?")) {
          this.$emit("botao-clicado");
        }
        return;
      }
      this.$emit("botao-clicado");
    },
  },
  computed: {
    estiloDoBotao() {
      if (!this.estilo || this.estilo == "padrao") return "botao-padrao";
      else return "botao-perigo";
    },
  },
};
</script>

<style scoped>
.botao {
  display: inline-block;
  padding: 10px;
  border-radius: 3px;
  margin: 10px;
  font-size: 1.2em;
}

.botao-perigo {
  background: firebrick;
  color: white;
}

.botao-padrao {
  background: darkcyan;
  color: white;
}
</style>