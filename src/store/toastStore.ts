import { create } from 'zustand';

interface ToastStore {
  visible: boolean;
  type: 'success' | 'error' | 'warning';
  message: string;
  fireToast: (type: 'success' | 'error' | 'warning', message: string) => void;
  closeToast: () => void;
}

const useToastStore = create<ToastStore>((set) => ({
  visible: false,
  type: 'success',
  message: '',
  fireToast: (type, message) => {
    set({ visible: true, type: type, message: message });
    setTimeout(() => set({ visible: false }), 5000);
  },
  closeToast: () => {
    set({ visible: false });
  },
}));

export default useToastStore;
