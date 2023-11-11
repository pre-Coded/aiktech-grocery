import axios from "axios";
import errorHandler from "./errorHandler";


const getBaseUrl = () => {
  const url = window.location.href;
  const domain = new URL(url);
  const isLocalEnv = domain ? domain.hostname === "localhost" : false;
  const origin = domain && !isLocalEnv ? domain.origin : "http://localhost:8000";
  return origin;
};

const requestMaker = (
  baseQuery,
  method,
  requestData,
  additionalHeaders = {}
) => {
  let en_t = "";
  try {
    en_t = localStorage && localStorage.getItem("auth_token");
  } catch (error) {
    console.warn("No en-token found : ", error);
  }

  if (!navigator.onLine) {
    throw new Error("No internet connection");
  }

  const headers = {
    ...additionalHeaders,
    // 'Content-type': 'application/json',
  };

  // use baseurl here
  let baseurl = getBaseUrl();
  baseurl = `${baseurl}/api`;
  baseQuery = `${baseurl}${baseQuery}`;
  const { params, payload } = requestData;
  // axios.defaults.headers.common['Content-type'] = `application/json`;
  if (en_t) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${en_t}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  let apiCall = axios(
    {
      method: method,
      url: baseQuery,
      params: params,
      data: payload,
    },
    { headers: headers }
  );

  return apiCall
    .then((response) => {
      return response;
    })
    .catch((error) => {
      const pe = errorHandler(error);
      console.error("Error in Phurti :: ", error, pe);
      throw error;
    });
};

export default requestMaker;
export  {getBaseUrl}
