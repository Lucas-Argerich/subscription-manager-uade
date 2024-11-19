console.log('SUBTRACK EXTENSION DETECTED')

window.addEventListener('message', (event) => {
    // Only accept messages from the web page
    if (event.source !== window) return;

    if (event.data.type === 'SET_AUTH_STATE') {
      console.log('ContentScript', event.data.data)
      chrome.storage.local.set({"subtrack_token": event.data.data})
    }
});
