import { Users } from "../../icons/users"
import { useState } from 'preact/hooks'

export const Header = () => {
  const [showUsersList, setShowUsersList] = useState(false)

  const toggleUsersList = () => {
    setShowUsersList(!showUsersList)
  }
  const connectedUsers = [
    { id: 1, name: "Juan Desarrollador", avatar: "J" },
    { id: 2, name: "María García", avatar: "MG" },
    { id: 3, name: "Carlos López", avatar: "CL" },
    { id: 4, name: "Ana Martínez", avatar: "AM" },
    { id: 5, name: "Pedro Sánchez", avatar: "PS" },
    { id: 6, name: "Laura Torres", avatar: "LT" },
  ]

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-[#151517]">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center">
          <img src="/images/code-share-n.webp" alt="CodeShare logo" className="w-12" />
        </div>
        <span className="text-lg font-bold text-gray-100">CodeShare</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-8"></div>
        <span id="username" className="text-sm font-medium text-gray-100">Default</span>
      </div>

      <div className="relative">
        <button
          onClick={toggleUsersList}
          className="flex items-center gap-2 px-3 py-2 bg-[#3c3c3c] rounded-lg cursor-pointer outline-none">
          <Users />
          <span className="users-counter text-sm font-medium text-gray-200">0</span>
          <span className="text-xs text-gray-300">conectados</span>
        </button>

        {showUsersList && (
          <div
            className="absolute right-0 top-full mt-2 w-80 bg-[#252526] border border-[#3e3e42] rounded-lg shadow-xl z-50 animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-100 mb-3">
                Usuarios conectados <span class="users-counter">0</span>
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {connectedUsers.map(user => (
                  <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#2a2d2e] transition-colors">
                    <span className="h-7 w-7 bg-gray-200 rounded-full"></span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-100">{user.name}</p>
                      <p className="text-xs text-gray-400">En línea</p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
