import { Editor } from '@monaco-editor/react'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import useConnectionStore from '../../../core/store/connection-store'

export const MainEditor = () => {
  const [code, setCode] = useState('')
  const debounceTimer = useRef(null)
  const { isConnected } = useConnectionStore()

  useEffect(() => {
    const codeState = localStorage.getItem('code-state')
    if (codeState) {
      try {
        const codeObj = JSON.parse(codeState)
        if (codeObj?.code) {
          setCode(codeObj?.code)
        }
      } catch (err) {
        console.error(`Error parsing code state ${err}`)
      }
    }
  }, [])

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  const saveToStorage = useCallback((codeValue) => {
    if (!isConnected) {
      const date = new Date()
      const lastModified = date.toLocaleDateString('es-PE', {
        year: 'numeric',
        month: '2-digit',
        day: 'numeric'
      })
      const codeState = {
        code: codeValue,
        lastModified
      }
      localStorage.setItem('code-state', JSON.stringify(codeState))
    }
  }, [isConnected])

  const debounceSave = useCallback((codeValue) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    debounceTimer.current = setTimeout(() => {
      saveToStorage(codeValue)
    }, 1500)
  }, [saveToStorage])

  const handleCodeChange = (codeValue) => {
    const newCode = codeValue || ''
    setCode(newCode)
    debounceSave(newCode)
  }

  return (
    <main className="flex-1">
      <Editor
        value={code}
        onChange={handleCodeChange}
        loading="Cargando..."
        height="100%"
        language="plaintext"
        theme="vs-dark"
        options={{
          fontFamily: "firacode",
          fontLigatures: true,
          minimap: {
            enabled: false
          },
          bracketPairColorization: { enabled: true },
          guides: {
            bracketPairs: true,
          },
          tabSize: 4,
          insertSpaces: true,
          padding: { top: 20, bottom: 20 },
          automaticLayout: true,
          cursorBlinking: "expand",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
        }}
      />
    </main>
  )
}
