<template>
    <div>
    <h4>{{ tableTitle }} </h4>
    <el-table class="schiphol-flight-table" stripe border
      :data="formattedFlightsData" highlight-current-row :max-height="tableMaxHeight">
        <el-table-column prop="scheduleTime" label="Scheduled Time" align="center" sortable>
        </el-table-column>
        <el-table-column prop="flightName" label="Flight Name" align="center" sortable>
        </el-table-column>
        <el-table-column prop="arrivingFrom" label="Arriving From" align="center" sortable>
        </el-table-column>
        <el-table-column prop="status" label="Status" align="center" sortable>
        </el-table-column>
        <el-table-column prop="terminal" label="Terminal" align="center" sortable>
        </el-table-column>
        <el-table-column prop="baggageClaimBelts" label="Baggage Belts" align="center" sortable>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      tableTitle: "Schiphol Flights Schedules",
      results: []
    };
  },

  computed: {
    ...mapGetters(["filteredFlights"]),
    tableMaxHeight() {
      return window.innerHeight - 245;
    },
    formattedFlightsData() {
      let formattedFlightData = [];
      for (let flight of this.filteredFlights) {
        let arrivingFrom = "";
        let baggageClaimBelts = "";
        let status = "";
        if (flight.baggageClaim) {
          for (let baggage of flight.baggageClaim.belts) {
            baggageClaimBelts += baggage + " ";
          }
        } else {
          baggageClaimBelts = "-"
        }

        for (let route of flight.route.destinations) {
          arrivingFrom += route + " ";
        }

        // timecalcuations - start
        let scheduled = moment(flight.scheduleDate + "T" + flight.scheduleTime);
        let actual = moment(flight.actualLandingTime);
        let estimated = moment(flight.estimatedLandingTime);
        let currentTime = new Date();

        let actualMinusScheduled = Math.round(
          (actual.toDate().getTime() - scheduled.toDate().getTime()) / 60000
        );
        let estimatedMinusCurrent = Math.round(
          (estimated.toDate().getTime() - currentTime.getTime()) / 60000
        );

        if (flight.publicFlightState.flightStates.includes("ARR")) {
          status = "Arrived";
          //if(flight.publicFlightState.flightStates.includes("EXP")) {
          status += ` ${moment(actual).format("HH:mm")} (${
            actualMinusScheduled > 0
              ? "+" + actualMinusScheduled
              : actualMinusScheduled
          })`;
          //}
        } else if (flight.publicFlightState.flightStates.includes("LND")) {
          status = "Landed";
          //if(flight.publicFlightState.flightStates.includes("EXP")) {
          status += ` ${moment(actual).format("HH:mm")} (${
            actualMinusScheduled > 0
              ? "+" + actualMinusScheduled
              : actualMinusScheduled
          })`;
          //}
        } else if (flight.publicFlightState.flightStates.includes("AIR")) {
          status = "En Route";
          status += ` ${moment(estimated).format("HH:mm")} (${
            estimatedMinusCurrent > 0
              ? "+" + estimatedMinusCurrent
              : estimatedMinusCurrent
          })`;
        } else if (flight.publicFlightState.flightStates.includes("FIB")) {
          status = "First Baggage";
           status += ` ${moment(actual).format("HH:mm")} (${
            actualMinusScheduled > 0
              ? "+" + actualMinusScheduled
              : actualMinusScheduled
          })`;
        } else if (flight.publicFlightState.flightStates.includes("SCH")) {
          status = "Scheduled";
        } else {
          status = flight.publicFlightState.flightStates
        }

        formattedFlightData.push({
          scheduleTime: flight.scheduleTime,
          flightName: flight.flightName,
          arrivingFrom: arrivingFrom.trim(),
          status: status,
          terminal: flight.terminal? flight.terminal: "-",
          baggageClaimBelts: baggageClaimBelts.trim()
        });
      }
      return formattedFlightData;
    }
  }
};
</script>

<style scoped>
.schiphol-flight-table {
  padding: 10px;
}
</style>
