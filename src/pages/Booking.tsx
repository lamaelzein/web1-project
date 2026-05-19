import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ICellRendererParams } from "ag-grid-community";

type Booking = {
  id: number;
  name: string;//oo
};

function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(
    JSON.parse(localStorage.getItem("bookings") || "[]")
  );

  const handleDelete = (id: number) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const columnDefs: ColDef<Booking>[] = [
    { field: "name" },

    {
      headerName: "Delete",
      cellRenderer: (params: ICellRendererParams<Booking>) => (
        <button onClick={() => handleDelete(params.data!.id)}>
          Delete
        </button>
      ),
    },
  ];

  return (
    <div>
      <h2>Bookings</h2>

      <div className="ag-theme-quartz" style={{ height: 450, width: "100%" }}>
        <AgGridReact rowData={bookings} columnDefs={columnDefs} />
      </div>
    </div>
  );
}

export default Bookings;