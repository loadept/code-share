import { Exit } from "../../icons"

export const Notification = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-start gap-3 p-4 rounded-lg shadow-lg max-w-sm bg-[#252526] opacity-95 border animate-showing"
          style={{ borderColor: notification.color }}
        >
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: notification.color }}
          >
            <div className="text-white">{notification.icon}</div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[#cccccc]">
              {notification.title}
            </h4>
            <p className="text-xs mt-1 text-[#969696]">
              {notification.message}
            </p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 p-1 rounded-lg transition-colors text-[#969696] hover:bg-[#3c3c3c]"
          >
            <Exit className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  )
}
