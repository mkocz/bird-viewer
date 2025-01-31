import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useBirdQueryStore from "../store";
import families from "../data/families";
import orders from "../data/orders_families";

interface BirdFamilies {
  [order: string]: string[];
}

const FamilySelector = () => {
  const order = useBirdQueryStore((s) => s.birdQuery.order);
  const setFamily = useBirdQueryStore((s) => s.setFamily);
  const family = useBirdQueryStore((s) => s.birdQuery.family);
  const searchText = useBirdQueryStore((s) => s.searchText);

  if (searchText) return null;
  let data: string[] = families.sort();
  const familiesData: BirdFamilies = orders;

  if (order) {
    data = familiesData[order].sort();
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {family || "Families"}
      </MenuButton>
      <MenuList>
        {family && (
          <MenuItem
            key="all"
            onClick={() => {
              setFamily(undefined);
            }}
          >
            All families
          </MenuItem>
        )}
        {data?.map((family) => (
          <MenuItem onClick={() => setFamily(family)} key={family}>
            {family}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FamilySelector;
