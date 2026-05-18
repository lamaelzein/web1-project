import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";

type Drink = {
  id: number;
  name: string;
  price: number;
};

function Drinks() {
  const [drinks, setDrinks] = useState<Drink[]>(
    JSON.parse(localStorage.getItem("drinks") || "[]")
  );

  const handleDelete = (id: number) => {
    const updated = drinks.filter(d => d.id !== id);
    setDrinks(updated);
    localStorage.setItem("drinks", JSON.stringify(updated));
  };

  const columnDefs: ColDef<Drink>[] = [
    { field: "name" },
    { field: "price" },

    {
      headerName: "Delete",
      cellRenderer: (params: ICellRendererParams<Drink>) => (
        <button onClick={() => handleDelete(params.data!.id)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <h2>Drinks</h2>

      <div className="ag-theme-quartz" style={{ height: 450, width: "100%" }}>
        <AgGridReact rowData={drinks} columnDefs={columnDefs} />
      </div>
    </div>
  );
}

export default Drinks;