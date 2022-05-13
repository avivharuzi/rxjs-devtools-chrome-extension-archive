'use strict';

const backgroundConnection = chrome.runtime.connect({
  name: 'panel',
});

backgroundConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
});

backgroundConnection.onMessage.addListener((message) => {
  console.log('devtools_panel_page', message);
});
