import { commonRequest$ } from '@/srv.service';
import type { TFetchRequest } from '@/types';
import { defineStore } from 'pinia';
import { catchError, map, take } from 'rxjs/operators';

interface ISettingItem {
  name: string;
  entkey: string;
}

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return {
      items: [
        { name: 'Словарь', entkey: 'dictionaries' },
        { name: 'Категории', entkey: 'categories' },
        { name: 'Продукты', entkey: 'products' }
      ] as ISettingItem[],
      activeList: null as ISettingItem | null,
      activeItem: null as string | null,
      dictItems: {}
    };
  },
  actions: {
    getData$() {
      const entkey = this.activeList?.entkey;
      if (entkey) {
        return commonRequest$<TFetchRequest>('get', { entkey });
      } else {
        console.warn('Ошибка, попробуйте перезагрузить станицу');
      }
    },
    saveData(body: Object) {
      const entkey = this.activeList?.entkey;
      console.warn(entkey, body);
      if (entkey) {
        return commonRequest$<string>('post', { entkey, body })
          .pipe(
            take(1),
            catchError((err) => {
              throw 'error in source. Details: ' + err;
            })
          )
          .subscribe((val) => console.warn(val));
        // .subscribe({
        //   next: (id) => {
        //     console.warn(id);
        //   },
        //   error: (err) => {
        //     console.warn(err);
        //   }
        // });
      } else {
        console.warn('Ошибка, попробуйте перезагрузить станицу');
      }
    },
    getSchema$() {
      const entkey = this.activeList?.entkey;
      const entid = 'newschema';
      if (entkey) {
        return commonRequest$<TFetchRequest>('get', { entkey, entid }).pipe(
          map((result) => result.meta || {})
        );
      } else {
        console.warn('Ошибка, попробуйте перезагрузить станицу');
      }
    },
    getSelectItems$(key: string) {
      return commonRequest$<TFetchRequest>('get', {
        entkey: 'dict',
        params: { selectKey: key }
      }).pipe(map((result) => result || {}));
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
    },
    changeActiveItem(item: string): void {
      this.activeItem = item === 'new' ? 'Добавление' : item;
    },
    setDictItems() {
      return commonRequest$<TFetchRequest>('get', {
        entkey: 'dictionaries',
        params: { viewType: 'grouped', viewTypeField: 'Type' }
      }).subscribe((value) => {
        this.dictItems = { ...value };
      });
    }
  }
});
