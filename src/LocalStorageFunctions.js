import { useState } from 'react';

function useLocalStorage(key, initialValue = null) {
  // Get from local storage then
  // parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // Save state
      setStoredValue(valueToStore);
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  // The function to remove the value from local storage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(undefined);
    } catch (error) {
      console.warn(`Error removing localStorage key “${key}”:`, error);
    }
  };

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;
