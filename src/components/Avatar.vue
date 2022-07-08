<template>
    <span :title="username">{{slug}}</span>
</template>

<script>
    import Auth from '../apis/auth'

    export default {
        name: "Avatar",
        data(){
            return {
                username:"未登录",
            }
        },
        created(){
            this.$bus.$on('userInfo', user =>{
                console.log(user.username);
                this.username = user.username
            })
            Auth.getInfo().then(res =>{
                console.log(res);
                if(res.isLogin){
                    this.username = res.data.username
                }
            })
        },
        beforeDestroy() {
            this.$bus.$off('userInfo')
        },
        computed:{
            slug(){
                return this.username.charAt(0)
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