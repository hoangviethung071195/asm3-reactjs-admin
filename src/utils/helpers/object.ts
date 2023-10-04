type Obj = { [fieldName: string]: any; };

export function getValuableFieldsObj(obj: Obj) {
  let newObj: Obj = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (value || value === 0 || value === false) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
}