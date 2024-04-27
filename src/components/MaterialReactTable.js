import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Search from '@material-ui/icons/Search';

const tableIcons = {
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />)
};

const MaterialReactTable = ({ data }) => {
  return (
    <MaterialTable
      icons={tableIcons}
      title="Example Table"
      columns={[
        { title: 'Stock Symbol', field: 'stockSymbol' },
        { title: 'Buy Price', field: 'buyPrice', type: 'numeric' },
        { title: 'Buy Date', field: 'buyDate', type: 'date' },
        { title: 'Quantity', field: 'quantity', type: 'numeric' },
        { title: 'Sell Price', field: 'sellPrice', type: 'numeric' },
        { title: 'Sell Date', field: 'sellDate', type: 'date' },
        { title: 'Brokerage', field: 'brokerage', type: 'numeric' },
        { title: 'Days Hold', field: 'daysHold', type: 'numeric' },
        { title: 'Reason to Buy', field: 'reasonToBuy' },
        { title: 'GTT Enabled', field: 'gttEnabled', type: 'boolean' },
        { title: 'Profit / Loss', field: 'profitLoss', type: 'numeric' },
        { title: 'Return %', field: 'returnPercent', type: 'numeric' },
        { title: 'Annual ROI', field: 'annualROI', type: 'numeric' },
        { title: 'ID', field: 'id', hidden: true },
        { title: 'Amount Invested', field: 'amountInvested', type: 'numeric' }
      ]}
      data={data}
      options={{
        filtering: true,
        sorting: true,
        exportButton: true,
        pageSizeOptions: [5, 10, 20],
        pageSize: 10
      }}
    />
  );
};

export default MaterialReactTable;
