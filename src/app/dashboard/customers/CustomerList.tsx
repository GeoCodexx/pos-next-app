//'use server';
import DataTable from "@/components/DataTable";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";

async function fetchData() {
  const res = await fetch("http://localhost:3000/api/customers");
  if (!res.ok) console.log("Error fetching data");
  return res.json();
}

const customerList = async () => {
  const customers = await fetchData();
  //console.log(customers);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "names", headerName: "Nombres", width: 130 },
    { field: "patlastname", headerName: "Ap. Paterno", width: 130 },
    { field: "matlastname", headerName: "Ap. Paterno", width: 130 },
    { field: "email", headerName: "Correo", width: 130 },
    { field: "phone", headerName: "Telefono", width: 130 },
    { field: "createdAt", headerName: "Fecha Registro", width: 130 },
    /*{
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },*/
  ];
  //rows={customers} columns={columns}
  return (
    <main>
      <Box>
        <Link href="/dashboard/customers/register">
          <Button variant="contained">Contained</Button>
        </Link>
        <DataTable rows={customers} columns={columns} />
      </Box>
    </main>
  );
};

export default customerList;
