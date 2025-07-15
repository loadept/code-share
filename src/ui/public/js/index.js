require.config({
  paths: {
    vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs'
  }
})
const socket = io();

const $ = selector => document.querySelector(selector)
const audio = new Audio('/sounds/notification.mp3')
const prevTitle = document.title
let changeTitleTimer = null

const changeTitle = () => {
  if (changeTitleTimer) {
    clearTimeout(changeTitleTimer)
  }

  document.title = 'Alguien ha escrito'
  changeTitleTimer = setTimeout(() => {
    document.title = prevTitle
  }, 2200)
}

let editor
require(['vs/editor/editor.main'], () => {
  editor = monaco.editor.create($('#editor'), {
    language: 'plaintext',
    theme: 'vs-dark',
    fontLigatures: true,
    minimap: {
      enabled: false
    },
    padding: { top: 20, bottom: 20 },
    automaticLayout: true
  });

  let isRemoteChange = false
  let debounceTimer

  editor.onDidChangeModelContent(() => {
    if (!isRemoteChange) {
      clearTimeout(debounceTimer)

      debounceTimer = setTimeout(() => {
        socket.emit('codeUpdate', {
          code: editor.getValue(),
          userId: socket.id
        })
      }, 200)
    }
  })

  socket.on('codeUpdate', ({ code, userId }) => {
    if (userId !== socket.id) {
      isRemoteChange = true
      if (editor.getValue() !== code) {
        editor.setValue(code)
        audio.play()
        changeTitle()
      }
      isRemoteChange = false
    }
  })
})

socket.on('totalConnections', (total) => {
  const usersCounter = $('#users-counter')
  usersCounter.textContent = total
})

const downloadButton = $('#download-button')
downloadButton.addEventListener('click', () => {
  const blob = new Blob([editor.getValue])

  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = 'code-share.txt'
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
})
