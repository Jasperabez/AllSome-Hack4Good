import '@src/SidePanel.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import TaskManager from './task-manager';
import Form from './form';
import type { ComponentPropsWithoutRef } from 'react';
import { PageContextProvider, usePageContext } from './page-context';

const SidePanel = ({ children }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <PageContextProvider>
      <View />
    </PageContextProvider>
  );
};

const View = () => {
  const { page } = usePageContext();
  console.log(page);
  return (
    <div>
      {page === 'task-manager' && <TaskManager />}
      {page === 'form' && <Form />}
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
