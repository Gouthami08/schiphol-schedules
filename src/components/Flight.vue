<template>
    <div class="schiphol-flight">
        <el-row class="schiphol-flight-filter"><schiphol-flight-filter/></el-row>
        <el-row><schiphol-flight-table/></el-row>
    </div>
</template>

<script>
import SchipholFlightFilter from "./flight/Filter.vue";
import SchipholFlightTable from "./flight/Table.vue";
import { mapActions } from "vuex";

export default {
  name: "SchipholFlight",
  data() {
    return {
      interval: null
    };
  },
  components: {
    SchipholFlightTable,
    SchipholFlightFilter
  },
  methods: {
    ...mapActions(["callSchipholAPI"]),
  },
  mounted() {
    let vm = this
    vm.callSchipholAPI()
    /*this.interval = setInterval(()=> {
      vm = vm.callSchipholAPI()
    }, 600000) */
  },
  beforeDestroy() {
   // clearInterval(this.interval)
  }
};
</script>


<style scoped>
.schiphol-flight {
  border-radius: 1px;
  background-color: #ffc700;
}
.schiphol-flight-filter {
  background-color: #000000;
  color: white;
  margin: 0px;
}
</style>
