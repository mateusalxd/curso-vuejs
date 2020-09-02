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

- dentro da tag `template` deve existir somente uma tag raiz
- não é possível realizar a interpolação em atributos de tags, para fazer isso é necessário utilizar a diretiva `v-bind:` ou simplesmente `:`

```vue
<template>
  <div>
    <h1>{{ titulo }}</h1>
    <!-- usando interpolação -->
    <img v-bind:src="foto.url" :alt="foto.titulo" />
    <!-- usando diretiva v-bind: e : -->
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
