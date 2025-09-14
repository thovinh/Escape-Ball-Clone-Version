const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        let gameState = {
            ball: { x: 100, y: 400, vx: 0, vy: 0, radius: 12, trail: [] },
            aiming: false,
            mouseStart: { x: 0, y: 0 },
            mouseEnd: { x: 0, y: 0 },
            bounces: 0,
            level: 1,
            gameWon: false,
            gameFailed: false,
            animationId: null,
            ballStopped: false
        };
        
        // Level configurations
        const levels = [
            {
                walls: [
                    { x1: 30, y1: 30, x2: 470, y2: 30 },   // top
                    { x1: 30, y1: 30, x2: 30, y2: 345 },   // left
                    { x1: 470, y1: 30, x2: 470, y2: 345 }, // right
                    { x1: 30, y1: 345, x2: 130, y2: 345 }, // bottom left
                    { x1: 320, y1: 345, x2: 470, y2: 345 }, // bottom right
                ],
                obstacles: [],
                target: { x: 150, y: 320, width: 120, height: 25 },
                start: { x: 60, y: 300 },
                targetBounces: 1
            },
            {
                walls: [
                    { x1: 30, y1: 30, x2: 470, y2: 30 },
                    { x1: 30, y1: 30, x2: 30, y2: 345 },
                    { x1: 470, y1: 30, x2: 470, y2: 345 },
                    { x1: 30, y1: 345, x2: 470, y2: 345 }
                ],
                obstacles: [],
                target: { x: 360, y: 50, width: 80, height: 40 },
                start: { x: 60, y: 300 },
                targetBounces: 2
            },
            {
                walls: [
                    { x1: 30, y1: 30, x2: 470, y2: 30 },
                    { x1: 30, y1: 30, x2: 30, y2: 345 },
                    { x1: 470, y1: 30, x2: 470, y2: 345 },
                    { x1: 30, y1: 345, x2: 470, y2: 345 }
                ],
                obstacles: [],
                target: { x: 360, y: 280, width: 80, height: 40 },
                start: { x: 60, y: 60 },
                targetBounces: 2
            },
            {
                walls: [
                    { x1: 30, y1: 30, x2: 470, y2: 30 },
                    { x1: 30, y1: 30, x2: 30, y2: 345 },
                    { x1: 470, y1: 30, x2: 470, y2: 345 },
                    { x1: 30, y1: 345, x2: 470, y2: 345 }
                ],
                obstacles: [
                    { x: 320, y: 220, width: 60, height: 15 }
                ],
                target: { x: 200, y: 280, width: 60, height: 40 },
                start: { x: 60, y: 60 },
                targetBounces: 4
            }
        ];
        
        function getCurrentLevel() {
            // Only allow levels 1-4, return level 4 if exceeded
            const levelIndex = Math.min(gameState.level - 1, levels.length - 1);
            return levels[levelIndex];
        }
        
        function resetBall() {
            const level = getCurrentLevel();
            gameState.ball.x = level.start.x;
            gameState.ball.y = level.start.y;
            gameState.ball.vx = 0;
            gameState.ball.vy = 0;
            gameState.ball.trail = [];
            gameState.bounces = 0;
            gameState.gameWon = false;
            gameState.gameFailed = false;
            gameState.ballStopped = false;
            updateUI();
            updateStatus();
        }
        
        function updateUI() {
            document.getElementById('levelNumber').textContent = gameState.level;
            document.getElementById('bounceCount').textContent = gameState.bounces;
            document.getElementById('targetBounces').textContent = getCurrentLevel().targetBounces;
            
            // Disable previous level button if at minimum level
            const prevLevelBtn = document.querySelector('button[onclick="previousLevel()"]');
            if (gameState.level <= 1) {
                prevLevelBtn.disabled = true;
                prevLevelBtn.style.opacity = '0.5';
            } else {
                prevLevelBtn.disabled = false;
                prevLevelBtn.style.opacity = '1';
            }
            
            // Disable next level button if not won or at maximum level
            const nextLevelBtn = document.querySelector('button[onclick="nextLevel()"]');
            if (gameState.level >= levels.length) {
                nextLevelBtn.disabled = true;
                nextLevelBtn.textContent = 'Hoàn thành!';
                nextLevelBtn.style.opacity = '0.5';
            } else if (!gameState.gameWon) {
                nextLevelBtn.disabled = true;
                nextLevelBtn.textContent = 'Chưa thắng!';
                nextLevelBtn.style.opacity = '0.5';
            } else {
                nextLevelBtn.disabled = false;
                nextLevelBtn.textContent = 'Next Level';
                nextLevelBtn.style.opacity = '1';
            }
        }
        
        function updateStatus() {
            const statusEl = document.getElementById('gameStatus');
            if (gameState.gameWon) {
                statusEl.textContent = 'THẮNG!';
                statusEl.className = 'status success';
            } else if (gameState.gameFailed) {
                statusEl.textContent = 'THUA!';
                statusEl.className = 'status fail';
            } else {
                statusEl.textContent = 'Kéo chuột để bắn bóng. Đạt đúng số bounces mục tiêu!';
                statusEl.className = 'status playing';
            }
        }
        
        function resetLevel() {
            if (gameState.animationId) {
                cancelAnimationFrame(gameState.animationId);
            }
            resetBall();
            gameLoop();
        }
        
        function previousLevel() {
            // Only allow previous level if not at minimum level
            if (gameState.level > 1) {
                gameState.level--;
                resetLevel();
            }
        }
        
        function nextLevel() {
            // Only allow next level if current level is won and not at maximum level
            if (gameState.gameWon && gameState.level < levels.length) {
                gameState.level++;
                resetLevel();
            } else if (gameState.level >= levels.length) {
                // Show completion message
                alert('Chúc mừng! Bạn đã hoàn thành tất cả các level!');
            } else {
                // Show message that level must be completed first
                alert('Bạn phải hoàn thành level hiện tại trước khi chuyển level!');
            }
        }
        
        // Mouse events
        canvas.addEventListener('mousedown', (e) => {
            if (gameState.gameWon || gameState.gameFailed) return;
            
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const dx = mouseX - gameState.ball.x;
            const dy = mouseY - gameState.ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance <= gameState.ball.radius + 10 && gameState.ball.vx === 0 && gameState.ball.vy === 0) {
                gameState.aiming = true;
                gameState.mouseStart.x = gameState.ball.x; // Start from ball center
                gameState.mouseStart.y = gameState.ball.y; // Start from ball center
                gameState.mouseEnd.x = mouseX;
                gameState.mouseEnd.y = mouseY;
            }
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!gameState.aiming) return;
            
            const rect = canvas.getBoundingClientRect();
            gameState.mouseEnd.x = e.clientX - rect.left;
            gameState.mouseEnd.y = e.clientY - rect.top;
        });
        
        canvas.addEventListener('mouseup', () => {
            if (!gameState.aiming) return;
            
            // Calculate direction from ball to mouse position
            const dx = gameState.mouseEnd.x - gameState.ball.x;
            const dy = gameState.mouseEnd.y - gameState.ball.y;
            
            // Calculate direction vector
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Fixed speed regardless of drag distance
            const fixedSpeed = 16;
            
            if (distance > 0) {
                // Normalize direction and apply fixed speed
                gameState.ball.vx = (dx / distance) * fixedSpeed;
                gameState.ball.vy = (dy / distance) * fixedSpeed;
            } else {
                // If no drag, give a small random direction
                gameState.ball.vx = 0;
                gameState.ball.vy = 0;
            }
            
            gameState.aiming = false;
            gameState.ball.trail = [];
            gameState.ballStopped = false;
        });
        
        function checkWallCollision(ball) {
            const level = getCurrentLevel();
            let collided = false;
            
            level.walls.forEach(wall => {
                // Check if wall is horizontal or vertical
                const isHorizontal = wall.y1 === wall.y2;
                const isVertical = wall.x1 === wall.x2;
                
                if (isHorizontal) {
                    // Horizontal wall
                    const wallY = wall.y1;
                    const wallLeft = Math.min(wall.x1, wall.x2);
                    const wallRight = Math.max(wall.x1, wall.x2);
                    
                    // Check if ball is close to wall horizontally and vertically
                    if (ball.x + ball.radius > wallLeft && 
                        ball.x - ball.radius < wallRight &&
                        Math.abs(ball.y - wallY) <= ball.radius) {
                        
                        // Determine which side of wall ball is on
                        if (ball.y < wallY && ball.vy > 0) {
                            // Ball below wall, moving up
                            ball.y = wallY - ball.radius;
                            ball.vy = -ball.vy;
                            collided = true;
                        } else if (ball.y > wallY && ball.vy < 0) {
                            // Ball above wall, moving down
                            ball.y = wallY + ball.radius;
                            ball.vy = -ball.vy;
                            collided = true;
                        }
                    }
                } else if (isVertical) {
                    // Vertical wall
                    const wallX = wall.x1;
                    const wallTop = Math.min(wall.y1, wall.y2);
                    const wallBottom = Math.max(wall.y1, wall.y2);
                    
                    // Check if ball is close to wall vertically and horizontally
                    if (ball.y + ball.radius > wallTop && 
                        ball.y - ball.radius < wallBottom &&
                        Math.abs(ball.x - wallX) <= ball.radius) {
                        
                        // Determine which side of wall ball is on
                        if (ball.x < wallX && ball.vx > 0) {
                            // Ball left of wall, moving right
                            ball.x = wallX - ball.radius;
                            ball.vx = -ball.vx;
                            collided = true;
                        } else if (ball.x > wallX && ball.vx < 0) {
                            // Ball right of wall, moving left
                            ball.x = wallX + ball.radius;
                            ball.vx = -ball.vx;
                            collided = true;
                        }
                    }
                }
            });
            
            if (collided) {
                gameState.bounces++;
                updateUI();
                
                // Check if bounces exceed target - instant fail
                const level = getCurrentLevel();
                if (gameState.bounces > level.targetBounces) {
                    gameState.gameFailed = true;
                    updateStatus();
                    updateUI();
                }
            }
        }
        
        function checkObstacleCollision(ball) {
            const level = getCurrentLevel();
            
            level.obstacles.forEach(obs => {
                // Check if ball is inside obstacle bounds
                const closestX = Math.max(obs.x, Math.min(ball.x, obs.x + obs.width));
                const closestY = Math.max(obs.y, Math.min(ball.y, obs.y + obs.height));
                
                const dx = ball.x - closestX;
                const dy = ball.y - closestY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance <= ball.radius) {
                    // Obstacles are deadly - instant fail
                    gameState.gameFailed = true;
                    updateStatus();
                    updateUI();
                }
            });
        }
        
        function checkTargetCollision(ball) {
            const level = getCurrentLevel();
            const target = level.target;
            
            if (ball.x + ball.radius > target.x && 
                ball.x - ball.radius < target.x + target.width &&
                ball.y + ball.radius > target.y && 
                ball.y - ball.radius < target.y + target.height) {
                
                // Only check win/lose if ball is actually moving (has been shot)
                const isMoving = Math.abs(ball.vx) > 0.1 || Math.abs(ball.vy) > 0.1;
                if (isMoving) {
                    // Check if bounces match target
                    if (gameState.bounces === level.targetBounces) {
                        gameState.gameWon = true;
                    } else {
                        gameState.gameFailed = true;
                    }
                    updateStatus();
                    updateUI();
                }
            }
        }
        
        function updatePhysics() {
            if (gameState.gameWon || gameState.gameFailed) return;
            
            const ball = gameState.ball;
            
            // Check if ball is moving
            const isMoving = Math.abs(ball.vx) > 0.1 || Math.abs(ball.vy) > 0.1;
            
            if (!isMoving && !gameState.ballStopped) {
                gameState.ballStopped = true;
                
                // Only check win/lose if ball has been shot (has velocity history)
                const hasBeenShot = gameState.ball.trail.length > 0;
                
                if (hasBeenShot) {
                    // Check if we're in target area with wrong bounce count
                    const level = getCurrentLevel();
                    const target = level.target;
                    const inTarget = ball.x + ball.radius > target.x && 
                                   ball.x - ball.radius < target.x + target.width &&
                                   ball.y + ball.radius > target.y && 
                                   ball.y - ball.radius < target.y + target.height;
                    
                    if (!inTarget || gameState.bounces !== level.targetBounces) {
                        gameState.gameFailed = true;
                        updateStatus();
                        updateUI();
                    }
                }
                return;
            }
            
            if (!isMoving) return;
            
            // Add to trail
            ball.trail.push({ x: ball.x, y: ball.y });
            if (ball.trail.length > 25) {
                ball.trail.shift();
            }
            
            // Update position
            ball.x += ball.vx;
            ball.y += ball.vy;
            
            // Apply friction
            ball.vx *= 0.995;
            ball.vy *= 0.995;
            
            // Stop if moving too slowly
            if (Math.abs(ball.vx) < 0.1 && Math.abs(ball.vy) < 0.1) {
                ball.vx = 0;
                ball.vy = 0;
            }
            
            // Check collisions
            checkWallCollision(ball);
            checkObstacleCollision(ball);
            checkTargetCollision(ball);
        }
        
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const level = getCurrentLevel();
            
            // Draw walls
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.beginPath();
            level.walls.forEach(wall => {
                ctx.moveTo(wall.x1, wall.y1);
                ctx.lineTo(wall.x2, wall.y2);
            });
            ctx.stroke();
            
            // Draw obstacles
            ctx.fillStyle = '#ff4757';
            ctx.strokeStyle = '#c44569';
            ctx.lineWidth = 2;
            level.obstacles.forEach(obs => {
                ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
                ctx.strokeRect(obs.x, obs.y, obs.width, obs.height);
            });
            
            // Draw target with larger size
            const target = level.target;
            const targetGradient = ctx.createLinearGradient(target.x, target.y, target.x, target.y + target.height);
            if (gameState.gameWon) {
                targetGradient.addColorStop(0, '#2ed573');
                targetGradient.addColorStop(1, '#1dd1a1');
            } else {
                targetGradient.addColorStop(0, '#7bed9f');
                targetGradient.addColorStop(1, '#5f27cd');
            }
            
            ctx.fillStyle = targetGradient;
            ctx.fillRect(target.x, target.y, target.width, target.height);
            
            // Target border
            ctx.strokeStyle = gameState.gameWon ? '#27ae60' : '#00d2d3';
            ctx.lineWidth = 3;
            ctx.strokeRect(target.x, target.y, target.width, target.height);
            
            // Draw ball trail
            if (gameState.ball.trail.length > 1) {
                ctx.strokeStyle = 'rgba(116, 185, 255, 0.6)';
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.beginPath();
                gameState.ball.trail.forEach((point, index) => {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                });
                ctx.stroke();
            }
            
            // Draw ball
            const ball = gameState.ball;
            const ballGradient = ctx.createRadialGradient(ball.x - 4, ball.y - 4, 0, ball.x, ball.y, ball.radius);
            ballGradient.addColorStop(0, '#74b9ff');
            ballGradient.addColorStop(1, '#0984e3');
            
            ctx.fillStyle = ballGradient;
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Ball border
            ctx.strokeStyle = '#0066cc';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw aiming line
            if (gameState.aiming) {
                ctx.strokeStyle = '#ffeaa7';
                ctx.lineWidth = 4;
                ctx.lineCap = 'round';
                ctx.setLineDash([8, 8]);
                ctx.beginPath();
                ctx.moveTo(gameState.ball.x, gameState.ball.y);
                ctx.lineTo(gameState.mouseEnd.x, gameState.mouseEnd.y);
                ctx.stroke();
                ctx.setLineDash([]);
                
                // Draw power indicator
                const dx = gameState.mouseStart.x - gameState.mouseEnd.x;
                const dy = gameState.mouseStart.y - gameState.mouseEnd.y;
                const power = Math.min(Math.sqrt(dx*dx + dy*dy) / 100, 1);
                
                ctx.fillStyle = `rgba(255, 234, 167, ${power})`;
                ctx.beginPath();
                ctx.arc(gameState.ball.x, gameState.ball.y, ball.radius + 5 + power * 10, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Draw win/lose overlay
            if (gameState.gameWon || gameState.gameFailed) {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.textAlign = 'center';
                if (gameState.gameWon) {
                    ctx.fillStyle = '#2ed573';
                    ctx.font = 'bold 48px Arial';
                    ctx.fillText('THẮNG!', canvas.width / 2, canvas.height / 2 - 20);
                    
                    ctx.fillStyle = '#fff';
                    ctx.font = '24px Arial';
                    ctx.fillText(`Đúng ${gameState.bounces} bounces!`, canvas.width / 2, canvas.height / 2 + 30);
                } else {
                    ctx.fillStyle = '#ff4757';
                    ctx.font = 'bold 48px Arial';
                    ctx.fillText('THUA!', canvas.width / 2, canvas.height / 2 - 20);
                    
                    ctx.fillStyle = '#fff';
                    ctx.font = '24px Arial';
                    ctx.fillText(`Thua!`, canvas.width / 2, canvas.height / 2 + 30);
                }
            }
        }
        
        function gameLoop() {
            updatePhysics();
            draw();
            gameState.animationId = requestAnimationFrame(gameLoop);
        }
        
        // Initialize game
        resetBall();
        gameLoop();