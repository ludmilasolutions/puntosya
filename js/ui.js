// js/ui.js
export function renderLogin() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="auth-container">
            <h1>Bienvenido a Puntoya</h1>
            <p>Accede para gestionar tus puntos y premios.</p>
            <div class="input-group">
                <label for="email">Email</label>
            <form id="login-form">
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="tu@email.com">
                </div>
                <div class="input-group">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" placeholder="••••••••">
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Entrar</button>
            </form>
            <div style="text-align: center; margin-top: 1.5rem; color: var(--text-sec); font-size: 0.9rem;">
                <p>¿O prefieres usar social?</p>
                <button id="google-login-btn" class="btn" style="width: 100%; margin-top: 0.75rem; border: 1.5px solid #ddd; display: flex; align-items: center; justify-content: center; gap: 0.5rem; background: white;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" width="18">
                    Continuar con Google
                </button>
            </div>
            <p style="text-align: center; margin-top: 1.5rem; color: var(--text-sec);">
                ¿No tienes cuenta? <a href="#/register" style="color: var(--primary); font-weight: 700;">Regístrate</a>
            </p>
        </div>
    `;
    
    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            // Assuming 'login' function is defined elsewhere and handles authentication
            // await login(email, password); 
            console.log('Login attempt with:', email, password);
            alert('Login functionality not yet implemented. Check console.');
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });

    document.getElementById('google-login-btn').addEventListener('click', async () => {
        try {
            // Assuming 'loginWithGoogle' function is defined elsewhere and handles Google authentication
            // await loginWithGoogle();
            console.log('Google login attempt');
            alert('Google login functionality not yet implemented. Check console.');
        } catch (err) {
            alert('Error: ' + err.message);
        }
    });
}

export function renderRegister() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="auth-container">
            <h1>Regístrate</h1>
            <p>Únete a la red universal de puntos.</p>
            <div class="input-group">
                <label for="reg-name">Nombre</label>
                <input type="text" id="reg-name" placeholder="Tu nombre">
            </div>
            <div class="input-group">
                <label for="reg-email">Email</label>
                <input type="email" id="reg-email" placeholder="tu@email.com">
            </div>
            <div class="input-group">
                <label for="reg-password">Contraseña</label>
                <input type="password" id="reg-password" placeholder="••••••••">
            </div>
            <button id="register-btn" class="btn btn-primary">Crear Cuenta</button>
            <p style="text-align: center;">¿Ya tienes cuenta? <a href="#/login">Inicia Sesión</a></p>
        </div>
    `;
}

