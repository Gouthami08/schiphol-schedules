<template>
    <div class="schiphol-filter">
      <h4>Filters</h4>
      <el-row>
      <el-col :span="8">
        <el-input
          placeholder="Flight Name or Destination"
          v-model="filter"
          type="text"
          autofocus= "true"
          maxlength="10"/>
      </el-col>
      <!--
      <el-col :span="16">
           <el-time-picker
              is-range
              v-model="timeRange"
              range-separator="To"
              start-placeholder="Start time"
              end-placeholder="End time">
            </el-time-picker>
      </el-col>
      -->
      </el-row>
    </div>
</template>

<script>
export default {
  name: "SchipholFlightFilter",
  data() {
    return {
      timeRange: ""
    }
  },
  computed: {
    filter: {
      get() {
        return this.$store.getters.filter
      },
      set(filter) {
        this.$store.commit("setFilter", filter)
      }
    }
  }
}
</script>

<style scoped>
.schiphol-filter {
  padding: 5px !important;
}
.schiphol-filter h4 {
  margin: 5px;
}
</style>
