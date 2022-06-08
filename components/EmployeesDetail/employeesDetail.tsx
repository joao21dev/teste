import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const EmployeesDetail = () => {
  return <div>

    <Flex>
      <Avatar />
      <Box>
        <Text>joao21@gmail.com</Text>
        <Text>João Pedro Massarra</Text>
      </Box>
    </Flex>
  </div>;
};

export default EmployeesDetail;
