import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { prepareLedgerColumns } from "./lp-listing-utils";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ledgerProdcutValidation } from "../ledger-validations";

const LPListing = ({ items, onSubmit, onDelete, onEdit }) => {
  const [errors, setErrors] = useState({});
  const [columnNames, setColumnNames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (_.isEmpty(columnNames)) {
      setLoading(true);

      tableColumns(errors);
    }
  }, [columnNames, errors]);

  useEffect(() => {
    if (!_.isEmpty(errors)) {
      tableColumns(errors);
    }
  }, [errors]);

  const tableColumns = (validationErrors) => {
    const preparedColumns = prepareLedgerColumns(validationErrors);
    setColumnNames(preparedColumns);
    setLoading(false);
  };

  const columns = useMemo(() => columnNames, [columnNames]);

  const handleCreateProduct = (values) => {
    const newValidationErrors = ledgerProdcutValidation(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setErrors(newValidationErrors);
      return;
    }
    setErrors({});
    onSubmit(values, "insert");
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const { id } = row;
      onDelete(id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: items,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    initialState: { density: "compact" },
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: {
        minHeight: "500px",
      },
    },
    onCreatingRowCancel: () => console.log("onCreating Row Cancel"),
    onCreatingRowSave: ({ values }) => handleCreateProduct(values),
    onEditingRowCancel: () => console.log("on editing row cancel"),
    onEditingRowSave: ({ values }) => onEdit(values, "update"),
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New Product
      </Button>
    ),
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="ledger-product-listing-container">
      <MaterialReactTable table={table} />;
    </div>
  );
};

export default LPListing;
