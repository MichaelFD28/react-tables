import { useState } from "react";
import { TableHeader } from "./tableTypes";

export const useDraggableTableHeaders = (
  tableHeaders: TableHeader[],
  setTableHeaders: (
    value: TableHeader[] | ((val: TableHeader[]) => TableHeader[])
  ) => void
) => {
  const initDragInfos = {
    draggedItem: {},
    draggedFromIndex: 0,
    draggedToIndex: 0,
  };

  const [dragInfos, setDragInfos] = useState(initDragInfos);
  const reorderTableHeaders = () => {
    const { draggedFromIndex, draggedToIndex } = dragInfos;

    const newHeaderArray: TableHeader[] = new Array(0);
    if (draggedFromIndex < draggedToIndex) {
      tableHeaders.map((item: TableHeader, index: number) => {
        if (index < draggedFromIndex) {
          return newHeaderArray.push(item);
        }
        if (draggedFromIndex <= index && index < draggedToIndex) {
          return newHeaderArray.push(tableHeaders[index + 1]);
        }
        if (index === draggedToIndex) {
          return newHeaderArray.push(tableHeaders[draggedFromIndex]);
        }
        if (index > draggedToIndex) {
          return newHeaderArray.push(tableHeaders[index]);
        }
        return;
      });
    } else if (draggedFromIndex === draggedToIndex) {
      tableHeaders.map((item: TableHeader, index: number) => {
        return newHeaderArray.push(tableHeaders[index]);
      });
    } else if (draggedToIndex < draggedFromIndex) {
      tableHeaders.map((item: TableHeader, index: number) => {
        if (index < draggedToIndex) {
          return newHeaderArray.push(item);
        }
        if (index === draggedToIndex) {
          return newHeaderArray.push(tableHeaders[draggedFromIndex]);
        }
        if (draggedToIndex < index && index <= draggedFromIndex) {
          return newHeaderArray.push(tableHeaders[index - 1]);
        }
        if (draggedFromIndex < index) {
          return newHeaderArray.push(tableHeaders[index]);
        }
      });
    }
    setTableHeaders(newHeaderArray);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLTableCellElement>,
    currentItemId: string
  ) => {
    const currentItemIndex = tableHeaders.findIndex(
      (item) => item.id === currentItemId
    );

    setDragInfos({
      ...dragInfos,
      draggedItem: tableHeaders[currentItemIndex],
      draggedFromIndex: currentItemIndex,
    });

    document.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLTableCellElement>,
    enterItemId: string
  ) => {
    const enterItemIndex = tableHeaders.findIndex(
      (item) => item.id === enterItemId
    );

    setDragInfos({
      ...dragInfos,
      draggedToIndex: enterItemIndex,
    });
  };

  const handleDragEnd = () => {
    reorderTableHeaders();
    setDragInfos(initDragInfos);
  };

  return {
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  };
};
