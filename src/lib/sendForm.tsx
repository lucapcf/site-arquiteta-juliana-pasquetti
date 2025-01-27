interface ContactFormData {
  name: string;
  email: string;
  cellphone: string;
  subject: string;
  message: string;
}

interface ResponseData {
  success: boolean;
  message: string;
}

export const sendContactForm = async (
  data: ContactFormData,
): Promise<ResponseData> => {
  try {
    const response = await fetch(
      `/api/contact
      `,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    const responseBody = await response.text();
    console.log('Response body:', responseBody);

    try {
      return JSON.parse(responseBody);
    } catch (e) {
      console.error('Error parsing response as JSON:', e);
      throw new Error('Invalid JSON response');
    }
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw error;
  }
};
