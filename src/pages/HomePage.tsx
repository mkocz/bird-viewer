import { Box, Grid, GridItem, HStack, Show, Text } from "@chakra-ui/react";
import OrderList from "../components/OrderList";
import BirdsHeading from "../components/BirdsHeading";
import RegionSelector from "../components/RegionSelector";
import BirdsGrid from "../components/BirdsGrid";
import useBirdQueryStore from "../store";
import BirdsGridSearchResults from "../components/BirdsGridSearchResults";
import FamilySelector from "../components/FamilySelector";
import OrderSelector from "../components/OrderSelector";

const HomePage = () => {
  const birdQuery = useBirdQueryStore((s) => s.birdQuery);
  const searchText = useBirdQueryStore((s) => s.searchText);

  return (
    <Grid
      templateAreas={{
        base: `"main"`,
        lg: ` "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <OrderList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <BirdsHeading />
          <HStack marginBottom={5} wrap="wrap" gap={5} spacing={0}>
            <Show below="lg">
              <OrderSelector />
            </Show>
            <FamilySelector />
            <RegionSelector />
          </HStack>
        </Box>

        {birdQuery.searchResults && birdQuery.searchResults?.length > 0 && (
          <BirdsGridSearchResults />
        )}
        {birdQuery.searchResults?.length === 0 && searchText && (
          <Text>No birds found</Text>
        )}
        {birdQuery.searchResults?.length === 0 && !searchText && <BirdsGrid />}
      </GridItem>
    </Grid>
  );
};

export default HomePage;
