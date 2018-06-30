<template>
  <div id="app">
    <el-row>
      <el-col :offset="1" :span="22">
        <el-row><schiphol-header/></el-row>
        <el-row><schiphol-content/></el-row>
        <el-row><schiphol-footer/></el-row>  
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SchipholHeader from "./components/Header.vue"
import SchipholFooter from "./components/Footer.vue"
import SchipholContent from "./components/flight/Content.vue"

export default {
  name: "schiphol-app",
  components: {
    SchipholHeader,
    SchipholContent,
    SchipholFooter
  }
}
</script>

<style>
body {
  background-color: #b8bdc2;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
