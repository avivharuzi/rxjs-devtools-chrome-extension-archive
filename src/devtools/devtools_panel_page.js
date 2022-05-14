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
  const min = Math.min(...Object.values(data));
  const max = Math.max(...Object.values(data));

  Object.entries(data).forEach(([key, value]) => {
    document.getElementById(
      `stats${key[0].toUpperCase()}${key.slice(1)}`
    ).textContent = value.toString();

    document.querySelector(`.stats--${key}`).style.height = getPercent(
      value,
      min,
      max
    );
  });
};

const getPercent = (numberValue, minNumberValue, maxNumberValue) => {
  const diff = maxNumberValue - minNumberValue;
  const percent = Math.floor((numberValue / diff) * 100);

  if (percent < 10) {
    return `10%`;
  }

  return `${percent}%`;
};

sendMessage({
  type: 'init',
  data: {},
});
