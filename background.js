let activeTab = null;
let startTime = null;

function handleTabChange(tab) {
  if (!tab || !tab.url) return;

  const studySites = ["leetcode.com", "hackerrank.com", "chatgpt.com", "youtube.com", "geeksforgeeks.org"];
  const isStudySite = studySites.some(site => tab.url.includes(site));

  console.log("[Study Tracker] Tab changed:", tab.url, "→ Is study site?", isStudySite);

  if (isStudySite) {
    if (!startTime) startTime = Date.now();
    activeTab = tab.url;
  } else {
    logTime();
  }
}

function logTime() {
  if (activeTab && startTime) {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    const today = new Date().toISOString().split("T")[0];

    let site;
    try {
      site = new URL(activeTab).hostname;
    } catch (err) {
      console.error("Invalid URL for activeTab:", activeTab);
      site = "unknown";
    }

    console.log(`[Study Tracker] Logging ${duration}s on ${site} for ${today}`);

    chrome.storage.local.get(["studyData"], (result) => {
      const data = result.studyData || {};

      if (!data[today]) data[today] = {};
      if (!data[today][site]) data[today][site] = 0;

      data[today][site] += duration;

      chrome.storage.local.set({ studyData: data }, () => {
        console.log("[Study Tracker] Updated storage:", data);
      });
    });
  } else {
    console.log("[Study Tracker] No activeTab or startTime");
  }

  startTime = null;
  activeTab = null;
}

// Detect when tab is activated
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  handleTabChange(tab);
});

// Detect when tab URL is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    handleTabChange(tab);
  }
});

// On extension install or Chrome restart, check current tab
chrome.runtime.onStartup.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      handleTabChange(tabs[0]);
    }
  });
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      handleTabChange(tabs[0]);
    }
  });
});

// For popup to request data
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getStudyData") {
    chrome.storage.local.get(["studyData"], (result) => {
      sendResponse(result.studyData || {});
    });
    return true;
  }
});
