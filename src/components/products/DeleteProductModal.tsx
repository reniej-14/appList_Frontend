import { Dialog, Transition } from "@headlessui/react"
import type { Product } from "../../types"
import { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteProduct } from "../../api/ProductAPI"
import { toast } from "react-toastify"

type EditProductModalProps = {
    data: Product,
    productId: Product['_id']
}

export default function DeleteProductModal({data, productId}: EditProductModalProps) {
    const navigate = useNavigate()
    const isOpen = Boolean(productId)

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: deleteProduct,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['getProducts']})
            navigate(location.pathname, { replace: true })
        }
    })

    const handleDeleteProduct = () => {
        mutate(productId)
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
                                    Eliminar Producto
                                </Dialog.Title>

                                <p className="text-sm text-gray-500 mt-4">¿Estás seguro de que deseas eliminar <span className="font-semibold text-neutral-950">{data.productName}</span>?</p>

                                <div
                                    className="mt-4 text-[14px]"
                                >

                                    <div className="flex justify-end gap-2">
                                        <div
                                            className="bg-white border border-gray-300 text-black-950 rounded-lg mt-4 h-[36px] flex justify-center items-center font-semibold cursor-pointer hover:bg-orange-600 hover:border-orange-600 transition-colors duration-200 px-4 py-2 shadow"
                                            onClick={() => navigate(location.pathname,  {replace: true})}
                                        >Cancelar</div>
                                        <button
                                            type="submit"
                                            className="bg-orange-600 text-black-950 rounded-lg mt-4 h-[36px] flex justify-center items-center font-semibold cursor-pointer hover:bg-orange-600/85 transition-colors duration-200 px-4 py-2 shadow"
                                            onClick={handleDeleteProduct}
                                        >Eliminar</button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
