import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import CreateProductForm from "../components/products/CreateProductForm"



export default function CreateProductView() {

  const { data, isLoading } = useAuth()

  if (isLoading) return 'Cargando...'
  if (!data) {
    return <Navigate to={'/login'}/>
  }

  return (
    <>  
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold">Agregar Nuevo Producto</h2>
        <p className="text-gray-500 mt-1">Completa el formulario para añadir un producto al inventario</p>

        <CreateProductForm/>
      </div>
    </>
  )
}