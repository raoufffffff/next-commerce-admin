import { z } from "zod";

// 1. مخطط تسجيل الدخول (Login Schema)
export const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

// 2. مخطط إنشاء الحساب (Register Schema)
export const registerSchema = z.object({
  // --- الخطوة الأولى ---
  name: z.string().min(3, "الاسم يجب أن يكون 3 أحرف على الأقل"),
  phone: z.string().min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  confirmPassword: z.string(),
  // التحقق من الموافقة (الحل لمشكلة النوع boolean)
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط والأحكام",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "كلمات المرور غير متطابقة",
  path: ["confirmPassword"], // مكان ظهور الخطأ
});

// -------------------------------------------------------
// 3. استخراج الأنواع (Types) تلقائياً من Zod 👈 هذا ما سألت عنه
// -------------------------------------------------------

// هذا النوع سيحتوي على: { email: string, password: string }
export type LoginFormValues = z.infer<typeof loginSchema>;

// هذا النوع سيحتوي على كل حقول التسجيل
export type RegisterFormValues = z.infer<typeof registerSchema>;