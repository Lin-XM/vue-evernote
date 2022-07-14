import request from "../helper/request";
import {friendlyDate} from '../helper/util.js'


const URL = {
    GET:'/notes/trash',
    REVERT:'/notes/:noteId/revert',
    DELETE:'/notes/:noteId'
}

export default  {
    getAllTrashNotes(){
        return new Promise((resolve,reject)=>{
            request(URL.GET).then(res =>{
                res.data =  res.data.sort((note1, note2) => note1.createdAt  < note2.createdAt ? 1 : -1)
                res.data.forEach(note => {
                    note.friendDateCreatedAt = friendlyDate(note.createdAt)
                    note.updatedAtFriendly = friendlyDate(note.updatedAt)
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },

    deleteTrashNote(noteId){
        return request(URL.DELETE.replace(':noteId', noteId), "DELETE")
    },
    revertTrashNote(noteId){
        return request(URL.DELETE.replace(':noteId', noteId), "PATCH")
    },

}

