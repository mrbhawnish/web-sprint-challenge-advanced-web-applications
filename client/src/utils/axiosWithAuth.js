//Creating an instance of axios with the authentication header
import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
 
  return axios.create({
     baseURL: "http://localhost:5000/api",
      headers: {
          Authorization: token
      }
  })
}

