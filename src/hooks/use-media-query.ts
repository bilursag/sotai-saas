import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }

      const listener = () => {
        setMatches(media.matches);
      };

      // Añadir event listener para cambios en el media query
      media.addEventListener("change", listener);

      // Limpiar event listener al desmontar
      return () => {
        media.removeEventListener("change", listener);
      };
    }
  }, [matches, query]);

  return matches;
}
