export const PopUp = () => {
  return (
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
  )
}
