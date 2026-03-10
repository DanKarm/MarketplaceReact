import { Box, Button, Card, CardContent, CardMedia, Typography, CardActions } from "@mui/material";
import type {IProduct} from "../../entity/IProduct.ts";
import { Link } from "react-router";
import {appRoutes} from "../../routes.ts";
import {useAddToCartMutation} from "../../api/CartApi.ts";

interface IProductCard {
    data: IProduct;
}

const ProductCard = ({ data }: IProductCard) => {
    const [addToCart] = useAddToCartMutation();

    const handleAdd = () => {
        addToCart({
            productId: data.id,
            quantity: 1,
        });
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
                    <Button variant="contained" sx={{ width: "100%" }} onClick={handleAdd}>
                        To Cart
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default ProductCard;