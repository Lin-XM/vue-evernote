<template>
    <span :title="user.username">{{slug}}</span>
</template>

<script>
    export default {
        name: "Avatar",
        data(){
            return {
                user:{
                    username:"xiaoming"
                },
                slug:"H",
            }
        }
    }
</script>

<style scoped>
    span{
        display: inline-block;
        width: 30px;
        height: 30px;
        text-align: center;
        : 15px;
        line-height: 32px;
        border-radius: 50%;
        background-color: #f2b81c;
        color: #fff;
        text-shadow: 1px 0 1px #795c19;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 18px ;
        margin-bottom: 15px;
    }
</style>