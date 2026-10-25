import { z } from "zod"

/**
 * Shared Zod schemas for API validation.
 * Add feature-specific schemas in their own files (e.g., lib/schemas/user.ts)
 * and re-export from here.
 */

/** Standard API error response shape */
export const ApiErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
})

/** Pagination query params */
export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

export type PaginationParams = z.infer<typeof PaginationSchema>

/** Generic success/error result type — use in Server Actions */
export type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string }
