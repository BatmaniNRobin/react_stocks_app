import axios from "axios";

const TOKEN = "cctlrdqad3i78dc6p69gcctlrdqad3i78dc6p6a0"

export default axios.create({
  baseURL: "https://finnhub.io/api/v1/",
  params: {
    token: TOKEN,
  }
})