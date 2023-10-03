
export function getTableRowsData<T>(list: T[]) {
  const rowsData: Pick<T, keyof T>[] = list;
  return rowsData;
}