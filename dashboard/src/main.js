import {createApp} from "vue";
import DashboardApp from "./components/Dashboard.vue";

const mount = (element) => {
  const app = createApp(DashboardApp);
  app.mount(element);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard-dev-root');

  if (devRoot) {
    mount(devRoot);
  }
}

export {mount};
