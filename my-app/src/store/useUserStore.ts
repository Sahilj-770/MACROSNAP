import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface BasketItem {
  foodId: string
  quantityGrams: number
}

interface UserPreferencesStore {
  favoriteFoodIds: string[]
  favoriteRecipeIds: string[]
  savedComparisons: [string, string][]
  basketItems: BasketItem[]
  dailyTargetProteinGrams: number
  bodyWeightKg: number

  // Actions
  toggleFavoriteFood: (foodId: string) => void
  toggleFavoriteRecipe: (recipeId: string) => void
  saveComparison: (idA: string, idB: string) => void
  removeComparison: (idA: string, idB: string) => void

  addToBasket: (foodId: string, quantityGrams?: number) => void
  updateBasketQuantity: (foodId: string, quantityGrams: number) => void
  removeFromBasket: (foodId: string) => void
  clearBasket: () => void

  setProteinGoal: (weightKg: number, targetProteinG: number) => void

  // Customer-Ready Starter / Sample Loaders
  loadSampleBasket: () => void
  loadSampleFavorites: () => void
  loadSampleComparisons: () => void
  resetAllToCleanState: () => void
}

export const useUserStore = create<UserPreferencesStore>()(
  persist(
    (set, get) => ({
      // Clean customer-ready initial state: zero artificial mock data
      favoriteFoodIds: [],
      favoriteRecipeIds: [],
      savedComparisons: [],
      basketItems: [],
      dailyTargetProteinGrams: 90,
      bodyWeightKg: 65,

      toggleFavoriteFood: (foodId) => {
        const current = get().favoriteFoodIds
        if (current.includes(foodId)) {
          set({ favoriteFoodIds: current.filter((id) => id !== foodId) })
        } else {
          set({ favoriteFoodIds: [...current, foodId] })
        }
      },

      toggleFavoriteRecipe: (recipeId) => {
        const current = get().favoriteRecipeIds
        if (current.includes(recipeId)) {
          set({ favoriteRecipeIds: current.filter((id) => id !== recipeId) })
        } else {
          set({ favoriteRecipeIds: [...current, recipeId] })
        }
      },

      saveComparison: (idA, idB) => {
        const current = get().savedComparisons
        const exists = current.some(([a, b]) => (a === idA && b === idB) || (a === idB && b === idA))
        if (!exists) {
          set({ savedComparisons: [...current, [idA, idB]] })
        }
      },

      removeComparison: (idA, idB) => {
        set({
          savedComparisons: get().savedComparisons.filter(
            ([a, b]) => !(a === idA && b === idB) && !(a === idB && b === idA)
          ),
        })
      },

      addToBasket: (foodId, quantityGrams = 100) => {
        const current = get().basketItems
        const existing = current.find((item) => item.foodId === foodId)
        if (existing) {
          set({
            basketItems: current.map((item) =>
              item.foodId === foodId
                ? { ...item, quantityGrams: item.quantityGrams + quantityGrams }
                : item
            ),
          })
        } else {
          set({ basketItems: [...current, { foodId, quantityGrams }] })
        }
      },

      updateBasketQuantity: (foodId, quantityGrams) => {
        if (quantityGrams <= 0) {
          get().removeFromBasket(foodId)
          return
        }
        set({
          basketItems: get().basketItems.map((item) =>
            item.foodId === foodId ? { ...item, quantityGrams } : item
          ),
        })
      },

      removeFromBasket: (foodId) => {
        set({ basketItems: get().basketItems.filter((item) => item.foodId !== foodId) })
      },

      clearBasket: () => {
        set({ basketItems: [] })
      },

      setProteinGoal: (weightKg, targetProteinG) => {
        set({ bodyWeightKg: weightKg, dailyTargetProteinGrams: targetProteinG })
      },

      // Starter / Sample pack loaders (invoked deliberately by the user)
      loadSampleBasket: () => {
        set({
          basketItems: [
            { foodId: 'soy-chunks', quantityGrams: 100 },
            { foodId: 'roasted-chana', quantityGrams: 100 },
            { foodId: 'eggs-whole', quantityGrams: 100 },
          ],
        })
      },

      loadSampleFavorites: () => {
        set({
          favoriteFoodIds: ['soy-chunks', 'roasted-chana', 'paneer-fresh'],
          favoriteRecipeIds: ['sattu-super-coolant', 'kettle-soy-bhurji'],
        })
      },

      loadSampleComparisons: () => {
        set({
          savedComparisons: [
            ['commercial-protein-bar', 'soy-chunks'],
            ['paneer-fresh', 'tofu-firm'],
          ],
        })
      },

      resetAllToCleanState: () => {
        set({
          favoriteFoodIds: [],
          favoriteRecipeIds: [],
          savedComparisons: [],
          basketItems: [],
        })
      },
    }),
    {
      name: 'macrosnap-user-storage-v2',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