export function renderHome(user) {
    const main = document.getElementById('main-content');
    
    // Mock data for initial empty state or example
    const userName = user.user_metadata?.nombre || user.email.split('@')[0];
    const totalPoints = 0;
    const currentLevel = "Standard";
    const nextLevelPoints = 500;
    
    main.innerHTML = `
        <div class="home-container">
            <h2>Hola, ${userName} 👋</h2>
            
            <div class="points-card">
                <p>Tu acumulado total</p>
                <h1>${totalPoints} <span style="font-size: 1rem; font-weight: 600;">pts</span></h1>
                <div class="level-label">${currentLevel}</div>
                
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${(totalPoints / nextLevelPoints) * 100}%"></div>
                </div>
                <p style="font-size: 0.75rem; margin-top: 0.5rem; opacity: 0.9;">
                    Faltan ${nextLevelPoints - totalPoints} puntos para Silver
                </p>
            </div>

            <div class="level-strip">
                <div class="level-card active">
                    <span style="font-size: 1.5rem;">🌱</span>
                    <p style="font-weight: 700;">Standard</p>
                    <p style="font-size: 0.65rem; color: var(--text-sec);">0 pts</p>
                </div>
                <div class="level-card">
                    <span style="font-size: 1.5rem;">🥈</span>
                    <p style="font-weight: 700;">Silver</p>
                    <p style="font-size: 0.65rem; color: var(--text-sec);">500 pts</p>
                </div>
                <div class="level-card">
                    <span style="font-size: 1.5rem;">🥇</span>
                    <p style="font-weight: 700;">Gold</p>
                    <p style="font-size: 0.65rem; color: var(--text-sec);">1.000 pts</p>
                </div>
                <div class="level-card">
                    <span style="font-size: 1.5rem;">💎</span>
                    <p style="font-weight: 700;">Black</p>
                    <p style="font-size: 0.65rem; color: var(--text-sec);">3.500 pts</p>
                </div>
            </div>

            <h3>Premios disponibles</h3>
            <div class="reward-scroll">
                <div class="reward-card">
                    <div class="reward-img">☕ <div class="reward-badge badge-fisico">Físico</div></div>
                    <div style="padding: 0.75rem;">
                        <h4 style="font-size: 0.85rem;">Café Gratis</h4>
                        <p style="font-size: 0.7rem; color: var(--text-sec); font-weight: 700;">100 pts</p>
                    </div>
                </div>
                <div class="reward-card">
                    <div class="reward-img">🏷️ <div class="reward-badge badge-descuento">Descuento</div></div>
                    <div style="padding: 0.75rem;">
                        <h4 style="font-size: 0.85rem;">20% Descuento</h4>
                        <p style="font-size: 0.7rem; color: var(--text-sec); font-weight: 700;">250 pts</p>
                    </div>
                </div>
                <div class="reward-card">
                    <div class="reward-img">🎭 <div class="reward-badge badge-experiencia">Experiencia</div></div>
                    <div style="padding: 0.75rem;">
                        <h4 style="font-size: 0.85rem;">Cine 2x1</h4>
                        <p style="font-size: 0.7rem; color: var(--text-sec); font-weight: 700;">500 pts</p>
                    </div>
                </div>
            </div>

            <h3>Mis Comercios</h3>
            <div class="card" style="text-align: center; border-style: dashed;">
                <p style="color: var(--text-sec);">Aún no tienes puntos en ningún comercio.</p>
                <button class="btn btn-primary" style="margin-top: 1rem; width: 100%;">Explorar Comercios</button>
            </div>

            <h3>Actividad reciente</h3>
            <div class="card">
                <div class="history-item">
                    <div class="history-icon">🏪</div>
                    <div class="history-info">
                        <h4>Bienvenido a Puntoya</h4>
                        <p>Hace un momento</p>
                    </div>
                    <div class="history-points positive">+0</div>
                </div>
            </div>
        </div>

        <div id="show-qr" class="qr-fab">
            <span>QR</span>
        </div>
    `;

    // Render Header & Navbar
    renderHeader(user);
    renderNav();

    document.getElementById('show-qr').addEventListener('click', () => {
        alert('Tu código QR: ' + user.id);
    });
}

export function renderExplore(user) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="explore-container">
            <h2>Explorar Comercios</h2>
            <div class="input-group" style="margin-bottom: 1.5rem;">
                <input type="text" id="search-merchants" placeholder="Buscar por nombre o rubro...">
            </div>

            <div class="merchant-list">
                <div class="card merchant-card" onclick="location.hash='/merchant/1'">
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <div class="history-icon" style="background: #fdf2f8; color: #db2777;">🍰</div>
                        <div style="flex: 1;">
                            <h4 style="margin: 0;">Pastelería Dulce</h4>
                            <p style="font-size: 0.75rem; color: var(--text-sec);">Gastronomía • A 500m</p>
                        </div>
                        <div style="text-align: right;">
                            <p style="font-weight: 800; color: var(--primary);">5 pts</p>
                        </div>
                    </div>
                </div>
                <div class="card merchant-card" onclick="location.hash='/merchant/2'">
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <div class="history-icon" style="background: #f0fdf4; color: #16a34a;">👟</div>
                        <div style="flex: 1;">
                            <h4 style="margin: 0;">Sport Center</h4>
                            <p style="font-size: 0.75rem; color: var(--text-sec);">Deportes • A 1.2km</p>
                        </div>
                        <div style="text-align: right;">
                            <p style="font-weight: 800; color: var(--text-sec);">0 pts</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    renderHeader(user);
    renderNav();
}

