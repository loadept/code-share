export const PopupUser = ({ key, user }) => {
  return (
    <div key={key} className="flex items-center gap-3 p-2 rounded-lg bg-transparent hover:bg-[#2a2d2e] cursor-pointer">
      <span className="h-6 w-6 bg-gray-200 text-black font-extrabold rounded-full flex justify-center items-center">
        {user?.username[0].toUpperCase()}
      </span>
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
