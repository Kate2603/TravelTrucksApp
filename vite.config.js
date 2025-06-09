import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Вказуємо базовий шлях до кореня (для Vercel і локальної розробки)
  build: {
    outDir: "dist", // Папка для збірки (за замовчуванням dist, можна змінити)
    sourcemap: true, // Для зручності дебагу (можна вимкнути в продакшені)
  },
  server: {
    open: true, // Автоматично відкриває браузер при запуску dev-сервера
  },
});
