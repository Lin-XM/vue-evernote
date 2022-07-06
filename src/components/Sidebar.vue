<template>
    <div class="sidebar">
        <div class="icons">
            <avatar></avatar>
            <router-link to="/note/1" title="笔记"> <img alt="" src="../assets/notebook.svg" class="iconfont icon-note"></router-link>
            <router-link to="/notebooks" title="笔记本"><img alt='' src="../assets/note.svg" class="iconfont icon-notebook"> </router-link>
            <router-link to="/trash/1" title="回收站"><img alt="" src="../assets/trash.svg" class="iconfont icon-trash"> </router-link>
        </div>
        <div class="logout" >
            <img alt="" src="../assets/logout.svg" class="iconfont icon-logout">
        </div>
    </div>
</template>

<script>
    import Avatar from "./Avatar";
    export default {
        name: "Sidebar",
        components: {Avatar}
    }
</script>

<style scoped >
    .sidebar{
        width: 56px ;
        height: 100vh;
        text-align: center;
        background-color: #2c333c;
        position: relative;
    }
    .icons{
        margin-top: 15px;

    }
    .icons >a{
        padding: 6px 0 ;
        display: block;
    }
    .icons > .router-link-active{
        background-color: #5e6266;
    }
    .logout{
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        cursor: pointer;
    }
    .iconfont {
        color:#fff;

        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>