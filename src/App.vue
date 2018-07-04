<template>
  <div id="app">
    <el-row>
      <el-col :offset="1" :span="22">
        <el-row><schiphol-header/></el-row>
        <el-row><schiphol-flight/></el-row>
        <el-row><schiphol-footer/></el-row>  
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SchipholHeader from "./components/Header.vue"
import SchipholFooter from "./components/Footer.vue"
import SchipholFlight from "./components/Flight.vue"

export default {
  name: "schiphol-app",
  components: {
    SchipholHeader,
    SchipholFlight,
    SchipholFooter
  }
}
</script>

<style>
body, html {
  background-color: #b8bdc2;
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  border-radius: 5px !important;
}
</style>
