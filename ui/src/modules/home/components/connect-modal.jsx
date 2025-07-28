import { useRef, useState } from 'preact/hooks'
import { Check, Copy } from '../../icons'

export const ConnectModal = ({ handleConnect, setShowConnectionModal, url }) => {
  const [isCopied, setIsCopied] = useState(false)
  const roomUrlRef = useRef(null)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      roomUrlRef.current.select()
      setIsCopied(true)
    } catch (err) {
      console.error(`No se pudo copiar la URL ${err}`)
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
    >
      <div
        className="w-full max-w-md rounded-lg p-6 bg-[#252526] border border-[#3e3e42]"
      >
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg font-semibold text-[#cccccc]">
            Unirse a sesión colaborativa
          </h2>
        </div>

        <p className="text-sm mb-4 text-[#969696]">
          Comparte esta URL con otros usuarios para que se unan a tu sesión:
        </p>

        <div className="flex gap-2 mb-6">
          <input
            ref={roomUrlRef}
            type="text"
            value={url}
            readOnly
            onClick={(e) => e.currentTarget.select()}
            className="flex-1 px-3 py-2 rounded-lg text-sm bg-[#3c3c3c] border border-[#57575b] text-[#cccccc] outline-none"
          />
          <button
            onClick={copyToClipboard}
            className="px-3 py-2 rounded-lg transition-colors text-white hover:bg-[#e55a2b] outline-none cursor-pointer"
            style={{
              backgroundColor: !isCopied ? "#ff6b35" : "#4ec95d"
            }}
          >
            {!isCopied ?
              <Copy className="h-5 w-5" />
              :
              <Check className="h-5 w-5" />
            }
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowConnectionModal(false)}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-[#cccccc] bg-[#3c3c3c] hover:bg-[#2a2d2e] outline-none cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleConnect}
            className="flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-white bg-[#ff6b35] hover:bg-[#e55a2b] outline-none cursor-pointer"
          >
            Conectar
          </button>
        </div>
      </div>
    </div>
  )
}
