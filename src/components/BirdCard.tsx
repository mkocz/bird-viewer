import Bird from "../entities/Bird";
import {
  Badge,
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-url";
import { Link } from "react-router-dom";
import { LuBird } from "react-icons/lu";
import endangermentStatusMap from "../data/endangerment_status";

interface Props {
  bird: Bird;
}

const BirdCard = ({ bird }: Props) => {
  return (
    <Card>
      {bird.images[0] ? (
        <Image src={getCroppedImageUrl(bird.images[0])} />
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="full"
          h="250px"
          bg="gray.600"
        >
          <LuBird size="80px" color="#CBD5E0" />
        </Box>
      )}
      <CardBody>
        <HStack justifyContent="space-between" marginBottom={3}>
          <Heading fontSize="2xl">
            <Link to={`/birds/${bird.id}`}>{bird.name}</Link>
          </Heading>
          {bird.status && (
            <Badge
              colorScheme={endangermentStatusMap[bird.status]}
              whiteSpace="normal"
            >
              {bird.status}
            </Badge>
          )}
        </HStack>
        <Text fontSize="xl" marginBottom={2}>
          ({bird.sciName})
        </Text>
        <Text>Region: {bird.region?.join(", ")}</Text>
      </CardBody>
    </Card>
  );
};

export default BirdCard;
