const Key = "taskAppKey";

export const getLocalStorageTaskData = () => {
  const data = localStorage.getItem(Key);
  if (!data) return [];
  else return JSON.parse(data);
};

export const setLocalStorageData = (task) => {
  return localStorage.setItem(Key, JSON.stringify(task));
};
