import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/About/AboutPage";
// import ProductsPage from '../pages/Products/ProductsPage';
// import ProductDetailPage from '../pages/Products/ProductDetailPage';
// import ServicesPage from '../pages/Services/ServicesPage';
// import ServiceDetailPage from '../pages/Services/ServiceDetailPage';
// import ProjectsPage from '../pages/Projects/ProjectsPage';
// import ProjectDetailPage from '../pages/Projects/ProjectDetailPage';
// import PartnersPage from '../pages/Partners/PartnersPage';
// import NewsPage from '../pages/News/NewsPage';
// import NewsDetailPage from '../pages/News/NewsDetailPage';
// import ContactPage from '../pages/Contact/ContactPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      //   {
      //     path: 'products',
      //     element: <ProductsPage />,
      //   },
      //   {
      //     path: 'products/:id',
      //     element: <ProductDetailPage />,
      //   },
      //   {
      //     path: 'services',
      //     element: <ServicesPage />,
      //   },
      //   {
      //     path: 'services/:id',
      //     element: <ServiceDetailPage />,
      //   },
      //   {
      //     path: 'projects',
      //     element: <ProjectsPage />,
      //   },
      //   {
      //     path: 'projects/:id',
      //     element: <ProjectDetailPage />,
      //   },
      //   {
      //     path: 'partners',
      //     element: <PartnersPage />,
      //   },
      //   {
      //     path: 'news',
      //     element: <NewsPage />,
      //   },
      //   {
      //     path: 'news/:slug',
      //     element: <NewsDetailPage />,
      //   },
      //   {
      //     path: 'contact',
      //     element: <ContactPage />,
      //   },
    ],
  },
]);

export default router;
