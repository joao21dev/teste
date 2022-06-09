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
import SelectInput from "../components/SelectInput/selectInput";
import { useMemo } from "react";
import axios from "axios";
import { useEffect, useParams } from "react";
import { useRouter } from "next/router";
import { Agent } from "http";
import { FiPhoneCall } from "react-icons/fi";
import Link from "next/link";

const Employee = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { EmployeeId } = router.query;
  console.log(EmployeeId);

  const fetchData = async (EmployeeId) => {
    const response = await axios
      .get(`https://pp-api-desafio.herokuapp.com/agent/${EmployeeId}`)
      .catch((err) => console.log(err));

    if (response) {
      const data = response.data.agent;

      console.log("Data da api em accounts: ", data.phone);
      setData(data);
    }
  };

  const DDD = data.phone ? data.phone.ddd : null;
  const DDI = data.phone ? data.phone.ddi : null;
  const NUM = data.phone ? data.phone.number : null;

  const phoneNumber = DDI + " " + DDD + " " + NUM;

  useEffect(() => {
    fetchData(EmployeeId);
  }, []);

  return (
    <div>
      <Flex>
        <Box cursor="pointer" mt={3}>
          <Link href="/">
            <AiOutlineArrowLeft color="#34423D" fontSize={24} />
          </Link>
        </Box>

        <Text fontSize="32px" color="#34423D" ml={2}>
          Detalhes do Colaborador
        </Text>
      </Flex>

      <Box w="956px" h="800px" bg="white">
        <Flex pt={8} m={8}>
          <Avatar src={data.image} />
          <Box ml={3}>
            <Text fontWeight={600}>{data.name}</Text>
            <Text>{data.email}</Text>
          </Box>
        </Flex>
        <Text fontSize="18px" fontWeight={600} m={8}>
          Informações Pessoais
        </Text>
        <Flex mt={6} justifyContent="center">
          <PersonalInfoCard
            icon={<HiOutlineIdentification />}
            title={data.document ? data.document.type : null}
            subTitle={data.document ? data.document.number : null}
          />
          <PersonalInfoCard
            icon={<FiPhoneCall />}
            title={"Telefone"}
            subTitle={phoneNumber}
          />
          <PersonalInfoCard
            icon={<AiOutlineCalendar />}
            title={"Nascimento"}
            subTitle={data.birth_date}
          />
        </Flex>

        <Box
          ml={8}
          mt={8}
          w="890px"
          bg="white"
          h="350px"
          border="1px solid #CAD6D1"
          borderRadius="8px"
        >
          <Text fontSize="18px" fontWeight={600} color="#34423D" ml={2}>
            Dados Organizacionais
          </Text>
          <Flex>
            <SelectInput placeholder={data.department} />
            <SelectInput placeholder={data.role} />
          </Flex>
          <Flex>
            <SelectInput placeholder={data.branch} />
            <SelectInput placeholder={data.status} />
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default Employee;
