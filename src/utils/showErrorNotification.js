import { notification } from 'antd';

export function showErrorNotification(message = 'Đã xảy ra lỗi', description = '') {
  notification.error({
    message,
    description: description || 'Vui lòng thử lại sau.', 
    placement: 'topRight',
    duration: 4,
  });
}
