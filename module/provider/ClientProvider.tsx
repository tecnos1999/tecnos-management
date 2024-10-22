"use client";

import { Provider } from "react-redux";
import store from "../../store/store";
import { persistor } from "../../store/store";
import { PersistGate } from "redux-persist/integration/react";

export default function ClientProvider({ children } : { children: React.ReactNode }) {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>;
}