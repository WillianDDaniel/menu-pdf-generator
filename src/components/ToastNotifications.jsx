import { toast } from 'react-toastify';
import { FiXCircle, FiCheckCircle } from 'react-icons/fi';

export const notifySuccess = message => {
  toast.success(message, {
    icon: <FiCheckCircle color='green' size={20} />,
    className: 'custom-toast success-toast',
  });
};

export const notifyError = message => {
  toast.error(message, {
    icon: <FiXCircle color='red' size={20} />,
    className: 'custom-toast error-toast',
  });
};
