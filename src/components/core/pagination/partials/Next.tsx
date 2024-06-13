import { Button, HStack } from "@chakra-ui/react";
import { FaAngleLeft } from "react-icons/fa6";
interface Props {
  pages: number;
  page: number;
  setPage: (page: number) => void;
}
const Next = ({ pages, page, setPage }: Props) => {
  return (
    <HStack spacing="3.5px">
      <Button
        disabled={pages === page}
        w="44px"
        h="44px"
        variant="ghost"
        onClick={() => setPage(pages !== page ? page + 1 : pages)}
        _hover={{ bg: "primary.200/10", color: "primary.200" }}
      >
        <FaAngleLeft />
      </Button>
    </HStack>
  );
};

export default Next;
