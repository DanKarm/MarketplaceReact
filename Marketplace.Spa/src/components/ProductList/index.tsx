import type { IProduct } from "../../entity/IProduct";
import { useState } from "react";
import View from "./View";
import {useGetProductsQuery} from "../../api/ProductApiBQ.ts";
import { Button, Stack } from "@mui/material";

interface ProductsProps {
    search?: string;
}

const ProductList = ({ search = "" }: ProductsProps) => {

    const [page, setPage] = useState(1);
    const [pageSize] = useState(12);

    const { data, isLoading, error } = useGetProductsQuery({
        page,
        pageSize,
        search
    });
    const products: IProduct[] = data?.items ?? [];

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(prev => prev - 1);
        }

    };

    const handleNextPage = () => {
            setPage(prev => prev + 1);

    };

    if (error) {
        return <div>Ошибка загрузки товаров</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <View
            products={products}
        />
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                <Button onClick={handlePreviousPage}>Back</Button>
                <Button onClick={handleNextPage}>Next</Button>
            </Stack>
        </>
    );
};

export default ProductList;