const validateData = (data) => {
  if (!data) throw new Error(500);
  if (!data.length) throw new Error(404);
  return data;
};
const createMessage = (data) => {
  try {
    const checkedData = validateData(data);
    return `Success: ${data}`;
  } catch (e) {
    return `Failed: ${e.message}`;
  }
};
console.log(createMessage());
console.log(createMessage([]));
console.log(createMessage([1, 2, 3]));
