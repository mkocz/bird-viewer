import { Button, Heading, HStack, Show, Text } from "@chakra-ui/react";
import useBirdQueryStore from "../store";

const BirdsHeading = () => {
  const order = useBirdQueryStore((s) => s.birdQuery.order);
  const selectedOrder = useBirdQueryStore((s) => s.birdQuery.order);
  const setSelectedOrder = useBirdQueryStore((s) => s.setOrder);
  const setFamily = useBirdQueryStore((s) => s.setFamily);
  const setRegion = useBirdQueryStore((s) => s.setRegion);
  const setSearchText = useBirdQueryStore((s) => s.setSearchText);

  return (
    <>
      <Heading as="h1" marginBottom={8} fontSize="5xl">
        Birds
      </Heading>
      <Show above="lg">
        <HStack>
          {order && (
            <Text fontSize="3xl" marginBottom={5}>
              order: {order}
            </Text>
          )}
          {selectedOrder && (
            <Button
              onClick={() => {
                setSelectedOrder(undefined);
                setFamily(undefined);
                setRegion(undefined);
                setSearchText("");
              }}
              fontSize="lg"
              variant="link"
              paddingLeft={5}
              paddingBottom={4}
              textDecoration="underline"
              fontStyle="italic"
              color="#9ae6b4"
            >
              See all
            </Button>
          )}{" "}
        </HStack>
      </Show>
    </>
  );
};

export default BirdsHeading;
