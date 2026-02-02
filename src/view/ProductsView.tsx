import { useState } from "react";
import ListProducts from "../components/products/ListProducts";
import { category } from "../db/Category";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCategory } from "../api/ProductAPI";
import { Navigate } from "react-router-dom";


export default function Products() {
    const [ selectedCategory, setSelectedCategory ] = useState('Todos')

    const { data, isError } = useQuery({
        queryKey: ['getProducts', selectedCategory],
        queryFn: () => getProductsByCategory(selectedCategory),
        retry: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value)
    }

    if (isError) return <Navigate to={'/404'}/>

    if (data) return (
    <>
        <div className="">
            <h2 className="text-3xl font-bold">Inventario de Productos</h2>
            <p className="text-gray-500 mt-1">Visualiza y gestiona todos tus productos</p>

            <div className="mt-10 flex justify-center">
                <form
                    className="inline-block bg-white p-2 border border-gray-300 rounded-lg"
                >
                    <select 
                        className=" outline-none"
                        value={selectedCategory}
                        onChange={handleChange}
                    >
                        <option value="Todos">Todos</option>
                        {category.map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </form>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg mt-8 p-6 shadow">
                <div>
                    <h3 className="font-semibold">Lista de Productos</h3>
                    <p className="text-[14px] text-gray-500">Total: {data.length} productos</p>
                </div>

                {data.map(product => (
                    <ListProducts key={product.productName} product={product}/>
                ))}
            </div>
      </div>
    </>
    )
}
