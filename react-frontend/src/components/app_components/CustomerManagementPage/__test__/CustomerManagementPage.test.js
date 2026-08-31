import React from "react";
import { render, screen } from "@testing-library/react";

import CustomerManagementPage from "../CustomerManagementPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders customerManagement page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CustomerManagementPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("customerManagement-datatable")).toBeInTheDocument();
    expect(screen.getByRole("customerManagement-add-button")).toBeInTheDocument();
});
