# 🎮 Escape Ball
## 🌐 Play Online
Bạn có thể trải nghiệm trò chơi ngay trên web tại địa chỉ sau:  
[Escape Ball Game Online](https://thovinh.github.io/thovinh-Escape-Ball-Game/)

## 📌 Project Information
- **Game Name:** Escape Ball  
- **Version:** v1.0  
- **Platform:** Web Browser (HTML5/Canvas)  
- **Game Type:** Puzzle Physics-based  
- **Initial Test Date:** September 13, 2025  
- **Tester:** Võ Hồng Thịnh  
- **Estimated Testing Duration:** 2-3 days  

---

## 🕹️ Game Overview
**Escape Ball** là trò chơi puzzle vật lý, nơi người chơi điều khiển một quả bóng và dẫn nó vào **vùng mục tiêu màu xanh**.  
Thử thách nằm ở việc đưa bóng chạm đúng số lần bật tường cần thiết trước khi tới đích.  

- **Objective:** Đưa bóng vào vùng xanh với số lần nảy chính xác.  
- **Controls:** Kéo và thả chuột để phóng bóng (tốc độ cố định).  
- **Win Condition:** Bóng vào vùng xanh + số lần nảy = số lần yêu cầu.  
- **Lose Condition:** Sai số lần nảy hoặc bóng dừng ngoài vùng xanh.  

---

## 🔑 Core Mechanics
- **Ball:** Bóng vật lý có hiệu ứng vệt sáng.  
- **Walls:** Tường trắng, bóng sẽ nảy lại.  
- **Obstacles:** Vật cản đỏ (không thể vượt qua).  
- **Target Zone:** Khu vực màu xanh – nơi bóng cần đến.  
- **UI:** Hiển thị số level, số lần nảy hiện tại và số lần nảy yêu cầu.  

---

## 📈 Levels
- Có **4 level** với độ khó tăng dần.  
- Số lần nảy mục tiêu dao động **1 → 5**.  

---

## ✅ Test Plan
### 🎯 Test Objectives
- **Functionality:** Đảm bảo cơ chế gameplay hoạt động đúng.  
- **UI/UX:** Giao diện dễ sử dụng, trực quan.  
- **Performance:** Game chạy mượt, không giật lag.  
- **Compatibility:** Hoạt động tốt trên Chrome.  
- **Balance:** Độ khó hợp lý, cuốn hút.  

### 🔍 Test Scope
**In Scope:**  
- Gameplay, thắng/thua, vật lý bóng.  
- UI, level progression, hiệu ứng.  
- Tương thích trên Chrome 120+.  

**Out of Scope:**  
- Mobile responsiveness.  
- Save/Load system.  
- Âm thanh.  

### 🧪 Test Approach
- **Manual Testing:** Kiểm thử chức năng, UI/UX, exploratory testing.  
- **Cross-browser Testing:** Tập trung Chrome.  
- **Performance Testing:** Quan sát FPS & bộ nhớ.  
- **Usability Testing:** Đánh giá trải nghiệm người chơi.  

---

## 🖥️ Test Environment
- **OS:** Windows 10/11  
- **Browser:** Chrome 120+  
- **Resolution:** 1920x1080 (primary)  
- **Hardware:** Desktop/Laptop tầm trung  

---

## 🚀 How to Run
1. Clone project:  
   ```bash
   git clone https://github.com/thovinh/thovinh-Escape-Ball-Game.git
2. 
