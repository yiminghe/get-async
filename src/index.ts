const loadingMap = new Map();
const loadedMap = new Map();

export default async function getAsync<T = any, I = any>(
  id: I,
  getter: () => Promise<T>,
): Promise<T> {
  if (isLoaded(id)) {
    return getLoaded(id);
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

export function isLoaded(id: any) {
  return loadedMap.has(id);
}

export function getLoaded(id: any) {
  return loadedMap.get(id);
}
