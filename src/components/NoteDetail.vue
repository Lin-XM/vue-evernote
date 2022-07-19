<template>
    <div id="note" class="detail">

        <note-side-bar @update:updateNotes="value => notes = value"/>

        <div class="note-detail">
            <div class="note-empty" v-show="!curNote.id">请选择你查看的笔记</div>

            <div v-show="curNote.id">
                <div class="note-bar">
                    <span> 创建日期: {{curNote.createdAtFriendly}}</span>
                    <span> 更新日期: {{curNote.updatedAtFriendly}}</span>
                    <span>{{statusText}}</span>
                    <span @click="onDeleteNote"><img src="../assets/delete.svg" alt=""></span>
                    <span @click="isShow=!isShow">
                        <img src="../assets/eyes.svg" alt="">
                    </span>
                </div>

                <div class="note-title">
                    <label>
                        <input type="text" v-model="curNote.title" @input="onUpdateNote"
                               @keydown="statusText = '正在输入......' " placeholder="输入标题">
                    </label>
                </div>

                <div class="editor">
                    <label>
                        <textarea v-show="!this.isShow" v-model="curNote.content" @input="onUpdateNote"
                                  @inputread="statusText = '正在输入......'" placeholder="输入内容，支持 Markdown 语法">

                        </textarea>
                    </label>
                    <div class="preview markdown-body" v-html="previewContent" v-show="this.isShow">预览页面</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import NoteSideBar from "./NoteSideBar";
    import _ from 'lodash'
    import MarkdownIt from 'markdown-it'
    import {mapGetters, mapActions, mapMutations} from "vuex";

    let md = new MarkdownIt()
    export default {
        name: "NoteDetail",
        components: {NoteSideBar},
        data() {
            return {
                statusText: "笔记未更新",
                isShow: false
            }
        },
        created() {
            this.checkLogin({path: '/login'})
        },
        beforeRouteUpdate(to) {
            this.setCurNote({curNoteId: to.query.noteId})
        },
        methods: {
            ...mapMutations([
                'setCurNote'
            ]),
            ...mapActions([
                'updateNote',
                'deleteNote',
                'checkLogin'
            ]),
            onUpdateNote: _.debounce(function () {
                if(!this.curNote.id) return
                this.updateNote({
                    noteId: this.curNote.id,
                    title: this.curNote.title,
                    content: this.curNote.content
                }).then(() => {
                    this.statusText = '已更新'
                }).catch(() => {
                        this.statusText = '保存出错'
                    }
                )
            }, 3000),
            onDeleteNote() {
                this.deleteNote({noteId: this.curNote.id})
                    .then(() => {
                        this.$router.replace({path: '/note'})
                    })
            },

        },
        computed: {
            ...mapGetters([
                'notes',
                'curNote',
            ]),
            previewContent() {
                return md.render(this.curNote.content || '')
            }
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
            font-size: 16px;
            color: #ccc;
            text-align: center;
            margin-top: 100px;
            height: 100%;
        }

        .note-bar {
            padding: 4px 20px;
            border-bottom: 1px solid #eee;

            &:after {
                content: '';
                display: block;
                clear: both;
            }

            span {
                font-size: 12px;
                color: #999;
                margin: 0 8px;

                > img {
                    width: 1em;
                    height: 1em;
                    vertical-align: -0.15em;
                    fill: currentColor;
                    overflow: hidden;
                    color: #666;
                }
            }

            .iconfont {
                float: right;
                margin-left: 4px;
                font-size: 18px;
                cursor: pointer;
            }

        }

        .note-title {
            input, span {
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

            & ::-webkit-scrollbar {
                display: none;
            }
        }

        textarea, .preview {
            position: absolute;
            width: 100%;
            min-height: 90vh;
            padding: 20px;
        }

        textarea {
            left: 0;
            border: none;
            resize: none;
            outline: none;
            font-size: 14px;
            font-family: 'Monaco', courier, monospace;
        }

        code {
            color: #f66;
        }

        .markdown-body {
            text-align: start;
        }
    }
</style>