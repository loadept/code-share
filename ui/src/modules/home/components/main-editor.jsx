import { Editor } from "@monaco-editor/react";

export const MainEditor = () => {
  return (
    <main className="flex-1">
      <Editor
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
