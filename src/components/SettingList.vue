<template>
  <div> 
    <!-- icon="mdi-plus" size="large" -->
    <v-btn block color="secondary" variant="outlined" @click="addSettingItem()">
      <v-icon color="secondary" icon="mdi-plus" size="large"></v-icon>
      Добавить
    </v-btn>
    <v-table v-if="items.length">
      <thead>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
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
      console.warn(this.$router, this.$router.currentRoute.value.path);
      this.$router.push(`${this.$router.currentRoute.value.path}/new`)
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
        item.Type = ( item.Type === 'category' ) ? 'Категория' : 'Подкатегория';
      });
    });
  },
})
</script>

<style>
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
    background: #03DAC6;
  }
  table {
    margin-top: 20px;
    border: 2px solid #03DAC6;
  }
</style>

