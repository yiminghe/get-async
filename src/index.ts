const loadingMap = new Map();
const loadedMap = new Map();

export default function getAsync<T = any, I = any>(
  id: I,
  getter: () => Promise<T>,
): Promise<T> {
  if (isLoaded(id)) {
    return getLoaded(id);
  }
  let promise = loadingMap.get(id);
  if (promise) {
    return promise;
  }
  promise = getter();
  loadingMap.set(id, promise);
  promise.then(
    value => {
      loadedMap.set(id, value);
      loadingMap.delete(id);
    },
    () => {
      loadingMap.delete(id);
    },
  );
  return promise;
}

export function isLoaded(id: any) {
  return loadedMap.has(id);
}

export function getLoaded(id: any) {
  return loadedMap.get(id);
}
