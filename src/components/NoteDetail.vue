<template>
    <div id="note" class="detail">

        <note-side-bar :curNote = 'curNote' @update:updateNotes="value => notes = value" />

        <div class="note-detail">
            <div class="note-bar">
                <span>创建日期：{{curNote.createdAtFriendly}}</span>
                <span>更新日期：{{curNote.updatedAtFriendly}}</span>
                <span>{{curNote.statusText}}</span>
            </div>
            <div class="note-title">
                <label>
                    <input type="text" v-model="curNote.title" placeholder="输入标题">
                </label>
            </div>
            <div class="editor">
                <label>
                    <textarea v-show="true" :value="curNote.content" placeholder="输入内容，支持 Markdown 语法" ></textarea>
                </label>
<!--                <div class="preview markdown-body"  v-show="false">预览页面</div>-->

            </div>
        </div>
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
                curNote:{},
                notes:[]
            }
        },
        created() {
            Auth.getInfo().then(res => {
                if (!res.isLogin) {
                    this.$router.push({path: '/login'})
                }
            })
        },
        beforeRouteUpdate(to){
            console.log( typeof to.query.noteId);
            console.log(this.notes);
            this.curNote = this.notes.find(note => note.id.toString() === to.query.noteId)
        }
    }
</script>

<style scoped lang="less">
    #note {
        display: flex;
        align-items: stretch;
        background-color: #fff;
        flex: 1;
    }
    .note-detail {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
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
            width: 50%;
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