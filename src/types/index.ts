import { z } from "zod"

// Products
export const productSchema = z.object({
    _id: z.string(),
    productName: z.string(),
    productCategory: z.string(),
    productPrice: z.number(),
    productPriceMin: z.number()
})

export const productsSchema = z.array(
    productSchema
)

export const productFormSchema = productSchema.pick({
    productName: true,
    productCategory: true,
    productPrice: true,
    productPriceMin: true
})

export const productCategorySchema = productSchema.pick({
    productCategory: true
})

export type Product = z.infer<typeof productSchema>
export type Products = z.infer<typeof productsSchema>
export type ProductForm = z.infer<typeof productFormSchema>

// User
export const userLoginSchema = z.object({
    email: z.string(),
    password: z.string()
})
export type UserLoginForm = z.infer<typeof userLoginSchema>

export const userSchema = z.object({
    _id: z.string(),
    email: z.string(),
    name: z.string()
})
export type User = z.infer<typeof userSchema>