import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import HomePage from './pages';
import Header from './component/Header';
import Navbar from './component/Navbar';
import CollectionsPage from './pages/collections';
import ProductPage from './pages/product';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<HomePage />} />
            <Route path='collections/:slug' element={<CollectionsPage />} />
            <Route path='collections/:slug/:page' element={<CollectionsPage />} />
            <Route path='products/:slug' element={<ProductPage />} />
            {/* <Route path='product/:slug/:variant' element={<ProductPage />} /> */}
        </>
    )
);

export default function App() {
    return (
        <>
            <Header />
            <Navbar />
            <RouterProvider router={router} />
        </>
    );
}
