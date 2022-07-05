<template>
    <div id="app">
        <router-view/>
        <router-link to="/login">Login页面</router-link>
        <hr>
        <router-link to="/notebook">笔记页面</router-link>
        <hr>
        <router-link to="/note/:noteId">笔记内容页面</router-link>
        <hr>
        <router-link to="/trash/:noteId">回收页面</router-link>
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {}
    }
</script>

<style>
    #app {
    }
</style>
