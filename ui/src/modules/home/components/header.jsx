import useAuthStore from '../../../core/store/auth-store'
import logo from '../../../assets/images/code-share-n.webp'
import { HeaderButton } from './header-button'
import { PopupUser } from './popup-user'
import { ConnectModal } from './connect-modal'
import { Leave } from '../../icons'
import useConnectionStore from '../../../core/store/session-store'
import useSocketStore from '../../../core/store/socket-store'

export const Header = () => {
  const { authData } = useAuthStore()
  // Connect room UI level
  const {
    isLoading,
    isConnected,
    roomUrl,
    roomId,
    showUsersList,
    showConnectionModal,
    initiateConnection,
    confirmConnection,
    disconnect: disconnectRoom,
    toggleUsersList,
  } = useConnectionStore()
  // WS event room store
  const {
    connect: connectSocket,
    disconnect: disconnectSocket,
    connectedUsers,
    countConnections,
    isConnecting
  } = useSocketStore()

  const handleConnection = () => {
    confirmConnection()

    if (roomId && authData?.accessToken) {
      connectSocket(roomId, authData.accessToken)
    }
  }

  const handleDisconnect = () => {
    disconnectSocket()
    disconnectRoom()
  }

  const handleButtonClick = () => {
    if (isConnected) {
      toggleUsersList()
    } else {
      initiateConnection()
    }
  }

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-[#3e3e42] bg-[#252526]">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center">
          <img src={logo} alt="CodeShare logo" className="w-12" />
        </div>
        <span className="text-lg font-bold text-gray-100">CodeShare</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-8"></div>
        <span className="text-sm font-semibold text-gray-100">
          {authData?.username.toUpperCase()}
        </span>
      </div>
      <div className="relative">
        <HeaderButton
          isLoading={isLoading || isConnecting}
          onClick={handleButtonClick}
          isConnected={isConnected}
          connectedNumber={countConnections}
        />
        {isConnected && showUsersList && (
          <div
            className="absolute right-0 top-full mt-2 w-96 bg-[#252526] border border-[#3e3e42]
              rounded-lg shadow-xl z-50 animate-showing"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#cccccc]">
                  Usuarios conectados {countConnections}
                </h3>
                <button
                  onClick={handleDisconnect}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-semibold text-white bg-[#d73a49]"
                >
                  <Leave className="h-4 w-4" />
                  Desconectar
                </button>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto">
                {connectedUsers.map((user, index) => (
                  <PopupUser key={index} user={user} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {showConnectionModal && (
        <ConnectModal
          url={roomUrl}
          setShowConnectionModal={show => useConnectionStore.setState({ showConnectionModal: show })}
          handleConnect={handleConnection}
        />
      )}
    </header>
  )
}
