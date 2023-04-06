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
        { name: 'Словарь', entkey: 'dictionary' },
        { name: 'Категории', entkey: 'categories' },
        { name: 'Продукты', entkey: 'products' }
      ] as ISettingItem[],
      activeList: null as ISettingItem | null,
      activeItem: null as string | null
    };
  },
  actions: {
    getData$() {
      const entkey = this.activeList?.entkey;
      if (entkey) {
        return commonRequest$<string>('get', { entkey });
      } else {
        console.warn('Ошибка, попробуйте перезагрузить станицу');
      }
    },
    changeActiveList(item?: ISettingItem | string): void {
      if (typeof item === 'string') {
        this.items.forEach((value: ISettingItem) => {
          if (value.entkey === item) {
            return (this.activeList = value);
          }
        });
      } else {
        this.activeList = (item ? item : null) as ISettingItem | null;
      }
    }
  }
});
