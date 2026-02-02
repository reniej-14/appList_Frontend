import { category } from "../../db/Category";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "../../api/ProductAPI";
import { toast } from "react-toastify";

type ProductForm = {
    productName: string,
    productCategory: string,
    productPrice: string,
    productPriceMin: string
}

export default function CreateProductForm() {

    const initialValues: ProductForm = {
        productName: '',
        productCategory: '',
        productPrice: '',
        productPriceMin: ''
    }

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({ defaultValues: initialValues})

    const selectedCategory = watch('productCategory')

    const { mutate } = useMutation({
        mutationFn: createProduct,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Producto agregado')
        }
    })

    const handleCreateProduct = (data: ProductForm) => {
        const payload = {
            ...data,
            productPrice: Number(data.productPrice),
            productPriceMin: Number(data.productPriceMin)
        }

        reset()
        mutate(payload)
    }

    return (
        <>
            <div 
                className="border border-gray-300 rounded-lg mt-6 bg-white p-6 shadow"
            >
                <div>
                    <h3 className="font-semibold">Información del Producto</h3>
                    <p className="text-[14px] text-gray-500">Ingresa los detalles del producto</p>
                </div>
                <form 
                    className="mt-6 text-[14px]"
                    onSubmit={handleSubmit(handleCreateProduct)}
                >
                    <div>
                        <label 
                            htmlFor="name"
                            className="block font-semibold"
                        >Nombre del Producto</label>

                        <input 
                            type="text" id="name" placeholder="Ej: Laptop Dell Inspiron"
                            className="px-3 py-1.5 border border-gray-300 rounded-lg w-full mt-1 shadow bg-gray-50"
                            {...register('productName', {
                                required: 'El nombre del producto es obligatorio'
                            })}
                        />
                        {errors.productName && (
                            <ErrorMessage>{errors.productName.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mt-6">
                        <label
                            className="block font-semibold mb-1"
                        >Categoría</label>

                        <select 
                            className={`outline-none inline-block p-2 border border-gray-300 rounded-lg bg-gray-50 shadow
                            ${selectedCategory ? "text-gray-950" : "text-gray-400"}`}
                            {...register('productCategory', {
                                required: 'Selecciona una categoría',
                            })}
                        >
                            <option value="" disabled hidden>Selecciona una categoría</option>
                            {category.map(category => (
                                <option 
                                    key={category} 
                                    value={category}
                                    className="text-gray-950 bg-white"
                                >{category}</option>
                            ))}
                        </select>
                        {errors.productCategory && (
                            <ErrorMessage>{errors.productCategory.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mt-6 relative">
                        <label 
                            htmlFor="price"
                            className="block font-semibold"
                        >Precio Normal</label>

                        <span className="absolute left-3 top-[42px] -translate-y-1/2 text-gray-400">Q</span>

                        <input 
                            type="number" id="price" placeholder="0.00"
                            className="pl-8 pr-2 py-1.5 border border-gray-300 rounded-lg w-full mt-1 shadow bg-gray-50"
                            {...register('productPrice', {
                                required: 'El precio normal del producto es obligatorio',
                                valueAsNumber: true
                            })}
                        />
                        {errors.productPrice && (
                            <ErrorMessage>{errors.productPrice.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mt-6 relative">
                        <label 
                            htmlFor="priceMin"
                            className="block font-semibold"
                        >Precio Mínimo</label>

                        <span className="absolute left-3 top-[42px] -translate-y-1/2 text-gray-400">Q</span>

                        <input 
                            type="number" id="priceMin" placeholder="0.00"
                            className="pl-8 pr-2 py-1.5 border border-gray-300 rounded-lg w-full mt-1 shadow bg-gray-50"
                            {...register('productPriceMin', {
                                required: 'El precio mínimo del producto es obligatorio'
                            })}
                        />
                        {errors.productPriceMin && (
                            <ErrorMessage>{errors.productPriceMin.message}</ErrorMessage>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-orange-600 text-black-950 rounded-lg py-1.5 w-full mt-5 h-[36px] flex justify-center font-semibold cursor-pointer hover:bg-orange-600/85 transition-colors duration-200"
                    >Agregar Producto</button>
                </form>
            </div>
        </>
    )
}
