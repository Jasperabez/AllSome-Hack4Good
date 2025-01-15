import '@src/SidePanel.css';
import { useStorage, withErrorBoundary, withSuspense } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import TaskManager from './task-manager';
import Form from './form';
import type { ComponentPropsWithoutRef } from 'react';

const SidePanel = () => {
  return <TaskManager />;
};

const ToggleButton = (props: ComponentPropsWithoutRef<'button'>) => {
  const theme = useStorage(exampleThemeStorage);
  return (
    <button
      className={
        props.className +
        ' ' +
        'font-bold mt-4 py-1 px-4 rounded shadow hover:scale-105 ' +
        (theme === 'light' ? 'bg-white text-black' : 'bg-black text-white')
      }
      onClick={exampleThemeStorage.toggle}>
      {props.children}
    </button>
  );
};

const HeaderButtons = () => {
  return (
    <div className="ml-auto w-1/3 text-md">
      <div className="flex gap-4 mr-10">
        <ToggleButton>New Meeting</ToggleButton>
        <ToggleButton>Toggle theme</ToggleButton>
      </div>
    </div>
  );
};

const BottomButtons = () => {
  return (
    <div className="flex justify-center gap-4 mr-10">
      <ToggleButton>New Task</ToggleButton>
      <ToggleButton>Complete</ToggleButton>
    </div>
  );
};

const SearchBar = (props: ComponentPropsWithoutRef<'input'>) => {
  return (
    <input
      className={props.className + ' ' + 'font-bold mt-4 py-1 px-4 rounded shadow' + 'bg-white text-black'}
      placeholder={props.children as string}
    />
  );
};

const ItemList = () => {
  return (
    <div className="flex flex-col gap-4">
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </div>
  );
};

const Item = (props: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div className="flex justify-center">
      <div className="w-1/2 bg-white text-black rounded shadow p-4">{props.children}</div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div> Loading ... </div>), <div> Error Occur </div>);
