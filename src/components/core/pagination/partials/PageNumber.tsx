import { Button } from "@chakra-ui/react";

interface Props {
  pageNumber: number;
  page: number;
  setPage: (page: number) => void;
}
const PageNumber = ({ pageNumber, page, setPage }: Props) => {
  return (
    <Button
      onClick={() => setPage(pageNumber)}
      disabled={page === pageNumber}
      pt="2px"
      w="fit-content"
      h="44px"
      bg={page === pageNumber ? "primary.200/10" : ""}
      color={page === pageNumber ? "primary.200" : ""}
      _hover={{ bg: "primary.200/10", color: "primary.200" }}
      variant="ghost"
      textAlign="right"
      fontSize="14px"
      fontWeight="600"
    >
      {pageNumber.toLocaleString()}
    </Button>
  );
};

export default PageNumber;
