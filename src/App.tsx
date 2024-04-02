import {
  Box,
  Container,
  Text,
  VStack,
  Flex,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { FAQSection } from "./components/FAQSection";
import { HeroSection } from "./components/HeroSection";
import { Layout } from "./components/Layout";
import { Helmet } from "react-helmet";


interface FAQType {
  q: string;
  a: string;
}

const faqs: FAQType[] = [
  {
    q: "How do I get started?",
    a:" You can get started by clicking the 'Get started' "
  },
  {
    q: "Is there any fee to be used the app?",
    a: "No, the app is free to use. You can use it as much as you want.",
  },
  {
    q: "Can I use the app from any country?",
    a: "Yes, you can use the app from any country in the world.",
  },
  {
    q: "How can I learn more about the app?",
    a: "You can learn more about the app by visiting the 'About us' page.",
  },
];

export const App = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Text-Analyzer-App | Get started and enjoy</title>
      </Helmet>
      <Box bg="gray.50">
      <HeroSection />
    </Box>
        <Container py={28} maxW="container.md">
        <Box w="full">
          <VStack spacing={10} w="full">
            <Text fontWeight={500} fontSize="2xl" align="center">
              Frequently asked questions
            </Text>
            <FAQSection items={faqs} />
          </VStack>
        </Box>
      </Container>
      <Box bg="gray.50" py={6}>
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="blue.500">Text Analyzer</Text>
            <Text fontSize="sm" color="gray.600">© 2024. All rights reserved.</Text>
          </Box>
          <Flex direction="column" alignItems="flex-end">
            <Flex align="center" mb={2}>
              <LinkBox mr={4}>
                <LinkOverlay fontSize="sm" color="gray.600">Privacy Policy</LinkOverlay>
              </LinkBox>
              <LinkBox mr={4}>
                <LinkOverlay fontSize="sm" color="gray.600">Terms of Service</LinkOverlay>
              </LinkBox>
              <LinkBox>
                <LinkOverlay fontSize="sm" color="gray.600">Cookie Policy</LinkOverlay>
              </LinkBox>
            </Flex>
            <Text fontSize="sm" color="gray.600">Created by Philip Opiyo</Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
    </Layout>
  );
};
