console.log('worker running')

chrome.runtime.onMessage.addListener((message) => {
  console.log('message', message)
  if (message.type === 'SET_AUTH_STATE' && message.user) {
    console.log('LOGIN', message.user)
    chrome.storage.local.set({ user: message.user })
    return true
  }
})
