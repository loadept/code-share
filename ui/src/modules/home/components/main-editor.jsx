import { Editor } from '@monaco-editor/react'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import useSocketStore from '../../../core/store/socket-store'

export const MainEditor = () => {
  const [code, setCode] = useState('')
  const isRemoteChange = useRef(false)
  const debounceTimer = useRef(null)
  const editorRef = useRef(null)
  const { socket, on, emit, off, isConnected: socketConnected } = useSocketStore()

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!socketConnected) return

    const handleSyncState = ({ code: initialCode, lastUpdate }) => {
      isRemoteChange.current = true

      setCode(initialCode)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isRemoteChange.current = false
        })
      })
      console.log(`Synchronized state. Last update ${lastUpdate}`)
    }

    on('syncState', handleSyncState)

    return () => {
      off('syncState', handleSyncState)
    }
  }, [socketConnected])

  useEffect(() => {
    if (!socket) return

    const handleCodeUpdate = ({ code: remoteCode }) => {
      isRemoteChange.current = true

      setCode(remoteCode)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          isRemoteChange.current = false
        })
      })
    }

    on('codeUpdates', handleCodeUpdate)

    return () => {
      off('codeUpdates', handleCodeUpdate)
    }
  }, [socket, on, off])

  const debounceEmit = useCallback((codeValue) => {
    if (isRemoteChange.current) return
    if (!socketConnected) return

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      emit('codeUpdates', { code: codeValue })
    }, 150)
  }, [socketConnected, emit])

  const handleCodeChange = (codeValue = '') => {
    setCode(codeValue)
    debounceEmit(codeValue)
  }

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor
  }

  return (
    <main className="flex-1">
      <Editor
        value={code}
        onChange={handleCodeChange}
        onMount={handleEditorDidMount}
        loading="Cargando..."
        height="100%"
        language="plaintext"
        theme="vs-dark"
        options={{
          fontFamily: "firacode",
          fontLigatures: true,
          minimap: { enabled: false },
          bracketPairColorization: { enabled: true },
          guides: { bracketPairs: true },
          tabSize: 4,
          insertSpaces: true,
          padding: { top: 20, bottom: 20 },
          automaticLayout: true,
          cursorBlinking: "expand",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          quickSuggestions: false,
          parameterHints: { enabled: false },
          suggestOnTriggerCharacters: false,
          glyphMargin: true,
        }}
      />
    </main>
  )
}
