export const saveXLSXFile = (arrayBuffer: ArrayBuffer, fileName: string) => {
  const blob = new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();

  window.URL.revokeObjectURL(link.href);
};
