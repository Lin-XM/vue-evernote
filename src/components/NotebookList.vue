<template>
    <div class="detail" id="notebook_list">
       <header>
           <a href="#" class="btn">
               <i class="iconfont icon-plus"></i>
           </a>
       </header>
        <main>
            <div class="layout">
                <h3>笔记本链表</h3>
                <div class="book-list">
                    <a href="#" class="notebook">
                        <div>
                            <span class="iconfont icon-notebook">笔记本标题1</span>
                            <span>3</span>
                            <span class="action">编辑</span>
                            <span class="action">删除</span>
                            <span class="date">3天前</span>
                        </div>
                    </a>
                    <a href="#" class="notebook">
                        <div>
                            <span class="iconfont icon-notebook">笔记本标题1</span>
                            <span>3</span>
                            <span class="action">编辑</span>
                            <span class="action">删除</span>
                            <span class="date">3天前</span>
                        </div>
                    </a>


                </div>
            </div>
        </main>
    </div>
</template>

<script>
import Auth from "../apis/auth";

export default {
    name:'NotebookList',
    data(){
        return {
            title:'notebook'
        }
    },
    created() {
        Auth.getInfo().then(res=>{
            if(!res.isLogin){
                this.$router.push({path:'/login'})
            }
        })
    }
}
</script>
<style scoped>

</style>