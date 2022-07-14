import Vue from 'vue'
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld";
import Login from '../components/Login.vue'
import NotebookList from "../components/NotebookList";
import NoteDetail from "../components/NoteDetail";
import TrashDetail from "../components/TrashDetail";

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path:'/login',
            name:'Login',
            component: Login
        },
        {
            path:'/notebooks',
            name:'NotebookList',
            component: NotebookList
        },
        {
            path:'/note',
            name:'note',
            component: NoteDetail
        },
        {
            path:'/trash',
            name:'trash',
            component: TrashDetail
        },

    ]
})
export default  router