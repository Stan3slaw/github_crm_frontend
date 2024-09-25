import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import { deleteProject, getProjects, refreshProject } from '@/cdk/api/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProjectDetailsFooter from '@/modules/projects/components/project-details-footer/project-details-footer';
import ProjectDropdown from '@/modules/projects/components/project-dropdown-menu/project-dropdown-menu';

const ProjectsList: React.FC = () => {
  const { data, isLoading, refetch } = useQuery('projects', getProjects);

  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);

  async function handleDelete(id: string): Promise<void> {
    await deleteProject(id).then(() => {
      refetch();
    });
  }

  async function handleRefresh(id: string, url: string): Promise<void> {
    setUpdatingItemId(id);
    await refreshProject(id, { url })
      .then(() => {
        refetch();
      })
      .finally(() => setUpdatingItemId(null));
  }

  return (
    <>
      {isLoading ? (
        <div className='h-screen flex items-center justify-center'>
          <Icons.spinner className='animate-spin' />
        </div>
      ) : (
        <ScrollArea className='h-screen'>
          <div className='flex flex-col gap-2'>
            {data?.map((item) => (
              <Card key={item._id}>
                {item._id === updatingItemId ? (
                  <div className='h-32 flex justify-center items-center'>
                    <Icons.spinner className='animate-spin' />
                  </div>
                ) : (
                  <>
                    <CardHeader className='flex flex-row justify-between'>
                      <div className='space-y-1'>
                        <CardTitle>
                          {item.owner} / {item.name}
                        </CardTitle>
                        <CardDescription>
                          For more details: <Link to={item.url}>{item.url}</Link>
                        </CardDescription>
                      </div>
                      <ProjectDropdown project={item} onDelete={handleDelete} onRefresh={handleRefresh} />
                    </CardHeader>
                    <CardContent>
                      <ProjectDetailsFooter project={item} />
                    </CardContent>
                  </>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
    </>
  );
};

export default ProjectsList;
