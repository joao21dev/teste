import { Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { HiOutlineIdentification } from "react-icons/hi";

const PersonalInfoCard = (props: any) => {
  return (
    <Flex
      p={3}
      border="2px solid #CAD6D1"
      borderRadius="8px"
      bg="#F5FAF8"
      w="286px"
      h="70px"
      m={2}
    >
      <Center borderRadius="50%" bg="#CAD6D1" w="48px" h="48px">
        {props.icon}
      </Center>
      <Box ml={2}>
        <Text>{props.title}</Text>
        <Text>{props.subTitle}</Text>
      </Box>
    </Flex>
  );
};

export default PersonalInfoCard;
