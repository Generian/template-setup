// import FormContainer from './js/components/container/FormContainer.jsx';
import './css/main.css';
import './css/theme.scss';
import { MDCRipple } from '@material/ripple/index';
import { MDCTextField } from '@material/textfield';
import { MDCList } from '@material/list';
import { MDCLinearProgress } from '@material/linear-progress';
import JSSoup from 'jssoup';
import $ from 'jquery';

const ripple = new MDCRipple(document.querySelector('.foo-button'));
const textField = new MDCTextField(document.querySelector('.mdc-text-field'));
const list = new MDCList(document.querySelector('.mdc-list'));
const progress = new MDCLinearProgress(document.querySelector('.mdc-linear-progress'));

function analyze(response, url) {
  // Define variables
  let indexed = false;
  let linkTitleText = '';
  let metaDesc = '';

  // Create & extract results
  const soup = new JSSoup(response.contents);
  const links = soup.findAll('a');

  // Loop through results & analyze
  links.forEach((link) => {
    if (link.attrs.href === url) {
      indexed = true;
      linkTitleText = link.find('h3').text;
      metaDesc = link.parent.nextSibling.find('span').text;
    }
  });

  return {
    indexed,
    linkTitleText,
    metaDesc
  };
}

function populateIframe(response) {
  const iframe = document.getElementById('foo');
  const iframedoc = iframe.contentDocument || iframe.contentWindow.document;
  iframedoc.body.innerHTML = response.contents;
}

function displayResults(results) {
  $('#isIndexed').text(results.indexed);
  $('#resultTitle').text(results.linkTitleText);
  $('#resultMeta').text(results.metaDesc);
}

const url = 'https://www.simscale.com/projects/afischer/toy/';

// const whatever = `http://www.whateverorigin.org/get?url=${encodeURIComponent(serp)}&callback=?`;
//
// const allmyhttps = `http://api.allorigins.ml/get?url=${encodeURIComponent(serp)}&callback=?`;
// const allmyraw = `http://api.allorigins.ml/get?method=raw&url=${encodeURIComponent(serp)}&callback=?`;

// $.getJSON(allmy, (response) => {
//   const iframe = document.getElementById('foo');
//   const iframedoc = iframe.contentDocument || iframe.contentWindow.document;
//   iframedoc.body.innerHTML = response.contents;
// });

function fetchAndAnalyze() {
  const googleURL = `https://www.google.com/search?q=site%3A${encodeURIComponent(url)}`;
  const allmy = `http://api.allorigins.ml/get?url=${encodeURIComponent(googleURL)}&callback=?`;
  $.getJSON(allmy, (response) => {
    populateIframe(response);
    displayResults(analyze(response, url));
  });
}

function wait(ms) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

function appendList(item) {
  $('.mdc-list').append(`<li class="mdc-list-item"><span class="mdc-list-item__text">${item}</span>
  </li>`);
}

function setProgress(p) {
  progress.progress = p;
}

progress.determinate = true;
progress.open();

document.getElementById('analyzeStart').onclick = () => {
  // fetchAndAnalyze()
  // progress.determinate = true;

  // progress.progress = 0.5;
  const links = document.getElementById('textarea').value.replace(' ', '').split(',');
  const linksLen = links.length;

  for (let i = 0; i < links.length; i++) {
    console.log(links[i]);
    appendList(links[i]);
    setProgress((i + 1) / linksLen);
    wait(1000);
  }
};










//
// $.getJSON(whatever, (response) => {
//   const links = $(response.contents).has(`a[href="${url}"]`);
//   console.log(links);
// });




















//
// $.getJSON(allmy, (response) => {
//   console.log(response.contents);
// });
//
// $.getJSON(allmyhttps, (response) => {
//   console.log(response.contents);
// });
//
// $.get(allmyraw, (response) => {
//   console.log(response);
// });
