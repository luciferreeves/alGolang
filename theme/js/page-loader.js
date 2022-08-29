// This script is used to load the appropriate local page content for the current page.

const getLocaleLanguge = () => {
    if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0].split('-')[0];
    } else {
      return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
    }
}

const isLocaleLoaded = (cl) => {
  for (const language of languages) {
    if (cl.includes(language)) {
      return true;
    }
  }
  return false;
}

const lang = getLocaleLanguge();
const languages = []
const languagesDiv = document.querySelector('.languages') ? document.querySelector('.languages').getElementsByTagName('a') : [];
const page = window.location.pathname;

for (let i = 0; i < languagesDiv.length; i++) {
    const language = languagesDiv[i].getAttribute('data-lang');
    languages.push(language);
}

const a = document.querySelectorAll('a');
for (let i = 0; i < a.length; i++) {
    let split = page.split('/');
    // Remove empty strings from the array.
    split = split.filter(Boolean);
    if (a[i].getAttribute('data-lang')) {
        split.pop();
        const currentLanguage = a[i].getAttribute('data-lang');
        const replacedLink = ('/' + split.join('/') + '/' + currentLanguage + '/').replace(/\/\//g, '/');
        a[i].setAttribute('href', replacedLink);
    } else {
      const href = a[i].getAttribute('href');
      let baseLink = "/";
      for (const element in split) {
        baseLink += split[element] + "/";
        if (languages.includes(split[element])) {
          break;
        }
      }
      a[i].setAttribute('href',href.replace('/<l>/', baseLink));
    }
}

if (!isLocaleLoaded(page)) {
    window.location.href = page + lang;
}

