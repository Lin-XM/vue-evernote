<template>
    <div>
        <h2>{{title}}:{{$route.params.noteId}}</h2>
    </div>
</template>

<script>
    import Auth from "../apis/auth";

    export default {
        name: "TrashDetail",
        data() {
            return {
                title: "回收笔记详情"
            }
        },
        created() {
            Auth.getInfo().then(res => {
                if (!res.isLogin) {
                    this.$router.push({path: '/login'})
                }
            })
        }
    }
</script>

<style scoped>

</style>