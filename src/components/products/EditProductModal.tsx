
import { Dialog, Transition } from "@headlessui/react"
import type { Product, ProductForm } from "../../types"
import { Fragment, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import EditProductForm from "./EditProductForm"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProduct } from "../../api/ProductAPI"
import { toast } from "react-toastify"

type EditProductModalProps = {
    data: Product,
    productId: Product['_id']
}

export default function EditProductModal({data, productId}: EditProductModalProps) {
    const navigate = useNavigate()
    const isOpen = Boolean(productId)
    const defaultValues = {
        productName: data.productName,
        productCategory: data.productCategory,
        productPrice: data.productPrice,
        productPriceMin: data.productPriceMin
    }

    const { register, handleSubmit, watch, reset, formState: {errors} } = useForm<ProductForm>({defaultValues})

    useEffect(() => {
        reset({
            productName: data.productName,
            productCategory: data.productCategory,
            productPrice: data.productPrice,
            productPriceMin: data.productPriceMin
        })
    }, [data])
    const selectedCategory = watch('productCategory')

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProduct,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['getProducts']})
            navigate(location.pathname, { replace: true })
        }
    })

    const handleEditProduct = (formData: ProductForm) => {
        const data = {
            ...formData,
            productPrice: Number(formData.productPrice),
            productPriceMin: Number(formData.productPriceMin)
        }

        mutate({formData: data, productId})
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => navigate(location.pathname,  {replace: true}) }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/20" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-[512px] transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all p-6 border border-gray-300">
                                <Dialog.Title
                                    as="h3"
                                    className="font-semibold text-lg"
                                >
                                    Editar Producto
                                </Dialog.Title>

                                <p className="text-sm text-gray-500 mt-0.5">Modifica los detalles del producto seleccionado</p>

                                <form
                                    className="mt-4 text-[14px]"
                                    onSubmit={handleSubmit(handleEditProduct)}
                                    noValidate
                                >
                                    <EditProductForm
                                        register={register}
                                        errors={errors}
                                        selectedCategory={selectedCategory}
                                    />

                                    <div className="flex justify-end gap-2">
                                        <div
                                            className="bg-white border border-gray-300 text-black-950 rounded-lg mt-4 h-[36px] flex justify-center items-center font-semibold cursor-pointer hover:bg-orange-600 hover:border-orange-600 transition-colors duration-200 px-4 py-2 shadow"
                                            onClick={() => navigate(location.pathname,  {replace: true})}
                                        >Cancelar</div>
                                        <button
                                            type="submit"
                                            className="bg-orange-600 text-black-950 rounded-lg mt-4 h-[36px] flex justify-center items-center font-semibold cursor-pointer hover:bg-orange-600/85 transition-colors duration-200 px-4 py-2 shadow"
                                        >Guardar Cambios</button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
