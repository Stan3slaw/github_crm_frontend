import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useNavigate } from 'react-router-dom';

import { getProjects, signOut } from '@/cdk/api/api';
import { Button } from '@/components/ui/button';
import AddProjectModal from '@/modules/projects/components/add-project-modal/add-project-modal';

const LayoutWithNavigation: React.FC = () => {
  const navigate = useNavigate();

  const { isLoading } = useQuery('projects', getProjects);

  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  function handleAddProject(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    e.stopPropagation();
    setIsAddProjectModalOpen(true);
  }

  async function handleSignOut(): Promise<void> {
    await signOut().then(() => {
      navigate('/auth/sign-in');
    });
  }

  return (
    <div className='p-4'>
      <div className='mb-6 flex justify-between'>
        <Button onClick={handleAddProject} disabled={isLoading}>
          <Plus className='h-5 w-5' /> Add project
        </Button>
        <Button onClick={handleSignOut} disabled={isLoading}>
          Sign out
        </Button>
      </div>
      <AddProjectModal isOpen={isAddProjectModalOpen} setIsOpen={setIsAddProjectModalOpen} />
      <Outlet />
    </div>
  );
};

export default LayoutWithNavigation;
