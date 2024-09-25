import { z } from 'zod';

import { MIN_URL_CHARACTERS } from '@/cdk/constants/forms.constants';

const repoRegex = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9-_]+$/;

export const addProjectSchema = z.object({
  url: z
    .string()
    .min(MIN_URL_CHARACTERS, 'Project url should not be empty')
    .regex(repoRegex, 'Project url must be in the format: owner/repository'),
});
