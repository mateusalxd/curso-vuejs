import Home from './components/home/Home.vue'
import Cadastro from './components/cadastro/Cadastro.vue'

export const routes = [
    { path: '', component: Home, name: 'Home', menu: true },
    { path: '/cadastro', component: Cadastro, name: 'Cadastro', menu: true },
    { path: '/cadastro/:id', component: Cadastro, name: 'Atualizar', menu: false },
    { path: '/:catchAll(.*)', redirect: { name: 'Home' }, menu: false }
]