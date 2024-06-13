import { FaAngleRight } from "react-icons/fa6";
import { Button, HStack } from "@chakra-ui/react";

interface Props {
  pages: number;
  page: number;
  setPage: (page: number) => void;
}
const Prev = ({ pages, page, setPage }: Props) => {
  return (
    <HStack spacing="3.5px">
      <Button
        disabled={pages === page}
        w="44px"
        h="44px"
        variant="ghost"
        onClick={() => setPage(page !== 1 ? page - 1 : 1)}
        _hover={{ bg: "primary.200/10", color: "primary.200" }}
      >
        <FaAngleRight />
      </Button>
    </HStack>
  );
};

export default Prev;
