export interface Option {
  title: string;
  value: number;
}
export interface OptionString {
  title: string;
  value: string;
}

export const StatusOptions: Option[] = [
  { title: "غير مضمون", value: 0 },
  { title: "مضمون", value: 100 },
  { title: "متأرجح", value: 50 },
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
