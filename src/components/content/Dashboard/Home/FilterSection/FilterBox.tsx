/* eslint-disable prefer-const */
import { Box } from "@chakra-ui/react";
import { usePermission } from "@services/hooks/auth/Permission";
import { ReactNode } from "react";

const FilterBox = ({
  children,
  name,
  tab,
}: {
  children: ReactNode;
  tab: number;
  name:
    | "first_name"
    | "second_name"
    | "third_name"
    | "last_name"
    | "gender"
    | "status"
    | "place_of_residence"
    | "electoral_district"
    | "supporter_name"
    | "box"
    | "voting_center"
    | "filter"
    | "clear";
}) => {
  const { allowList } = usePermission();
  const isMiddle = (allowList?.candidate ? [1, 2, 3] : [0, 1]).includes(tab);

  const getAttributes = () => {
    let isVisible = false;
    let gridColumn = "";

    if (
      ["place_of_residence", "electoral_district", "filter", "clear"].includes(
        name,
      )
    )
      isVisible = true;

    if (["filter", "clear"].includes(name)) {
      gridColumn = "span 3";
    }

    if (
      ["status", "supporter_name", "electoral_district"].includes(name) &&
      isMiddle
    ) {
      isVisible = true;
      gridColumn = "span 3";
    }

    if (["box"].includes(name) && [4].includes(tab)) {
      isVisible = true;
      gridColumn = "span 3";
    }

    if (
      ["voting_center"].includes(name) &&
      (allowList?.candidate ? [1, 4] : [0]).includes(tab)
    ) {
      isVisible = true;
      gridColumn = tab === (allowList?.candidate ? 1 : 0) ? "span 3" : "span 6";
    }

    if (
      [
        "first_name",
        "second_name",
        "third_name",
        "last_name",
        "gender",
      ].includes(name) &&
      isMiddle
    ) {
      isVisible = true;
      gridColumn = "span 3";
    }

    if (["electoral_district"].includes(name)) {
      if (tab === (allowList?.candidate ? 0 : 10)) {
        gridColumn = "span 12";
      } else if (tab === 3) {
        gridColumn = "span 6";
      } else gridColumn = "span 3";
    }

    if (["place_of_residence", "last_name"].includes(name)) {
      gridColumn = "span 12";
    }

    return {
      isVisible,
      gridColumn,
    };
  };

  const attributes = getAttributes();

  return (
    attributes.isVisible && (
      <Box gridColumn={attributes.gridColumn}>{children}</Box>
    )
  );
};

export default FilterBox;
