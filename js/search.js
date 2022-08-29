const searchForm = document.getElementById('search');
const searchTerm = document.getElementById('search-term');
const searchIndexURI = "/search/search_index.json";
let baseURL = "";
let split = page.split('/');
split = split.filter(Boolean);
for (const element in split) {
    if (languages.includes(split[element])) {
        break;
    }
    baseURL += "/" + split[element];
}
var documents = {};
const xhr = new XMLHttpRequest();
xhr.open('GET', baseURL + searchIndexURI, true);
xhr.onload = function() {
    if (this.status === 200) {
        const searchIndex = JSON.parse(this.responseText);
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('search-box').style.display = 'block';
            const searchInput = document.getElementById('mkdocs-search-query');
            searchTerm.textContent = searchInput.value;
            // Search using Lunr
            var idx = lunr(function() {
                this.field('title');
                this.field('text');
                this.ref('location');
                for (var i = 0; i < searchIndex.docs.length; i++) {
                    var doc = searchIndex.docs[i];
                    this.add(doc);
                    documents[doc.location] = doc;
                }
            });
            var results = idx.search(searchInput.value);
            var resultDocuments = [];
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                doc = documents[result.ref];
                doc.summary = doc.text.substring(0, 200);
                resultDocuments.push(doc);
            }
            postMessage({
                results: resultDocuments,
                searchTerm: searchInput.value
            });
            const searchResults = document.getElementById('mkdocs-search-results');
            searchResults.innerHTML = '';
            for (const result of resultDocuments) {
                const list = document.createElement('ul');
                const item = document.createElement('li');
                const link = document.createElement('a');
                const title = document.createElement('h3');
                const summary = document.createElement('p');
                link.href = '/' + result.location;
                title.textContent = result.title;
                summary.textContent = result.summary;
                link.appendChild(title);
                link.appendChild(summary);
                item.appendChild(link);
                list.appendChild(item);
                searchResults.appendChild(list);
            }
        });
    }
}
xhr.send();

const close = document.getElementById('close');
close.addEventListener('click', () => {
    document.getElementById('search-box').style.display = 'none';
});
