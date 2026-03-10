import { Button } from "@mui/material";
import {useClearCartMutation, useGetCartQuery} from "../../api/CartApi.ts";
import ViewCart from "./ViewCart.tsx";





const Cart = () => {
    const { data: cart, isLoading } = useGetCartQuery();
    const [clearCart] = useClearCartMutation();

    const handleClear = async () => {
        await clearCart();
    };

    if (isLoading) return <div>Loading...</div>;
    if (!cart) return <div>Cart empty</div>;

    return <>
        <Button variant="outlined" color="error"  onClick={handleClear}>Clear</Button>
        <ViewCart items={cart.items} />
    </>;
};

export default Cart;