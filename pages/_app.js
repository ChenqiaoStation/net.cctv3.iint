import "antd/dist/antd.css";
import { useEffect } from "react";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const MyApp = ({ Component, pageProps }) => {
  console.log("🐞 ~ file: _app.js ~ line 5 ~ MyApp ~ pageProps", pageProps);
  useEffect(() => {}, []);
  return <Component {...pageProps} />;
};

export default MyApp;
