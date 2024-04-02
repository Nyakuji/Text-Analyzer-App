import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import TextAnalyzer from "./TextAnalyzer"; // Import the TextAnalyzer component

interface HeroSectionProps {}

export const HeroSection: FunctionComponent<HeroSectionProps> = () => {
  const [showTextAnalyzer, setShowTextAnalyzer] = useState(false);
  const buttonBgColor = useColorModeValue("brand.500", "brand.300");
  const buttonHoverBgColor = useColorModeValue("brand.600", "brand.400");

  const handleButtonClick = () => {
    setShowTextAnalyzer(true);
  };

  return (
    <Container maxW="container.lg">
      <Center p={4} minHeight="70vh">
        <VStack spacing={8}>
          <Container maxW="container.md" textAlign="center">
            <Heading size="2xl" color="gray.700">
              Welcome to the Text Analyzer App 🚀
            </Heading>
            <Text fontSize="xl" color="gray.500">
              Analyze your text and improve your typing speed with ease
            </Text>
            {showTextAnalyzer && <TextAnalyzer />}
            {!showTextAnalyzer && (
            <Button
              mt={8}
              colorScheme="brand"
              backgroundColor={buttonBgColor}
              _hover={{ backgroundColor: buttonHoverBgColor }}
              onClick={handleButtonClick}
            >
              Get started and Enjoy! 🚀
            </Button>
            )}
          </Container>
        </VStack>
      </Center>
    </Container>
  );
};