export function renderMerchantDetail(user, merchantId) {
    const main = document.getElementById('main-content');
    // Mock data for merchant
    const merchant = {
        name: "Pastelería Dulce",
        category: "Gastronomía",
        description: "Las mejores tortas y café de la ciudad.",
        points: 45,
        nextReward: 100
    };

    main.innerHTML = `
        <div class="merchant-detail">
            <div class="card" style="margin-top: 1rem;">
                <div style="text-align: center;">
                    <div class="history-icon" style="width: 80px; height: 80px; margin: 0 auto 1rem; font-size: 2.5rem; background: #fdf2f8;">🍰</div>
                    <h2>${merchant.name}</h2>
                    <p style="color: var(--text-sec); font-size: 0.9rem;">${merchant.category}</p>
                </div>
                <div style="margin-top: 2rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.5rem;">
                        <p style="font-weight: 700;">Mis Puntos</p>
                        <h2 style="color: var(--primary);">${merchant.points} pts</h2>
                    </div>
                    <div class="progress-container" style="background: #eef2ff; height: 12px;">
                        <div class="progress-bar" style="width: ${(merchant.points / merchant.nextReward) * 100}%; background: var(--primary);"></div>
                    </div>
                    <p style="font-size: 0.75rem; color: var(--text-sec); margin-top: 0.5rem; text-align: center;">
                        Faltan ${merchant.nextReward - merchant.points} puntos para tu próximo premio
                    </p>
                </div>
            </div>

            <h3>Premios de este local</h3>
            <div class="reward-list">
                <div class="card" style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <h4 style="margin: 0;">Café + Medialuna</h4>
                        <p style="font-size: 0.75rem; color: var(--text-sec);">100 pts</p>
                    </div>
                    <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem; opacity: 0.5;" disabled>Canjear</button>
                </div>
            </div>
        </div>
    `;
    
    renderHeader(user, true); // True for "back" button
    renderNav();
}

