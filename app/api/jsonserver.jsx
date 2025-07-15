const { default: axios } = require("axios");

const jsonserver = axios.create({
  baseURL: "http://10.0.3.2:3000", // For Genymotion
  // baseURL: "http://10.0.2.2:3000", // For Android Emulator
  // baseURL: "http://localhost:3000", // For iOS Simulator  
  // baseURL: "http://192.168.4.80:3000", // For physical device (use your actual IP)
  timeout:10000
});

export default jsonserver;
