import type { ILoginUser, IRegistrationUser } from "../entity/IUser";
import { createApi } from "./apiFactory";

export const Marketplace_API_BASE_URL = "https://localhost:44367/";

const MarketplaceApi = createApi(Marketplace_API_BASE_URL);

const registration = async (params: IRegistrationUser) => {
  try {
    await MarketplaceApi.post("/Authentication/Registration", { body: params });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const login = async (params: ILoginUser) => {
  try {
    const token = await MarketplaceApi.post(`/Authentication/Login`, {
      body: params,
    });
    console.log(token);
    return token;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

export { registration, login };
