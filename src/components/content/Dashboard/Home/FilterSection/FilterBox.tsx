/* eslint-disable prefer-const */
import { Box } from "@chakra-ui/react";
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
  const isMiddle = [1, 2, 3].includes(tab);

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

    if (["voting_center"].includes(name) && [1, 4].includes(tab)) {
      isVisible = true;
      gridColumn = tab === 1 ? "span 3" : "span 6";
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
      if (tab === 0) {
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
