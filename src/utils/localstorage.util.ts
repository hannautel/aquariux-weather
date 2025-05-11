function getLocalstorageItem(key: string): string | null {
  return window.localStorage.getItem(key);
}

function setLocalstorageItem(key: string, value: string): void {
  window.localStorage.setItem(key, value);
}

export { getLocalstorageItem, setLocalstorageItem };
