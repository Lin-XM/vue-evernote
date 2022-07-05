<template>
    <div>
        <h2>{{title}}:{{$route.params.noteId}}</h2>
    </div>
</template>

<script>
    export default {
        name: "TrashDetail",
        data(){
            return {
                title:"回收笔记详情"
            }
        }
    }
</script>

<style scoped>

</style>