import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../types';

interface FavoritesState {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleFavorite: (product) => {
        const currentFavorites = get().favorites;
        const exists = currentFavorites.some((item) => item.id === product.id);

        if (exists) {
          set({
            favorites: currentFavorites.filter((item) => item.id !== product.id),
          });
        } else {
          set({ favorites: [...currentFavorites, product] });
        }
      },

      isFavorite: (productId) => {
        return get().favorites.some((item) => item.id === productId);
      },
    }),
    {
      name: 'armony-plantas-favorites',
    }
  )
);
