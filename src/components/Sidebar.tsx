import { NavLink } from "react-router-dom"
import ProductsIcon from "./svg/ProductsIcon"
import CreateProductIcon from "./svg/CreateProductIcon"
import LoginIcon from "./svg/LoginIcon"
import PackageIcon from "./svg/PackageIcon"
import { useAuth } from "../hooks/useAuth"
import LogOutIcon from "./svg/LogOutIcon"
import { useQueryClient } from "@tanstack/react-query"

type SidebarProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({ open, setOpen }: SidebarProps) {

  const { data } = useAuth()
  const queryClient = useQueryClient()

  const handleClick = () => {
    localStorage.removeItem('LOGIN_TOKEN')
    queryClient.setQueryData(['user'], null)
  }

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-300
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static flex flex-col
      `}
    >
      <div className="flex gap-3 p-4 items-center">
        <div className="bg-orange-600 inline-block p-[10px] rounded-[8px] ">
          <PackageIcon width="28" height="28"/>
        </div>
        <div>
          <p className="font-bold text-[20px]">Inventario</p>
          <p className="text-gray-500 text-[13px]">Sistema de gestión</p>
        </div>
      </div>

      <nav className="px-4 border-y border-gray-300 pt-7 font-medium text-[14px] flex-1">

        <div className="space-y-2">
        <NavLink 
            to={'/'}
            className={({ isActive }) => 
                `w-full text-left px-3 py-2 rounded-lg block transition-colors duration-200
                    ${isActive ? 'bg-[#f9e5df]' : 'hover:bg-[#f7ece9] text-gray-500 hover:text-black'}
                `
            }
            onClick={() => setOpen(false)}
            >
                <div className="flex gap-2 items-center">
                    <ProductsIcon/>
                    <p>Inventario</p>
                </div>
        </NavLink>

        <NavLink 
            to={'/products/create'}
            className={({ isActive }) => 
                `w-full text-left px-3 py-2 rounded-lg block transition-colors duration-200
                    ${isActive ? 'bg-[#f9e5df]' : 'hover:bg-[#f7ece9] text-gray-500 hover:text-black'}
                `
            }
            onClick={() => setOpen(false)}
            >
                <div className="flex gap-2 items-center">
                    <CreateProductIcon/>
                    <p>Crear Producto</p>
                </div>
        </NavLink>
        </div>
      </nav>

      <div className="px-4 py-4 font-medium text-[14px]">
        {!data 
          ?
          <NavLink 
            to={'/login'}
            className='w-full text-left px-3 py-2 rounded-lg block hover:bg-[#f7ece9] text-gray-500 hover:text-orange-600 transition-colors duration-200'
          >
            <div className="flex gap-2 items-center">
              <LoginIcon/>
              <p>Iniciar Sesión</p>
            </div>
          </NavLink>
          : <div className='w-full text-left px-3 py-2 rounded-lg block hover:bg-[#f7ece9] text-gray-500 hover:text-orange-600 transition-colors duration-200 cursor-pointer' onClick={handleClick}>
            <div className="flex gap-2 items-center">
              <LogOutIcon/>
              <p>Cerrar Sesión</p>
            </div>
          </div>
        }
        </div>
    </aside>
  )
}
