<template>
    <div>
    <h4>{{ tableTitle }} </h4>
    <el-table class="schiphol-flight-table" stripe border
      :data="filteredFlights" highlight-current-row max-height="700">
        <el-table-column prop="flightName" label="Flight Name" align="center" sortable>
        </el-table-column>
        <el-table-column prop="publicFlightState.flightStates" label="Flight State" align="center" sortable>
        </el-table-column>
        <el-table-column prop="scheduleTime" label="Scheduled Time" align="center" sortable>
        </el-table-column>
        <el-table-column prop="estimatedLandingTime" label="Estimated Landing Time" align="center" sortable>
        </el-table-column>
        <el-table-column prop="actualLandingTime" label="Actual Landing Time" align="center" sortable>
        </el-table-column>
        <el-table-column prop="route.destinations" label="Routed Destinations" align="center" sortable>
        </el-table-column>
        <el-table-column prop="terminal" label="Terminal" align="center" sortable>
        </el-table-column>
        <el-table-column prop="baggageClaim.belts" label="Baggage Belts" align="center" sortable>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      tableTitle: "Schiphol Flights Schedules",
      results: []
    }
  },
  computed: {
    ...mapGetters(["filteredFlights"])
  }
}
</script>

<style scoped>
.schiphol-flight-table {
  padding: 10px;
}
</style>
