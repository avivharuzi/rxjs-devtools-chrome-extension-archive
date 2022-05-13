'use strict';

const backgroundConnection = chrome.runtime.connect({
  name: `panel@${chrome.devtools.inspectedWindow.tabId}`,
});

backgroundConnection.onMessage.addListener((message) => {
  console.log('devtools_panel_page', message);
});

const sendMessage = (message) => {
  backgroundConnection.postMessage(message);
};
