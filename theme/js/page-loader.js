// This script is used to load the appropriate local page content for the current page.

const getLocaleLanguge = () => {
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0].split('-')[0];
    } else {
      return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
    }
}

const lang = getLocaleLanguge();
const languages = []
const languagesDiv = document.querySelector('.languages').getElementsByTagName('a');
const page = window.location.pathname;

for (let i = 0; i < languagesDiv.length; i++) {
    const language = languagesDiv[i].getAttribute('data-lang');
    languages.push(language);
    let href = page.replace(page.split('/')[2], language);
    languagesDiv[i].setAttribute('href', href);
}

const isLocaleLoaded = (cl) => {
  for (const language of languages) {
    if (cl.includes(language)) {
      return true;
    }
  }
  return false;
}

if (!isLocaleLoaded(page)) {
    window.location.href = page + lang;
}

