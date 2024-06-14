export interface Option {
  title: string;
  value: number | string;
}
export interface OptionString {
  title: string;
  value: string;
}

export const StatusOptions: Option[] = [
  { title: "100%", value: "100" },
  { title: "80%", value: "80" },
  { title: "60%", value: "60" },
  { title: "40%", value: "40" },
  { title: "20%", value: "20" },
  { title: "0%", value: "0" },
];

export const DeliveryOptions: Option[] = [
  { title: "تم التوصيل", value: 1 },
  { title: "لم يتم التوصيل", value: 0 },
];

export const TaskStatusOptions: OptionString[] = [
  { value: "not_received", title: "لم يتم الإستلام" },
  { value: "received", title: "تم الإستلام" },
  { value: "processing", title: "جاري التنفيذ" },
  { value: "done", title: "تم الإنتهاء" },
];
// --------------------------------
