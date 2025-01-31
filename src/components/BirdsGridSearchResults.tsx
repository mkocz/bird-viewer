import { SimpleGrid } from "@chakra-ui/react";
import BirdCard from "./BirdCard";
import BirdCardContainer from "./BirdCardContainer";
import useBirdQueryStore from "../store";

const BirdsGridSearchResults = () => {
  const birdQuery = useBirdQueryStore((s) => s.birdQuery);
  if (birdQuery.searchResults?.length === 0 || !birdQuery.searchResults)
    return null;

  const data = birdQuery.searchResults;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={6}
      padding="10px"
    >
      {data.map((bird) => {
        return (
          <BirdCardContainer key={bird.id}>
            <BirdCard bird={bird}></BirdCard>
          </BirdCardContainer>
        );
      })}
    </SimpleGrid>
  );
};

export default BirdsGridSearchResults;
