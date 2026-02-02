import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Products from "./view/ProductsView";
import CreateProduct from "./view/CreateProductView";
import LoginView from "./view/LoginView";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<Products/>} index />
                    <Route path="/products/create" element={<CreateProduct/>} />
                </Route>
            </Routes>

            <Routes>
                <Route path="/login" element={<LoginView/>}/>
            </Routes>
        </BrowserRouter>
    )
}
