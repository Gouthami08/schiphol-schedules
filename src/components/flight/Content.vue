<template>
    <div class="schiphol-content">
        <el-row class="schiphol-filter"><schiphol-filter/></el-row>
        <el-row><schiphol-flight-table/></el-row>
    </div>
</template>

<script>
import SchipholFilter from "./Filter.vue"
import SchipholFlightTable from "./Table.vue"
import { mapActions } from "vuex"

export default {
  name: "Schiphol-Fights-Schedules",
  data() {
    return {
      interval: null
    }
  },
  components: {
    SchipholFlightTable,
    SchipholFilter
  },
  methods: {
    ...mapActions(["callSchipholAPI"])
  },
  mounted() {
    this.callSchipholAPI()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>


<style scoped>
.schiphol-content {
  border-radius: 1px;
  background-color: rgb(243, 243, 183);
}
.schiphol-filter {
  background-color: #FFC700;
  color: white;
  margin: 0px
}
</style>
