import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app';
import ReactQueryProvider from '@/cdk/providers/react-query.provider';
import './index.css';
import { Toaster } from '@/components/ui/toaster';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <StrictMode>
    <ReactQueryProvider>
      <App />
      <Toaster />
    </ReactQueryProvider>
  </StrictMode>
);
