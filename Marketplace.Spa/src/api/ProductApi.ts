import { createApi } from "./apiFactory";

const Marketplace_API_BASE_URL = "https://localhost:44367/";

const ProductApi = createApi(Marketplace_API_BASE_URL);

const getAllProducts = async () => {
    try {
        const allProducts = await ProductApi.get("api/Product");
        return allProducts;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

const getProduct = async (id:string) => {
    try {
        const Product = await ProductApi.get(`api/Product/${id}`);
        return Product;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};



export { getAllProducts, getProduct};