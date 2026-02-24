import type { ILoginUser, IRegistrationUser } from "../entity/IUser";
import { createApi } from "./apiFactory";
import {AccessTokenStorage} from "../services/AuthStorage.ts";


interface ILoginResponse {
    token: string | null;
}
const Marketplace_API_BASE_URL = "https://localhost:44367/";

const UserApi = createApi(Marketplace_API_BASE_URL);

const registration = async (params: IRegistrationUser) => {
  try {
    await UserApi.post("Authentication/Registration", { body: params });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const login = async (params: ILoginUser) => {
  try {
    const response:ILoginResponse = await UserApi.post(`Authentication/Login`, {
      body: params,
    });
      if (response.token !== null) {
          AccessTokenStorage.set(response.token);
      }

  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export { registration, login };
