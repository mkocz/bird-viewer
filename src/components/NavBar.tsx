import { Box, HStack } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import { Link } from "react-router-dom";
import { LuBird } from "react-icons/lu";

const NavBar = () => {
  return (
    <HStack padding="10px">
      <Link to="/">
        <Box
          bg="white"
          p="7px"
          borderRadius="md"
          border="2px solid #64e490"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <LuBird size="25px" color="#626060" />
        </Box>
      </Link>
      <SearchInput />
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
