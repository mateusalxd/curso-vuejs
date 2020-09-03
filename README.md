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
      // this.fotos se refere a propriedade do componente
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
    <!-- para que o componente consiga receber conteúdo, é necessário 
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

- o _data binding_ de eventos acontece através da diretiva `v-on` ou simplesmente `@`

```vue
<template>
    ...
    <!-- a propriedade filtro recebe o valor do input  -->
    <input
      type="search"
      class="filtro"
      placeholder="digite aqui seu filtro"
      v-on:input="filtro = $event.target.value"
    />
    <!-- $event permite acessar o evento -->
    <ul class="lista-fotos">
      <!-- utiliza a computed property fotosComFiltro para atualizar dinamicamente a lista,
      isso irá ocorrer sempre que a propriedade filtro for atualizada, para utilizá-la
      é necessário chamá-la como se fosse uma propriedade e não uma função -->
      <li class="lista-fotos-item" v-for="(foto, posicao) of fotosComFiltro" :key="posicao">
    ...
</template>

<script>
...
export default {
  ...
  // definição das computed properties
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
  data() {
    return {
      ...
      filtro: "",
    };
  },
  ...
};
</script>
```

- através da diretiva `v-show` é possível determinar se um elemento estará visível no DOM

```vue
<template>
  ...
  <div class="painel-conteudo" v-show="visivel">
    <slot></slot>
  </div>
  ...
</template>

<script>
export default {
  ...
  data() {
    return {
      visivel: true,
    };
  },
};
</script>
```

- Vue.js facilita o uso de classes para realização de transições através da tag `<transition>` [(ref)](https://vuejs.org/v2/guide/transitions.html)

```vue
<template>
  ...
  <!-- dentro da tag transition deve existir somente um elemento -->
  <transition name="painel-fade">
    <!-- o atributo name define o prefixo da classe, 
    que nesse caso será painel-fade -->
    <div class="painel-conteudo" v-show="visivel">
      <slot></slot>
    </div>
  </transition>
  ...
</template>
<style scoped>
/* ... */
/* -enter, -leave-active e -enter-active é adicionado dinamicamente
pelo Vue.js, considerando o name da transition definida */
.painel-fade-enter,
.painel-fade-leave-active {
  opacity: 0;
}

.painel-fade-enter-active,
.painel-fade-leave-active {
  transition: opacity 0.4s;
}
</style>
```

- para utilizar rotas é necessário realizar as configurações a seguir

```javascript
// arquivo routes.js
import Home from "./components/home/Home.vue";
import Cadastro from "./components/cadastro/Cadastro.vue";

// criar uma variável com as rotas e componentes correspondentes
export const routes = [
  { path: "", component: Home, name: "Home" },
  { path: "/cadastro", component: Cadastro, name: "Cadastro" },
];

// arquivo main.js
import { createApp } from "vue";
import App from "./App.vue";
import { createWebHistory, createRouter } from "vue-router";
import { routes } from "./routes";

// cria as rotas
const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router); // usar no app criado
app.mount("#app");
```

```vue
<!-- arquivo App.vue -->
<template>
  <div class="corpo">
    ...
    <!-- elemento que irá renderizar os componentes
    de acordo com as rotas -->
    <router-view></router-view>
  </div>
</template>
...

<!-- arquivo Menu.vue -->
<template>
  ...
  <li v-for="(rota, posicao) of rotas" v-bind:key="posicao">
    <!-- router-link possibilitará a navegação
    sem ser necessário recarregar a página -->
    <router-link :to="rota.path || '/'">{{ rota.name }}</router-link>
  </li>
  ...
</template>

<script>
export default {
  name: "meu-menu",
  /* esta é uma outra maneira de definir os
  atributos do componente, porém ao invés de
  utilizar um array, é informado um objeto */
  props: {
    rotas: {
      type: Array,
      required: true,
    },
  },
};
</script>
...
```

- através da propriedade `methods` é possível definir métodos que serão utilizados em eventos

```vue
<!-- arquivo Botao.vue -->
<template>
  <!-- define que o evento click do button 
  vai executar o método emiteClique-->
  <button @click="emiteClique()">{{ label }}</button>
</template>

<script>
export default {
  ...
  methods: {
    emiteClique() {
      if (this.confirmacao) {
        if (confirm("Deseja realizar a ação?")) {
          /* o componente irá emitir o evento botao-clicado
          que poderá ser recuperado no elemento pai */
          this.$emit("botao-clicado");
        }
        return;
      }
      /* caso necessário o evento pode enviar outros parâmetros
      além do nome do evento, e isso também poderá ser recuperado
      no elemento pai */
      this.$emit("botao-clicado", "somente um exemplo");
    },
  },
  ...
};
</script>

<!-- arquivo Home.vue -->
<template>
  ...
  <meu-painel :titulo="foto.titulo">
    <imagem-responsiva :url="foto.url" :titulo="foto.titulo" />
    <template v-slot:rodape>
      <!-- botao-clicado é o evento disparado pelo componente -->
      <meu-botao
        @botao-clicado="removerFoto(foto)"
        tipo="button"
        label="REMOVER"
        :confirmacao="true"
        estilo="perigo"
      />
      <!-- removerFoto é um método declarado em methods -->
    </template>
  </meu-painel>
  ...
</template>
```

- para realizar o _data binding_ em ambas direções, é possivel utilizar a diretiva `v-model`, que combinada com `lazy` pode atualizar a propriedade após sair do elemento, por exemplo `v-model.lazy="foto.url"`

- é possível utilizar uma rota nomeada em um `router-link` através de `<router-link :to="{name:'Home'}">`, o _name_ deve estar definido na rota que se deseja utilizar, isso é útil para quando é necessário mudar o _path_, pois dessa maneira não será necessário alterar em todos os locais que estavam utilizando o _path_ fixo
