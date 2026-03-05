import styles from "./style.module.scss";
import ProductCard from "../ProductCard";
import type { IProduct } from "../../entity/IProduct";

interface ViewProps {
    products: IProduct[];
    isLoading: boolean;
}

const View = ({ products, isLoading }: ViewProps) => {

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!products.length) {
        return <div>No products found.</div>;
    }

    const visibleProducts = products.slice(0, 9);

    return (
        <div className={styles.grid}>
            <div className={styles.mediumContainer}>
                {visibleProducts.map((product) => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </div>
        </div>
    );
};

export default View;