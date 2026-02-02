import { isAxiosError } from "axios"
import api from "../lib/axios"
import { productSchema, productsSchema, type Product, type ProductForm } from "../types"

export const createProduct = async (formData: ProductForm) => {
    const { data } = await api.post('/product/create', formData)
    return data
}

export const getProductsByCategory = async(category: Product['productCategory']) => {
    try {
        const url = `/product/${category}/category`
        const { data } = await api(url)
        const response = productsSchema.safeParse(data)
        if (response.success) {
            return response.data
        }
        return []
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const getProductByID = async (productId: Product['_id']) => {
    try {
        const { data } = await api(`/product/${productId}`)
        const response = productSchema.safeParse(data)
        if (response.success) {
            return response.data
        } 
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const updateProduct = async ({formData, productId}: {formData: ProductForm, productId: Product['_id']}) => {
    try {
        const { data } = await api.put<string>(`/product/update/${productId}`, formData)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteProduct = async (id: Product['_id']) => {
    try {
        const { data } = await api.delete<string>(`/product/delete/${id}`)
        return data
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}