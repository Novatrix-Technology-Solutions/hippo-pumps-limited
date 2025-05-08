import { useForm } from '@inertiajs/react';
import { showErrorToast, showSuccessToast } from '@/utils/toast';

export function useFormWithErrorHandling<TForm extends Record<string, any>>(initialValues: TForm) {
  const form = useForm<TForm>(initialValues);
  
  const submitWithErrorHandling = (
    url: string, 
    options: {
      method?: 'post' | 'put' | 'patch' | 'delete';
      onSuccess?: (data?: any) => void;
      onError?: (errors: Record<string, string>) => void;
      successMessage?: string;
      preserveScroll?: boolean;
      preserveState?: boolean;
    } = {}
  ) => {
    const method = options.method || 'post';
    const formMethod = form[method] as Function;
    
    formMethod(url, {
      preserveScroll: options.preserveScroll ?? true,
      preserveState: options.preserveState ?? true,
      onSuccess: (data) => {
        if (options.successMessage) {
          showSuccessToast(options.successMessage);
        }
        if (options.onSuccess) {
          options.onSuccess(data);
        }
      },
      onError: (errors) => {
        // Show first error in toast
        const firstError = Object.values(errors)[0];
        if (firstError) {
          showErrorToast(firstError as string);
        }
        
        if (options.onError) {
          options.onError(errors as Record<string, string>);
        }
      },
    });
  };
  
  return { ...form, submitWithErrorHandling };
} 