import { createContext, useContext, useState, useCallback, useEffect } from "react";

const FavoritesContext = createContext(null);

// Simulated logged-in user — replace with your real auth context
const MOCK_USER = { id: "u1", name: "Abebe", role: "renter" };

export function FavoritesProvider({ children }) {
  const [user] = useState(MOCK_USER); // swap with real auth later
  const [hasNewFavorites, setHasNewFavorites] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    if (!user) return [];
    try {
      const stored = localStorage.getItem(`favorites_${user.id}`);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist whenever favorites change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const isFavorite = useCallback(
    (propertyId) => favorites.some((f) => f.id === propertyId),
    [favorites],
  );

  const toggleFavorite = useCallback(
    (property) => {
      if (!user) return; // only logged-in renters
      setFavorites((prev) => {
        const exists = prev.some((f) => f.id === property.id);
        if (exists) return prev.filter((f) => f.id !== property.id);
        setHasNewFavorites(true);
        return [...prev, property];
      });
    },
    [user],
  );

  const removeFavorite = useCallback(
    (propertyId) => {
      setFavorites((prev) => prev.filter((f) => f.id !== propertyId));
    },
    [],
  );

  const markFavoritesAsSeen = useCallback(() => {
    setHasNewFavorites(false);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ 
        favorites, 
        isFavorite, 
        toggleFavorite, 
        removeFavorite, 
        hasNewFavorites, 
        markFavoritesAsSeen,
        user 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return ctx;
}
