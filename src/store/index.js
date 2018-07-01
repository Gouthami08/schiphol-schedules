import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import moment from "moment"

Vue.use(Vuex)
const baseURL =
  "https://api.schiphol.nl/public-flights/flights?app_id=0e2669b9&app_key=e77dc4046db400cfa757f84d7c5f3650&flightdirection=A&includedelays=false&page=0&sort=%2Bscheduletime"

export const store = new Vuex.Store({
  state: {
    flights: [],
    filter: "",
    updatedTime: ""
  },
  getters: {
    filteredFlights: state => {
      let flights = state.flights
      let filter = state.filter
      return flights.filter(
        flight =>
          flight.flightName.includes(filter.trim().toUpperCase()) ||
          flight.scheduleTime.includes(filter.trim().toUpperCase()) ||
          flight.route.destinations.filter(destination =>
            destination.includes(filter.trim().toUpperCase())
          ).length > 0
      )
    },
    filter: state => {
      return state.filter
    },
    updatedTime: state => {
      return state.updatedTime
    }

  },
  mutations: {
    setFlights(state, payload) {
      state.flights = payload
    },
    setFilter(state, payload) {
      state.filter = payload
    },
    setUpdatedTime(state, payload) {
      state.updatedTime = payload
    }
  },
  actions: {
    async callSchipholAPI({ commit }) {
      let currentTime = new Date((new Date()).getTime() - 1800000);
      let url = `${baseURL}&scheduledate=${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}&scheduletime=${currentTime.getHours()}%3A${currentTime.getMinutes()}`
      let response = await axios.get(url, {
        headers: { ResourceVersion: "v3" }
      })
      commit("setUpdatedTime", moment().format("DD-MM-YYYY, HH:mm:ss"))
      commit("setFlights", response.data.flights)
    }
  }
})
