/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useTable, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { truncateText } from "@constants/functions/TruncateText";
import Pagination from "../pagination";

interface Props {
  count?: number | null | undefined;
  pageSize?: number;
  page?: number;
  setPage?: (page: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any;
  filter?: unknown;
  data: unknown;
  isFetching?: boolean;
  withPagination?: boolean;
  withBorder?: boolean;
  noDataElement?: React.ReactNode;
  noDataFilterElement?: React.ReactNode;
}

const ETable: React.FC<Props> = ({
  columns,
  data,
  withPagination,
  pageSize,
  count,
  page,
  filter,
  noDataElement,
  noDataFilterElement,
  setPage,
  isFetching = false,
}: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any,
      useSortBy,
    );
  useEffect(() => {
    return () => {
      if (setPage) {
        setPage(1);
      }
    };
  }, []);

  return (
    <Box w="100%">
      <Table
        {...getTableProps()}
        colorScheme="gray"
        bg="White"
        borderRadius="8px"
      >
        <Thead borderBottom="2px solid #EEEFF2">
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps({
                    style: {
                      fontSize: "16px",
                      fontWeight: "700",
                      textTransform: "none",
                      color: "#121212",
                      padding: "20px 10px",
                      background: "#F7F9FA",
                      textAlign: "center",
                    },
                  })}
                >
                  {column.render("Header")}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {isFetching && (
            <>
              {Array.from({ length: 10 }).map((_item, idx) => (
                <Tr p="5" key={idx as number}>
                  {Array.from({ length: columns?.length || 0 }).map(
                    (_item, index) => (
                      <Td key={index as number}>
                        <Skeleton
                          height="20px"
                          rounded="5px"
                          startColor="#F0F2F6"
                          endColor="#E2E5E9"
                        />
                      </Td>
                    ),
                  )}
                </Tr>
              ))}
            </>
          )}
          {!isFetching &&
            rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps({
                        style: {
                          fontSize: "14px",
                          padding: "24px",
                          textAlign: "center",
                        },
                      })}
                    >
                      {cell.value === null ? (
                        "-"
                      ) : cell.value === undefined ? (
                        cell.render("Cell")
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: truncateText(String(cell.value), 20),
                          }}
                        />
                      )}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          {rows?.length === 0 && !isFetching && (
            <Tr p="5">
              <Td
                textAlign="center"
                color="gray.400"
                fontSize="14px"
                colSpan={columns?.length}
              >
                {noDataElement && noDataFilterElement
                  ? filter !== undefined
                    ? noDataFilterElement
                    : noDataElement
                  : "لا يوجد نتائج"}
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      {withPagination && (
        <Pagination
          count={count}
          page={page || 0}
          pageSize={pageSize || 10}
          setPage={setPage || (() => {})}
        />
      )}
    </Box>
  );
};

export default ETable;
