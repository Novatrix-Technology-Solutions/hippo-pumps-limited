import { useState } from 'react';
import { showErrorToast } from '@/utils/toast';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface UseApiRequestState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApiRequest<T>(initialState: T | null = null) {
  const [state, setState] = useState<UseApiRequestState<T>>({
    data: initialState,
    loading: false,
    error: null,
  });

  const request = async (
    url: string, 
    options?: AxiosRequestConfig,
    showToastOnError: boolean = true
  ) => {
    setState({ ...state, loading: true, error: null });
    
    try {
      const response = await axios({ url, ...options });
      setState({ data: response.data, loading: false, error: null });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      let errorMessage = 'An unexpected error occurred';
      
      if (axiosError.response) {
        // The request was made and the server responded with a non-2xx status
        if (axiosError.response.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data) {
          errorMessage = axiosError.response.data.message as string;
        } else {
          errorMessage = `Error ${axiosError.response.status}: ${axiosError.response.statusText}`;
        }
      } else if (axiosError.request) {
        // The request was made but no response was received
        errorMessage = 'No response received from server. Please check your connection.';
      }
      
      setState({ data: null, loading: false, error: new Error(errorMessage) });
      
      if (showToastOnError) {
        showErrorToast(errorMessage);
      }
      
      throw error;
    }
  };

  return { ...state, request };
} 