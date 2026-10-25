export type DietaryTag = 'vegetarian' | 'vegan' | 'dairy-free' | 'egg-based' | 'gluten-free' | 'high-protein'

export type FoodCategory =
  | 'dairy'
  | 'lentils-legumes'
  | 'soy-products'
  | 'eggs'
  | 'nuts-seeds'
  | 'grains'
  | 'packaged-snack'
  | 'supplements'

export interface FoodItem {
  id: string
  name: string
  hindiName?: string
  category: FoodCategory
  dietary: DietaryTag[]
  isPackaged: boolean
  brand?: string
  servingSizeGrams: number
  servingDescription: string
  // Macros per 100g
  caloriesPer100g: number
  proteinPer100g: number
  carbsPer100g: number
  fatPer100g: number
  fiberPer100g?: number
  // Cost estimates in INR
  estimatedCostPer100g: number
  costNote: string
  lastVerifiedDate: string
  sourceProvenance: string
  prepTimeMinutes: number
  equipment: ('none' | 'kettle' | 'induction' | 'gas-stove' | 'blender')[]
  shortDescription: string
  highlightTip: string
  affordabilityTier: 'budget-champion' | 'balanced' | 'premium'
  imageUrl?: string
}

export interface RecipeItem {
  id: string
  title: string
  hindiTitle?: string
  tagline: string
  imageUrl?: string
  prepTimeMinutes: number
  cookTimeMinutes: number
  servings: number
  dietary: DietaryTag[]
  equipment: ('none' | 'kettle' | 'induction' | 'gas-stove' | 'blender')[]
  ingredients: {
    foodId?: string
    name: string
    quantityAmount: number
    quantityUnit: string
    proteinContributionG: number
    estimatedCostInr: number
  }[]
  steps: string[]
  totalProteinPerServingG: number
  caloriesPerServing: number
  estimatedCostPerServingInr: number
  comparisonPackagedAlternative?: {
    name: string
    proteinG: number
    costInr: number
    downside: string
  }
}

export interface NutritionLesson {
  id: string
  category: string
  title: string
  readTimeSec: number
  headline: string
  coreLesson: string
  bulletPoints: string[]
  mythVersusFact: {
    myth: string
    fact: string
  }
  practicalRule: string
  sourceReference: string
}

export interface FoodMyth {
  id: string
  category: string
  myth: string
  verdict: 'BUSTED' | 'NUANCED' | 'CONFIRMED'
  theTruth: string
  scientificContext: string
  practicalTakeaway: string
  source: string
}
