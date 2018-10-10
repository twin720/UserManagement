import axios from "axios";
import store from "../redux/store";
import { showError } from "../redux/application/actions";

const axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json"
    }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // Do something with response data
        if (response && response.data) {
            const { message } = response.data;
            if (message) {
                (async () => {
                    await store.dispatch(showError(message));
                })();
            }
        }
        return response;
    },
    (error) => {
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosInstance;