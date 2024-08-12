import { Badge } from "@components/core";
import { TaskStatusOptions } from "@constants/variables/Dashboard";

interface Props {
  status: string;
}
const StatusBadge = ({ status }: Props) => {
  if (status === "not_received") {
    return (
      <Badge
        title={
          TaskStatusOptions.find((item) => item.value == status)?.title || ""
        }
        color="gray"
      />
    );
  } else if (status === "received") {
    return (
      <Badge
        title={
          TaskStatusOptions.find((item) => item.value == status)?.title || ""
        }
        color="info"
      />
    );
  } else if (status === "processing") {
    return (
      <Badge
        title={
          TaskStatusOptions.find((item) => item.value == status)?.title || ""
        }
        color="warning"
      />
    );
  } else if (status === "done") {
    return (
      <Badge
        title={
          TaskStatusOptions.find((item) => item.value == status)?.title || ""
        }
        color="success"
      />
    );
  } else {
    return "-";
  }
};

export default StatusBadge;
