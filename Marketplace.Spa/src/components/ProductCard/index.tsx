import { Box, Button, Card, CardContent, CardMedia, Typography, CardActions } from "@mui/material";
import type {IProduct} from "../../entity/IProduct.ts";

interface IProductCard {
    data: IProduct;
}

const ProductCard = ({ data }: IProductCard) => {
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
                        <Typography variant="h6">{data.name}</Typography>
                    </Box>
                </CardContent>

                <CardActions>
                    <Button variant="contained" sx={{ width: "100%" }}>
                        To Cart
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default ProductCard;