// @ts-nocheck
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import EmployeesList from "../components/EmployeesList/employeesList";
import { Avatar, Box, Center, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import EmployeesDetail from "../components/EmployeesDetail/employeesDetail";
import styled from "@emotion/styled";
import { renderToHTML } from "next/dist/server/render";
import RolesList from "../components/RolesList/rolesList";
import { AiOutlineArrowLeft, AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineIdentification } from "react-icons/hi";

import { css } from "@emotion/react";
import PersonalInfoCard from "../components/PersonalInfoCard/personalInfoCard";
import { useMemo } from "react";
import axios from "axios";
import { useEffect, useParams } from "react";
import { useRouter } from "next/router";
import { Agent } from "http";
import { FiPhoneCall } from "react-icons/fi";
import Link from "next/link";
import SelectInput from "../../components/SelectInput/selectInput";

const Role = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { RoleId } = router.query;
  console.log(RoleId);

  const fetchData = async (RoleId) => {
    const response = await axios
      .get(`https://pp-api-desafio.herokuapp.com/role/${RoleId}`)
      .catch((err) => console.log(err));

    if (response) {
      const data = response.data.role;

      console.log("Data da api em accounts: ", data);
      setData(data);
    }
  };

  useEffect(() => {
    fetchData(RoleId);
  }, []);

  return (
    <div>
      <Box cursor="pointer" mt={3}>
        <Link href="/">
          <AiOutlineArrowLeft color="#34423D" fontSize={24} />
        </Link>
      </Box>

      <Text fontSize="32px" color="#34423D" ml={2}>
        Detalhes do Cargo
      </Text>

      <Box
        bg="white"
        borderRadius="15px"
        justifyContent="center"
        alignItems="center"
        ml="24px"
      >
        <Box>
          <Text fontSize="18px" fontWeight={600} color="#34423D" ml={2}>
            Dados do Cargo
          </Text>
        </Box>
        <Flex>
          {" "}
          <Box
           
            mt={8}
            w="300px"
            bg="white"
            h="50px"
            border="1px solid #CAD6D1"
            borderRadius="8px"
          >
            <Text fontSize="12px" fontWeight={500} color="#34423D" ml={2}>
              Departamento
            </Text>
            <Text fontSize="16px" fontWeight={600} color="#34423D" ml={2}>
              {data.department}
            </Text>
          </Box>
          <Box w="956px" h="800px" bg="white">
            <Box
              mt={8}
              w="300px"
              bg="white"
              h="50px"
              border="1px solid #CAD6D1"
              borderRadius="8px"
            >
              <Text fontSize="12px" fontWeight={500} color="#34423D" ml={2}>
                Cargos
              </Text>
              <Text fontSize="16px" fontWeight={600} color="#34423D" ml={2}>
                {data.name}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default Role;
