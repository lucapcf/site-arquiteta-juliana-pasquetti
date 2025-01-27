'use client';

import styles from './form.module.css';
import { sendContactForm } from '../../lib/sendForm';
import { useForm, SubmitHandler } from 'react-hook-form';
import { isEmail, isMobilePhone } from 'validator';

interface ContactFormData {
  name: string;
  email: string;
  cellphone: string;
  subject: string;
  message: string;
}

interface FormProps {
  title: string;
}

interface FormData {
  name: string;
  email: string;
  cellphone: string;
  subject: string;
  message: string;
}

function formatPhoneNumber(value: string): string {
  const numericValue = value.replace(/\D/g, '');
  let formattedValue = '';
  if (numericValue.length >= 1) {
    formattedValue += `(${numericValue.slice(0, 2)}`;
  }
  if (numericValue.length >= 3) {
    formattedValue += `) ${numericValue.slice(2, 7)}`;
  }
  if (numericValue.length >= 7) {
    formattedValue += `-${numericValue.slice(7, 11)}`;
  }
  return formattedValue;
}

function allowToEnterPhoneNumber(
  event: React.KeyboardEvent<HTMLInputElement>,
): void {
  const charCode = event.keyCode || event.which;

  // Allows backspace
  if (charCode === 8) {
    return;
  }

  const currentValue = event.currentTarget.value;
  const formattedValue = formatPhoneNumber(
    currentValue + String.fromCharCode(charCode),
  );

  event.currentTarget.value = formattedValue;
  event.preventDefault();
}

const Form: React.FC<FormProps> = ({ title }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const contactData: ContactFormData = {
        name: data.name,
        email: data.email,
        cellphone: data.cellphone,
        subject: data.subject,
        message: data.message,
      };
      await sendContactForm(contactData);
      reset();
    } catch (error) {
      console.error('Error sending contact form:', error);
    }
  };

  return (
    <>
      <div id='formServicos'></div>
      <div className={styles.mainContainer}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.formAndContact}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.mediumField}>
                <input
                  className={errors?.name && styles.input_error}
                  id='name'
                  type='text'
                  placeholder='Nome*'
                  {...register('name', { required: true })}
                />
                {errors?.name?.type === 'required' && (
                  <p className={styles.error_message}>Campo obrigatório</p>
                )}
              </div>
              <div className={styles.mediumField}>
                <input
                  className={errors?.email && styles.input_error}
                  id='email'
                  type='email'
                  placeholder='E-mail*'
                  {...register('email', {
                    required: true,
                    validate: (value) => isEmail(value),
                  })}
                />
                {errors?.email?.type === 'required' && (
                  <p className={styles.error_message}>Campo obrigatório.</p>
                )}
                {errors?.email?.type === 'validate' && (
                  <p className={styles.error_message}>Email inválido</p>
                )}
              </div>
              <div className={styles.mediumField}>
                <input
                  className={errors?.cellphone && styles.input_error}
                  id='cellphone'
                  maxLength={15}
                  type='text'
                  onKeyDown={(event) => allowToEnterPhoneNumber(event)}
                  placeholder='Celular*'
                  {...register('cellphone', {
                    required: true,
                    validate: (value) => isMobilePhone(value, 'pt-BR'),
                  })}
                />
                {errors?.cellphone?.type === 'required' && (
                  <p className={styles.error_message}>Campo obrigatório</p>
                )}
                {errors?.cellphone?.type === 'validate' && (
                  <p className={styles.error_message}>Número inválido.</p>
                )}
              </div>
              <div className={styles.mediumField}>
                <input
                  className={errors?.subject && styles.input_error}
                  id='subject'
                  type='text'
                  placeholder='Assunto*'
                  {...register('subject', { required: true })}
                />
                {errors?.subject?.type === 'required' && (
                  <p className={styles.error_message}>Campo obrigatório</p>
                )}
              </div>
              <div className={styles.largeField}>
                <textarea
                  className={errors?.message && styles.input_error}
                  id='message'
                  placeholder='Sua mensagem'
                  {...register('message', { required: true })}
                />
                {errors?.message?.type === 'required' && (
                  <p className={styles.error_message}>Campo obrigatório</p>
                )}
              </div>
              <div className={styles.mediumField}>
                <button type='submit'>Enviar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
