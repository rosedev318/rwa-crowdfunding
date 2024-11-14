import { create } from 'zustand';
import { Property } from './types';

interface PropertyStore {
  properties: Property[];
  setProperties: (properties: Property[]) => void;
}

const usePropertyStore = create<PropertyStore>((set) => ({
  properties: [],
  setProperties: (properties: Property[]) => set({ properties }),
}));

export default usePropertyStore;
