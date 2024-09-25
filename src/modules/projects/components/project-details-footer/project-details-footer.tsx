import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { unix } from 'dayjs';
import { GitFork, StarIcon } from 'lucide-react';
import React from 'react';

import { Project } from '@/cdk/api/types/project.types';

interface ProjectDetailsFooterProps {
  project: Project;
}

const ProjectDetailsFooter: React.FC<ProjectDetailsFooterProps> = ({ project }) => (
  <div className='flex space-x-4 text-sm text-muted-foreground'>
    <div className='flex items-center'>
      <StarIcon className='mr-1 h-3 w-3' />
      {project.starsNumber}
    </div>
    <div className='flex items-center'>
      <GitFork className='mr-1 h-3 w-3' />
      {project.forksNumber}
    </div>
    <div className='flex items-center'>
      <ExclamationTriangleIcon className='mr-1 h-3 w-3' />
      {project.issuesNumber}
    </div>
    <div>Created {unix(project.createdAt).format('DD MMMM YYYY')}</div>
  </div>
);

export default ProjectDetailsFooter;
