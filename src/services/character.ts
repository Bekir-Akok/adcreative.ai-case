import { AxiosResponse } from "axios";

//local import
import axiosInstance from "../utils/axios";
import { ApiResponse, ServiceParams } from "../types/interfaces";

const prefix = "character";

export const getAllCharacter = (
  serviceParams: ServiceParams
): Promise<AxiosResponse<ApiResponse>> => {
  const { name, pages } = serviceParams;

  const params = new URLSearchParams();
  const config = { handleNotification: true };

  !!name && params.append("name", name);
  !!pages && params.append("page", pages.toString());

  return axiosInstance.get<ApiResponse>(`${prefix}`, {
    params,
    ...config,
  });
};
