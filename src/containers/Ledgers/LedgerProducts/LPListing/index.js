import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { prepareLedgerColumns } from "./lp-listing-utils";
import { getLabel } from "../../../../hooks/ use-labels";
import { errorMessage } from "../../../../utils/validation";
import { ledgerProdcutValidation } from "../ledger-validations";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import Swal from "sweetalert2";
import TableActions from "./TableActions";

const LPListing = ({
  items,
  onSubmit,
  onDelete,
  onEdit,
  invalidSellDate,
  sellDateFocused,
  tableAction,
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
    Swal.fire({
      title: getLabel("areYouSureLabel"),
      text: getLabel("cannotRevertLabel"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: getLabel("deleteLabel"),
    }).then((result) => {
      if (result.isConfirmed) {
        const { id } = row;
        onDelete(id);
      }
    });
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
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        color: "lightgreen",
        backgroundColor: "#000000",
        minWidth: "230px",
      },
    },
    muiColumnActionsButtonProps: {
      sx: {
        color: "lightgreen",
        borderRight: "2px solid lightgreen",
        borderRadius: "0",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "0",
        backgroundColor: "#000000",
        color: "#fff",
      },
    },
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "#000000",
        color: "#fff",
        "& .MuiIconButton-root": {
          color: "lightgreen",
        },
      },
    },
    muiBottomToolbarProps: {
      className: "custom-footer",
      sx: {
        backgroundColor: "#000000",
        color: "#fff",
        "& .MuiIconButton-root,.MuiBox-root label, .MuiBox-root div,.MuiSvgIcon-root":
          {
            color: "lightgreen",
          },
      },
    },

    onActionCellChange: () => console.log("1"),
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
    renderTopToolbarCustomActions: ({ table }) => tableAction(table),
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="ledger-product-listing-container">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default LPListing;
