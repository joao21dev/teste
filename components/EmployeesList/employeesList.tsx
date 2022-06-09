import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
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
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsEye, BsTrash } from "react-icons/bs";
import EmployeeInfo from "../EmployeeInfo/employeeInfo";
import Link from "next/link";

const EmployeesList = () => {
  const [data, setData] = useState([]);

  const userData = useMemo(() => [...data], [data]);

  const fetchData = async () => {
    console.log(userData);

    const response = await axios
      .get("https://pp-api-desafio.herokuapp.com/agents")
      .catch((err) => console.log(err));

    if (response) {
      const data = response.data.items;

      console.log("Data da api em accounts: ", data);
      setData(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [renderEmployeeInfo, setRenderEmployeeInfo] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "agent_id",
      },
      {
        Header: "Nome Completo",
        accessor: "name",
        Cell: (props: any) => (
          <Flex>
            <Center>
              <Avatar size={"sm"} src={props.row.original.image} />
              <Text ml={2}>{props.cell.row.cells[1].value}</Text>
            </Center>
          </Flex>

          // props.cell.row.cells[4].value
        ),
      },
      {
        Header: "Departamento",
        accessor: "department",
      },
      {
        Header: "Cargo",
        accessor: "role",
        // isNumeric: true,
      },
      {
        Header: "Unidadde",
        accessor: "branch",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: (props) => (
          <Box
            borderRadius={15}
            w="70px"
            bg={
              props.cell.row.cells[4].value === "active" ? "#B5F1DD" : "#EAEFED"
            }
          >
            <Text color={"#34423D"} textAlign="center">
              {props.cell.row.cells[4].value === "active" ? "Ativo" : "Inativo"}
            </Text>
          </Box>
          // props.cell.row.cells[4].value
        ),
      },
      {
        id: "1",
        Cell: () => (
          <>
            <Box
              onClick={() => setRenderEmployeeInfo(!renderEmployeeInfo)}
              display="flex"
              justifyContent="space-around"
            >
              <BsTrash fontSize="26px" color={"gray"} />
            </Box>
          </>

          // props.cell.row.cells[4].value
        ),
      },
      {
        id: "2",
        Cell: (props: any) => (
          <Box cursor="pointer">
            <Link
              onClick={() => setRenderEmployeeInfo(!renderEmployeeInfo)}
              href={`/${props.cell.row.cells[0].value}`}
            >
              <BsEye fontSize="26px" color={"gray"} />
            </Link>
          </Box>

          // props.cell.row.cells[4].value
        ),
      },
    ],

    []
  );

  console.log(renderEmployeeInfo);

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
        Listagem de Colaboradores
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

export default EmployeesList;
