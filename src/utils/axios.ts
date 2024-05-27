import axios, { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

interface ErrorConfig {
  handleNotification?: boolean;
}

interface ErrorResponse {
  error: string;
}

const { VITE_MAIN_URL } = import.meta.env;

const axiosInstance = axios.create({
  baseURL: VITE_MAIN_URL,
});

const responseErrorInterceptor = async (
  error: AxiosError & { config?: ErrorConfig }
) => {
  if (error?.config?.handleNotification === true) {
    if (error.response) {
      const errorData: ErrorResponse = (error.response
        .data as ErrorResponse) || { error: "Something went wrong..." };
      notifications.show({
        title: "Error notification!",
        message: errorData.error,
        autoClose: 2000,
        color: "red",
      });
    }
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(undefined, responseErrorInterceptor);

export default axiosInstance;
