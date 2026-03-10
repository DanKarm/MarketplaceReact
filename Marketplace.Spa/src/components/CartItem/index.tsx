import { useRemoveCartItemMutation, useUpdateCartItemMutation} from "../../api/CartApi.ts";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router";
import {appRoutes} from "../../routes.ts";
import type {IProduct} from "../../entity/IProduct.ts";

interface ICartItemProps {
    data: IProduct;
    quantity: number;
}

const CartItem = ({ data, quantity }: ICartItemProps) => {
    const [editCart] = useUpdateCartItemMutation();
    const [removeFromCart] = useRemoveCartItemMutation();

    const handleUp = () => {
        let newQuantity = quantity + 1;
        editCart({
            productId: data.id,
            quantity: newQuantity++,
        });
    };
    const handleDown = () => {
        const newQuantity = quantity - 1;

        if(quantity === 1) {
            handleRemove()
        }
        editCart({
            productId: data.id,
            quantity: newQuantity,
        });
    };
    const handleRemove = () => {
        removeFromCart(data.id);
    };
    return (
        <Card
            sx={{
                width: 250,
                padding: "10px",
                height: 414,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
        >
            <CardMedia
                component="img"
                image={data.imageUrl}
                alt={data.name}
                sx={{
                    height: 180,
                    objectFit: "contain"
                }}
            />
            <Box>
                <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>

                        <Typography>{data.price}$</Typography>
                        <Link to={appRoutes.product(data.id.toString())}><Typography variant="h6" >{data.name}</Typography> </Link>
                    </Box>
                </CardContent>

                <CardActions>
                    <Box sx={{ display: "flex"}}>
                        <Button variant="outlined" sx={{ width: "40px" }} onClick={handleUp}>+</Button>
                        <Typography>{quantity}</Typography>
                        <Button variant="outlined" sx={{ width: "40px%" }} onClick={handleDown}>-</Button>
                    </Box>
                    <Button variant="outlined" color="error" sx={{ width: "100%" }} onClick={handleRemove}>
                        Deleted
                    </Button>

                </CardActions>

            </Box>
        </Card>
    );
};


export default CartItem