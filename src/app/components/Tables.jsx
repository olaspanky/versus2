import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { setAllUserData, setError } from "../store/slice/dataSlice";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UpdatePasswordModal from "../components/UPModal";
import ConfirmDeactivateModal from "../components/CDModal";
import SessionGraphModal from "../components/SessionGraphModal";

export default function DataTable() {
  const dispatch = useDispatch();
  const { allUserData, error } = useSelector((state) => state.alldata);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [confirmDeactivateModalOpen, setConfirmDeactivateModalOpen] = useState(false);
  const [sessionGraphModalOpen, setSessionGraphModalOpen] = useState(false);
  const [dailySessions, setDailySessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getAllUsers");
        const result = await response.json();
        
        if (result.success) {
          dispatch(setAllUserData(result.data));
        } else {
          dispatch(setError(result.message));
        }
      } catch (error) {
        dispatch(setError("An error occurred while fetching data."));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleManageAccess = () => {
    // Implement manage access logic here
    handleMenuClose();
  };

  const handleUpdatePassword = () => {
    setPasswordModalOpen(true);
    handleMenuClose();
  };

  const handlePasswordSave = async (newPassword) => {
    try {
      const response = await fetch("/api/updatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUser.id, newPassword }),
      });
      const result = await response.json();
      if (result.success) {
        alert("Password updated successfully.");
      } else {
        alert("Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("An error occurred while updating the password.");
    }
    setPasswordModalOpen(false);
    setSelectedUser(null); // Reset the selected user after saving
  };

  const handleToggleActivation = () => {
    setConfirmDeactivateModalOpen(true);
    handleMenuClose();
  };

  const handleConfirmDeactivate = async () => {
    try {
      const response = await fetch("/api/toggleActivation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: selectedUser.id }),
      });
      const result = await response.json();
      if (result.success) {
        alert("User activation status updated successfully.");
        dispatch(setAllUserData(result.data)); // update the user data in the state
      } else {
        alert("Failed to update user activation status.");
      }
    } catch (error) {
      console.error("Error updating user activation status:", error);
      alert("An error occurred while updating the user activation status.");
    }
    setConfirmDeactivateModalOpen(false);
    setSelectedUser(null); // Reset the selected user after updating
  };

  const handleRowClick = (params) => {
    console.log('Row clicked:', params.row); // Log the clicked row data
    const user = params.row;
    setSelectedUser(user);
    if (user.dailySessions && user.dailySessions.length > 0) {
      console.log('Daily sessions:', user.dailySessions); // Log the daily sessions data
      setDailySessions(user.dailySessions);
      setSessionGraphModalOpen(true);
    } else {
      console.log('No daily sessions found for this user.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const columns = [
    { field: "company", headerName: "Company", flex: 2 },
    { field: "createdAt", headerName: "Date created", flex: 1 },
    { field: "loginTimestamp", headerName: "Last Login", flex: 1 },
    { field: "sessionDuration", headerName: "User Average time (hrs)", flex: 1 },
    { field: "subscription", headerName: "Subscription Type", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuClick(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl) && selectedUser && selectedUser.id === params.row.id}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleManageAccess}>Manage Access</MenuItem>
            <MenuItem onClick={handleUpdatePassword}>Update Password</MenuItem>
            <MenuItem onClick={handleToggleActivation}>
              {params.row.isLoggedIn ? "Deactivate User" : "Activate User"}
            </MenuItem>
            <MenuItem onClick={() => handleRowClick(params)}>See Daily Sessions</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  const transformedData = allUserData.map(user => ({
    id: user._id,
    company: user.company,
    createdAt: new Date(user.createdAt).toLocaleDateString(),
    loginTimestamp: new Date(user.loginTimestamp).toLocaleDateString(),
    password: user.password,
    subscription: user.subscription,
    isLoggedIn: user.isLoggedIn,
    dailySessions: user.dailySessions,
    sessionDuration: (user.sessionDuration / 3600).toFixed(2) // Convert to hours and round to 2 decimal places
  }));

  return (
    <div>
      <div style={{ height: "60vh", width: "100%" }}>
        <DataGrid
          rows={transformedData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onRowClick={handleRowClick}
        />
        <UpdatePasswordModal
          open={passwordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          onSave={handlePasswordSave}
        />
        <ConfirmDeactivateModal
          open={confirmDeactivateModalOpen}
          onClose={() => setConfirmDeactivateModalOpen(false)}
          onConfirm={handleConfirmDeactivate}
          isActive={selectedUser?.isLoggedIn}
        />
        <SessionGraphModal
          open={sessionGraphModalOpen}
          onClose={() => setSessionGraphModalOpen(false)}
          dailySessions={dailySessions}
        />
      </div>
    </div>
  );
}
