// 获得某个笔记本里面的 笔记的内容个数

import request from "../helper/request";
import {friendDate} from '../helper/util.js'


const URL = {
    GET: '/notes/from/:notebookId',
    ADD: '/notes/to/:notebookId',
    UPDATE: '/notes/:noteId',
    DELETE: '/notes/:noteId'
}

export default {
    getAllNotes({notebookId}) {
        return new Promise((resolve, reject) => {
            request(URL.GET.replace(':notebookId', notebookId)).then(res => {
                res.data = res.data.map(note => {
                    note.createdAtFriendly = friendDate(note.createdAt)
                    note.updatedAtFriendly = friendDate(note.updatedAt)
                    return note
                }).sort((note1 , note2) =>{
                    return note1.updatedAt < note2.updatedAt
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateNote({noteId}, {title, content}) {
        return request(URL.UPDATE.replace(':noteId', noteId), "PATCH", {title, content})
    },
    deleteNote({noteId}) {
        return request(URL.DELETE.replace(':noteId', noteId), "DELETE")
    },
    addNote({notebookId}, {title = '', content = ''} = {title: '', content: ''}) {
        return request(URL.ADD.replace(':notebookId', notebookId), 'POST', {title, content})
    }
}
