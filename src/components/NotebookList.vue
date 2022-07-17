<template>
    <div class="detail" id="notebook-list">
        <header>
            <a href="#" class="btn" @click.prevent="onCreate">
                <img alt="" src="../assets/add.svg" class="iconfont icon-plus"/>
                <span class="iconText">新建笔记本</span>
            </a>
        </header>
        <main>
            <div class="layout">
                <h3>笔记本列表, 共{{notebooks.length}}</h3>
                <div class="book-list">
                    <router-link :to="`/note?notebookId=${notebook.id}`" v-for="notebook in notebooks"
                                 :key="notebook.id" class="notebook">
                        <div>
                            <span class="iconfont icon-notebook">{{notebook.title}}</span>
                            <span>{{notebook.noteCounts}}</span>
                            <span class="action" @click.stop.prevent="onEdit(notebook)">编辑</span>
                            <span class="action" @click.stop.prevent="onDelete(notebook)">删除</span>
                            <span class="date">{{notebook.friendDateCreatedAt}}</span>
                        </div>
                    </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    // 笔记本列表

    export default {
        name: 'NotebookList',
        data() {
            return {}
        },
        created() {
            this.checkLogin({path: '/login'})
            this.getNotebooks()
        },
        computed: {
            ...mapGetters(['notebooks'])
        },

        methods: {

            ...mapActions([
                'getNotebooks',
                'addNotebook',
                'updateNotebook',
                'deleteNotebook',
                'checkLogin'
            ]),

            onCreate() {
                this.$prompt('请输入新的笔记本标题', '创建笔记本', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.{1,30}$/,
                    inputErrorMessage: '标题不能为空，且长度不能超过30字符'
                }).then(({value}) => {
                    this.addNotebook({title: value})

                })
            },


            onEdit(notebook) {
                this.$prompt('请输入新的笔记本标题', '修改笔记本', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^.{1,30}$/,
                    inputErrorMessage: '标题不能为空，且长度不能超过30字符',
                    inputValue: notebook.title,
                }).then(({value}) => {
                    this.updateNotebook({notebookId: notebook.id, title: value})
                })
            },
            onDelete(notebook) {
                this.$confirm('确认删除该笔记本, 是否继续?', '删除该笔记本', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteNotebook({notebookId: notebook.id})
                })

            }
        }
    }
</script>

<style scoped lang="less">
    #notebook-list {
        flex: 1;


        header {
            border-bottom: 2px solid #999;
            padding: 12px 0;
            margin: 0 4px;
            max-width: 100%;
            display: flex;

            > .btn {
                justify-content: flex-start;
                margin: 4px 16px;

                left: 12px;

                > .iconfont {
                    width: 1em;
                    height: 1em;
                    vertical-align: -0.15em;
                    fill: currentColor;
                    overflow: hidden;
                }

                > .iconText {
                    font-size: 12px;
                    padding: 2px 2px;
                }
            }
        }


        input {
            width: 300px;
            height: 30px;
            line-height: 30px;
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 3px 5px;
            outline: none;
        }


        main {
            padding: 30px 40px;
        }

        .layout {
            max-width: 966px;
            margin: 0 auto;
        }


        main h3 {
            font-size: 12px;
            color: black;
            left: 0;
            text-align: left;
            margin-bottom: 10px;
        }

        main .book-list {

            font-size: 14px;
            max-height: 780px;
            color: #333;
            background-color: #fff;
            border-radius: 4px;
            font-weight: bold;
            overflow: auto;
        }
        main .book-list span {
            font-size: 12px;
            font-weight: bold;
            color: #b3c0c8;

        }

        main .date,
        main .action {
            float: right;
            margin-left: 10px;
        }

        main .iconfont {
            color: #1687ea;
            margin-right: 4px;
            left: 4px;

        }

        main .notebook {
            display: block;
            cursor: pointer;
        }

        main a.notebook:hover {
            background-color: #f7fafd;
        }

        main a.notebook div {
            border-bottom: 1px solid #ebebeb;
            padding: 12px 14px;
        }

        main .error-msg {
            font-size: 12px;
            color: red;
        }

    }
    #notebook-list ::-webkit-scrollbar{
        display: none;
    }
    #notebook-list{
        -ms-overflow-style:none;
        overflow: -moz-scrollbars-none;
        scrollbar-width: none;
        overflow-y:hidden;
        overflow-x:hidden;
    }
</style>