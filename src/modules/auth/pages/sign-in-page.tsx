import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { signIn } from '@/cdk/api/api';
import { useToast } from '@/cdk/hooks/use-toast';
import { hashPassword } from '@/cdk/utils/crypto.util';
import AuthFormWrapper from '@/modules/auth/components/auth-form-wrapper/auth-form-wrapper';
import SignInForm from '@/modules/auth/components/sign-in-form/sign-in-form';
import { signInSchema } from '@/modules/auth/components/sign-in-form/sign-in-validation-schema';
import { SignInFormData } from '@/modules/auth/types/sign-in-form-data.type';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
      hashedPassword: '',
    },
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
  });

  const { isSubmitting: isFormSubmitting, isDirty } = form.formState;

  const { mutate, isLoading: isMutationSubmitting } = useMutation(signIn, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: AxiosError) => {
      toast({
        variant: 'destructive',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        description: (error?.response?.data as any)?.message,
      });
    },
  });

  function handleSubmit(): void {
    const password = form.getValues('password');
    const email = form.getValues('email');
    const hashedPassword = hashPassword(password);

    form.setValue('hashedPassword', hashedPassword);

    mutate({
      email,
      password: hashedPassword,
    });
  }

  return (
    <AuthFormWrapper
      linkText='Sign Up'
      linkHref='/auth/sign-up'
      formHeadingText='Login in your account'
      formAdditionalText='Enter your credentials below to login'>
      <SignInForm
        form={form}
        isSubmitting={isFormSubmitting || isMutationSubmitting}
        isDirty={isDirty}
        onSubmit={form.handleSubmit(handleSubmit)}
      />
    </AuthFormWrapper>
  );
};

export default SignInPage;
