<template>
    <div id="trash" class="detail">
        <div class="note-sidebar">
            <h3 class="notebook-title">回收站</h3>
            <div class="menu">
                <div>更新时间</div>
                <div>标题</div>
            </div>
            <ul class="trashNotes">
                <li v-for="note in trashNotes" :key="note.id">
                    <router-link :to="`/trash?noteId=${note.id}`">
                        <span class="date">{{note.updatedAtFriendly}}</span>
                        <span class="title">{{note.title}}</span>
                    </router-link>
                </li>
            </ul>
        </div>

        <div class="note-detail">
            <div class="note-bar" v-if="true">
                <span>创建日期：{{curTrashNote.createdAtFriendly}}</span>
                <span> | </span>
                <span>更新日期：{{curTrashNote.updatedAtFriendly}}</span>
                <span> | </span>
                <span>所属笔记本:{{belongTo}}</span>
                <a class="btn action" @click="onRevert">恢复</a>
                <a class="btn action" @click="onDelete">彻底删除</a>
            </div>
            <div class="note-title">
                <span>笔记标题:{{curTrashNote.title}}</span>
            </div>
            <div class="editor">
                <div class="preview markdown-body" v-html="compileMarkdown"></div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapActions, mapMutations, mapGetters} from 'vuex'
    import MarkdownIt from "markdown-it";

    let md = new MarkdownIt()

    export default {
        name: "TrashDetail",
        data() {
            return {}
        },
        beforeRouteUpdate(to) {
            this.setCurTrashNote({curTrashNoteId: to.query.noteId})
        },
        created() {
            this.checkLogin({path: '/login'})
            this.getNotebooks()
            this.getAllTrashNotes().then(() => {
                // 路由的问题
                console.log('ffff', this.$route.query.noteId);
                this.setCurTrashNote({ curTrashNoteId: this.$route.query.noteId })
            })
        },

        computed: {
            ...mapGetters([
                'trashNotes',
                'curTrashNote',
                'belongTo'
            ]),
            compileMarkdown() {
                return md.render(this.curTrashNote.content || '')
            }
        },
        methods: {
            ...mapActions([
                'checkLogin',
                'getAllTrashNotes',
                'removeTrashNote',
                'revertTrashNote',
                'getNotebooks'
            ]),
            ...mapMutations([
                'setCurTrashNote'
            ]),
            onDelete() {
                this.removeTrashNote({noteId: this.curTashNote.id})
            },
            onRevert() {
                this.revertTrashNote({noteId: this.curTashNote.id})
            },
        },

    }
</script>

<style scoped lang="less">
    #trash {
        display: flex;
        align-items: stretch;
        background-color: #fff;
        flex: 1;

        .note-bar {
            .action {
                float: right;
                margin-left: 10px;
                padding: 2px 4px;
                font-size: 12px;

            }
        }
    }

    .note-sidebar {
        position: relative;
        width: 290px;
        border-right: 1px solid #ccc;
        background-color: #eee;

        .notebook-title {
            font-size: 18px;
            font-weight: normal;
            color: #333;
            height: 45px;
            line-height: 45px;
            text-align: center;
            border-bottom: 2px solid #ccc;
            background-color: #f7f7f7;
            display: block;
        }

        .menu {
            display: flex;

            div {
                font-size: 12px;
                padding: 2px 10px;
                flex: 1;
                border-right: 1px solid #ccc;
                border-bottom: 1px solid #ccc;

                &:last-child {
                    border-right: none;
                }
            }

            .iconfont {
                font-size: 10px;
            }
        }

        .trashNotes {
                max-height: 92%;
                overflow: auto;
            li {
                &:nth-child(odd) {
                    background-color: #f2f2f2;
                }

                a {
                    display: flex;
                    padding: 3px 0;
                    font-size: 12px;
                    border: 2px solid transparent;
                }

                .router-link-exact-active {
                    border: 2px solid #81c0f3;
                    border-radius: 3px;
                }

                span {
                    padding: 0 10px;
                    flex: 1;
                }
            }
        }
        .trashNotes {
            -ms-overflow-style:none;
            overflow: -moz-scrollbars-none;
            scrollbar-width: none;
            overflow-y:scroll;
            overflow-x:hidden;

        }
        .trashNotes ::-webkit-scrollbar{
            display: none;
        }
    }

    .note-detail {
        flex: 1;
        display: flex;
        flex-direction: column;


        .note-bar {
            padding: 4px 20px;
            border-bottom: 2px solid #999;
            margin: 0 4px;

            &:after {
                content: '';
                display: block;
                clear: both;
            }

            span {
                font-size: 12px;
                color: #999;
                margin-right: 4px;
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
                text-align: left;
            }
        }

        .editor {
            height: ~"calc(100% - 70px)";
            position: relative;
        }

        .markdown-body {
            padding: 10px 20px;
            text-align: left;
        }

    }

</style>