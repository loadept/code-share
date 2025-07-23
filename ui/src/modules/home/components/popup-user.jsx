export const PopupUser = ({ user }) => {
  return (
    <div key={user?.userId} className="flex items-center gap-3 p-2 rounded-lg bg-transparent hover:bg-[#2a2d2e] cursor-pointer">
      <span className="h-5 w-5 bg-gray-200 rounded-full"></span>
      <div className="flex-1">
        <p className="text-sm font-medium text-[#cccccc]">
          {user?.username}
        </p>
        <p className="text-xs text-[#969696]">En línea</p>
      </div>
      <div className="w-2 h-2 bg-[#4ec9b0] rounded-full"></div>
    </div>
  )
}
