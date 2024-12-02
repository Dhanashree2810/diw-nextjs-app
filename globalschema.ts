
import { z } from 'zod';

const emailSchema = z.string().email({ message: "Invalid email address" });

const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long including letters digits & special character" })
  .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" });

const phoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" });

const nameSchema = z.string()
  .min(1, { message: "Name must be at least 1 character long" })
  .max(20, { message: "Name must be at most 20 characters long" })
  .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, apostrophes, and hyphens" });

const userSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  mobile: phoneSchema,
  name: nameSchema,
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // Set the error path to the confirmPassword field
});


const otpSchema = z.string().length(4, "OTP must be 4 digits").regex(/^[0-9]*$/, "Invalid OTP");

const changePasswordSchema = z.object({
  password: passwordSchema,
  newpassword: passwordSchema,
});

export { userSchema,changePasswordSchema,otpSchema };
