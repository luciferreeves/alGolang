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
const currentLanguage = window.location.pathname.slice(1, 3);

for (let i = 0; i < languagesDiv.length; i++) {
    const language = languagesDiv[i].getAttribute('data-lang');
    languages.push(language);
    const href =  '/' + language + page.slice(3);
    languagesDiv[i].setAttribute('href', href);
}

if (!languages.includes(currentLanguage)) {
    window.location.href = '/' + lang + page;
}

