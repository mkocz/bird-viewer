import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import useBirds from "../hooks/useBirds";
import BirdCard from "./BirdCard";
import BirdCardSkeleton from "./BirdCardSkeleton";
import BirdCardContainer from "./BirdCardContainer";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useBirdQueryStore from "../store";

const BirdsGrid = () => {
  const { data, error, isLoading, fetchNextPage, hasNextPage } = useBirds();
  const order = useBirdQueryStore((s) => s.birdQuery.order);
  const searchText = useBirdQueryStore((s) => s.searchText);
  const family = useBirdQueryStore((s) => s.birdQuery.family);
  const noFilters = !order && !family && !searchText;
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error.message}</Text>;
  const fetchedBirdsCount =
    data?.pages.reduce((total, page) => total + page.entities.length, 0) || 0;

  return (
    <InfiniteScroll
      dataLength={fetchedBirdsCount}
      hasMore={!!hasNextPage}
      next={() => fetchNextPage()}
      loader={<Spinner />}
    >
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        spacing={6}
        padding="10px"
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <BirdCardContainer key={skeleton}>
              <BirdCardSkeleton />
            </BirdCardContainer>
          ))}
        {data?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.entities.map((bird) => {
              if (bird.images.length > 0 || !noFilters)
                return (
                  <BirdCardContainer key={bird.id}>
                    <BirdCard bird={bird}></BirdCard>
                  </BirdCardContainer>
                );
            })}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default BirdsGrid;
