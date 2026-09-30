console.log(chrome.tabs.getCurrent());
chrome.scripting.executeScript({
  target: { tabId: chrome.tabs.getCurrent().id},
  func: () => {
    console.log("Injected successfully!");
  }
});
