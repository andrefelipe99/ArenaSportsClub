import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5000/api/v1/football",
  baseURL: "https://arena-sports-club-api.vercel.app/api/v1/football",
  headers: {
    "Content-type": "application/json",
  },
});
