import axios from "axios";

export default axios.create({
  baseURL: "https://arena-sports-club-api.vercel.app/api/v1/football",
  headers: {
    "Content-type": "application/json",
  },
});
