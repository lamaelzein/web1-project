import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";


import { BrowserRouter } from "react-router-dom";

import { AgGridProvider } from "ag-grid-react";
import { AllCommunityModule } from "ag-grid-community";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <BrowserRouter>
      <AgGridProvider modules={[AllCommunityModule]}>
        <App />
      </AgGridProvider>
    </BrowserRouter>

  </React.StrictMode>
);