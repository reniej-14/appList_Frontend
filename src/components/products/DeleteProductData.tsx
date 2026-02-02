import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
import { getProductByID } from "../../api/ProductAPI";
import DeleteProductModal from "./DeleteProductModal";

export default function DeleteProductData() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const productId = queryParams.get('deleteProduct')!

    const { data, isError } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProductByID(productId),
        enabled: !!productId
    })

    if (isError) return <Navigate to={'/404'}/>
    if (data) return <DeleteProductModal data={data} productId={productId}/>
}
