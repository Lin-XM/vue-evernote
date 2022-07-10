<template>
  <div class="hello">
    <h1>hello</h1>
    <el-row>
      <el-button @click="open">打开</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    open(){
      this.$message('这是一条消息提示信息！！')
    }
  }
}
</script>

<style scoped>

</style>
