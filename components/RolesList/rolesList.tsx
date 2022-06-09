import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Flex,
  Box,
  Text,
  Avatar,
  Center,
  OmitCommonProps,
  TableRowProps,
} from "@chakra-ui/react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { GlobalFilter } from "../GlobalFilter/globalFilter";
import Link from "next/link";
import { BsEye } from "react-icons/bs";

const RolesList = () => {
  const [data, setData] = useState([]);

  const userData = useMemo(() => [...data], [data]);

  const fetchData = async () => {
    console.log(userData);

    const response = await axios
      .get("https://pp-api-desafio.herokuapp.com/roles")
      .catch((err) => console.log(err));

    if (response) {
      const data = response.data.roles;

      console.log("Data da api em accounts: ", data);
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Cargo",
        accessor: "name",
      },
      {
        Header: "Departamento",
        accessor: "departament",
      },
      {
        Header: "Colaboradores",
        accessor: "agents_quantity",
        // isNumeric: true,
      },
      {
        id: "ghjghjhg",
        width: 25,
        Cell: ({ row }: any) => {
          return <h1></h1>;
        },
      },
      {
        id: "gdfgdg",
        width: 25,
        Cell: ({ row }: any) => {
          return <h1></h1>;
        },
      },
      {
        id: "gdfdgdg",
        width: 25,
        Cell: ({ row }: any) => {
          return <h1></h1>;
        },
      },
      {
        id: "gdqfçgdg",
        width: 25,
        Cell: ({ row }: any) => {
          return <h1></h1>;
        },
      },
      {
        id: "gdqlfgdg",
        width: 25,
        Cell: ({ row }: any) => {
          return <h1></h1>;
        },
      },
      {
        id: "gdffqfgdkg",
        width: 25,
        Cell: ({ row }: any) => {
          return <h1></h1>;
        },
      },

      {
        id: "2",
        Cell: ({ row }: any) => (
          <Box cursor="pointer">
            <Link href={`role/${row.index + 1}`}>
              <BsEye fontSize="26px" color={"gray"} />
            </Link>
          </Box>

          // props.cell.row.cells[4].value
        ),
      },
    ],

    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  }: any = useTable(
    { columns: columns, data: data },
    useGlobalFilter,
    useSortBy
  );

  const firstPageRows = rows.slice(0, 10);

  const isEven = (idx: any) => idx % 2 === 0;
  return (
    <div>
      {/* <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      /> */}

      <Text fontSize="16px" ml="40px">
        Listagem de Cargos
      </Text>

      <Flex>
        <Box
          bg="white"
          borderRadius="15px"
          justifyContent="center"
          alignItems="center"
          ml="24px"
        >
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup: any) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => (
                    <Th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {firstPageRows.map(
                (
                  row: {
                    getRowProps: () => JSX.IntrinsicAttributes &
                      OmitCommonProps<
                        React.DetailedHTMLProps<
                          React.HTMLAttributes<HTMLTableRowElement>,
                          HTMLTableRowElement
                        >,
                        keyof TableRowProps
                      > &
                      TableRowProps & { as?: "tr" | undefined };
                    cells: any[];
                  },
                  idx: any
                ) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell, idx) => {
                        return (
                          <Td
                            // onClick={()=>  console.log(cell.value)}
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                }
              )}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </div>
  );
};

export default RolesList;
