<template>
    <div>
        <h2>
            {{title}}
        </h2>
        <ul>
            <li><router-link to="/note/1">笔记本1</router-link></li>
            <li><router-link to="/note/2">笔记本2</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'NotebookList',
    data(){
        return {
            title:'notebook'
        }
    }
}
</script>
<style scoped>

</style>