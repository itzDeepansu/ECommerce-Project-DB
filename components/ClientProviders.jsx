// components/ClientProviders.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "@/Store/store";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/app/libs/context/AuthProvider";

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <Provider store={store}>{children}</Provider>
      <Toaster />
    </AuthProvider>
  );
}
