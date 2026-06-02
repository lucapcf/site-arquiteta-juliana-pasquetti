import { ContactFormData } from '@/types';

interface ResponseData {
  success: boolean;
  message: string;
}

export const sendContactForm = async (
  data: ContactFormData,
): Promise<ResponseData> => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(errorBody || 'Failed to send contact form');
  }

  return response.json();
};
