import Swal from 'sweetalert2';

// Toast configuration with auto close and progress bar
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

// Show success message
export const showSuccess = (message: string) => {
  return Toast.fire({
    icon: 'success',
    title: message,
  });
};

// Show error message
export const showError = (message: string) => {
  return Toast.fire({
    icon: 'error',
    title: message,
  });
};

// Show info message
export const showInfo = (message: string) => {
  return Toast.fire({
    icon: 'info',
    title: message,
  });
};

// Show warning message
export const showWarning = (message: string) => {
  return Toast.fire({
    icon: 'warning',
    title: message,
  });
};

// Confirmation dialog with custom styling to ensure buttons are always visible
export const showConfirm = async (
  title: string,
  text: string = '',
  confirmButtonText: string = 'Yes, delete it!',
  cancelButtonText: string = 'Cancel'
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    focusCancel: true,
    width: '500px',
    customClass: {
      popup: 'swal2-custom-popup',
      confirmButton: 'swal2-custom-confirm',
      cancelButton: 'swal2-custom-cancel',
      actions: 'swal2-custom-actions',
    },
  });

  return result.isConfirmed;
};
