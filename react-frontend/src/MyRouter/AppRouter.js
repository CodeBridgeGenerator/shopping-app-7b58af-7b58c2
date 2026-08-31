import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleProductsPage from "../components/app_components/ProductsPage/SingleProductsPage";
import ProductProjectLayoutPage from "../components/app_components/ProductsPage/ProductProjectLayoutPage";
import SingleInventoryPage from "../components/app_components/InventoryPage/SingleInventoryPage";
import InventoryProjectLayoutPage from "../components/app_components/InventoryPage/InventoryProjectLayoutPage";
import SingleCartPage from "../components/app_components/CartPage/SingleCartPage";
import CartProjectLayoutPage from "../components/app_components/CartPage/CartProjectLayoutPage";
import SingleOrdersPage from "../components/app_components/OrdersPage/SingleOrdersPage";
import OrderProjectLayoutPage from "../components/app_components/OrdersPage/OrderProjectLayoutPage";
import SingleCheckoutPage from "../components/app_components/CheckoutPage/SingleCheckoutPage";
import CheckoutProjectLayoutPage from "../components/app_components/CheckoutPage/CheckoutProjectLayoutPage";
import SingleCustomerManagementPage from "../components/app_components/CustomerManagementPage/SingleCustomerManagementPage";
import CustomerManagementProjectLayoutPage from "../components/app_components/CustomerManagementPage/CustomerManagementProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
<Route path="/products/:singleProductsId" exact element={<SingleProductsPage />} />
<Route path="/products" exact element={<ProductProjectLayoutPage />} />
<Route path="/inventory/:singleInventoryId" exact element={<SingleInventoryPage />} />
<Route path="/inventory" exact element={<InventoryProjectLayoutPage />} />
<Route path="/cart/:singleCartId" exact element={<SingleCartPage />} />
<Route path="/cart" exact element={<CartProjectLayoutPage />} />
<Route path="/orders/:singleOrdersId" exact element={<SingleOrdersPage />} />
<Route path="/orders" exact element={<OrderProjectLayoutPage />} />
<Route path="/checkout/:singleCheckoutId" exact element={<SingleCheckoutPage />} />
<Route path="/checkout" exact element={<CheckoutProjectLayoutPage />} />
<Route path="/customerManagement/:singleCustomerManagementId" exact element={<SingleCustomerManagementPage />} />
<Route path="/customerManagement" exact element={<CustomerManagementProjectLayoutPage />} />
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>{/* ~cb-add-protected-route~ */}</Route>
        </Routes>
    );
};

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);
