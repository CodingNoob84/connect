"use client";

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

function ReactQueryProvider({ children }) {
  const [client] = useState(new QueryClient());
  return (
    <QueryClientProvider client={client}>
      {/* <ReactQueryStreamedHydration> */}
      {children}
      {/* </ReactQueryStreamedHydration> */}
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
