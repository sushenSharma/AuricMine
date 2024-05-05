import _ from "lodash";
import { Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { prepareLedgerColumns } from "./lp-listing-utils";
import { errorMessage } from "../../../../utils/validation";
import { ledgerProdcutValidation } from "../ledger-validations";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import TableActions from "./TableActions";

const LPListing = ({
  items,
  onSubmit,
  onDelete,
  onEdit,
  invalidSellDate,
  sellDateFocused,
}) => {
  const [errors, setErrors] = useState({});
  const [columnNames, setColumnNames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (invalidSellDate) {
      setErrors({
        ...errors,
        sellDate: errorMessage.lessSellDate,
      });
    }
  }, [invalidSellDate, errors]);

  useEffect(() => {
    if (_.isEmpty(columnNames)) {
      setLoading(true);

      tableColumns(errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnNames, errors]);

  useEffect(() => {
    if (!_.isEmpty(errors)) {
      tableColumns(errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const onColumnFocusHandler = (validationErrors, focusedColumn = "") => {
    setErrors({
      ...validationErrors,
    });

    if (focusedColumn === "sellDate" && invalidSellDate) {
      sellDateFocused();
      setErrors({
        ...validationErrors,
        sellDate: undefined,
      });
    }
  };

  const tableColumns = (validationErrors) => {
    const preparedColumns = prepareLedgerColumns(
      validationErrors,
      onColumnFocusHandler
    );
    setColumnNames(preparedColumns);
    setLoading(false);
  };

  const columns = useMemo(() => columnNames, [columnNames]);

  const handleCreateProduct = (values, table) => {
    const newValidationErrors = ledgerProdcutValidation(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setErrors(newValidationErrors);
      return;
    }
    setErrors({});
    onSubmit(values, "insert", table);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
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
    onCreatingRowCancel: () => setErrors({}),
    onCreatingRowSave: ({ values, table }) =>
      handleCreateProduct(values, table),
    onEditingRowCancel: () => setErrors({}),
    onEditingRowSave: ({ values, table }) => onEdit(values, "update", table),
    renderRowActions: ({ row, table }) => (
      <TableActions
        table={table}
        row={row}
        openModal={openDeleteConfirmModal}
      />
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
