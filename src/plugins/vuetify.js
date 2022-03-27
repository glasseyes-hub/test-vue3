// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const aztecTheme = {
  dark: false,
  colors: {
    background: "#eaeff5",
    border: "#e3e6eb",
    "border-hover": "#d3d3d4",
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "aztecTheme",
    themes: {
      aztecTheme,
    },
  },
});
