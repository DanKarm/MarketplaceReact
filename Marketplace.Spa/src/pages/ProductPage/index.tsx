import ProductDetails from "../../components/ProductDetails";
import {useGetProductByIdQuery} from "../../api/ProductApiBQ.ts";
import {useParams} from "react-router";


const ProductPage = () =>{
    const { productId } = useParams();
    const {data, isLoading, error} = useGetProductByIdQuery(Number(productId));
    console.log(data)
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>error</div>
    if(!data) return <div>Error</div>
    return (
        <ProductDetails data={data} />
    )
}

export default ProductPage;