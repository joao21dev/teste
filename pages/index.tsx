// @ts-nocheck
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import EmployeesList from "../components/EmployeesList/employeesList";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import EmployeesDetail from "../components/EmployeesDetail/employeesDetail";
import styled from "@emotion/styled";
import { renderToHTML } from "next/dist/server/render";
import RolesList from "../components/RolesList/rolesList";

const Home: NextPage = () => {
  const [renderPage, setRenderPage] = useState(true);
  const handleRenderPage = () => {
    setRenderPage(!renderPage);
  };
  const Button = styled.button`
    border-bottom: 2px solid ${renderPage ? "#22e0a1" : "#A3B8B0"};
    width: 196px;
    color: ${renderPage ? "#000000" : "#A3B8B0"};
  `;
  const Button1 = styled.button`
    border-bottom: 2px solid ${renderPage ? "#A3B8B0" : "#22e0a1"};
    width: 196px;
    color: ${renderPage ? "#A3B8B0" : "#000000"};
  `;
  return (
    <div>
      <Text mt={6} ml="150px" fontWeight="600" fontSize="32px">
        Organização
      </Text>
      <Box mt={2}>
        <Box borderRadius="8px" bg="white" ml="150px" w="908px">
          <Flex py={6} ml="40px">
            <Box>
              {" "}
              <Button onClick={handleRenderPage}>Colaboradores</Button>
            </Box>
            <Box>
              <Button1 onClick={handleRenderPage}>Cargos</Button1>
            </Box>
          </Flex>
          {renderPage ? <EmployeesList /> : <RolesList />}
        </Box>
      </Box>
    </div>
  );
};

export default Home;
