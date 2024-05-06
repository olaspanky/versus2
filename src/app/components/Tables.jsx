// import React, { useEffect } from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllUserData, setError } from "../store/slice/dataSlice";

// const columns = [
//   { field: "companyName", headerName: "Company", flex: 2 },
//   { field: "createdAt", headerName: "Date created", flex: 1.5 },
//   { field: "password", headerName: "Password", flex: 1, sortable: false },
//   { field: "subscriptionType", headerName: "Subscription Type", flex: 1 },
// ];

// export default function DataTable() {
//   const dispatch = useDispatch();
//   const { allUserData, error } = useSelector((state) => state.alldata);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/api/userss");

//         if (response.ok) {
//           const data = await response.json();
//           //console.log("All User Data:", data);
//           dispatch(setAllUserData(data));
//         } else {
//           console.error(
//             "Failed to fetch all user data. Status:",
//             response.status
//           );
//           dispatch(setError("Failed to fetch user data"));
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         dispatch(setError("Error fetching user data"));
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   // Transform the data to match the expected structure for MUI DataGrid
//   const transformedData = allUserData.map((user) => ({
//     id: user._id, // Using _id as the unique identifier
//     companyName: user.CompanyName,
//     createdAt: user.createdAt,
//     password: user.password,
//     subscriptionType: user.subscription[0], // Assuming you want the first subscription
//     // Add other fields as needed
//   }));

//   return (
//     <div style={{ height: "400px", width: "100%" }}>
//       <DataGrid
//         rows={transformedData}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//       />
//     </div>
//   );
// }
import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { setAllUserData, setError } from "../store/slice/dataSlice";

export default function DataTable() {
  const dispatch = useDispatch();
  const { allUserData, error } = useSelector((state) => state.alldata);

  const handleUpdate = async (id) => {
    // Implement logic to update user with the given id
    try {
      const response = await fetch(`https://versusapi-2.onrender.com/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ /* update fields */ }),
      });

      if (response.ok) {
        // Update the UI or handle success as needed
        //console.log("User updated successfully");
      } else {
        console.error("Failed to update user. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      //console.log("Deleting user with ID:", id);
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      //console.log("Response:", response); // Log the response
      
      if (response.ok) {
        //console.log("User deleted successfully");
      } else {
        console.error("Failed to delete user. Status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  

  const columns = [
    { field: "companyName", headerName: "Company", flex: 2 },
    { field: "createdAt", headerName: "Date created", flex: 1.5 },
    { field: "password", headerName: "Password", flex: 1, sortable: false },
    { field: "subscriptionType", headerName: "Subscription Type", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <button onClick={() => handleUpdate(params.row.id)}>Update</button>
          <button onClick={() => handleDelete(params.row.id)}>Delete</button>
        </>
      ),
    },
  ];

  // Transform the data to match the expected structure for MUI DataGrid
  const transformedData = allUserData.map((user) => ({
    id: user._id, // Using _id as the unique identifier
    companyName: user.CompanyName,
    createdAt: user.createdAt,
    password: user.password,
    subscriptionType: user.subscription[0], // Assuming you want the first subscription
    // Add other fields as needed
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://versusapi-2.onrender.com/api/users");

        if (response.ok) {
          const data = await response.json();
          //console.log("All User Data:", data);
          dispatch(setAllUserData(data));
        } else {
          console.error(
            "Failed to fetch all user data. Status:",
            response.status
          );
          dispatch(setError("Failed to fetch user data"));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(setError("Error fetching user data"));
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <DataGrid
        rows={transformedData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
