chrome.scripting.executeScript({
  target: { tabId: chrome.tabs.getCurrent() },
  func: () => {
    console.log("Injected successfully!");
  }
});
