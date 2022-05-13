'use strict';

const backgroundConnection = chrome.runtime.connect({
  name: `panel@${chrome.devtools.inspectedWindow.tabId}`,
});

backgroundConnection.onMessage.addListener((message) => {
  if (!message.type || !message.data) {
    return;
  }

  const { type, data } = message;

  switch (type) {
    case 'stats':
      handleStats(data);
      break;
  }
});

const sendMessage = (message) => {
  backgroundConnection.postMessage(message);
};

const handleStats = (data) => {
  document.getElementById('statsNext').textContent = data.next;
  document.getElementById('statsError').textContent = data.error;
  document.getElementById('statsComplete').textContent = data.complete;
  document.getElementById('statsSubscribe').textContent = data.subscribe;
  document.getElementById('statsUnsubscribe').textContent = data.unsubscribe;
};

sendMessage({
  type: 'init',
  data: {},
});
