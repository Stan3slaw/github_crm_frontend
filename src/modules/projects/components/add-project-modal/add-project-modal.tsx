import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';

import { addProject, getProjects } from '@/cdk/api/api';
import { toast } from '@/cdk/hooks/use-toast';
import FormInput from '@/components/shared/form-input/form-input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { addProjectSchema } from '@/modules/projects/components/add-project-modal/add-project-validation-schema';

interface AddProjectFormData {
  url: string;
}

interface AddProjectModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, setIsOpen }) => {
  const { refetch } = useQuery('projects', getProjects);

  const form = useForm<AddProjectFormData>({
    values: {
      url: '',
    },
    resolver: zodResolver(addProjectSchema),
    mode: 'onSubmit',
  });

  const mutation = useMutation(addProject, {
    onSuccess: async () => {
      form.reset();
      setIsOpen(false);
      refetch();
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
    const url = form.getValues('url');

    mutation.mutate({
      url,
    });
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen: boolean) => {
        setIsOpen(isOpen);
        form.reset();
      }}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Add new project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className='grid gap-4 py-4'>
              <FormInput<AddProjectFormData>
                form={form}
                label='Project url'
                placeholder='owner/repository'
                name='url'
                disabled={form.formState.isSubmitting}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProjectModal;
