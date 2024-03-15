import { useMemo } from "react";

// material-ui
import {
  Box,
  Chip,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

// third-party
import {
  useTable,
  useFilters,
  usePagination,
  Column,
  HeaderGroup,
  Row,
  Cell,
} from "react-table";

// project import
import { CSVExport, TablePagination } from './ReactTable';


const styles = {
  myPanel: {
    header: {
      classes: "bg-[#D9F0EF] border border-[#D9F0EF]",
      styles: {
        color: "#2F9384",
      },
    },
  },
  clientGoal: {
    header: {
      classes: "bg-[#7397B5] border border-[#7397B5]",
      styles: {
        color: "white",
      },
    },
  },
  priorityList: {
    header: {
      classes: "bg-[#D9F0EF] border border-[#D9F0EF]",
      styles: {
        color: "#2F9384",
      },
    },
  },
  priorityListPrograms: {
    header: {
      classes: "bg-[#7397B5] border border-[#7397B5]",
      styles: {
        color: "white",
      },
    },
  },
  referralPrograms: {
    header: {
      classes: "bg-[#5BC4BF] border border-[#5BC4BF]",
      styles: {
        color: "white",
      },
    },
  },
  appointmentCalendar: {
    header: {
      classes: "bg-[#FFEDE2] border border-[#FFEDE2] text-white",
      styles: {
        color: "#CB6A69",
      },
    },
  },
  encounters: {
    header: {
      classes: "bg-[#C7CED4] border border-[#C7CED4] text-white",
      styles: {
        color: "#313B44",
      },
    },
  },
};

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, striped, type, top }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    usePagination
  );

  console.log(type);

  return (
    // <div style={{ overflowX: 'auto', minWidth: '700px' }}>
    <Stack>
      {top && (
        <Box sx={{ p: 2 }}>
          <TablePagination
            gotoPage={gotoPage}
            rows={rows}
            setPageSize={setPageSize}
            pageIndex={pageIndex}
            pageSize={pageSize}
          />
        </Box>
      )}

      <Table style={{ fontSize: "10px !important" }} {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow
              className={`${styles[type].header.classes}`}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <TableCell
                  className="text-center"
                  style={{
                    ...styles[type].header.styles,
                    paddingTop: "8px",
                    paddingBottom: "8px",
                    fontWeight: "600",
                    fontSize: 13,
                    textAlign: "center",
                  }}
                  {...column.getHeaderProps([{ className: column.className }])}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody
          style={{ border: "1px solid #EAECEB", borderRadius: "16px" }}
          {...getTableBodyProps()}
          {...(striped && { className: "striped" })}
        >
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow
                style={{ borderColor: "#EAECEB" }}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <TableCell
                    style={{
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      textAlign: "center",
                    }}
                    {...cell.getCellProps([
                      { className: cell.column.className },
                    ])}
                  >
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          {!top && (
            <TableRow>
              <TableCell sx={{ p: 2 }} colSpan={columns.length}>
                <TablePagination
                  gotoPage={gotoPage}
                  rows={rows}
                  setPageSize={setPageSize}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Stack>
  );
}

// ==============================|| REACT TABLE - BASIC ||============================== //

const BasicTable = ({ data, striped, title, columns, type }) => {
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: 'First Name',
  //       accessor: 'firstName'
  //     },
  //     {
  //       Header: 'Last Name',
  //       accessor: 'lastName'
  //     },
  //     {
  //       Header: 'Age',
  //       accessor: 'age',
  //       className: 'cell-right'
  //     },
  //     {
  //       Header: 'Visits',
  //       accessor: 'visits',
  //       className: 'cell-right'
  //     },
  //     {
  //       Header: 'Status',
  //       accessor: 'status',
  //       Cell: ({ value }) => {
  //         switch (value) {
  //           case 'Complicated':
  //             return <Chip color="error" label="Complicated" size="small" variant="light" />;
  //           case 'Relationship':
  //             return <Chip color="success" label="Relationship" size="small" variant="light" />;
  //           case 'Single':
  //           default:
  //             return <Chip color="info" label="Single" size="small" variant="light" />;
  //         }
  //       }
  //     },
  //     {
  //       Header: 'Profile Progress',
  //       accessor: 'progress',
  //       // Cell: ({ value }) => <LinearWithLabel value={value} sx={{ minWidth: 75 }} />
  //     }
  //   ],
  //   []
  // );

  return (
    // <MainCard
    //   content={false}
    //   title={title}
    //   // secondary={<CSVExport data={data.slice(0, 10)} filename={striped ? 'striped-table.csv' : 'basic-table.csv'} />}
    // >
    // <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}></Stack>
    <ReactTable
      className=""
      type={type}
      columns={columns}
      data={data}
      striped={striped}
    />
    // </MainCard>
  );
};

export default BasicTable;
