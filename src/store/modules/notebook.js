import Notebooks from "../../apis/notebooks";
import {Message} from 'element-ui'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    notebooks: null,
    curBookId: null
}
const getters = {
    notebooks: state => state.notebooks || [],
    curBook: state => {
        if(!Array.isArray(state.notebooks)) return {}
        if(!state.curBookId) return state.notebooks[0] || {}

        return state.notebooks.find(notebook => notebook.id === parseInt(state.curBookId))
    }
}

const mutations = {
    setNotebooks(state, payload) {
        state.notebooks = payload.notebooks
    },
    addNotebook(state, payload) {
        state.notebooks.unshift(payload.notebook)
    },
    updateNotebook(state, payload) {
        let notebook = state.notebooks.find(notebook => notebook.id.toString() === payload.notebookId) || {}
        notebook.title = payload.title
    },
    deleteNotebook(state, payload) {
        state.notebooks = state.notebooks.filter(notebook => notebook.id.toString() !== payload.notebookId)
    },
    setCurBook(state, payload) {
        state.curBookId = payload.curBookId

    },

}
const actions = {
    getNotebooks({commit,state}) {
        if(state.notebooks !== null ) return Promise.resolve()
        return Notebooks.getAll().then(res => {
            commit('setNotebooks', {notebooks: res.data})
        })
    },
    addNotebook({commit}, payload) {
        return Notebooks.addNotebook({title: payload.title}).then(res => {
            commit('addNotebook', {notebook: res.data})
            Message.success(res.msg)
        })
    },
    updateNotebook({commit}, payload) {
        return Notebooks.updateNotebooks(payload.notebookId, {title: payload.title}).then((res) => {

            commit('updateNotebook', {notebookId: payload.notebookId, title: payload.title})
            Message.success(res.msg)
        })
    },
    deleteNotebook({commit}, payload) {
        return Notebooks.deleteNotebook(payload.notebookId).then((res) => {
            commit('deleteNotebook', {notebookId: payload.notebookId})
            Message.success(res.msg)
        })
    }
}
export default {
    state, getters, mutations, actions
}