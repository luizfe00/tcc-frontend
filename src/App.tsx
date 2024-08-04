import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PublicRoutes } from "./routes/PublicRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const router = createBrowserRouter(PublicRoutes);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
