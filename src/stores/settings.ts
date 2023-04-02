import { commonRequest$ } from '@/srv.service';
import { defineStore } from 'pinia';

interface ISettingItem {
  name: string;
  entkey: string;
}

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      items: [
        { name: 'Категории', entkey: 'categories' },
        { name: 'Продукты', entkey: 'products' }
      ] as ISettingItem[],
      activeItem: null as ISettingItem | null
    };
  },
  actions: {
    getData() {
      const entkey = this.activeItem?.entkey;
      if (entkey) {
        return commonRequest$<string>('get', { entkey });
      } else {
        console.warn('Ошибка, попробуйте перезагрузить станицу');
      }
    },
    changeActiveItem(item?: ISettingItem | string): void {
      if (typeof item === 'string') {
        this.items.forEach((value: ISettingItem) => {
          if (value.entkey === item) {
            return (this.activeItem = value);
          }
        });
      } else {
        this.activeItem = (item ? item : null) as ISettingItem | null;
      }
    }
  }
});
