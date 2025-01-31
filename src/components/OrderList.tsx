import { Button, Heading, List, ListItem } from "@chakra-ui/react";
import useBirdQueryStore from "../store";
import orders from "../data/orders_families";

const OrderList = () => {
  const setSelectedOrder = useBirdQueryStore((s) => s.setOrder);
  const selectedOrder = useBirdQueryStore((s) => s.birdQuery.order);
  const setFamily = useBirdQueryStore((s) => s.setFamily);
  const setRegion = useBirdQueryStore((s) => s.setRegion);
  const setSearchText = useBirdQueryStore((s) => s.setSearchText);

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Orders
      </Heading>
      <List>
        {Object.keys(orders)
          .sort((a, b) => a.localeCompare(b))
          .map((order) => (
            <ListItem key={order} paddingY="5px">
              <Button
                whiteSpace="normal"
                textAlign="left"
                fontWeight={order === selectedOrder ? "bold" : "normal"}
                onClick={() => {
                  setSelectedOrder(order);
                  setFamily("");
                  setRegion(undefined);
                  setSearchText("");
                }}
                fontSize="lg"
                variant="link"
              >
                {order}
              </Button>
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default OrderList;
