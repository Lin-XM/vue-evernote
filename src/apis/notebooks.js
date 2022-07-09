import request from "../helper/request";
import {friendDate} from '../helper/util.js'


const URL = {
    GET:'/notebooks',
    ADD:'/notebooks',
    UPDATE:'/notebooks/:id',
    DELETE:'/notebooks/:id'
}

export default  {
    getAll(){
        return new Promise((resolve,reject)=>{
            request(URL.GET).then(res =>{
               res.data =  res.data.sort((notebook1, notebook2) => notebook1.createdAt  < notebook2.createdAt ? 1 : -1)
                res.data.forEach(notebook => {
                    notebook.friendDateCreatedAt = friendDate(notebook.createdAt)
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
        return request(URL.ADD,'POST',{title})
    }
}

