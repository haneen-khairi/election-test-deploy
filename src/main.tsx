import ReactDOM from "react-dom/client";

// ChakraProvider
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme.ts";
import "./font.css";

// Routes
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

// Rect Query Configuration
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 24 * 60 * 60 * 1000,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </ChakraProvider>
  // </React.StrictMode>
);
