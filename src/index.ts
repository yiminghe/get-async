const loadingMap = new Map();
const loadedMap = new Map();

export default async function getAsync<T = any, I = any>(
  id: I,
  getter: () => Promise<T>,
): Promise<T> {
  if (loadedMap.has(id)) {
    return loadedMap.get(id);
  }
  let promise = loadingMap.get(id);
  if (promise) {
    return await promise;
  }
  promise = getter();
  loadingMap.set(id, promise);
  let value;
  try {
    value = await promise;
  } finally {
    loadingMap.delete(id);
  }
  loadedMap.set(id, value);
  return value;
}
