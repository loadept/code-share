import { Users, Link } from '../../icons'

export const HeaderButton = ({ onClick, isConnected, connectedNumber, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-36">
      </div>
    )
  }

  return (
    <button
      onClick={() => onClick()}
      className="w-36 flex justify-center items-center gap-2 px-3 py-2 bg-[#3c3c3c] rounded-lg cursor-pointer outline-none"
      style={{
        backgroundColor: isConnected ? "#3c3c3c" : "#ff6b35",
      }}
    >
      {isConnected ? (
        <>
          <Users className="h-4 w-4" />
          <span className="users-counter text-sm font-semibold">{connectedNumber}</span>
          <span className="text-xs">
            conectados
          </span>
        </>
      ) : (
        <>
          <Link className="h-5 w-5 text-white" />
          <span className="text-sm font-semibold text-white">Conectar</span>
        </>
      )}
    </button>
  )
}
