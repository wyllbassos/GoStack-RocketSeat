import axios from "axios";

const api = axios.create({
  //baseURL: "http://localhost:3333",
  baseURL: "https://3333-e9a9f3ca-773d-43c5-b2be-f54380eb04b2.ws-us02.gitpod.io/"
});

export default api;
