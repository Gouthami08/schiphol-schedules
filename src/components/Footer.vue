<template>
    <el-col :span="24" class="schiphol-footer">
        <el-row>
          <el-col :span="8">Current Time: {{ currentTime }}</el-col>
          <el-col :span="8"><i class="el-icon-refresh" @click="callSchipholAPI"></i></el-col>
          <el-col :span="8">Updated Time: {{ updatedTime }}</el-col>
        </el-row>
    </el-col>
</template>

<script>
import { mapGetters } from "vuex"
import { mapActions } from "vuex"
import moment from "moment"

export default {
  name: "SchipholFooter",
  data() {
    return {
      currentTime: ""
    }
  },
  methods: {
    ...mapActions(["callSchipholAPI"]),
    time() {
      var self = this
      this.currentTime = moment().format("DD-MM-YYY, HH:mm:ss")
      setInterval(self.time, 1000)
    }
  },
  mounted: function() {
    this.time()
  },
  computed: {
    ...mapGetters(["updatedTime"])
  }
}
</script>

<style>
.schiphol-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgb(71, 61, 61);
  color: azure;
  height: 30px;
  line-height: 30px;
  text-decoration-style: solid;
  font-style: italic;
  font-family: "Magra";
}
i:hover{
    background-color: rgb(182, 184, 184);
}
</style>
