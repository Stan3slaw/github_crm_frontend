import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { signUp } from '@/cdk/api/api';
import { useToast } from '@/cdk/hooks/use-toast';
import { hashPassword } from '@/cdk/utils/crypto.util';
import AuthFormWrapper from '@/modules/auth/components/auth-form-wrapper/auth-form-wrapper';
import SignUpForm from '@/modules/auth/components/sign-up-form/sign-up-form';
import { signUpSchema } from '@/modules/auth/components/sign-up-form/sign-up-validation-schema';
import { SignUpFormData } from '@/modules/auth/types/sign-up-form-data.type';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      hashedPassword: '',
    },
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  const { isSubmitting: isFormSubmitting, isDirty } = form.formState;

  const { mutate, isLoading: isMutationSubmitting } = useMutation(signUp, {
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
      linkText='Login'
      linkHref='/auth/sign-in'
      formHeadingText='Create an account'
      formAdditionalText='Enter your credentials below to create your account'>
      <SignUpForm
        form={form}
        isSubmitting={isFormSubmitting || isMutationSubmitting}
        isDirty={isDirty}
        onSubmit={form.handleSubmit(handleSubmit)}
      />
    </AuthFormWrapper>
  );
};

export default SignUpPage;
