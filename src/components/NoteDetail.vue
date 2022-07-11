<template>
    <div id="note-detail" class="note-detail">
        <note-side-bar />
        <h2>{{title}}:{{$route.params.noteId}}</h2>
    </div>
</template>

<script>
    import Auth from "../apis/auth";
    import NoteSideBar from "./NoteSideBar";
    export default {
        name: "NoteDetail",
        components: {NoteSideBar},
        data() {
            return {
                title: '笔记详情'
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

<style scoped lang="less">

    .note-detail {
        flex: 1;
        display: flex;
        flex-direction: row;

        .note-detail-ct {
            height: 100%;
        }

        .note-empty {
            font-size: 50px;
            color: #ccc;
            text-align: center;
            margin-top: 100px;
        }

        .note-bar {
            padding: 4px 20px;
            border-bottom: 1px solid #eee;
            &:after {
                content:'';
                display: block;
                clear: both;
            }
            span {
                font-size: 12px;
                color: #999;
                margin-right: 4px;
            }
            .iconfont{
                float: right;
                margin-left: 4px;
                font-size: 18px;
                cursor: pointer;
            }

        }

        .note-title{
            input,span {
                display: inline-block;
                width: 100%;
                border: none;
                outline: none;
                font-size: 18px;
                padding: 10px 20px;
            }
        }

        .editor {
            height: ~"calc(100% - 70px)";
            position: relative;
        }
        textarea, .preview {
            position: absolute;
            width: 100%;
            height: 100%;
            padding: 20px;
        }

        textarea {
            border: none;
            resize: none;
            outline: none;
            font-size: 14px;
            font-family: 'Monaco', courier, monospace;
        }

        code {
            color: #f66;
        }
    }
</style>