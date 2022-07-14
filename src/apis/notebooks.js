import request from "../helper/request";
import {friendlyDate} from '../helper/util.js'


const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}

export default  {
    getAll(){
        return new Promise((resolve,reject)=>{
            request(URL.GET).then(res =>{
               res.data =  res.data.sort((notebook1, notebook2) => notebook1.createdAt  < notebook2.createdAt ? 1 : -1)
                res.data.forEach(notebook => {
                    notebook.friendDateCreatedAt = friendlyDate(notebook.createdAt)
                    notebook.updatedAtFriendly = friendlyDate(notebook.updatedAt)
                })
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    },
    updateNotebooks(notebookId, {title = ''} = { title :''}){
        return request(URL.UPDATE.replace(':id',notebookId), "PATCH", {title:title})
    },
    deleteNotebook(notebookId){
        return request(URL.DELETE.replace(':id', notebookId), "DELETE")
    },
    addNotebook({title = ''} = {title: ''}){
        return new Promise((resolve,reject)=>{
            request(URL.ADD,'POST',{title}).then(res =>{
                res.data.createdAtFriendly = friendlyDate(res.data.createdAt)
                res.data.updatedAtFriendly = friendlyDate(res.data.updatedAt)
                resolve(res)
            }).catch(error=>{
                reject(error)
            })
        })
    }
}

