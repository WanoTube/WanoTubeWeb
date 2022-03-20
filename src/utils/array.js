export const getArrayWithoutLastElement = function (arr) {
  const tempArr = [...arr];
  tempArr.pop();
  return tempArr;
}

export const getLastElement = function (arr) {
  return arr[arr.length - 1];
}