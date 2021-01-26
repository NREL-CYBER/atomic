import { useEffect } from "react"; // Hook

function useDarkMode(dark) {
  useEffect(() => {
    const className = dark ? 'dark-theme' : "light-theme";
    const oldClassName = dark ? 'light-theme' : "dark-theme";
    const element = window.document.body;
    element.classList.remove(oldClassName);
    element.classList.add(className);
  }, [dark]);
}

export default useDarkMode;