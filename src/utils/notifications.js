import { notification } from 'antd';

export const notifySuccess = (message = 'Thành công', description = '', duration = 2) => {
  notification.success({
    message,
    description: description || 'Thao tác thành công.',
    placement: 'topRight',
    duration,
  });
};
