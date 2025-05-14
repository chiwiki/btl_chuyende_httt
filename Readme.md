# 🧠 Blog NSFW Detection with NSFWJS

## 📌 Giới thiệu

Đây là một hệ thống kiểm duyệt ảnh phản cảm tích hợp vào trang web viết blog sử dụng thư viện [NSFWJS](https://github.com/infinitered/nsfwjs). Ứng dụng cho phép người dùng đăng ký tài khoản, viết blog, chèn hình ảnh và sử dụng mô hình học máy chạy trên trình duyệt để phát hiện các nội dung phản cảm không phù hợp.

Nếu phát hiện nội dung nhạy cảm, hệ thống sẽ:

- **Gắn cờ bài viết (`isSensitive = true`)**
- **Cảnh báo người dùng trước khi đăng**
- **Cảnh báo người đọc trước khi xem nội dung**

## 🚀 Cài đặt

### 1. Clone dự án

```bash
git https://github.com/chiwiki/btl_chuyende_httt.git
cd btl_chuyende_httt
```

### 2. Chạy backend

- Tạo biến môi trường

```bash
cp .env.example .env
```

- Nếu chạy lần đầu thì tải thư viện node_modules vào trong dự án

```bash
npm i
```

- Khởi tạo ứng dụng

```bash
npm start
```

### 2. Chạy frontend

- Tạo biến môi trường

```bash
cp .env.example .env
```

- Nếu chạy lần đầu thì tải thư viện node_modules vào trong dự án

```bash
npm i
```

- Khởi tạo ứng dụng

```bash
npm run dev
```
