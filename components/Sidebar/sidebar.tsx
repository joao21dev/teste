import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  InputLeftElement,
  Input,
  Stack,
  InputGroup,
  Avatar,
} from "@chakra-ui/react";
import {
  FiHome,
  FiBox,
  FiUser,
  FiClipboard,
  FiBriefcase,
  FiMenu,
  FiChevronDown,
  FiDisc,
  FiMessageCircle,
  FiSearch,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent />

      <MobileNav
        onOpen={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Box ml={{ base: 0, md: "216px" }} px="20">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = () => {
  return (
    <Box
      transition="3s ease"
      bg={"white"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
    ></Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <>
      <Flex
        bg="white"
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="61px"
        alignItems="center"
        justifyContent={{ base: "flex-end" }}
      >
        {" "}
        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}>
            <Flex m={8}>
              <Avatar mt={2} size="sm" />
              <Box ml={3}>
                <Text fontSize="14px" fontWeight={600}>
                  João Pedro
                </Text>
                <Text fontSize="12px" fontWeight={500}>
                  Meus dados
                </Text>
              </Box>
            </Flex>
          </Flex>
        </HStack>
      </Flex>
    </>
  );
};
