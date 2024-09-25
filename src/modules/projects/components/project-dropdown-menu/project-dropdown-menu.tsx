import { MoreVerticalIcon, RefreshCcw, Trash2 } from 'lucide-react';
import React from 'react';

import { Project } from '@/cdk/api/types/project.types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProjectDropdownProps {
  project: Project;
  onDelete: (id: string) => void;
  onRefresh: (id: string, url: string) => void;
}

const ProjectDropdown: React.FC<ProjectDropdownProps> = ({ project, onDelete, onRefresh }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='secondary' size='icon'>
          <MoreVerticalIcon className='h-4 w-4 text-secondary-foreground' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' alignOffset={-5} className='w-[200px]' forceMount>
        <DropdownMenuItem onClick={() => onDelete(project._id)}>
          <Trash2 className='mr-2 h-4 w-4' /> Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onRefresh(project._id, `${project.owner}/${project.name}`)}>
          <RefreshCcw className='mr-2 h-4 w-4' /> Refresh
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectDropdown;
