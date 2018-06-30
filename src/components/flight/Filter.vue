<template>
    <div class="schiphol-filter-style">
        <el-input
          placeholder="Please Enter Filter Text"
          v-model="filter"
          type="text"
          autofocus= "true"
          maxlength="10"/>
    </div>
</template>

<script>
export default {
  data() {
    return {
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

<style>
.schiphol-filter-style {
  margin: 5px;
}
</style>
