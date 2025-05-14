# 🧠 Blog NSFW Detection with NSFWJS

👋 **Xin chào đến với nhóm 18 lớp 1 môn chuyên đề hệ thống thông tin!**  
Đây là sản phẩm thực hành của nhóm trong quá trình tìm hiểu và triển khai mô hình kiểm duyệt ảnh phản cảm bằng **NSFWJS** vào hệ thống viết blog.

## 📌 Giới thiệu

Đây là một hệ thống kiểm duyệt ảnh phản cảm tích hợp vào trang web viết blog sử dụng thư viện [NSFWJS](https://github.com/infinitered/nsfwjs). Ứng dụng cho phép người dùng đăng ký tài khoản, viết blog, chèn hình ảnh và sử dụng mô hình học máy chạy trên trình duyệt để phát hiện các nội dung phản cảm không phù hợp.

Nếu phát hiện nội dung nhạy cảm, hệ thống sẽ:

- **Gắn cờ bài viết (`isSensitive = true`)**
- **Cảnh báo người dùng trước khi đăng**
- **Cảnh báo người đọc trước khi xem nội dung**

## Video demo

<img src='img/demo.gif' width=600>

## 🚀 Cài đặt

### 1. Clone dự án

```bash
mkdir btl
git clone https://github.com/chiwiki/btl_chuyende_httt.git
cd btl_chuyende_httt
```

### 2. Chạy backend

- Chuyển đến thư mục backend

```bash
cd backend
```

- Tạo biến môi trường

```bash
cp .env.example .env
```

- Tạo file service account

```bash
touch serviceAccount.json
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

- Chuyển đến thư mục frontend

```bash
cd frontend
```

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
