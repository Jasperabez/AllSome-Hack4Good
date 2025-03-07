import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';
import { error } from 'console';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

console.log('background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");
chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch(error => console.error(error));
