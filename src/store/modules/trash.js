import Vue from 'vue'
import Vuex from 'vuex'
import Trash from "../../apis/trash";
import {Message} from "element-ui";

Vue.use(Vuex)
const state = {
    trashNotes: null,
    curTrashNoteId: null,
}
const getters = {
    trashNotes: state => state.trashNotes || {},
    curTrashNote: (state, getter) => {
        if (!state.curTrashNoteId) return getter.trashNotes[0] || {}
        return state.trashNotes.find(note => note.id === state.curTrashNoteId) || {}
    },
    belongTo: (state, getter, rootStates, rootGetters) => {
        let notebook = rootGetters.notebooks.find(notebook => notebook.id === getters.curTrashNote.notebookId) || {}
        return notebook.title || ""
    }
}

const mutations = {
    setTrashNotes(state, payload) {
        state.trashNotes = payload.trashNotes
        console.log(payload.trashNotes === state.trashNotes);
    },
    setCurTrashNote(state, payload={}) {
        state.curTrashNoteId = payload.curTrashNoteId
    },
    addTrashNote(state, payload) {
        this.setTrashNotes.unshift(payload.note)
    },
    deleteTrashNote(state, payload) {
        state.trashNotes = state.trashNotes.filter(note => note.id !== payload.noteId)
    }

}
const actions = {
    // 获得删除的笔记
    getAllTrashNotes({commit}) {
        return Trash.getAllTrashNotes().then(res => {
            commit('setTrashNotes', {trashNotes: res.data})
            console.log('fuck');
        })
    },
    // 彻底删除
    removeTrashNote({commit}, {noteId}) {
        return Trash.deleteTrashNote({noteId}).then((res) => {
            commit("deleteTrashNote", {noteId})
            Message.success(res.msg)
        })
    },
    // 恢复
    revertTrashNote({commit}, {noteId}) {
        return Trash.revertTrashNote({noteId}).then((res) => {
            commit("deleteTrashNote", {noteId})
            Message.success(res.msg)
        })
    }
}
export default {
    state, getters, mutations, actions
}