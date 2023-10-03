import { BaseType } from 'models/General';

export function getCellData<T>(data: any, fieldNames: (keyof T | string)[], index = 0): BaseType {
  if (index === fieldNames.length) {
    return data;
  }

  const fieldName = fieldNames[index];
  const newData = data?.[fieldName];

  return getCellData(newData, fieldNames, index + 1);
}