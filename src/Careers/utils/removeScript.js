export const removeScript = (scriptToRemove) => {
  let allSuspectScripts = document.getElementsByTagName('script');

  for (let i = allSuspectScripts.length; i >= 0; i--) {
    if (
      allSuspectScripts[i] &&
      allSuspectScripts[i].getAttribute('src') !== null &&
      allSuspectScripts[i].getAttribute('src').indexOf(`${scriptToRemove}`) !== -1
    ) {
      allSuspectScripts[i].parentNode.removeChild(allSuspectScripts[i]);
    }
  }
};
