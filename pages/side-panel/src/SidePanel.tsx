import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import TaskManager from './task-manager';
import Form from './form';
import type { ComponentPropsWithoutRef } from 'react';

const SidePanel = () => {
  return <TaskManager />;
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
