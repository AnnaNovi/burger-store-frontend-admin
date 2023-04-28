<template>
  <v-select
    :label="schema[field]?.['name']"
    v-model="form[field]"
    clearable variant="outlined"
    no-data-text="Нет данных"
    :items="items"
    item-title="Name"
    item-value="ID"
  ></v-select>
    <!-- @input="vuelidate.form[field].$touch()"
    @blur="vuelidate.form[field].$touch()"
    @change="vuelidate.form[field]" -->
</template>

<script lang="ts">
  import { mapActions } from "pinia";
  import { defineComponent, PropType } from "vue";
  import { useSettingsStore } from "../../stores/settings";
  import { TSchema } from '../../types';

  export default defineComponent({
    name: 'InputSelect',
    props: {
      schema: {
        type: Object as PropType<TSchema>,
        required: true
      },
      form: {
        type: Object,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      vuelidate: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        items: [],
      }
    },
    methods: {
      ...mapActions(useSettingsStore, ['getSelectItems$']),
    },
    created() {
      const key = this.schema[this.field].select_key;
      this.getSelectItems$( key ).subscribe(value => {
        this.items = [...value];
      });
    },
  })
</script>