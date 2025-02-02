import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { prepareLedgerColumns } from "./lp-listing-utils";
import { getLabel } from "../../../../../hooks/use-labels";
import { errorMessage } from "../../../../../utils/validation";
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

    initialState: {
      density: "comfortable",
      columnPinning: { left: ["stockSymbol"] },
      sorting: [
        {
          id: "id", // Replace "id" with the actual ID column's key if it's named differently
          desc: false, // `false` for ascending order
        },
      ],
    },
    getRowId: (row) => row.id,
    muiTableContainerProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)", //Actual Table boundary
        maxHeight: "calc(85vh - 200px)",
        /* Custom scrollbar styling */
        "::-webkit-scrollbar": {
          width: "26px", // Adjust scrollbar width here (default is ~8px)
          height: "16px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "#888", // Change the scrollbar thumb color
          borderRadius: "8px",
          border: "4px solid #f1f1f1", // Adds padding inside the scrollbar
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1", // Track color
        },

        /* For Firefox */
        scrollbarWidth: "thin", // Options: 'auto', 'thin'
        scrollbarColor: "#888 #f1f1f1", // Thumb color and track color
      },
    },
    // Styling the Table Header
    muiTableHeadCellProps: {
      sx: {
        color: "white",
        backgroundColor: "#403d3d", //Column strip background colour
        minWidth: "50px",
        alignContent: "center",
        borderBottom: "2px solid #272727", // Adding a border for separation
        padding: "8px",
      },
    },
    // Styling the Table Footer
    muiBottomToolbarProps: {
      className: "custom-footer",
      sx: {
        backgroundColor: "#272727", // Footer strip Background colour
        borderTop: "15px solid black",
        borderBottom: "2px solid #272727", // Add a black border if needed
        "& .MuiIconButton-root,.MuiBox-root label, .MuiBox-root div,.MuiSvgIcon-root":
          {
            color: "white", //Rows Per Page in footer Section
          },
        padding: "20px", // Adjust padding for content alignment
      },
    },
    // Actual Content of the table
    muiTableBodyCellProps: {
      sx: {
        border: "3",
        backgroundColor: "#d0d5db", //Rows colour
        color: "#000", //Table columns Text
      },
    },
    // Styling Top Toolbar
    muiTopToolbarProps: {
      sx: {
        backgroundColor: "#272727",
        color: "#fff",
        borderBottom: "15px solid #000", // Adding a border for separation
        "& .MuiIconButton-root": {
          color: "white",
        },
      },
    },
    muiColumnActionsButtonProps: {
      sx: {
        color: "#38b88d", //colour names properties
        borderRight: "2px solid white",
        borderRadius: "0",
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
