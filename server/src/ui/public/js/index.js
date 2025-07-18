const $ = selector => document.querySelector(selector)
const $all = selector => document.querySelectorAll(selector)

const userData = localStorage.getItem('userData')
const userDecodedData = JSON.parse(userData || 'null')

const body = $('body')
body.classList.add('hidden')

try {
  if (!userDecodedData?.username) throw new Error('Datos inválidos');

  $('#username').textContent = userDecodedData.username
  body.classList.remove('hidden')
} catch (err) {
  window.location.href = '/auth'
}

require.config({
  paths: {
    vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs'
  }
})
const socket = io();

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
          userId: userDecodedData.userId
        })
      }, 200)
    }
  })

  socket.on('codeUpdate', ({ code, userId }) => {
    if (userId !== userDecodedData.userId) {
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
  const usersCounter = $all('.users-counter')
  usersCounter.forEach(e => {
    e.textContent = total
  })
})

const usersButton = $('#users-button')
usersButton.addEventListener('click', (e) => {
  e.stopPropagation()
  const usersPopUp = $('#users-popup')
  usersPopUp.classList.toggle('hidden')
})

document.addEventListener('click', () => {
  const usersPopUp = $('#users-popup')
  usersPopUp.classList.add('hidden')
})
