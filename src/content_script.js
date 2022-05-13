'use strict';

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
    data.source !== 'rxjs-devtools-extension' ||
    !data.message
  ) {
    return;
  }

  chrome.runtime.sendMessage(data.message);
});
