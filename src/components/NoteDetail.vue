<template>
    <div>
        <h2>{{title}}:{{$route.params.noteId}}</h2>
    </div>
</template>

<script>
    export default {
        name: "NoteDetail",
        data() {
            return {
                title: '笔记详情'
            }
        }
    }
</script>

<style scoped>

</style>