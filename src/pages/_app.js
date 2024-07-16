import { createStore, Provider } from "jotai";

const myStore = createStore();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={myStore}>
      <Component {...pageProps} />
    </Provider>
  );
}
