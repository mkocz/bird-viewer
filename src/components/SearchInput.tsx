import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";
import useBirdQueryStore from "../store";
import { useNavigate } from "react-router-dom";
import birds from "../data/birds_data";
import Bird from "../entities/Bird";

interface BirdsData {
  [order: string]: Bird[];
}

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const searchText = useBirdQueryStore((s) => s.searchText);
  const setSearchResults = useBirdQueryStore((s) => s.setSearchResults);
  const setFamily = useBirdQueryStore((s) => s.setFamily);
  const setOrder = useBirdQueryStore((s) => s.setOrder);
  const setRegion = useBirdQueryStore((s) => s.setRegion);
  const setSearchText = useBirdQueryStore((s) => s.setSearchText);
  const navigate = useNavigate();
  const bgInput = useColorModeValue("#cce3d460", "rgba(255, 255, 255, 0.04)");
  const bgInputHover = useColorModeValue("#cce3d490", "rgba(255, 255, 255, 0.06)");

  useEffect(() => {
    if (!searchText) {
      if (ref.current) ref.current.value = "";
      setSearchResults([]);
    }
  }, [searchText, setSearchResults]);

  function searchByName(data: BirdsData, name: string): Bird[] {
    const results: Bird[] = [];
    for (const order in data) {
      if (data.hasOwnProperty(order)) {
        data[order].forEach((bird) => {
          if (bird.name.toLowerCase().includes(name.toLowerCase())) {
            results.push(bird);
          }
        });
      }
    }
    return results;
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (ref.current) {
          //A temporary solution due to the lack of a search endpoint
          const searchResults = searchByName(birds, ref.current.value);
          ref.current.value
            ? setSearchResults(searchResults)
            : setSearchResults([]);
          setSearchText(ref.current.value);
          setFamily(undefined);
          setOrder(undefined);
          setRegion(undefined);
          navigate("/");
        }
      }}
    >
      <InputGroup>
        <InputLeftElement children={<BsSearch />} />
        <Input
          bg={bgInput}
          ref={ref}
          borderRadius={20}
          placeholder="Search birds..."
          variant="filled"
          focusBorderColor="green.500"
          _hover={{ bg: bgInputHover}} 
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
