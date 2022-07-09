<template>
    <div class="detail" id="notebook-list">
       <header>
           <a href="#" class="btn" @click="onCreate">
               <i class="iconfont icon-plus">新建笔记本</i>
           </a>
       </header>
        <main>
            <div class="layout">
                <h3>笔记本列表{{notebooks.length}}</h3>
                <div class="book-list">
                    <router-link to="/note/1" v-for="notebook in notebooks" :key="notebook.id"  class="notebook">
                        <div>
                            <span class="iconfont icon-notebook">{{notebook.title}}</span>
                            <span>{{notebook.noteCounts}}</span>
                            <span class="action" @click="onEdit">编辑</span>
                            <span class="action" @click="onDelete">删除</span>
                            <span class="date">3天前</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Auth from "../apis/auth";
import notebooksList from "../apis/notebooks";


// 笔记本列表


export default {
    name:'NotebookList',
    data(){
        return {
            notebooks:[]
        }
    },
    created() {
        Auth.getInfo().then(res=>{
            if(!res.isLogin){
                this.$router.push({path:'/login'})
            }
            console.log(res.data);
        })

        notebooksList.getAll().then(res =>{
            console.log(res.data);
            this.notebooks = res.data
        })

    },
    methods:{
        onCreate(){
            console.log('create');
        },
        onEdit(){
            console.log('Edit');
        },
        onDelete(){
            console.log('delete');
        }
    }
}
</script>
<style scoped lang="less">
    #notebook-list {
        flex: 1;

        .btn {
            font-size: 12px;
            color: #666;
            cursor: pointer;
            margin-left: 10px;
        }
        .btn .iconfont {
            font-size: 12px;
        }

        input {
            width: 300px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 3px 5px;
            outline: none;
        }

        header {
            padding: 12px;
            border-bottom: 1px solid #ccc;
        }

        main {
            padding: 30px 40px;
        }
        .layout {
            max-width: 966px;
            margin: 0 auto;
        }


        main h3{
            font-size: 12px;
            color: black;
            left:0;
            text-align: left;
        }

        main .book-list {
            margin-top: 10px;
            font-size: 14px;
            color: #333;
            background-color: #fff;
            border-radius: 4px;
            font-weight: bold;
        }
        main .book-list span {
            font-size: 12px;
            font-weight: bold;
            color: #b3c0c8;
        }
        main .date,
        main .action{
            float: right;
            margin-left: 10px;
        }
        main .iconfont {
            color: #1687ea;
            margin-right: 4px;
            left: 4px;
        }
        main .notebook {
            display: block;
            cursor: pointer;
        }
        main a.notebook:hover {
            background-color: #f7fafd;
        }

        main a.notebook div {
            border-bottom: 1px solid #ebebeb;
            padding: 12px 14px;
        }

        main .error-msg {
            font-size: 12px;
            color: red;
        }

    }
</style>