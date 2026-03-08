import {Button, CardActions, CardMedia, Typography, Box} from "@mui/material";
import type {IProduct} from "../../entity/IProduct.ts";

interface IProductDetails {
    data: IProduct;
}

const ProductDetails = ({data}:IProductDetails) =>{
    return (
        <Box sx={{display: "flex", justifyContent: "start"}}>
            <Box sx={{marginRight: 8}}>
                <CardMedia
                    component="img"
                    image={data.imageUrl}
                    alt={data.name}
                    sx={{
                        height: 400,
                        objectFit: "contain"
                    }}
                />
            </Box>
            <div>
                <div>
                    <Typography variant={"h2"}>{data.name}</Typography>
                    <Typography variant={"subtitle1"}>Category:{data.category}</Typography>

                </div>
                <Box>
                    <Typography variant={"subtitle2"}>Description:</Typography>
                    <Typography variant={"body2"}>{data.description}</Typography>
                </Box>
                <div>
                    <Typography sx={{fontWeight: 600, fontSize: 20}} variant={"body2"}>{data.price}$</Typography>
                </div>
                <CardActions>
                    <Button variant="contained" sx={{ width: "100%" }}>
                        To Cart
                    </Button>
                </CardActions>
            </div>
        </Box>
    )
}

export default ProductDetails;