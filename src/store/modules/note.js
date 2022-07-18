import Notes from "../../apis/notes";
import {Message} from 'element-ui'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    notes: null,
    curNoteId: null
}
const getters = {
    notes: state => state.notes,
    curNote: state => {
        if (!Array.isArray(state.notes)) return { title:'', content:''}
        if (!state.curNoteId) return state.notes[0] || { title:'', content:''}
        return state.notes.find(note => note.id.toString() === state.curNoteId) || { title:'', content:''}
    }
}

const mutations = {
    setCurNote(state, payload={}) {
        state.curNoteId = payload.curNoteId
    },

    setNotes(state, payload) {
        state.notes = payload.notes
    },
    addNote(state, payload) {
        state.notes.unshift(payload.note)
    },
    updateNote(state, payload) {
        let note = state.notes.find(note => note.id === payload.noteId) || {}
        note.title = payload.title
        note.content = payload.content
    },
    deleteNote(state, payload) {
        state.notes = state.notes.filter(note => note.id !== payload.noteId)
    }
}
const actions = {
    getNotes({commit}, {notebookId}) {
        return Notes.getAllNotes({notebookId}).then(res => {
            commit('setNotes', {notes: res.data})
        })
    },
    addNote({commit}, {notebookId, title, content}) {
         return Notes.addNote({notebookId}, {title, content}).then(res => {
            commit('addNote', {note: res.data})
            Message.success(res.msg)
        })
    },
    updateNote({commit}, {noteId, title, content}) {
        return Notes.updateNote({noteId}, {title, content}).then(() => {

            commit('updateNote', {noteId, title, content})
        })
    },
    deleteNote({commit}, {noteId}) {
        return Notes.deleteNote({noteId}).then((res) => {
            commit('deleteNote', {noteId})
            Message.success(res.msg)
        })
    }
}
export default {
    state, getters, mutations, actions
}