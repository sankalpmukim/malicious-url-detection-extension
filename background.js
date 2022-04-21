const makeCheckRequest = async (url) => {
  const api = `https://mal-url-detector.azurewebsites.net`;
  const response = await fetch(`${api}/predict?url=${encodeURI(url)}`);
  const data = await response.json();
  console.log(data);
  return data;
};

const isMaliciousBool = (result) => {
  return result === "malicious";
};

const isMalicious = async (url) => {
  const approvedStrings = [
    "i.pinimg.com/originals/11/93/75/1193757011cacbb72f",
    "mal-url-detector.azurewebsites",
    "sankalpmukim.github.io",
  ];
  const includesApprovedStrings = (str) => {
    return approvedStrings.some((approvedString) => {
      return str.includes(approvedString);
    });
  };
  try {
    if (includesApprovedStrings(url)) {
      return false;
    }
    const data = await makeCheckRequest(url);
    return isMaliciousBool(data.result);
  } catch (error) {
    console.log(error);
    try {
      await retrain();
      const data = await makeCheckRequest(url);
      return isMaliciousBool(data.result);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};

browser.webRequest.onBeforeRequest.addListener(
  async function (requestDetails) {
    if (await isMalicious(requestDetails.url)) {
      console.log("malicious");
      browser.tabs.sendMessage(requestDetails.tabId, {
        command: "malicious",
      });

      return {
        cancel: true,
      };
    } else {
      console.log("not malicious");
      return;
    }
  },
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["blocking"]
);
