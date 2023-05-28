const pad2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};

export const formatDateToString = (date: Date, addTime?: boolean): string => {
  return (
    [
      pad2Digits(date?.getDate()),
      pad2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join("/") + (addTime ? ` ${date.toLocaleTimeString()}` : "")
  );
};
