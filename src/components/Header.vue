<template>
    <el-col :span="24" class="schiphol-header">
        <el-col :span="2"><img class="schiphol-logo" src="https://cdn6.aptoide.com/imgs/b/0/8/b08aeccad0c15df0167a11bf69bfd4b8_icon.png?w=256"/></el-col>
        <el-col :span="22"><h2>{{ title }}</h2></el-col>
    </el-col>
</template>

<script>
export default {
  data() {
    return {
      title: "SCHIPHOL AIRPORT"
    }
  }
}
</script>

<style scoped>
.el-col {
    text-align: left;
}
.schiphol-header {
  border-radius: 1px;
  background-color: rgb(111, 109, 216);
  color: azure;
  height: 75px;
  line-height: 75px;
  margin: 0px;
  top: 0;
}
.schiphol-header h2 {
  margin: 0px;
}
.schiphol-header .schiphol-logo {
    padding: 5px 0px 5px 15px;
    width: 60px
}
</style>
