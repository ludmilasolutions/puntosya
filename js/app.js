import { 
    renderHome, renderLogin, renderRegister, renderExplore, renderMerchantDetail, 
    renderHistory, renderProfile, renderMerchantDashboard, renderMerchantLoadPoints,
    renderMerchantRewards
} from './ui.js';

// Supabase configuration
const SUPABASE_URL = 'https://gynalewakwmauttmfrfw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bmFsZXdha3dtYXV0dG1mcmZ3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDQ5NDExOSwiZXhwIjoyMDkwMDcwMTE5fQ.qtsa-HBSk0RrM51Qam2fSySqtZIyQaeVZ0t2We2y8-8';

export const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/explore': renderExplore,
    '/history': renderHistory,
    '/profile': renderProfile,
    // Merchant Routes
    '/merchant/dashboard': renderMerchantDashboard,
    '/merchant/load': renderMerchantLoadPoints,
    '/merchant/rewards': renderMerchantRewards,
    '/merchant/promos': renderMerchantPromos,
    // Admin Routes
    '/admin': renderAdminDashboard,
};

async function router() {
    const hash = window.location.hash.slice(1) || '/';
    const user = await checkSession();

    if (!user && (hash !== '/login' && hash !== '/register')) {
        renderLogin();
        return;
    }

    // Handle dynamic routes
    if (hash.startsWith('/merchant/') && !routes[hash]) {
        const id = hash.split('/')[2];
        // If it's a specific merchant detail (client view)
        renderMerchantDetail(user, id);
        return;
    }

    const view = routes[hash] || renderHome;
    view(user);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', async () => {
    initAuth();
    router();

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW Registered', reg))
            .catch(err => console.error('SW Registration Failed', err));
    }
});
