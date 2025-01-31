import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import useBirdQueryStore from "../store";
import orders from "../data/orders_families";

const OrderSelector = () => {
  const order = useBirdQueryStore((s) => s.birdQuery.order);
  const searchText = useBirdQueryStore((s) => s.searchText);
  const setSelectedOrder = useBirdQueryStore((s) => s.setOrder);
  const setFamily = useBirdQueryStore((s) => s.setFamily);
  const setRegion = useBirdQueryStore((s) => s.setRegion);
  const setSearchText = useBirdQueryStore((s) => s.setSearchText);

  if (searchText) return null;

  const resetFilters = () => {
    setFamily("");
    setRegion(undefined);
    setSearchText("");
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {order || "Orders"}
      </MenuButton>
      <MenuList>
        {order && (
          <MenuItem
            key="all"
            onClick={() => {
              setSelectedOrder(undefined);
              resetFilters();
            }}
          >
            All orders
          </MenuItem>
        )}
        {Object.keys(orders)
          .sort((a, b) => a.localeCompare(b))
          .map((order) => (
            <MenuItem
              key={order}
              onClick={() => {
                setSelectedOrder(order);
                resetFilters();
              }}
            >
              {order}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  );
};

export default OrderSelector;
