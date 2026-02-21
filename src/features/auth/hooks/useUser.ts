import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import type { User } from '@/types';

// تعريف شكل بيانات المستخدم القادمة من الباك-إند


export const useUser = () => {
  return useQuery({
    queryKey: ['user'], // مفتاح الكاش (Global Key)
    queryFn: async (): Promise<User> => {
      // نرسل طلباً للسيرفر، وهو سيفحص الكوكيز تلقائياً
      const { data } = await api.get('/me'); // تأكد من أن هذا الرابط صحيح في الباك إند لديك
      return data.result;
    },
    // إعدادات مهمة:
    retry: false, // لا تحاول إعادة الطلب إذا فشل (يعني أنه غير مسجل دخول)
    staleTime: 1000 * 60 * 60, // احتفظ ببيانات المستخدم لمدة ساعة (لا تتغير كثيراً)
  });
};