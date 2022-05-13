'use strict';

chrome.devtools.panels.create(
  'RxJs DevTools',
  'src/assets/icons/icon-512x512.png"',
  'src/devtools/devtools_panel_page.html',
  (_panel) => {
    // code invoked on panel creation
  }
);
