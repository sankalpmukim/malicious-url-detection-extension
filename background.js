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
  try {
    if (url.indexOf("mal-url-detector.azurewebsites") !== -1) {
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
  //   return res.json();
};

browser.webRequest.onBeforeRequest.addListener(
  async function (requestDetails) {
    if (await isMalicious(requestDetails.url)) {
      console.log("malicious");

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
