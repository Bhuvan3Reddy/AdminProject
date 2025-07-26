import { Toast, ToastToggle } from 'flowbite-react';
import { HiCheckCircle, HiExclamationCircle, HiInformationCircle } from 'react-icons/hi';

interface AppToastProps {
  show: boolean;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
}

const iconMap = {
  success: <HiCheckCircle className="h-6 w-6 text-green-500" />,
  error: <HiExclamationCircle className="h-6 w-6 text-red-500" />,
  info: <HiInformationCircle className="h-6 w-6 text-blue-500" />,
};

const AppToast: React.FC<AppToastProps> = ({ show, message, type = 'info', onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999]">
      <Toast className="w-fit p-5 text-base flex items-center">
        {iconMap[type]}
        <div className="ml-4 text-base font-medium whitespace-nowrap">{message}</div>
        <ToastToggle onClick={onClose} className="ml-2" />
      </Toast>
    </div>
  );
};

export default AppToast;
