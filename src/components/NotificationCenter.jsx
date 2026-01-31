import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useNotification } from '../hooks/useNotification';

const NotificationCenter = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-500" />;
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center gap-3 p-4 rounded-lg border ${getStyles(
            notification.type
          )} animate-slideIn shadow-lg`}
        >
          {getIcon(notification.type)}
          <p className="flex-1 text-sm font-medium text-gray-800">
            {notification.message}
          </p>
          <button
            onClick={() => removeNotification(notification.id)}
            className="ml-2 p-1 hover:bg-gray-200 rounded transition"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationCenter;
