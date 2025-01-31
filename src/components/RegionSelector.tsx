import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useBirdQueryStore from "../store";

const regions = [
  { value: undefined, label: "North America, Western Europe" },
  { value: "North America", label: "North America" },
  { value: "Western Europe", label: "Western Europe" },
];

const SortSelector = () => {
  const region = useBirdQueryStore((s) => s.birdQuery.region);
  const setRegion = useBirdQueryStore((s) => s.setRegion);
  const searchText = useBirdQueryStore((s) => s.searchText);
  const currentRegion = regions.find((reg) => reg.value === region);

  if (searchText) return null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        Region: {currentRegion?.label || "North America & Western Europe"}
      </MenuButton>
      <MenuList>
        {regions.map((region) => (
          <MenuItem
            key={region.value || null}
            value={region.value}
            onClick={() => setRegion(region.value)}
          >
            {region.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortSelector;
