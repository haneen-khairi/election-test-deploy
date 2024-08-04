import { Button, HStack } from "@chakra-ui/react";
import { FaAngleLeft } from "react-icons/fa6";
interface Props {
  pages: number;
  page: number;
  setPage: (page: number) => void;
  isLast?: boolean;
}
const Next = ({ pages, page, setPage, isLast = false }: Props) => {
  return (
    <HStack spacing="3.5px">
      <Button
        isDisabled={pages === page}
        w={isLast ? "60px" : "44px"}
        h="44px"
        variant="ghost"
        onClick={() =>
          isLast ? setPage(pages) : setPage(pages !== page ? page + 1 : pages)
        }
        _hover={{ bg: "primary.200/10", color: "primary.200" }}
      >
        <FaAngleLeft />
        {isLast && <FaAngleLeft />}
      </Button>
    </HStack>
  );
};

export default Next;