import Vue from 'vue'
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld";
import Login from '../components/Login.vue'
import NotebookList from "../components/NotebookList";
import NoteDetail from "../components/NoteDetail";
import TrashDetail from "../components/TrashDetail";
// import NoFound from '../components/NoFound'

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
            path:'/notebook',
            name:'NotebookList',
            component: NotebookList
        },
        {
            path:'/note/:noteId',
            name:'note',
            component: NoteDetail
        },
        {
            path:'/trash/:noteId',
            name:'trash',
            component: TrashDetail
        },

    ]
})
export default  router