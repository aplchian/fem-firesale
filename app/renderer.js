const marked = require('marked');
const { remote, ipcRenderer } = require('electron')
const mainProcess = remote.require('./main')

const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');



const renderMarkdownToHtml = (markdown) => {
    htmlView.innerHTML = marked(markdown,{ sanitize: true })
}

markdownView.addEventListener('keyup',(e) => {
    renderMarkdownToHtml(e.target.value)
})

openFileButton.addEventListener('click', () => {
    mainProcess.getFileFromUserSelection()
})

ipcRenderer.on('file-opened', (e,file,content) => {
  markdownView.value = content
  renderMarkdownToHtml(content)
})