export function renderHistory(user) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="history-container">
            <h2>Mi Actividad</h2>
            <div class="card">
                <div class="history-item">
                    <div class="history-icon">🍰</div>
                    <div class="history-info">
                        <h4>Suma de puntos</h4>
                        <p>Pastelería Dulce • Ayer 18:30</p>
                    </div>
                    <div class="history-points positive">+45</div>
                </div>
                <div class="history-item">
                    <div class="history-icon">🎁</div>
                    <div class="history-info">
                        <h4>Canje de premio</h4>
                        <p>Sport Center • 20 Mar</p>
                    </div>
                    <div class="history-points negative">-150</div>
                </div>
            </div>
        </div>
    `;
    renderHeader(user);
    renderNav();
}

export function renderProfile(user) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="profile-container">
            <h2>Mi Perfil</h2>
            <div class="card" style="text-align: center;">
                <div class="history-icon" style="width: 80px; height: 80px; margin: 0 auto 1rem; font-size: 2.5rem;">👤</div>
                <h3>${user.email.split('@')[0]}</h3>
                <p style="color: var(--text-sec);">${user.email}</p>
                <button id="edit-profile-btn" class="btn" style="background: transparent; color: var(--primary); font-size: 0.8rem; border: 1px solid var(--primary); margin-top: 1rem; width: 100%;">Editar Perfil</button>
            </div>

            <div class="card">
                <div class="history-item" id="logout-btn" style="cursor: pointer;">
                    <div class="history-icon" style="background: #fee2e2; color: #ef4444;">🚪</div>
                    <div class="history-info">
                        <h4 style="color: #ef4444;">Cerrar Sesión</h4>
                        <p>Salir de tu cuenta de forma segura</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    renderHeader(user);
    renderNav();

    document.getElementById('logout-btn').addEventListener('click', async () => {
        const { logout } = await import('./auth.js');
        await logout();
    });
}

export function renderMerchantDashboard(user) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="merchant-dashboard">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2>Panel de Control</h2>
                <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--success); font-size: 0.8rem; font-weight: 700;">
                    <span style="width: 8px; height: 8px; background: var(--success); border-radius: 50%;"></span> Activo
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                <div class="card" style="padding: 1rem; text-align: center;">
                    <p style="font-size: 0.75rem; color: var(--text-sec);">Clientes activos</p>
                    <h2 style="margin: 0;">124</h2>
                </div>
                <div class="card" style="padding: 1rem; text-align: center;">
                    <p style="font-size: 0.75rem; color: var(--text-sec);">Canjes del mes</p>
                    <h2 style="margin: 0;">18</h2>
                </div>
            </div>

            <div class="card" style="background: #fffbeb; border-color: #fde68a; margin-bottom: 1.5rem;">
                <div style="display: flex; gap: 1rem;">
                    <div style="font-size: 1.5rem;">💡</div>
                    <div>
                        <h4 style="margin: 0;">Alerta IA</h4>
                        <p style="font-size: 0.8rem; color: #92400e;">12 clientes no visitan el local hace +30 días. ¡Envíales una promoción!</p>
                        <button class="btn btn-primary" style="margin-top: 0.5rem; padding: 0.4rem 1rem; font-size: 0.75rem;">Ver lista</button>
                    </div>
                </div>
            </div>

            <h3>Acciones Rápidas</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                <button class="btn btn-primary" onclick="location.hash='/merchant/load'" style="height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;">
                    <span style="font-size: 1.5rem;">➕</span> Cargar Puntos
                </button>
                <button class="btn" onclick="location.hash='/merchant/promo'" style="height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; border: 1.5px solid var(--card-border); background: white;">
                    <span style="font-size: 1.5rem;">📣</span> Enviar Promo
                </button>
                <button class="btn" onclick="location.hash='/merchant/rewards'" style="height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; border: 1.5px solid var(--card-border); background: white;">
                    <span style="font-size: 1.5rem;">🎁</span> Gestionar Premios
                </button>
                <button class="btn" onclick="location.hash='/merchant/stats'" style="height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; border: 1.5px solid var(--card-border); background: white;">
                    <span style="font-size: 1.5rem;">📈</span> Estadísticas
                </button>
            </div>

            <h3>Clientes Recientes</h3>
            <div class="card">
                <div class="history-item">
                    <div class="history-icon">👤</div>
                    <div class="history-info">
                        <h4>Juan Pérez</h4>
                        <p>Hace 2 horas • 150 pts acumulados</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    renderHeader(user);
    renderNavMerchant();
}

export function renderMerchantLoadPoints(user) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="merchant-load">
            <button onclick="window.history.back()" style="background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--primary); margin-bottom: 1rem;">← Volver</button>
            <h2>Cargar Puntos</h2>
            <div class="card">
                <div class="input-group">
                    <label>Buscar Cliente (Nombre o Teléfono)</label>
                    <input type="text" id="search-customer" placeholder="Ej: 54911223344">
                </div>
                <button id="scan-btn" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">Escanear QR del Cliente</button>
                <div id="reader" style="width: 100%; margin-top: 1rem; display: none;"></div>
            </div>

            <div id="customer-result" style="display: none;">
                <div class="card" style="text-align: center;">
                    <div class="history-icon" style="width: 60px; height: 60px; margin: 0 auto 0.5rem;">👤</div>
                    <h4 id="customer-name">Juan Pérez</h4>
                    <p id="customer-points" style="font-size: 0.8rem; color: var(--text-sec);">150 pts actuales</p>
                    <hr style="margin: 1.5rem 0; border: 0; border-top: 1px solid var(--card-border);">
                    <div class="input-group">
                        <label>Monto de la compra ($)</label>
                        <input type="number" id="purchase-amount" placeholder="0.00">
                    </div>
                    <p style="margin-top: 1rem; font-weight: 700;">Puntos a otorgar: <span id="points-preview" style="color: var(--primary);">0</span></p>
                    <button id="confirm-load-btn" class="btn btn-primary" style="margin-top: 1.5rem; width: 100%;">Confirmar Carga</button>
                </div>
            </div>
        </div>
    `;
    renderHeader(user);

    const scanBtn = document.getElementById('scan-btn');
    const readerDiv = document.getElementById('reader');
    const purchaseInput = document.getElementById('purchase-amount');
    const pointsPreview = document.getElementById('points-preview');
    const customerResult = document.getElementById('customer-result');

    // Simple points calculation (1 point per $100)
    purchaseInput.addEventListener('input', (e) => {
        const amount = parseFloat(e.target.value) || 0;
        const points = Math.floor(amount / 100);
        pointsPreview.textContent = points;
    });

    scanBtn.addEventListener('click', () => {
        readerDiv.style.display = 'block';
        const html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start(
            { facingMode: "environment" }, 
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
                // Handle scanned QR (customer UUID)
                customerResult.style.display = 'block';
                document.getElementById('customer-name').textContent = 'Cliente Escaneado';
                document.getElementById('customer-points').textContent = 'ID: ' + decodedText;
                html5QrCode.stop();
                readerDiv.style.display = 'none';
            },
            (errorMessage) => { /* ignore */ }
        );
    });
}

