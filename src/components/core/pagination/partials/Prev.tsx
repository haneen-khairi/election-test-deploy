import { Button, HStack } from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa6";

interface Props {
  pages: number;
  page: number;
  setPage: (page: number) => void;
  isFirst?: boolean;
}

const Prev = ({ page, setPage, isFirst = false }: Props) => {
  return (
    <HStack spacing="3.5px">
      <Button
        isDisabled={page === 1}
        w={isFirst ? "60px" : "44px"}
        h="44px"
        variant="ghost"
        onClick={() =>
          isFirst ? setPage(1) : setPage(page !== 1 ? page - 1 : 1)
        }
        _hover={{ bg: "primary.200/10", color: "primary.200" }}
      >
        {isFirst && <FaAngleRight />}
        <FaAngleRight />
      </Button>
    </HStack>
  );
};

export default Prev;