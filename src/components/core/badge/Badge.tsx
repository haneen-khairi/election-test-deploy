import { Box } from "@chakra-ui/react";

interface BadgeProps {
  color: "success" | "warning" | "danger" | "gray" | "info";
  title: string;
}

const badgeStyles = {
  success: { bg: "#12B76A1A", color: "#12B76A" },
  warning: { bg: "#F790091A", color: "#F79009" },
  danger: { bg: "#F044381A", color: "#F04438" },
  gray: { bg: "#98A1AE1A", color: "#98A1AE" },
  info: { bg: "#28A0FF1A", color: "#28A0FF" },
};

const Badge = ({ color, title }: BadgeProps) => {
  const { bg, color: textColor } = badgeStyles[color];

  return (
    <Box
      border="1px solid"
      bg={bg}
      borderColor={textColor}
      color={textColor}
      rounded="full"
      p="4px 12px"
      textAlign="center"
    >
      {title}
    </Box>
  );
};

export default Badge;
