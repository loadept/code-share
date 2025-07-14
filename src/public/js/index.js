const $ = selector => document.querySelector(selector)
const audio = new Audio('/sounds/notification.mp3')
const prevTitle = document.title
let changeTitleTimer = null

const socket = io();

require.config({
  paths: {
    vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs'
  }
})

require(['vs/editor/editor.main'], () => {
  const editor = monaco.editor.create($('#editor'), {
    language: 'javascript',
    theme: 'vs-dark',
    fontLigatures: true,
    minimap: {
      enabled: false
    },
    automaticLayout: true
  });

  let isRemoteChange = false
  let debounceTimer

  editor.onDidChangeModelContent(() => {
    if (!isRemoteChange) {
      clearTimeout(debounceTimer)

      debounceTimer = setTimeout(() => {
        socket.emit('code update', {
          code: editor.getValue(),
          userId: socket.id
        })
      }, 200)
    }
  })

  socket.on('code update', ({ code, userId }) => {
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

const changeTitle = () => {
  if (changeTitleTimer) {
    clearTimeout(changeTitleTimer)
  }

  document.title = 'Alguien ha escrito'
  changeTitleTimer = setTimeout(() => {
    document.title = prevTitle
  }, 2200)
}
