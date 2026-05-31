# LTWNC

Đồ án học phần LTWNC (Lập trình Web nâng cao) - REST API quản lý sinh viên.

## Công nghệ sử dụng

- **Runtime:** Node.js
- **Ngôn ngữ:** TypeScript
- **Framework:** Express 5
- **Database:** MySQL (via `mysql2`)
- **Dev:** `tsx` (TypeScript execution), `tsc` (type-check & build)

## Yêu cầu

- Node.js 18+
- MySQL server
- npm

## Cài đặt

```bash
# 1. Clone repo
git clone <repo-url>
cd LTWNC

# 2. Cài dependencies
npm install

# 3. Tạo database
mysql -u root -p < src/data/STUDENTREG.sql

# 4. Cấu hình môi trường
cp .env.example .env
# Sửa file .env cho phù hợp với cấu hình MySQL của bạn

# 5. Chạy dev
npm run dev
```

Server chạy tại `http://localhost:3000`.

## Scripts

| Lệnh | Mô tả |
|---|---|
| `npm run dev` | Chạy ở chế độ development (hot-reload) |
| `npm run build` | Build TypeScript sang JavaScript |
| `npm run start` | Chạy bản production build |
| `npm run typecheck` | Kiểm tra type mà không build |

## API Endpoints

### Student (`/api/student`)

| Method | Path | Mô tả |
|---|---|---|
| GET | `/api/student` | Lấy danh sách tất cả sinh viên |
| GET | `/api/student/:id` | Lấy thông tin sinh viên theo SID |
| POST | `/api/student` | Thêm sinh viên mới |
| PUT | `/api/student/:id` | Cập nhật thông tin sinh viên |
| DELETE | `/api/student/:id` | Xóa sinh viên |