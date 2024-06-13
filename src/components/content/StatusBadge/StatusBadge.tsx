import { Badge } from "@components/core";
import { StatusOptions } from "@constants/variables/Dashboard";

interface Props {
  statusID: number;
}
const StatusBadge = ({ statusID }: Props) => {
  if (statusID === 0) {
    return (
      <Badge
        title={
          StatusOptions.find((item) => item.value == statusID)?.title || ""
        }
        color="danger"
      />
    );
  } else if (statusID === 100) {
    return (
      <Badge
        title={
          StatusOptions.find((item) => item.value == statusID)?.title || ""
        }
        color="success"
      />
    );
  } else if (statusID === 50) {
    return (
      <Badge
        title={
          StatusOptions.find((item) => item.value == statusID)?.title || ""
        }
        color="warning"
      />
    );
  } else {
    return "-";
  }
};

export default StatusBadge;
