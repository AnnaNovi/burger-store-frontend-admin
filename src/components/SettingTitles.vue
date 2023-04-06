<template>
  <div>
    <v-container>
      <v-row 
        class="ma-2"
        v-for="item in items" 
        :key="item.entkey"
      >
        <v-btn block @click="openSettingList(item)">{{ item.name }}</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSettingsStore } from '../stores/settings'
const store = useSettingsStore();

export default defineComponent({
  name: 'SettingTitles',
  data() {
    return {
      items: store.items,
      titleInitial: 'Настройки'
    }
  },
  methods: {
    openSettingList( item: { name: string, entkey: string } ) {
      this.$router.push(`/settings/${item.entkey}`)
    }
  },
  created() {
    store.changeActiveList();
  }
})
</script>

<style>
  .title {
    margin-bottom: 30px;
  }
</style>
