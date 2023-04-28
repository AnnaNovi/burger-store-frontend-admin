import type { App } from 'vue';
import InputString from '../components/ui/InputString.vue';
import InputSelect from '../components/ui/InputSelect.vue';

export function registerComponents(app: App) {
  app.component('InputString', InputString).component('InputSelect', InputSelect);
}
