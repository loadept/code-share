import { Users } from '../../icons/users'

export const HeaderButton = ({ onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className="flex items-center gap-2 px-3 py-2 bg-[#3c3c3c] rounded-lg cursor-pointer outline-none">
      <Users />
      <span className="users-counter text-sm font-medium text-gray-200">0</span>
      <span className="text-xs text-gray-300">conectados</span>
    </button>
  )
}
