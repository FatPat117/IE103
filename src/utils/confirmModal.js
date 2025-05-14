import { Modal } from 'antd';

export function showConfirmModal({
  title = 'Xác nhận',
  content = 'Bạn có chắc chắn?',
  okText = 'Đồng ý',
  cancelText = 'Hủy',
  onOk = () => {},
  onCancel = () => {},
  okType = 'primary',
}) {
  Modal.confirm({
    title,
    content,
    okText,
    cancelText,
    onOk,
    onCancel,
    okType,
  });
}
