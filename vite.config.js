// https://vitejs.dev/config/
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ command, mode }) => {
  const base = {
    plugins: [vue()],
  };

  /**
   * build 명령일 경우, base 설정만 사용
   */
  if (command === "build") {
    return base;
  }

  /**
   * 개발 환경에서는 proxy 설정 포함
   */
  const env = loadEnv(mode, process.cwd(), "");
  return {
    ...base,
    server: {
      proxy: {
        "/proxy": {
          target: env.VITE_FAKE_STORE_API, // .env 파일에서 VITE_FAKE_STORE_API 값 사용
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/proxy/, ""), // /proxy 제거
          secure: false,
          ws: true,
        },
      },
    },
  };
});
