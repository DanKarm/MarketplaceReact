import type {IProduct} from "../../entity/IProduct.ts";
interface IProductCard {
    data: IProduct;
}
const ProductCard = (props:IProductCard)=>{
    const {data} = props;
    return (
        <div>
            <span>{data.name}</span>
            <span>{data.description}</span>
            <span>{data.price}</span>
            <div><img src={`${data.imageUrl}`} alt=""/></div>
        </div>
    )
}

export default ProductCard;