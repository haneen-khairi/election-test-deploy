import { Badge } from "@components/core";
import { DeliveryOptions } from "@constants/variables/Dashboard";

interface Props {
  statusID: number;
}
const DeliveryStatus = ({ statusID }: Props) => {
  if (statusID === 0) {
    return (
      <Badge
        title={
          DeliveryOptions.find((item) => item.value == statusID)?.title || ""
        }
        color="gray"
      />
    );
  } else if (statusID === 1) {
    return (
      <Badge
        title={
          DeliveryOptions.find((item) => item.value == statusID)?.title || ""
        }
        color="success"
      />
    );
  } else {
    return "-";
  }
};

export default DeliveryStatus;
