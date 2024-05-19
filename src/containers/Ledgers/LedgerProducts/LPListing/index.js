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
    enableColumnOrdering: true,
    createDisplayMode: "row",
    editDisplayMode: "row",
    enableEditing: true,
    initialState: { density: "comfortable" },
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
    //Table Column names
    muiTableHeadCellProps: {
      sx: {
        color: "white",
        backgroundColor: "#403d3d",
        minWidth: "50px",
        alignContent: "center",
      },
    },
    muiColumnActionsButtonProps: {
      sx: {
        color: "white",
        borderRight: "2px solid white",
        borderRadius: "0",
      },
    },

    //Actual Content of table
    muiTableBodyCellProps: {
      sx: {
        border: "3",
        backgroundColor: "#d0d5db",
        color: "#000000",
      },
    },
    //Top Right corner buttons like search, density
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "#000000",
        color: "#fff",
        "& .MuiIconButton-root": {
          color: "white",
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
            color: "white",
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
