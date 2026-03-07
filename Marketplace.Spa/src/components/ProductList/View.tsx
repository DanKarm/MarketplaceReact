import ProductCard from "../ProductCard";
import type { IProduct } from "../../entity/IProduct";
import { Box } from "@mui/material";

interface ViewProps {
    products: IProduct[];
}

const View = ({ products }: ViewProps) => {



    if (!products.length) {
        return <div>No products found.</div>;
    }

    const visibleProducts = products.slice(0, 12);

    return (
            <Box  sx={{display: 'flex', flexWrap: 'wrap', margin: "0 auto", justifyContent: "center",gap: "1rem"}}>
                {visibleProducts.map((product) => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </Box>

    );
};

export default View;