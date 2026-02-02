import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";


export default function AppLayout() {

    const [ open, setOpen ] = useState(false)

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
      
                {/* Sidebar */}
                <Sidebar open={open} setOpen={setOpen} />

                {/* Contenido */}
                <div className="flex-1">
                    <Header onMenuClick={() => setOpen(true)} />
                    <main className="p-6 md:py-14 md:px-18">
                        <Outlet/>
                    </main>
                </div>

                {/* Overlay móvil */}
                {open && (
                    <div
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/30 md:hidden"
                    />
                )}
            </div>

            <ToastContainer/>
        </>
    )
}
