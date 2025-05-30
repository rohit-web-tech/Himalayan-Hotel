import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/Theme.context.tsx";
import { GlobalContextProvider } from "./contexts/GlobalContext.tsx";
import { Provider } from "react-redux"
import store from './store/store.ts';

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <GlobalContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </GlobalContextProvider>
  </ThemeProvider>
);
