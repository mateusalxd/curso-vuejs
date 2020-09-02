# Anotações do curso de Vue.js

- para criar um novo projeto, utilizar `vue create alura-pic` ou `vue ui` (para usar interface gráfica) [(ref)](https://cli.vuejs.org/guide/installation.html)
- Vue.js tem um conceito de _Single File Template_, onde em um arquivo existem as tags `<template>, <script> ` e `<style>`
- para realizar o _data binding_ unidirecional (da fonte de dados para o `template`), é necessário utilizar na tag `template` uma interpolação `{{ mensagem }}` e na tag `script` uma função chamada `data`, que retorna um objeto que tem a propriedade `mensagem`

```vue
<template>
  <!-- mensagem será interpolada pelo ... -->
  <p>{{ mensagem }}</p>
</template>
<script>
export default {
  name: "Mensagem",
  data() {
    return {
      // ... conteúdo de mensagem
      mensagem: "Isso é um teste",
    };
  },
};
</script>
```

- dentro da tag `template` deve existir somente uma tag raiz (a partir da versão 3 não tem essa restrição)
- não é possível realizar a interpolação em atributos de tags, para fazer isso é necessário utilizar a diretiva `v-bind:` ou simplesmente `:`

```vue
<template>
  <div>
    <!-- usando interpolação -->
    <h1>{{ titulo }}</h1>
    <!-- usando diretiva v-bind: e : -->
    <img v-bind:src="foto.url" :alt="foto.titulo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      titulo: "Alurapic",
      foto: {
        url:
          "http://data.biovet.com.br/file/2018/10/29/H104520-F00000-V006-2000x0.jpeg",
        titulo: "cachorro",
      },
    };
  },
};
</script>

<style></style>
```

- para realizar um `for` existe a diretiva `v-for`

```vue
<template>
  <div>
    <ul>
      <!-- fotos é um array de objetos que tem as propriedades url e titulo -->
      <li v-for="(foto, posicao) of fotos" :key="posicao">
        <img :src="foto.url" :alt="foto.titulo" />
      </li>
    </ul>
  </div>
</template>
```

- Vue.js possui o ciclo de vida `created` que pode ser utilizado para recuperar dados de uma API externa, por exemplo

```vue
<script>
// na versão 2 de Vue.js, tinha a vue-resource
import axios from "axios";
export default {
  data() {
    return {
      titulo: "Alurapic",
      // propriedade do componente
      fotos: [],
    };
  },
  created() {
    axios.get("http://localhost:3000/v1/fotos").then(
      // this.fotos se referi a propriedade do componente
      (fotos) => (this.fotos = fotos.data),
      (err) => console.log(err)
    );
  },
};
</script>
```

- a criação de um componente pode ser observada abaixo

```vue
<!-- arquivo Painel.vue -->
<template>
  <div class="painel">
    <!-- pode ser utilizada a interpolação dos atributos do componente -->
    <h2 class="painel-titulo">{{ titulo }}</h2>
    <!-- para que o componete consiga receber conteúdo, é necessário 
    utilizar a tag <slot> que pode ser nomeada ou não, na linha abaixo
     o slot não é nomeado, então será considerado o slot padrão -->
    <slot class="painel-conteudo"></slot>
    <!-- slot chamado rodape -->
    <slot name="rodape"></slot>
  </div>
</template>
<script>
export default {
  name: "meu-painel",
  // define quais são os atributos do componente
  props: ["titulo"],
};
</script>
<!-- o scoped garante que o style não seja 
compartilhado com todos os componentes -->
<style scoped>
/* CSS */
</style>

<!-- arquivo App.vue -->
<template>
  ...
  <li class="lista-fotos-item" v-for="(foto, posicao) of fotos" :key="posicao">
    <!-- usando o componente importado -->
    <meu-painel :titulo="foto.titulo">
      <!-- tag img utiliza o slot padrão -->
      <img class="imagem-responsiva" :src="foto.url" :alt="foto.titulo" />
      <!-- o template abaixo entra no lugar do slot rodape -->
      <template v-slot:rodape>Posição da imagem {{ posicao }}</template>
    </meu-painel>
  </li>
  ...
</template>
<script>
// importa o componente
import Painel from "./components/shared/painel/Painel.vue";
export default {
  components: {
    // faz a ligação do nome da tag com o componente
    "meu-painel": Painel,
  },
  ...
};
</script>
<!-- style sem scoped é aplicado para todos os componentes -->
<style>
/* CSS */
</style>
```
