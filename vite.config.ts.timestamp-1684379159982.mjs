// vite.config.ts
import { defineConfig } from "file:///G:/zhuyiyun/keda2/node_modules/vite/dist/node/index.js";
import vue from "file:///G:/zhuyiyun/keda2/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import * as path from "path";
import Components from "file:///G:/zhuyiyun/keda2/node_modules/unplugin-vue-components/dist/vite.mjs";
import { AntDesignVueResolver } from "file:///G:/zhuyiyun/keda2/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "G:\\zhuyiyun\\keda2";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ],
  resolve: {
    //设置别名
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src")
    }
  },
  server: {
    port: 9999,
    host: "0.0.0.0"
  },
  base: "/view"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFx6aHV5aXl1blxcXFxrZWRhMlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRzpcXFxcemh1eWl5dW5cXFxca2VkYTJcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0c6L3podXlpeXVuL2tlZGEyL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgeyBBbnREZXNpZ25WdWVSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3Z1ZSgpLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgcmVzb2x2ZXJzOiBbQW50RGVzaWduVnVlUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICAvL1x1OEJCRVx1N0Y2RVx1NTIyQlx1NTQwRFxuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogOTk5OSxcbiAgICBob3N0OiBcIjAuMC4wLjBcIlxuICB9LFxuICBiYXNlOlwiL3ZpZXdcIixcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJPLFNBQVMsb0JBQW9CO0FBQ3hRLE9BQU8sU0FBUztBQUNoQixZQUFZLFVBQVU7QUFDdEIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyw0QkFBNEI7QUFKckMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQUMsSUFBSTtBQUFBLElBQ1osV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLHFCQUFxQixDQUFDO0FBQUEsSUFDcEMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQTtBQUFBLElBRVAsT0FBTztBQUFBLE1BQ0wsS0FBVSxhQUFRLGtDQUFXLEtBQUs7QUFBQSxJQUNwQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxNQUFLO0FBQ1AsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
