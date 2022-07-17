<template>
    <div class="sidebar">
        <avatar/>

        <div class="icons">
            <router-link to="/note" title="笔记">
                <img alt="" src="../assets/notebook.svg" class="iconfont icon-note">
            </router-link>
            <router-link to="/notebooks" title="笔记本">
                <img alt='' src="../assets/note.svg" class="iconfont icon-notebook">
            </router-link>
            <router-link to="/trash" title="回收站">
                <img alt="" src="../assets/trash.svg" class="iconfont icon-trash">
            </router-link>
        </div>
        <div class="logout">
            <img alt="" src="../assets/logout.svg" class="iconfont icon-logout" @click="logout">
        </div>
    </div>
</template>

<script>
    import Avatar from "./Avatar";
    import Auth from '../apis/auth.js'

    export default {
        name: "Sidebar",
        components: {Avatar},
        methods: {
            logout() {
                Auth.logout().then(() => {
                    this.$router.push({path: 'login'})
                })
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        width: 56px;
        min-height: 100%;
        /*max-height: 900px;*/
        text-align: center;
        background-color: #2c333c;
        position: relative;

    }

    .icons {
        margin-top: 15px;

    }

    .icons > a {
        padding: 6px 0;
        display: block;
    }
    .router-link-active {
        background-color: #5e6266;
    }

    .logout {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        cursor: pointer;
    }

    .iconfont {
        color: #fff;

        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>