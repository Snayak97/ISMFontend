import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextareaAutosize,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "../../../api/Axios";
import { IoSearch } from "react-icons/io5";

const UserManagement = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedClient, setSelectedClient] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [openAddUser, setOpenAddUser] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Axios.get("/auth/all_clients_and_normal_users");
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (e, newValue) => setActiveTab(newValue);
  const handleClientChange = (e) => setSelectedClient(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  if (loading) return <CircularProgress />;
  if (!data) return <p>No data found</p>;

  // Filter clients for select dropdown
  const filteredClients =
    searchTerm === ""
      ? data.clients
      : data.clients.filter((c) =>
          c.org_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

  const columns = [
    { field: "user_name", headerName: "Name", flex: 1, filterable: true },
    { field: "email", headerName: "Email", flex: 1, filterable: true },
    { field: "role_name", headerName: "Role", width: 130, filterable: true },
    {
      field: "department_name",
      headerName: "Department",
      width: 150,
      filterable: true,
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 130,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.value ? "error" : "success"}
          size="small"
          onClick={() =>
            alert(
              `${params.row.user_name} is now ${
                params.value ? "Deactivated" : "Activated"
              }`
            )
          }
        >
          {params.value ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  const getClientUsers = () =>
    selectedClient
      ? data.clients.find((c) => c.client_id === selectedClient).users
      : [];

  return (
    <Box sx={{ p: 3 }}>
      {/* Tabs + Add User Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Normal Users" />
          <Tab label="Clients" />
        </Tabs>

         <Button variant="contained" color="primary" onClick={() => setOpenAddUser(true)}>
          Add Client
        </Button>
      </Box>

      {/* Normal Users Table */}
      {activeTab === 0 && (
        <Box sx={{ width: "100%", overflowX: "auto" }}>
          <DataGrid
            rows={data.normal_users}
            columns={columns}
            getRowId={(row) => row.user_id}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            autoHeight
            checkboxSelection
            disableColumnResize={false} // allow column resize
            columnBuffer={columns.length} // buffer for horizontal scroll
            sx={{
              minWidth: 800, // force horizontal scroll if columns exceed
            }}
          />
        </Box>
      )}
     

      {/* Clients Tab */}
      {activeTab === 1 && (
        <Box>
          {/* Search + Client Select */}
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
            <TextField
              className=" !bg-white !text-transparent !text-3xl "
              placeholder="Search clients..."
              value={searchTerm}
              onChange={handleSearchChange}
              size="small"
              variant="outlined"
              sx={{ minWidth: 200 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IoSearch size={20} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              label="Select Client"
              value={selectedClient}
              onChange={handleClientChange}
              size="small"
              variant="outlined"
              sx={{ minWidth: 200 }}
            >
              {filteredClients.map((client) => (
                <MenuItem key={client.client_id} value={client.client_id}>
                  {client.org_name}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Client Users Table */}
          {selectedClient && (
            <Box sx={{ width: "100%", overflowX: "auto" }}>
              <DataGrid
                rows={getClientUsers()}
                columns={columns}
                getRowId={(row) => row.user_id}
                pageSize={5}
                rowsPerPageOptions={[5, 10]}
                autoHeight
                checkboxSelection
              />
            </Box>
          )}
        </Box>
      )}

       <Dialog open={openAddUser} onClose={() => setOpenAddUser(false)} fullWidth>
        <DialogTitle>Add Client</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Name" fullWidth />
          <TextField label="Email" fullWidth />
          <TextField label="Department" fullWidth />
          <TextField label="Role" fullWidth />
          <TextField label="Mobile Number" fullWidth />
          <TextareaAutosize minRows={3} placeholder="Notes / Remarks" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddUser(false)}>Cancel</Button>
          <Button variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
