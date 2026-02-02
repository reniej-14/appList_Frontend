import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation } from "react-router-dom";
import { getProductByID } from "../../api/ProductAPI";
import EditProductModal from "./EditProductModal";

export default function EditProductData() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const productId = queryParams.get('editProduct')!

    const { data, isError } = useQuery({
        queryKey: ['product'],
        queryFn: () => getProductByID(productId),
        enabled: !!productId
    })

    if (isError) return <Navigate to={'/404'}/>
    if (data) return <EditProductModal data={data} productId={productId}/>
}
