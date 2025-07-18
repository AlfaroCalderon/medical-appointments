'use client';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import styles from "./page.module.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Appointment } from "./components/appointment/appointment";

export default function Home() {

  const queryClient = new QueryClient();
  return (
   <QueryClientProvider client={queryClient}>
      <Appointment />
     <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  );
}
