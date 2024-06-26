import { Box, VStack } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Header } from "./Header";

/**
 * Props for the Layout component.
 */
interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FunctionComponent<LayoutProps> = ({
  children,
}: LayoutProps) => {
  return (
    <Box bg="gray.50">
      <VStack spacing={10} w="full" align="center">
        <Header name="Text Analyzer" />
        {children}
      </VStack>
    </Box>
  );
};