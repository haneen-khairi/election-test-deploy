/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { Control, useController, useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

interface ListItemType {
  value: string;
  label: string;
  setSelectedItems: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >;
}

const OptionItem = ({ value, label, setSelectedItems }: ListItemType) => {
  const handleAdd = () => {
    setSelectedItems((prev) => [
      ...prev,
      {
        value,
        label,
      },
    ]);
  };

  return (
    <Box
      cursor="pointer"
      padding="5px 15px"
      onClick={handleAdd}
      _hover={{
        background: "#006030",
        color: "white",
      }}
    >
      {label}
    </Box>
  );
};

const ListItem = ({ value, label, setSelectedItems }: ListItemType) => {
  const handleClick = () => {
    setSelectedItems((prev) => prev.filter(({ value: v }) => value !== v));
  };

  return (
    <Flex p="5px 10px" borderRadius="8px" border="1px solid #a7a7a7" gap="5px">
      <Text>{label}</Text>

      <Button
        width="10px"
        height="100%"
        background="transparent"
        padding="0px"
        margin="0px"
        onClick={handleClick}
      >
        <MdOutlineCancel />
      </Button>
    </Flex>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const MultiSelect = ({
  name,
  filter,
  placeholder,
  fetchFunction,
  control,
  isId = false,
}: {
  name: string;
  filter: any;
  placeholder: string;
  fetchFunction: any;
  control: Control<any, any>;
  isId?: boolean;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const {
    field: { onChange },
  } = useController({ control, name });

  const { setValue, watch } = useForm({});

  const { data, fetchNextPage, hasNextPage, isFetching } = fetchFunction(
    watch("search"),
    filter,
  );

  const options: any = useMemo(
    () => data?.pages.flatMap((page: any) => page.data) || [],
    [data],
  );

  const filterOptions: any = useMemo(
    () =>
      options.filter(
        ({ name }: { name: any }) =>
          !selectedItems.flatMap((item) => item.value).includes(name),
      ) || [],
    [options, selectedItems],
  );

  useEffect(() => {
    onChange(selectedItems.flatMap((item) => item.value).join(","));
  }, [selectedItems]);

  useEffect(() => {
    if (
      (name === "last_name" && !filter?.last_name) ||
      (name === "place_of_residence" && !filter?.place_of_residence) ||
      (name === "family_tree_id" && !filter?.family_tree_id)
    ) {
      setSelectedItems([]);
    }
  }, [filter]);

  return (
    <Flex
      direction="column"
      gap="10px"
      sx={{
        position: "relative",
        borderRadius: "8px",
        background: "white",
        borderColor: "#E4E4E4",
        padding: "10px 15px",
        backgroundColor: "transparent",
        border: "1px solid #71809646",
        margin: "3px 2px",
        color: "#4A5568",
      }}
    >
      <Flex w="100%" justifyContent="space-between">
        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          w="fit-content"
        >
          <Input
            type="text"
            placeholder={placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            name="search"
            value={watch("search")}
            onChange={(e) => {
              setValue("search", e.target.value);
            }}
            w="200px"
            h="40px"
          />

          {(isFocused || isHovered) && (
            <Flex
              direction="column"
              sx={{
                position: "absolute",
                borderRadius: "8px",
                height: "300px",
                width: "200px",
                background: "white",
                borderColor: "#E4E4E4",
                border: "1px solid #71809646",
                color: "#4A5568",
                zIndex: "20",
                top: "50px",
                overflowY: "scroll",
              }}
            >
              {isFetching ? (
                <Spinner mx="auto" my="10px" />
              ) : (
                filterOptions.map(
                  ({ name, id }: { name: any; id: string }, index: number) => (
                    <OptionItem
                      key={index}
                      label={name}
                      value={isId ? id : name}
                      setSelectedItems={setSelectedItems}
                    />
                  ),
                )
              )}

              <Button
                py="5px"
                m="10px"
                background="#006030"
                border="1px solid #006030"
                color="white"
                _hover={{
                  background: "white",
                  color: "#006030",
                }}
                onClick={() => fetchNextPage()}
                isDisabled={!hasNextPage}
              >
                أظهر المزيد
              </Button>
            </Flex>
          )}
        </Box>

        <Button
          width="40px"
          height="40px"
          background="transparent"
          padding="0px"
          margin="0px"
          onClick={() => setSelectedItems([])}
        >
          <MdOutlineCancel />
        </Button>
      </Flex>

      <Flex
        sx={{
          borderRadius: "8px",
          width: "100%",
          background: "white",
          borderColor: "#E4E4E4",
          border: "1px solid #71809646",
          color: "#4A5568",
          p: "10px",
          minH: "60px",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {selectedItems.map(({ label, value }, index) => (
          <ListItem
            key={index}
            label={label}
            value={value}
            setSelectedItems={setSelectedItems}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default MultiSelect;
