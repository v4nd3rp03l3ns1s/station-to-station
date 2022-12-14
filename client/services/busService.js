const config = require('../config');
const baseURL = config.serverURL;

export const busService = {
  getBusRoutes: async function () {
    try {
      //bus/getAllBusRoutes
      const response = await fetch (`${baseURL}/bus/getAllBusRoutes`);
      const json = await response.json();
      const cleanedRoutes = json.map(({ _id, routeID, routeName, routeColor }) => ({
        _id: _id,
        routeID: routeID,
        routeName: routeName,
        routeColor: routeColor,
      }));
      return cleanedRoutes;
    } catch (err) {
      console.log('routes services error', err);
    }
  },
  getBusDirections: async function (route) {
    try {
      //bus/getRouteDirections
      const response = await fetch(`${baseURL}/bus/getRouteDirections?rt=${route}`);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log('directions services error', err);
    }
  },
  getBusStops: async function (dir) {
    console.log(dir, 'dir');
    try {
      const response = await fetch(`${baseURL}/bus/getRouteStops?rt=${dir.routeID}&dir=${dir._id}`)
      const json = await response.json();
      return json;
    } catch (err) {
      console.log('bus stop services error', err);
    }
  },
  getBusPredict: async function (stop) {
    try {
      const response = await fetch(`${baseURL}/bus/getBusTimes?rt=${stop.routeID}&stp=${stop.stopID}`);
      const json = await response.json();
      return json;
    } catch (err) {
      console.log('bus time services error', err);
    }
  },
};
