import * as z from 'zod';

export const recipeSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),
  
  description: z.string()
    .max(1500, 'Description cannot exceed 1500 characters')
    .trim()
    .optional(),
  
  instructions: z.string()
    .min(10, 'Instructions must be at least 10 characters')
    .max(5000, 'Instructions cannot exceed 5000 characters')
    .trim(),
  
  ingredients: z.array(
    z.object({
      name: z.string()
        .min(2, 'Ingredient name must be at least 2 characters')
        .max(50, 'Ingredient name cannot exceed 50 characters')
        .trim(),
      amount: z.number()
        .positive('Amount must be greater than 0')
        .max(10000, 'Amount cannot exceed 10000'),
      unit: z.string()
        .min(1, 'Unit is required')
        .max(20, 'Unit cannot exceed 20 characters')
        .trim()
    })
  ).min(1, 'At least one ingredient is required'),
  
  imageUrl: z.string()
    .url('Please enter a valid URL')
    .trim()
    .optional()
    .or(z.literal('')),
  
  preparationTime: z.number()
    .int('Preparation time must be a whole number')
    .min(1, 'Preparation time must be at least 1 minute')
    .max(480, 'Preparation time cannot exceed 8 hours (480 minutes)'),
  
  cookingTime: z.number()
    .int('Cooking time must be a whole number')
    .min(1, 'Cooking time must be at least 1 minute')
    .max(720, 'Cooking time cannot exceed 12 hours (720 minutes)'),
  
  servings: z.number()
    .int('Servings must be a whole number')
    .min(1, 'Recipe must serve at least 1 person')
    .max(50, 'Servings cannot exceed 50'),
  
  calories: z.number()
    .int('Calories must be a whole number')
    .min(1, 'Calories must be at least 1')
    .max(10000, 'Calories cannot exceed 10000')
    .optional()
    .or(z.literal(0)),
  
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD'], {
    errorMap: () => ({ message: 'Please select a valid difficulty level' })
  }),
  
  tags: z.array(z.string()
    .min(2, 'Tag must be at least 2 characters')
    .max(20, 'Tag cannot exceed 20 characters')
    .trim()
  ).default([])
   .optional(),
  
  cuisine: z.string()
    .min(2, 'Cuisine must be at least 2 characters')
    .max(30, 'Cuisine cannot exceed 30 characters')
    .trim()
    .optional()
    .or(z.literal('')),
  
  isVegetarian: z.boolean(),
  isVegan: z.boolean(),
  isGlutenFree: z.boolean(),
  
  categoryId: z.string()
    .min(1, 'Category is required')
    .uuid('Invalid category ID format')
});

export type RecipeFormData = z.infer<typeof recipeSchema>; 