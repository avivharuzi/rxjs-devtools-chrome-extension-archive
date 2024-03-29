'use strict';

const SOURCE = 'rxjs-devtools-extension';

const backgroundConnection = chrome.runtime.connect({
  name: 'content',
});

backgroundConnection.onMessage.addListener((message) => {
  window.postMessage(
    {
      message,
      source: SOURCE,
    },
    '*'
  );
});

window.addEventListener('message', (event) => {
  // Only accept messages from the same frame
  if (event.source !== window) {
    return;
  }

  const data = event.data;

  // Only accept messages that we know are ours
  if (
    typeof data !== 'object' ||
    data === null ||
    data.source !== SOURCE ||
    !data.message
  ) {
    return;
  }

  backgroundConnection.postMessage(data.message);
});
