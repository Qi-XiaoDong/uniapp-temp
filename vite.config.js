import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({mode,command}) => {
	// 获取环境变量
	const env = loadEnv(mode, __dirname)
	const { VITE_APP_BASE_API,VITE_APP_BASE_FILE_API,VITE_APP_FILE_BASE_URL,VITE_APP_API } = env
	return {
		plugins: [uni()],
		server: {
		   proxy: {
			   [VITE_APP_BASE_API]: {
				   target: VITE_APP_API,
				   changeOrigin: true,
				   rewrite: (p) => p.replace(/^\/dev-api/, '')
			   },
			   [VITE_APP_BASE_FILE_API]: {
				   target: VITE_APP_FILE_BASE_URL,
				   changeOrigin: true, // 允许跨域
				   rewrite: (p) => p.replace(/^\/dev-file-api/, '')
			   }
			}
		},
	}
});

