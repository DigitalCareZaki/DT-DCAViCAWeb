// The call opens in its own tab, so ending it closes that tab. Browsers only
// let a script close a tab that has no back history (or that a script opened),
// so fall back to navigating when the close is blocked, e.g. the call was
// reached by navigating within an existing tab.
const closeMeetingTab = (fallback: () => void) => {
  window.close();
  setTimeout(() => {
    if (!window.closed) fallback();
  }, 100);
};

export default closeMeetingTab;
