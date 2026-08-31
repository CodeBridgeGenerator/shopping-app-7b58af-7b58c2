import React from "react";
import { render, screen } from "@testing-library/react";

import CustomerManagementCreateDialogComponent from "../CustomerManagementCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders customerManagement create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CustomerManagementCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("customerManagement-create-dialog-component")).toBeInTheDocument();
});
