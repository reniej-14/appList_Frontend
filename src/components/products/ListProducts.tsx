import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { Product } from "../../types";
import ArrowDown from "../svg/ArrowDown";
import ArrowUp from "../svg/ArrowUp";
import Delete from "../svg/Delete";
import Edit from "../svg/Edit";
import EditProductData from "./EditProductData";
import DeleteProductData from "./DeleteProductData";

type ListProductsProps = {
    product: Product
}

export default function ListProducts({product}: ListProductsProps) {
    const { productName, productPrice, productPriceMin } = product
    const { data } = useAuth()

    const navigate = useNavigate()

    return (
        <>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 mt-6 hover:shadow hover:border-orange-600 transition-all">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                    <h3 className="font-semibold">{productName}</h3>

                    <div className="flex md:flex-row flex-col md:gap-6 gap-1.5 mt-2 text-[15px]">
                        <div className="flex gap-2 text-gray-500">
                            <ArrowUp/>
                            <p>Normal: <span className="font-bold text-black">{productPrice}</span></p>
                        </div>
                    
                        <div className="flex gap-2 text-gray-500">
                            <ArrowDown/>
                            <p>Mínimo: <span className="font-bold text-orange-600">{productPriceMin}</span></p>
                        </div>
                    </div>
                </div>

                {data && (
                    <div className="text-gray-500 flex gap-4 justify-end mt-4 md:mt-0">
                        <div 
                            className="hover:text-orange-500 hover:bg-[#f7ece9] p-2 rounded-lg cursor-pointer transition-colors duration-200"
                            onClick={() => navigate(location.pathname + `?editProduct=${product._id}`)}
                        >
                            <Edit/>
                        </div>
                        <div 
                            className="hover:text-red-500 hover:bg-[#f8dede] p-2 rounded-lg cursor-pointer transition-colors duration-200"
                            onClick={() => navigate(location.pathname + `?deleteProduct=${product._id}`)}
                        >
                            <Delete/>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <EditProductData/>
        <DeleteProductData/>
        </>
    )
}
