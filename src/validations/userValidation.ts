import * as z from 'zod'

export const nameRule = z
  .string()
  .min(3, 'Name is too short')
  .max(30, 'Name is too long')
  .regex(/^[a-zA-Z\s\.\'\-\u00C0-\u00FF]+$/, 'Name contains invalid characters')
  .trim()

export const usernameRule = z
  .string()
  .min(3, 'Username must be at least 3 chars')
  .max(30, 'Username is too long')
  .regex(/^[a-zA-Z0-9_.]+$/, 'Invalid username format')
  .trim()

export const emailRule = z.string().min(1, 'Email is required').email('Invalid email format').trim()

export const phoneRule = z
  .string()
  .min(10, 'Phone number is too short')
  .max(30, 'Phone number is too long')
  .regex(/^[\d\s\-\.\(\)\+x]+$/, 'Invalid phone number format')
  .refine((val) => val.replace(/\D/g, '').length >= 10, 'Phone must contain at least 10 digits')
  .trim()

export const createUserSchema = (users: any[], currentUserId?: number) => {
  return z.object({
    name: nameRule,

    username: usernameRule.refine(
      (val) => {
        const exists = users.find((u) => u.username.toLowerCase() === val.toLowerCase())
        if (exists && exists.id !== currentUserId) return false
        return true
      },
      { message: 'Username is already taken' },
    ),

    email: emailRule.refine(
      (val) => {
        const exists = users.find((u) => u.email.toLowerCase() === val.toLowerCase())
        if (exists && exists.id !== currentUserId) return false
        return true
      },
      { message: 'Email is already registered' },
    ),

    phone: phoneRule.refine(
      (val) => {
        const inputDigits = val.replace(/\D/g, '')

        const exists = users.find((u) => {
          const phoneMainPart = (u.phone || '').split('x')[0]
          const dbDigits = phoneMainPart.replace(/\D/g, '')
          return dbDigits === inputDigits
        })

        if (exists && exists.id !== currentUserId) return false
        return true
      },
      { message: 'Phone number already exists' },
    ),
  })
}
