import { useParams } from "react-router-dom";
import useBird from "../hooks/useBird";
import {
  Box,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import BirdAttributes from "../components/BirdAttributes";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "./../index.css";

const BirdDetailPage = () => {
  const { id } = useParams();
  const { data: bird, isLoading, error } = useBird(id!);

  if (isLoading) return <Spinner />;
  if (error || !bird) throw error;

  const images = bird.images || [];

  return (
    <Box maxW={{ base: "100%", md: "820px" }} mx={{ base: "5", md: "auto" }}>
      {images.length > 1 ? (
        <LightGallery
          speed={500}
          plugins={[]}
          elementClassNames="my-gallery-container"
        >
          {images.map((src, index) => (
            <a
              key={index}
              href={src}
              style={{ display: "block", width: "400px" }}
            >
              <img
                src={src}
                alt={bird.name}
                style={{ width: "400px", margin: "5px", cursor: "pointer" }}
              />
            </a>
          ))}
        </LightGallery>
      ) : (
        <Image src={images[0]} width={800} marginBottom={4} />
      )}

      <SimpleGrid columns={{ base: 1 }} spacing={5}>
        <GridItem>
          <Heading>{bird.name}</Heading>
          <Text fontSize="xl" marginBottom={2}>
            {bird.sciName}
          </Text>
          <BirdAttributes bird={bird} />
        </GridItem>
      </SimpleGrid>
    </Box>
  );
};

export default BirdDetailPage;
