import { DataGrid } from "@material-ui/data-grid";
import { getTableData } from "../assets/helperFunctions/apiCall";
import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { deleteOrGetReciept } from "../../src/assets/helperFunctions/apiCall";
import Navbar from "../components/navbar";

function RecieptList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [allReciepts, setAllReciepts] = useState([]);

  const deleteReciept = async (recieptId) => {
    try {
      const response = await deleteOrGetReciept(
        "/reciept",
        recieptId,
        token,
        "DELETE"
      );
      const result = await response.json();

      if (!result?.success) {
        alert("failed to delete Reciept");
      } else {
        setAllReciepts(allReciepts?.filter((data) => data?.id !== recieptId));
        alert("data deleted successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getAllReciepts = async () => {
      const allRecieptsData = await getTableData("/allReciepts", token);
      setAllReciepts(
        allRecieptsData?.allReciepts?.map((data) => {
          return {
            id: data?._id,
            receivedFrom: data?.receivedFrom,
          };
        })
      );
    };

    getAllReciepts();
  }, []);

  const columns = [
    { field: "id", headerName: "RecieptNumber", width: 300 },
    {
      field: "receivedFrom",
      headerName: "Name",
      width: 300,
    },
    {
      field: "actions",
      headerName: "Edit",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate("/reciept", {
                  state: {
                    recieptId: params?.id,
                  },
                });
              }}
              variant="contained"
            >
              EDIT
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                deleteReciept(params?.id);
              }}
              variant="contained"
            >
              Delete
            </Button>
          </>
        );
      },
    },

    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.getValue(params.id, "firstName") || ""} ${
    //       params.getValue(params.id, "lastName") || ""
    //     }`,
    // },
  ];

  // const rows = [
  //   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  //   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  //   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  //   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  //   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  //   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  //   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  //   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  //   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  // ];
  // const rows = allReciepts;

  return (
    <>
      <Navbar />
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="d-flex justify-content-between">
          <h3 className="m-3">All Reciepts</h3>
          <Button
            onClick={(e) => {
              navigate("/reciept");
            }}
            className="m-3"
            variant="contained"
          >
            Add Reciept
          </Button>
        </div>
        <DataGrid
          columns={columns}
          rows={allReciepts}
          pageSize={10}
          checkboxSelection={false}
          disableSelectionOnClick
          autoHeight={true}
        />
      </div>
    </>
  );
}

export default RecieptList;
