import {
  ChakraProvider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  extendTheme,
  Box,
  Select,
} from "@chakra-ui/react";

export default function SelectInput(props: any) {
  return (
    <Box w="418px" p={8}>
      <FormControl id={props.placeholder}>
        <Select>
          <option value="option1">{props.placeholder}</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </FormControl>
    </Box>
  );
}
