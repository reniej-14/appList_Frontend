import type { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../ErrorMessage";
import type { ProductForm } from "../../types";
import { category } from "../../db/Category";

type EditProductFormProps = {
    errors: FieldErrors<ProductForm>
    register: UseFormRegister<ProductForm>
    selectedCategory: string
}

export default function EditProductForm({errors, register, selectedCategory}: EditProductFormProps) {
    return (
        <>
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
            
                                <div className="mt-3">
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
            
                                <div className="mt-3 relative">
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
            
                                <div className="mt-3 relative">
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
        </>
    )
}
