import axios from "~/axios";

export function getStatistics1() {
  return axios.get("/admin/statistics1");
}

export function getStatistics3(type) {
  return axios.get("/admin/statistics3?type="+type);
}

export function getTemHum() {
  return axios.get("/toilet-monitor/getTemHum");
}
export function getGas() {
  return axios.get("/toilet-monitor/getGas");
}
export function getOccupancy() {
  return axios.get("/toilet-monitor/getOccupancy");
}