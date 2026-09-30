chrome.scripting.executeScript({
  target: { tabId: tabId },
  func: () => {
    console.log("Injected successfully!");
  }
});
