<template>
  <div> 
    <v-table>
      <thead>
        <tr>
          <th 
            style="text-align:center !important;"
            v-for="(header, index) of headers"
            :key="index"
          >{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item of items"
          :key="item.Key"
        >
          <td
            v-for="(header, index) of headers"
            :key="index"
          >
            <template v-if="['createdAt', 'updatedAt'].includes(header)">
              <p>{{ item[header].time }}</p>
              <p>{{ item[header].date }}</p>
            </template>
            <p v-else>{{ item[header] }}</p>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSettingsStore } from '../stores/settings';
import { debounceTime, fromEvent } from 'rxjs';
const store = useSettingsStore();

export default defineComponent({
  name: 'SettingItem',
  props: {
    title: String
  },
  data() {
    return {
      itemsPerPage: 20,
      headers: [] as Array<string>,
      items: [] as Array<any>,
    }
  },
  computed: {
    title() {
      return this.titleInitial + this.$route.params['settingType'];
    },
    tableHeight() {
      console.warn(this.items.length * 60 + 'px');
      return this.items.length * 60 + 'px'
    }
  },
  methods: {
    watchScroll() {
      fromEvent(window, 'scroll')
        .pipe(
          debounceTime(1000)
        )
        .subscribe((e: Event) => console.log(e, (e.target as Element).scrollTop));
    }
  },
  beforeMount () {
      // this.loadItems({ page: 1, itemsPerPage: 5, sortBy: [] })
      store.getData().subscribe(value => {
        this.headers = [...value.meta.tableTitles];
        this.items = [...value.data];
        // console.warn(this.items);
        this.items.forEach(item => {
          ['createdAt', 'updatedAt'].forEach(field => {
            item[field] = {
              date: new Date(item[field]).toLocaleDateString('ru-RU'),
              time: new Date(item[field]).toLocaleTimeString('ru-RU', { timeStyle: 'short' }),
            }
          });
          item.Type = ( item.Type === 'category' ) ? 'Категория' : 'Подкатегория';
        });
      });
    },
  created(){
    this.watchScroll();
    const type = this.$route.params.settingType;
    if ( type ) {
      store.changeActiveItem(type);
    }
  }
})
</script>

<style>
  .title {
    margin-bottom: 30px;
  }
  /* table {
    position: relative;
    padding-top: 60px;
  }
  thead {
    position: fixed;
    margin-top: -60px;
    background: white;
  } */
  tbody {
    text-align:center;
    /* margin-top: 60px; */
  }
  tr {
    padding: 5px 0;
    /* height: 60px; */
  }
  /* thead {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
  } */
</style>

