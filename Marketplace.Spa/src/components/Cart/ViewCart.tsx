import type { IProduct } from "../../entity/IProduct";
import {Box} from "@mui/material";
import CartItem from "../CartItem";

interface ICartItem {
    id: number;
    productId: number;
    quantity: number;
    cartId: number;
    cart: null;
    product: IProduct;
}

interface ViewProps {
    items: ICartItem[];
}

const ViewCart = ({ items }: ViewProps) => {

    if (!items.length) {
        return <div>No products found.</div>;
    }

    return (
        <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: "0 auto",
            justifyContent: "center",
            gap: "1rem"
        }}>

            {items.map((item) => (
                <CartItem
                    key={item.id}
                    data={item.product}
                    quantity={item.quantity}
                />
            ))}
        </Box>
    );
};

export default ViewCart;