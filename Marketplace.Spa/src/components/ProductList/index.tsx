import type { IProduct } from "../../entity/IProduct";
import { useState } from "react";
import View from "./View";
import {useGetProductsQuery} from "../../api/ProductApiBQ.ts";

interface ProductsProps {
    search?: string;
}

const ProductList = ({ search = "" }: ProductsProps) => {

    const [page] = useState(1);
    const [pageSize] = useState(10);

    const { data, isLoading, error } = useGetProductsQuery({
        page,
        pageSize,
        search
    });

    const products: IProduct[] = data?.items ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Ошибка загрузки товаров</div>;
    }

    return (
        <View
            products={products}
            isLoading={isLoading}
        />
    );
};

export default ProductList;