import { Badge, Box, SimpleGrid, Text } from "@chakra-ui/react";
import DefinitionItem from "./DefinitionItem";
import Bird from "../entities/Bird";
import endangermentStatusMap from "../data/endangerment_status";

interface Props {
  bird: Bird;
}

function capitalizeFirstLetter(str: string) {
  return str.replace(/^\w/, (c) => c.toUpperCase());
}

const BirdAttributes = ({ bird }: Props) => {
  return (
    <>
      <SimpleGrid columns={2} as="dl">
        <DefinitionItem term="Order">
          <Text>{bird.order}</Text>
        </DefinitionItem>
        <DefinitionItem term="Family">
          <Text>{bird.family}</Text>
        </DefinitionItem>
        {bird.lengthMax && bird.lengthMin && (
          <DefinitionItem term="Length">
            <Text>
              {bird.lengthMin} - {bird.lengthMax}cm
            </Text>
          </DefinitionItem>
        )}
        {bird.wingspanMax && bird.wingspanMin && (
          <DefinitionItem term="Wingspan">
            <Text>
              {bird.wingspanMin} - {bird.wingspanMax}cm
            </Text>
          </DefinitionItem>
        )}
        <DefinitionItem term="Region">
          {bird.region?.map((region) => (
            <Text key={region}>{region}</Text>
          ))}
        </DefinitionItem>
        {bird.status && (
          <DefinitionItem term="Status">
            <Badge
              colorScheme={endangermentStatusMap[bird.status]}
              whiteSpace="normal"
            >
              {bird.status}
            </Badge>
          </DefinitionItem>
        )}
      </SimpleGrid>
      {bird?.recordings && bird.recordings[0] && (
        <DefinitionItem term="Recordings">
          <SimpleGrid columns={{ base: 1, md: 2 }} as="dl" gap={2}>
            {bird.recordings?.map((rec) => (
              <Box key={rec.id} marginTop={3}>
                <Text mb={2} ml={2}>
                  {rec.type && capitalizeFirstLetter(rec.type)}
                </Text>
                <audio controls>
                  <source src={rec.file} type="audio/mpeg" />
                </audio>
              </Box>
            ))}
          </SimpleGrid>
        </DefinitionItem>
      )}
    </>
  );
};

export default BirdAttributes;
