<template>
  <div> 
    <!-- icon="mdi-plus" size="large" -->
    <v-btn block color="secondary" variant="outlined" @click="addSettingItem()">
      <v-icon color="secondary" icon="mdi-plus" size="large"></v-icon>
      Добавить
    </v-btn>
    <v-table v-if="items.length">
      <thead id="tableHead" ref="tableHead">
        <tr>
          <th 
            style="text-align:center !important;"
            v-for="(header, index) of headers"
            :key="index"
          >{{ header.name }}</th>
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
            <template v-if="['createdAt', 'updatedAt'].includes(header.key)">
              <p>{{ item[header.key].time }}</p>
              <p>{{ item[header.key].date }}</p>
            </template>
            <p v-else>{{ item[header.key] }}</p>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div v-else class="emptyItems"><h2>Нет данных</h2></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from "vue";
import { useSettingsStore } from '../stores/settings';
const store = useSettingsStore();

export default defineComponent({
  name: 'SettingList',
  data() {
    return {
      itemsPerPage: 20,
      headers: [] as Array<{ key: string, name: string }>,
      items: [] as Array<any>,
      tableHeight: 0,
    }
  },
  computed: {
    title() {
      return this.titleInitial + this.$route.params['settingType'];
    },
  },
  methods: {
    addSettingItem() {
      this.$router.push(`${this.$router.currentRoute.value.path}/new`)
    },
    toggleFixedTHead() {
      // https://habr.com/ru/articles/494670/
      const tableHead = document.querySelector('#tableHead');
      const options = {
        root: document.querySelector('#appHeader'),
        threshold: 0
      };
      const callback = (entries, observer) => {
        console.warn('HIHIHI', entries, observer);
      }
      const observer = new IntersectionObserver(callback, options);
      // observer.observe(tableHead);
      // observer.observe(this.$refs.tableHead);
      // console.warn(this.$refs.tableHead);

      console.warn(this.$refs.tableHead, tableHead);
    }
  },
  created(){
    const type = this.$route.params.settingType;
    if ( type ) {
      store.changeActiveList(type);
    }
  },
  beforeMount() {
    // this.loadItems({ page: 1, itemsPerPage: 5, sortBy: [] })
    this.tableHeight = window.innerHeight - 220;
    store.getData$().subscribe(value => {
      this.headers = [...value.meta.tableTitles];
      this.items = [...value.data];
      this.items.forEach(item => {
        ['createdAt', 'updatedAt'].forEach(field => {
          item[field] = {
            date: new Date(item[field]).toLocaleDateString('ru-RU'),
            time: new Date(item[field]).toLocaleTimeString('ru-RU', { timeStyle: 'short' }),
          }
        });
        // item.Type = ( item.Type === 'category' ) ? 'Категория' : 'Подкатегория';
      });
    });
  },
  mounted() {
    // this.$nextTick(() => { this.toggleFixedTHead(); });
  }
})
</script>

<style lang="scss">
  .title {
    margin-bottom: 30px;
  }
  tbody {
    text-align:center;
    height: 100%;
  }
  tr {
    padding: 5px 0;
  }
  tr th {
    background: $secondary-color;
  }
  table {
    margin-top: 20px;
    border: 2px solid $secondary-color;
  }
  .emptyItems {
    text-align: center;
    opacity: 0.3;
    margin-top: 40px;
    text-transform: uppercase;
  }
</style>

