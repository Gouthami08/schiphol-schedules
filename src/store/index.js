import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import moment from "moment"

Vue.use(Vuex)
const baseURL =
  "https://api.schiphol.nl/public-flights/flights?app_id=0e2669b9&app_key=e77dc4046db400cfa757f84d7c5f3650&flightdirection=A&includedelays=false&sort=%2Bscheduletime"

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
      let currentTime = new Date(new Date().getTime() - 1800000)
      let response = []

      // first call to API
      let url = `${baseURL}&scheduledate=${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}&scheduletime=${currentTime.getHours()}%3A${currentTime.getMinutes()}`
      let result = await axios.get(url, {
        headers: { ResourceVersion: "v3" }
      })
      response = response.concat(result.data.flights)

      // Getting total number of pages from header - start
      let link = result.headers.link
        .split(";")[0]
        .replace("<", "")
        .replace(">", "")
      var regex = new RegExp("[?&]page(=([^&#]*)|&|#|$)"),
        results = regex.exec(link)
      let noOfPages = decodeURIComponent(results[2].replace(/\+/g, " "))
      // Getting total number of pages from header - end

      // getting more pages - max 10 or total number of pages(whichever is lesser)
      for (
        let pageCount = 0;
        pageCount < 10 && pageCount <= noOfPages;
        pageCount++
      ) {
        let url = `${baseURL}&scheduledate=${currentTime.getFullYear()}-${currentTime.getMonth()}-${currentTime.getDate()}&scheduletime=${currentTime.getHours()}%3A${currentTime.getMinutes()}&page=${pageCount}`
        result = await axios.get(url, {
          headers: { ResourceVersion: "v3" }
        })
        response = response.concat(result.data.flights)
      }
      commit("setUpdatedTime", moment().format("DD-MM-YYYY, HH:mm:ss"))
      commit("setFlights", response)
    }
  }
})
