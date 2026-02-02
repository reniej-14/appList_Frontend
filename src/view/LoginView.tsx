import { useForm } from "react-hook-form";
import PackageIcon from "../components/svg/PackageIcon";
import type { UserLoginForm } from "../types";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auntheticateUser } from "../api/AuthAPI";
import { toast, ToastContainer } from "react-toastify";


export default function LoginView() {

    const initialValues: UserLoginForm = {
        email: '',
        password: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues})

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: auntheticateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: async () => {
            await queryClient.refetchQueries({ queryKey: ["user"] })
            navigate('/products/create')
        }
    })

    const handleLogin = (formData: UserLoginForm) => {
        mutate(formData)
    }

    return (
        <>
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="border border-gray-300 shadow rounded-lg  max-w-[90%] md:max-w-[448px] w-full p-6">
                <div className="text-center">
                    <div className="bg-orange-600 inline-block p-4 rounded-2xl">
                        <PackageIcon width="36" height="36"/>
                    </div>
                    <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
                    <p className="text-gray-500 text-[14px]">Accede a tu gestor de inventario</p>
                </div>

                <form 
                    className="mt-6"
                    onSubmit={handleSubmit(handleLogin)}
                    noValidate
                >
                    <div>
                        <label 
                            htmlFor="email"
                            className="font-semibold block"
                        >Correo electrónico</label>
                        <input 
                            id="email" 
                            type="email" 
                            placeholder="tu@email.com" 
                            className="px-2 py-1.5 border border-gray-300 rounded-lg w-full mt-1 shadow"
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email no válido",
                                }
                            })}
                        />
                        {errors.email && (
                            <ErrorMessage>{errors.email.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="mt-4">
                        <label 
                            htmlFor="password"
                            className="font-semibold block"
                        >Contraseña</label>
                        <input 
                            id="password" type="password" placeholder="Escribe tu contraseña" 
                            className="px-2 py-1.5 border border-gray-300 rounded-lg w-full mt-1 shadow"
                            {...register("password", {
                                required: "El password es obligatorio"
                            })}
                        />
                        {errors.password && (
                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-black text-white rounded-lg py-1.5 w-full mt-5 font-semibold cursor-pointer hover:bg-zinc-800 transition-colors duration-200"
                    >Iniciar Sesión</button>

                </form>
            </div>
            <p 
                className="mt-4 text-sm cursor-pointer text-gray-500 font-semibold hover:text-orange-600 transition-colors duration-200"
                onClick={() => navigate('/')}
            >Entrar sin iniciar sesión</p>
        </div>

        
        <ToastContainer/>
        </>
    )
}
