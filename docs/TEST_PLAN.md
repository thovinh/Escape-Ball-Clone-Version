# 🎮 Escape Ball Game - Test Project Documentation

## 📌 Thông Tin Dự Án
- **Tên Game:** Escape Ball Game  
- **Phiên bản:** 1.0  
- **Nền tảng:** Web Browser (HTML5 Canvas)  
- **Ngôn ngữ:** JavaScript, HTML5, CSS3  
- **Thể loại:** Physics Puzzle Game  

---

## 🕹️ Game Overview

### Mô tả Game
Escape Ball Game là một trò chơi puzzle vật lý nơi người chơi phải điều khiển một quả bóng để đạt được vùng mục tiêu (**target zone**) với số lần **bounce** chính xác theo yêu cầu của từng level.  

### Core Mechanics
#### ⚪ Ball Physics System
- Quả bóng di chuyển theo quy luật vật lý thực tế  
- Tốc độ cố định khi bắn 

#### 🎯 Aiming & Shooting
- Kéo chuột từ quả bóng để nhắm  
- Hiển thị đường ngắm 
- Tốc độ bắn **không phụ thuộc** vào khoảng cách kéo  

#### 🧱 Collision Detection
- Va chạm với **tường (walls)** → bóng bật lại  
- Va chạm với **chướng ngại vật (obstacles)** → game over  
- Vào **vùng target** → kiểm tra điều kiện thắng/thua  

#### 🔢 Bounce Counting System
- Đếm số lần bóng bounce với tường  
- So sánh với **target bounces** của level  
- Thắng khi số bounce = target, thua khi khác  

---

## 🧩 Game Elements
- **Ball (Quả bóng)**  
  - Màu: Xanh dương
  
- **Walls (Tường)**  
  - Màu trắng, độ dày 4px  
  - Tạo khung game và vật cản  

- **Target Zone (Vùng mục tiêu)**  
  - Màu xanh lá 
  - Kích thước khác nhau theo level  

- **Obstacles (Chướng ngại vật)**  
  - Màu đỏ  
  - Va chạm = thua ngay lập tức  

- **UI Elements**  
  - Level counter  
  - Bounce counter (current/target)  
  - Status message  
  - Control buttons  

---

## 🧪 Test Plan

### 🎯 Test Objectives
#### 1. Functional Testing
- Kiểm tra tất cả chức năng game hoạt động đúng  
- Đảm bảo game logic chính xác  
- Xác minh điều kiện thắng/thua  

#### 2. Physics Testing
- Kiểm tra hệ thống vật lý bóng  
- Xác minh **collision detection**  
- Test **bounce mechanics**  

#### 3. UI/UX Testing
- Kiểm tra giao diện người dùng  
- Test **responsive design**  
- Xác minh **feedback** cho người chơi  

#### 4. Performance Testing
- Kiểm tra hiệu suất animation  
- Test **frame rate stability**  
- Kiểm tra **memory usage optimization**  

---

### 📝 Test Scope
**In Scope:**  
- Core gameplay mechanics  
- All game levels (1-4)  
- UI interactions  
- Physics simulation  
- Win/lose conditions  
- Level progression system  
- Mouse controls  
- Visual effects  

**Out of Scope:**  
- Mobile touch controls  
- Audio systems  
- Multiplayer features  
- Save/load functionality  
- Achievements system  

---

### 🔍 Test Approach
1. **Unit Testing**  
   - Test individual functions  
   - Mock dependencies  
   - Validate calculations  

2. **Integration Testing**  
   - Test component interactions  
   - Canvas rendering  
   - Event handling  

3. **System Testing**  
   - End-to-end gameplay  
   - Complete level testing  
   - Cross-browser compatibility  

4. **User Acceptance Testing**  
   - Gameplay experience  
   - Difficulty progression  
   - User interface usability  

---

### 💻 Test Environment
**Browser Support:**  
- Chrome 90+  
- Edge 90+  

**Hardware Requirements:**  
- Minimum: 2GB RAM  
- Recommended: 4GB RAM  
- GPU: Hardware acceleration support  

**Screen Resolutions:**  
- 1920x1080 
## 📂 Test Cases

Xem toàn bộ danh sách **Test Cases** tại Google Sheets theo link sau:

[Test Cases – Google Sheets](https://docs.google.com/spreadsheets/d/1n4dtkeyrAfuXmmktD5SLCraeopH18Z3TM8GFSEQZ0HY/edit?usp=sharing)

---

