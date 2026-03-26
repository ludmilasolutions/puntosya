import { 
    renderHome, renderLogin, renderRegister, renderExplore, renderMerchantDetail, 
    renderHistory, renderProfile, renderMerchantDashboard, renderMerchantLoadPoints,
    renderMerchantRewards, renderMerchantPromos, renderAdminDashboard
} from './ui.js';
import { initAuth, checkSession } from './auth.js';

// Supabase configuration
const SUPABASE_URL = 'https://gorhsxkchzduiukotlfo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcmhzeGtjaHpkdWl1a290bGZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0OTQyOTgsImV4cCI6MjA5MDA3MDI5OH0.hdZ6dNSW-qXs3QzjYJKKjUVBECe8pADJ6qoOzvhO51o';

export const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
