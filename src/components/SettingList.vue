<template>
  <div>
    <v-container>
      <v-row 
        class="ma-2"
        v-for="item in items" 
        :key="item.entkey"
      >
        <v-btn block @click="openSettingItem(item)">{{ item.name }}</v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useSettingsStore } from '../stores/settings'
const store = useSettingsStore();

export default defineComponent({
  name: 'SettingList',
  data() {
    return {
      items: store.items,
      titleInitial: 'Настройки'
    }
  },
  methods: {
    openSettingItem( item: { name: string, entkey: string } ) {
      this.$router.push(`/settings/${item.entkey}`)
    }
  },
  created() {
    store.changeActiveItem();
  }
})
</script>

<style>
  .title {
    margin-bottom: 30px;
  }
</style>