export function renderMerchantRewards(user) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="merchant-rewards">
            <button onclick="window.history.back()" style="background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--primary); margin-bottom: 1rem;">← Volver</button>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2>Gestionar Premios</h2>
                <button class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem;">+ Nuevo</button>
            </div>

            <div class="reward-list">
                <div class="card" style="display: flex; gap: 1rem; align-items: center;">
                    <div class="history-icon">☕</div>
                    <div style="flex: 1;">
                        <h4 style="margin: 0;">Café de especialidad</h4>
                        <p style="font-size: 0.75rem; color: var(--text-sec);">100 pts • Stock: Ilimitado</p>
                    </div>
                    <button class="btn" style="padding: 0.4rem; font-size: 0.75rem; background: #f3f4f6;">✏️</button>
                </div>
            </div>
        </div>
    `;
    renderHeader(user);
}

export function renderMerchantPromos(user) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="merchant-promos">
            <button onclick="window.history.back()" style="background: none; border: none; font-size: 1rem; cursor: pointer; color: var(--primary); margin-bottom: 1rem;">← Volver</button>
            <h2>Enviar Promoción</h2>
            <div class="card">
                <div class="input-group">
                    <label>Título de la promo</label>
                    <input type="text" id="promo-title" placeholder="Ej: ¡2x1 en Medialunas!">
                </div>
                <div class="input-group" style="margin-top: 1rem;">
                    <label>Mensaje</label>
                    <textarea id="promo-msg" style="width: 100%; border-radius: 12px; border: 1.5px solid var(--card-border); padding: 0.75rem; font-family: inherit;" rows="3" placeholder="Describe tu oferta..."></textarea>
                </div>
                <div class="input-group" style="margin-top: 1rem;">
                    <label>Segmentación</label>
                    <select id="promo-segment" style="width: 100%; padding: 0.75rem; border-radius: 12px; border: 1.5px solid var(--card-border); font-family: inherit;">
                        <option value="all">Todos los clientes</option>
                        <option value="inactive">Inactivos (+30 días)</option>
                        <option value="gold">Solo Nivel Gold/Black</option>
                    </select>
                </div>
                <button id="send-push-btn" class="btn btn-primary" style="margin-top: 1.5rem; width: 100%;">Enviar Notificación Push</button>
                <button id="send-wa-btn" class="btn" style="margin-top: 0.75rem; width: 100%; border: 1.5px solid #25d366; color: #25d366; background: white;">Enviar por WhatsApp</button>
            </div>
        </div>
    `;
    renderHeader(user);

    document.getElementById('send-wa-btn').addEventListener('click', () => {
        const msg = encodeURIComponent(document.getElementById('promo-msg').value);
        window.open(`https://wa.me/?text=${msg}`, '_blank');
    });
}

export function renderAdminDashboard(user) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="admin-dashboard">
            <h2>Panel Admin Puntoya</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                <div class="card" style="padding: 1rem;">
                    <p style="font-size: 0.75rem; color: var(--text-sec);">Comercios</p>
                    <h2 style="margin: 0;">24</h2>
                </div>
                <div class="card" style="padding: 1rem;">
                    <p style="font-size: 0.75rem; color: var(--text-sec);">Usuarios</p>
                    <h2 style="margin: 0;">1,842</h2>
                </div>
            </div>

            <div class="card">
                <h3 style="margin-bottom: 1rem;">Comercios Pendientes</h3>
                <div class="history-item">
                    <div class="history-icon" style="background: #eef2ff;">🏪</div>
                    <div class="history-info">
                        <h4>Fit Hub Gym</h4>
                        <p>Registrado hace 2 días</p>
                    </div>
                    <button class="btn btn-primary" style="padding: 0.4rem 0.75rem; font-size: 0.7rem;">Aprobar</button>
                </div>
            </div>

            <h3 style="margin: 1.5rem 0 1rem;">Métricas de la Red</h3>
            <div class="card" style="height: 150px; display: flex; align-items: center; justify-content: center; background: #fafafa; border-style: dashed;">
                <p style="color: var(--text-sec);">[ Gráfico de Crecimiento ]</p>
            </div>
        </div>
    `;
    renderHeader(user);
}

function renderNav() {
    const nav = document.getElementById('main-nav');
    nav.innerHTML = `
        <a href="#/" class="nav-item active">
            <span style="display: block; font-size: 1.25rem;">🏠</span>
            <span style="font-size: 0.65rem; font-weight: 700;">Home</span>
        </a>
        <a href="#/explore" class="nav-item">
            <span style="display: block; font-size: 1.25rem;">🔍</span>
            <span style="font-size: 0.65rem; font-weight: 700;">Explorar</span>
        </a>
        <a href="#/history" class="nav-item">
            <span style="display: block; font-size: 1.25rem;">📊</span>
            <span style="font-size: 0.65rem; font-weight: 700;">Activity</span>
        </a>
        <a href="#/profile" class="nav-item">
            <span style="display: block; font-size: 1.25rem;">👤</span>
            <span style="font-size: 0.65rem; font-weight: 700;">Profile</span>
        </a>
    `;
}
