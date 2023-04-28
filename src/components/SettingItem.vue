<template>
  <div class="formBlock">
    <v-form ref="form">
      <template v-for="field in schema_order" :key="field">
        <template v-if="schema[field]">
          <template v-if="schema[field]?.['type'] === 'string'">
            <InputString :form="form" :field="field"
              :vuelidate="v$" :schema="schema"
            ></InputString>
          </template>
          <template v-if="schema[field]?.['type'] === 'textarea'">
            <v-textarea
              :label="schema[field]?.['name']"
              v-model="form[field]"
              clearable variant="outlined"
              clear-icon="mdi-close-circle"
            ></v-textarea>
          </template>
          <template v-if="['select.req', 'select.dict'].includes(schema[field]?.['type'])">
            <InputSelect :form="form" :field="field"
              :vuelidate="v$" :schema="schema"
            ></InputSelect>
          </template>
        </template>
      </template>
      <v-row justify="end" align="center">
        <v-col cols="auto">
          <v-btn color="secondary" variant="tonal" @click="clearForm()">Очистить</v-btn>
        </v-col>
        <v-col cols="auto">
          <v-btn block color="secondary" variant="elevated" @click="saveForm()">Сохранить</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { useSettingsStore } from '../stores/settings';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';

const store = useSettingsStore();

export default defineComponent({
  name: 'SettingItem',
  data() {
    return {
      schema: {},
      schema_order: [],
      form: {},
      form_validation: {},
    }
  },
  validations() {
    return {
      form: { ...this.form_validation }
    }
  },
  methods: {
    clearForm() {
      this.v$.value.$reset()
      for (const [key, value] of Object.entries(this.initialState)) {
        this.state[key] = value
      }
    },
    async saveForm() {
      const isFormCorrect = await this.v$.$validate();
      if ( !isFormCorrect ) return
      store.saveData(this.form);
      console.warn(isFormCorrect);
    },
  },
  async setup () {
    return { v$: useVuelidate() }
    // const initialState = { name: '' };
    // const rules = {};
    // const state = reactive({});
    // const v$ = useVuelidate(rules, state);
    // return { state, v$ };
    // return await store.getSchema$().subscribe(result => {
    //   const { schema, schema_order } = result;
    //   const initialState = {};
    //   const rules = {};

    //   schema_order.forEach(field => {
    //     initialState[field] = null;
    //     rules[field] = { required };
    //   });
    //   const state = reactive({
    //     ...initialState,
    //   })
    //   const v$ = useVuelidate(rules, state);
    //   // function clear () {
    //   //   v$.value.$reset()

    //   //   for (const [key, value] of Object.entries(initialState)) {
    //   //     state[key] = value
    //   //   }
    //   // };

    //   return { state, schema_order, schema, v$ }

    // });
    // // return { v$: useVuelidate() };
  },
  created(){
    const id = this.$route.params.settingId;
    const type = this.$route.params.settingType;
    store.changeActiveItem(id);
    store.changeActiveList(type);
  },
  beforeMount() {
    store.getSchema$().subscribe(result => {
      const { schema, schema_order } = result;
      this.$data.schema = schema;
      this.$data.schema_order = schema_order;
      for(let field in schema) {
        this.$data.form[field] = null;
        if(schema[field].modality === 'required') {
          this.$data.form_validation[field] = { required };
        }
      }
    });
  },
})
</script>

<style lang="scss">
  .title {
    margin-bottom: 30px;
  }
  .formBlock {
    display: flex;
    justify-content: center;
  }
  form {
    width: 600px;
    padding: 20px;
    border: 2px solid $secondary-color;
  }
</style>

