import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Search, MapPin, List, PlusCircle, Bell, Home, Utensils, Clock, User, CheckCircle, XCircle, ChevronLeft, MessageSquare, BookOpen, Package, Heart, ClipboardList, Settings, Users, Share2, HelpCircle, FileText, BellDot, Star, Map, Camera, Bookmark, Sun, Moon, Palette, ChevronDown, Info, LogIn, UserPlus, LogOut, Trash2, Check, Eye, EyeOff, ShieldQuestion, DollarSign, ChevronRight, Sparkles, PartyPopper, CreditCard, Smartphone, Truck, Award, ChefHat } from 'lucide-react';

// --- THEME & ASSETS ---
const APP_NAME = "NURISHARE";
const APP_SLOGAN = "Sharing with Care.";

const THEMES = {
  navy: { light: '#061346', dark: '#212842' },
};

const PALETTE = {
    darkBg: '#050505',
    darkCard: '#212842',
    lightBg: '#F9FAFB', 
    lightCard: '#FFFFFF',
    cream: '#FFF2DF',
    primaryAccent: THEMES.navy.light,
    grayText: '#6B7280',
    lightGrayBorder: '#E5E7EB',
    success: '#16a34a',
    danger: '#dc2626' 
};

// --- DATA SIMULASI ---
let simulatedUsers = {
    "user@gmail.com": { 
        name: "User Baik Hati", 
        username: "userbaik",
        phone: "081234567890",
        email: "user@gmail.com", 
        password: "password123", 
        profilePicture: `https://placehold.co/100x100/061346/FFFFFF?text=U`, 
        points: 250, 
        level: 'Donatur Baik Hati', 
        familiesCaredFor: 2, 
        isNewUser: false 
    }
};
const initialFoodList = [
    { 
        id: 'f1', 
        giver: 'Kafe Capucino Atas Kasino', 
        giverRating: 4.8, 
        reviewCount: 22, 
        type: 'Minuman', 
        category: 'Es Kopi Susu Gula Aren', 
        description: 'Sisa Es Kopi Susu Gula Aren, dibuat pagi ini dengan cinta!', 
        photos: [
            'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ], 
        location: 'Jl. Perintis No. 25B.', 
        distance: '0.6 km', 
        timeRemaining: 90 * 60 * 1000, 
        price: 5000, 
        stock: 3, 
        totalStock: 5, 
        status: 'available' 
    },
    { 
        id: 'f2', 
        giver: 'Resto Padang Jaya', 
        giverRating: 4.7, 
        reviewCount: 15, 
        type: 'Makanan Jadi', 
        category: 'Nasi Rendang', 
        description: 'Nasi Rendang sisa katering, porsi 3. Masih hangat dan lezat.', 
        photos: [
            'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1585435467335-34a4137ba585?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1626071415440-257a03423769?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ], 
        location: 'Jl. Sudirman No. 12', 
        distance: '1.2 km', 
        timeRemaining: 120 * 60 * 1000, 
        price: 7500, 
        stock: 3, 
        totalStock: 3, 
        status: 'available' 
    },
    { 
        id: 'f3', 
        giver: 'Toko Roti Harapan', 
        giverRating: 0, 
        reviewCount: 0, 
        type: 'Roti & Kue', 
        category: 'Roti Gandum', 
        description: 'Roti Gandum sisa hari ini, masih segar. 2 loaf.', 
        photos: [
            'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        ], 
        location: 'Jl. Merdeka No. 8', 
        distance: '0.9 km', 
        timeRemaining: 60 * 60 * 1000, 
        price: 0, 
        stock: 2, 
        totalStock: 2, 
        status: 'available' 
    },
    { id: 'f4', giver: 'User Baik Hati', giverRating: 5.0, reviewCount: 1, type: 'Buah', category: 'Pisang Cavendish', description: 'Pisang sisa, masih bagus, 1 sisir.', photos: ['https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], location: 'Rumah saya', distance: '0.1 km', timeRemaining: 240 * 60 * 1000, price: 0, stock: 1, totalStock: 1, status: 'completed' },
    { id: 'f5', giver: 'Warung Bu Siti', giverRating: 4.6, reviewCount: 45, type: 'Sayuran', category: 'Sayur Sop Siap Masak', description: 'Paket sayur sop lengkap, sisa 5 bungkus.', photos: ['https://images.unsplash.com/photo-1540420773420-2366e73d64a6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], location: 'Jl. Imam Bonjol No. 55', distance: '3.5 km', timeRemaining: 180 * 60 * 1000, price: 2500, stock: 5, totalStock: 5, status: 'available' },
    { id: 'f6', giver: 'Burger Queen', giverRating: 4.9, reviewCount: 102, type: 'Makanan Jadi', category: 'Burger Keju', description: 'Salah order, 2 burger keju masih fresh.', photos: ['https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], location: 'Mall Medan Center Lt. 3', distance: '2.8 km', timeRemaining: 30 * 60 * 1000, price: 10000, stock: 2, totalStock: 2, status: 'available' },
    { id: 'f7', giver: 'Starry Kopi', giverRating: 4.8, reviewCount: 88, type: 'Minuman', category: 'Caramel Macchiato', description: 'Kelebihan produksi, masih hangat.', photos: ['https://images.unsplash.com/photo-1545665225-b23b99e4d45e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], location: 'Jl. Gatot Subroto No. 101', distance: '1.9 km', timeRemaining: 60 * 60 * 1000, price: 8000, stock: 4, totalStock: 4, status: 'available' },
];
const initialUrgentRequests = [
    { id: 'ur1', organization: 'Panti Asuhan Pelita Harapan', item: 'Nasi Kotak', quantity: '50 kotak', detail: 'Untuk makan siang anak-anak panti.', location: 'Jl. Kasih Bunda No. 10', timeAgo: '1 jam lalu', type: 'Mendesak', status: 'open' },
    { id: 'ur2', organization: 'Komunitas Relawan Bencana', item: 'Air Mineral & Mie Instan', quantity: '10 dus air, 5 dus mie', detail: 'Untuk korban banjir di Medan Utara.', location: 'Posko Bencana, Lapangan Merdeka', timeAgo: '2 jam lalu', type: 'Biasa', status: 'open' },
    { id: 'ur3', organization: 'Masjid Al-Ikhlas', item: 'Takjil berbuka puasa', quantity: '100 paket', detail: 'Untuk dibagikan kepada jamaah dan musafir.', location: 'Jl. Amal No. 3', timeAgo: '4 jam lalu', type: 'Mendesak', status: 'open' },
    { id: 'ur4', organization: 'User Baik Hati', item: 'Roti dan Selai', quantity: '30 paket', detail: 'Untuk sarapan kaum dhuafa.', location: 'Sekretariat GJB, Jl. Setia Budi', timeAgo: '8 jam lalu', type: 'Biasa', status: 'being_helped' },
];
const initialNotifications = [];

const bannerImages = [
    'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

const redeemableItemsData = [
    { id: 'r1', name: 'Voucher Pulsa Rp 10.000', cost: 100, icon: Smartphone },
    { id: 'r2', name: 'Donasi ke Panti Asuhan', cost: 200, icon: Heart },
    { id: 'r3', name: 'Voucher Belanja Rp 25.000', cost: 250, icon: CreditCard },
];

// --- Custom SVG Logo Component ---
const Logo = ({ handColor, leafColor, grainColor, className }) => (
    <svg
        className={className}
        viewBox="0 0 100 80"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="NURISHARE Logo"
    >
        <path
            d="M38.8,0 L18.1,0 C12.6,0 8.2,4.5 8.2,10 L8.2,70 C13.7,75.5 22,79.5 31.5,79.5 C36.9,79.5 42,78.2 46.5,76.1 L77.5,23.1 L77.5,70 C77.5,75.5 81.9,80 87.4,80 L92.2,80 C97.7,80 102.1,75.5 102.1,70 L102.1,10 C102.1,4.5 97.7,0 92.2,0 L71.5,0 C68.3,0 65.5,1.8 64.1,4.5 L38.8,50.1 L38.8,10 C38.8,4.5 34.4,0 28.9,0 L18.1,0"
            fill={handColor}
        />
        <path
            d="M71.8,57.7 C77,62.7 85.6,63.2 93,59.2 V70.5 C88.9,74.9 82.1,77 74.3,73.5 C65.1,69.1 61.4,59 63.6,50 C65.8,53.5 68.6,55.8 71.8,57.7 Z"
            fill={handColor}
        />
        <path
            d="M81.5,43.2 c-2.4-0.2-4.7,1.1-5.6,3.3 c-1.1,2.8,0,6.1,2.7,7.6 c2.7,1.5,6.1,0.6,7.5-2 c1.5-2.7,0.6-6.1-2-7.5 C83.5,43.6,82.5,43.3,81.5,43.2z"
            fill={leafColor}
        />
        <path
            d="M88.5,36.2 c-2.7,0.1-5.1,1.9-6,4.4 c-1.2,3.1,0,6.7,2.9,8.2 c3.1,1.5,6.7,0.5,8.2-2.4 c1.5-3.1,0.5-6.7-2.4-8.2 C90.3,36.3,89.4,36.1,88.5,36.2z"
            fill={leafColor}
        />
        <circle cx="78" cy="55.5" r="1.3" fill={grainColor} />
        <circle cx="81.1" cy="54.2" r="1.3" fill={grainColor} />
        <circle cx="83.8" cy="53.7" r="1.3" fill={grainColor} />
        <circle cx="86.8" cy="54.2" r="1.3" fill={grainColor} />
        <circle cx="89.7" cy="55.3" r="1.3" fill={grainColor} />
        <circle cx="79.6" cy="56.7" r="1.3" fill={grainColor} />
        <circle cx="82.4" cy="56" r="1.3" fill={grainColor} />
        <circle cx="85.3" cy="56.1" r="1.3" fill={grainColor} />
        <circle cx="88.2" cy="57" r="1.3" fill={grainColor} />
    </svg>
);


const LogoWithName = ({ className, nameHandColor, nameLeafColor, textHandColor, textLeafColor, isSidebar }) => (
    <div className={`flex items-center gap-2 ${className} ${isSidebar ? 'flex-col' : ''}`}>
        <Logo className={isSidebar ? 'h-8 w-auto' : 'h-10 w-auto'} handColor={nameHandColor} leafColor={nameLeafColor} grainColor={nameHandColor} />
        <span className={`font-bold tracking-tight ${isSidebar ? 'text-xs mt-1' : 'text-2xl'}`}>
            <span style={{color: textHandColor}}>NURI</span>
            <span style={{color: textLeafColor}}>SHARE</span>
        </span>
    </div>
);


// --- FUNGSI & KOMPONEN BANTUAN ---
const formatTime = (ms) => {
    if (ms <= 0) return '00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) return `${hours}j ${minutes}m`;
    return `${minutes}m`;
};
const CustomToast = ({ message, onClose }) => {
    useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
    return <div className="fixed bottom-20 left-1/2 -translate-x-1/2 toast-gradient text-white p-3 rounded-lg shadow-xl z-[60] text-center text-sm opacity-95">{message}</div>;
};
const LoadingSpinner = ({ size = 'h-8 w-8', color = 'border-[var(--primary-color)]' }) => (
    <div className={`animate-spin rounded-full ${size} border-b-2 ${color}`}></div>
);
const style = document.createElement('style');
style.innerHTML = `
  :root {
    --primary-color: ${PALETTE.primaryAccent};
    --primary-color-dark: ${THEMES.navy.dark};
    --light-bg: ${PALETTE.lightBg};
    --dark-bg: ${PALETTE.darkBg};
    --light-card: ${PALETTE.lightCard};
    --dark-card: ${PALETTE.darkCard};
    --cream: ${PALETTE.cream};
    --gray-text: ${PALETTE.grayText};
    --light-gray-border: ${PALETTE.lightGrayBorder};
    --success-color: ${PALETTE.success};
    --danger-color: ${PALETTE.danger};
    --success-gradient: linear-gradient(to right, #16a34a, #15803d);
    --danger-gradient: linear-gradient(to right, #dc2626, #b91c1c);
    --primary-gradient: linear-gradient(to right, var(--primary-color), var(--primary-color-dark));
  }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
  input[type="number"] { -moz-appearance: textfield; }
  .btn-gradient-primary { background: var(--primary-gradient); }
  .btn-gradient-success { background: var(--success-gradient); }
  .btn-gradient-danger { background: var(--danger-gradient); }
  .toast-gradient {
    background: var(--primary-gradient);
  }
  body {
      color: #050505;
      background-color: var(--light-bg);
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23dbeafe' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  .dark body {
      color: #EBEBEB;
      background-color: var(--dark-bg);
      background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23212842' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;
document.head.appendChild(style);

// --- KOMPONEN TINGKAT ATAS (STANDALONE) ---
const Header = ({ title, onBack, showLogo = false, unreadCount, onShowNotifications, primary = false }) => (
  <header className={`p-4 h-20 flex items-center shadow-md sticky top-0 z-30 ${primary ? 'bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color-dark)] text-white' : 'bg-[var(--light-card)] dark:bg-[var(--dark-card)] text-gray-800 dark:text-gray-100 border-b border-[var(--light-gray-border)] dark:border-gray-700'}`}>
    <div className="w-10">
      {onBack && (
        <button onClick={onBack} className={`p-2 -ml-2 rounded-full transition-colors ${primary ? 'hover:bg-white/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          <ChevronLeft size={24} />
        </button>
      )}
    </div>
    <div className="flex-1 text-center">
      {showLogo ? (
        <LogoWithName 
            className="justify-center" 
            nameHandColor="white" 
            nameLeafColor="#A7F3D0" // Lighter green for better contrast
            textHandColor="white"
            textLeafColor="#A7F3D0"
        />
      ) : (
        <h1 className="text-xl font-bold">{title}</h1>
      )}
    </div>
    <div className="w-10 flex justify-end">
      {onShowNotifications && (
        <button onClick={onShowNotifications} className={`p-2 -mr-2 rounded-full transition-colors relative ${primary ? 'hover:bg-white/20' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
          <Bell size={24} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--danger-color)] text-white text-[10px]">{unreadCount}</span>
          )}
        </button>
      )}
    </div>
  </header>
);

const Nav = ({ activeTab, onTabChange }) => (
    <>
      {/* Sidebar for Desktop */}
      <nav className="hidden md:flex md:flex-col md:w-20 md:h-screen md:fixed md:left-0 md:top-0 md:bg-[var(--light-card)] dark:md:bg-[var(--dark-card)] md:shadow-lg md:py-4 md:px-2 md:items-center md:justify-start md:gap-4 md:z-40">
          <LogoWithName isSidebar={true} className="mb-4" nameHandColor="var(--primary-color)" nameLeafColor="var(--success-color)" textHandColor="var(--primary-color)" textLeafColor="var(--success-color)" />
          {['home', 'requests', 'post', 'activities', 'profile'].map((tab) => {
            const icons = { home: Home, requests: Bell, post: PlusCircle, activities: List, profile: User };
            const labels = { home: 'Beranda', requests: 'Permintaan', post: 'Buat', activities: 'Aktivitas', profile: 'Profil'};
            const Icon = icons[tab];
            return ( <button key={tab} onClick={() => onTabChange(tab)} className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors w-16 h-16 ${activeTab === tab ? 'bg-[var(--cream)] text-[var(--primary-color)]' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`} title={labels[tab]}><Icon size={24} /><span className="text-xs mt-1">{labels[tab]}</span></button> );
          })}
      </nav>
    </>
  );
  
const BottomNav = ({ activeTab, onTabChange }) => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--light-card)] dark:bg-[var(--dark-card)] text-gray-700 dark:text-gray-300 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(255,255,255,0.1)] flex justify-around py-2 z-40 h-16 items-center">
      {['home', 'requests', 'post', 'activities', 'profile'].map((tab) => {
          const icons = { home: Home, requests: Bell, post: PlusCircle, activities: List, profile: User };
          const labels = { home: 'Beranda', requests: 'Permintaan', post: '', activities: 'Aktivitas', profile: 'Profil'};
          const Icon = icons[tab];
          if (tab === 'post') {
              return ( <button key={tab} onClick={() => onTabChange('post')} className="flex flex-col items-center p-3 rounded-full btn-gradient-primary text-white shadow-lg -mt-6 hover:opacity-80 transition-all transform hover:scale-110"><PlusCircle size={30} /></button> );
          }
          return ( <button key={tab} onClick={() => onTabChange(tab)} className={`flex flex-col items-center p-2 rounded-lg transition-colors w-16 ${activeTab === tab ? 'text-[var(--primary-color)]' : 'text-gray-400 dark:text-gray-500 hover:text-[var(--primary-color)]'}`}><Icon size={24} /><span className="text-xs mt-1">{labels[tab]}</span></button> );
      })}
    </nav>
);

const LoginScreen = ({ onLogin, onSwitchToRegister, onForgotPassword }) => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); setError('');
        if (!credential || !password) { setError('Kolom tidak boleh kosong.'); return; }
        
        const user = Object.values(simulatedUsers).find(
            u => (u.email === credential || u.username === credential || u.phone === credential) && u.password === password
        );

        if (user) {
            onLogin(user);
        } else {
            setError('Kredensial atau kata sandi salah.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--cream)] to-[var(--light-bg)] flex flex-col items-center justify-center p-6 text-gray-800">
            <div className="w-full max-w-sm text-center">
                <LogoWithName 
                    className="justify-center mb-6"
                    nameHandColor="var(--primary-color)" 
                    nameLeafColor="var(--success-color)" 
                    textHandColor="var(--primary-color)"
                    textLeafColor="var(--success-color)"
                />
                <h1 className="text-3xl font-bold mb-2 text-[#050505]">Selamat Datang</h1>
                <p className="text-gray-500 mb-8">Login untuk melanjutkan kepedulianmu.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Email / Username / No. Tlp" value={credential} onChange={(e) => setCredential(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder:text-gray-500"/>
                    <div className="relative">
                        <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] pr-10 placeholder:text-gray-500"/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-700"><EyeOff size={20} className={showPassword ? '' : 'hidden'}/><Eye size={20} className={showPassword ? 'hidden' : ''}/></button>
                    </div>
                    {error && <p className="text-[var(--danger-color)] text-sm">{error}</p>}
                    <button onClick={onForgotPassword} type="button" className="text-sm text-[var(--primary-color)] hover:underline text-right w-full block">Lupa Kata Sandi?</button>
                    <button type="submit" className="w-full btn-gradient-primary hover:opacity-90 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-px"><LogIn className="inline-block mr-2" size={20}/> Login</button>
                </form>
                <p className="mt-8 text-gray-500">Belum punya akun? <button onClick={onSwitchToRegister} className="font-semibold text-[var(--primary-color)] hover:underline">Daftar di sini</button></p>
            </div>
        </div>
    );
};

const RegisterScreen = ({ onRegister, onSwitchToLogin }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({ name: '', username: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const sanitizedValue = value.replace(/[^0-9+]/g, '');
            setFormData({ ...formData, [name]: sanitizedValue });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const nextStep = () => {
        setError('');
        if (step === 1) {
            if (!formData.name || !formData.username) {
                setError('Nama lengkap dan nama pengguna wajib diisi.');
                return;
            }
            if (Object.values(simulatedUsers).some(u => u.username === formData.username)) {
                setError('Nama pengguna sudah digunakan.');
                return;
            }
        }
        if (step === 2) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!formData.email || !formData.phone) {
                setError('Email dan No. Tlp wajib diisi.');
                return;
            }
            if (!emailRegex.test(formData.email)) {
                setError('Format email tidak valid.');
                return;
            }
            if (Object.values(simulatedUsers).some(u => u.email === formData.email)) {
                setError('Email sudah terdaftar.');
                return;
            }
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (formData.password.length < 8) {
            setError('Password minimal 8 karakter.');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Konfirmasi kata sandi tidak cocok.');
            return;
        }
        const { name, username, phone, email, password } = formData;
        const newUser = { name, username, phone, email, password, profilePicture: `https://placehold.co/100x100/061346/FFFFFF?text=${name.charAt(0)}`, points: 0, level: 'Donatur Baik Hati', familiesCaredFor: 0, isNewUser: true };
        onRegister(newUser);
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--cream)] to-[var(--light-bg)] flex flex-col items-center justify-center p-6 text-gray-800">
            <div className="w-full max-w-sm text-center">
                 <LogoWithName 
                    className="justify-center mb-6"
                    nameHandColor="var(--primary-color)" 
                    nameLeafColor="var(--success-color)" 
                    textHandColor="var(--primary-color)"
                    textLeafColor="var(--success-color)"
                />
                <h1 className="text-2xl font-bold text-[#050505] mb-2">Buat Akun Baru (Langkah {step}/3)</h1>
                <p className="text-gray-500 mb-6">Bergabunglah dalam ekosistem kepedulian.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {step === 1 && (
                        <>
                            <input type="text" placeholder="Nama Lengkap" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder:text-gray-500"/>
                            <input type="text" placeholder="Nama Pengguna" name="username" value={formData.username} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder:text-gray-500"/>
                        </>
                    )}
                    {step === 2 && (
                         <>
                            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder:text-gray-500"/>
                            <input type="tel" placeholder="No. Tlp" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder:text-gray-500"/>
                         </>
                    )}
                     {step === 3 && (
                         <>
                            <div className="relative">
                                <input type={showPassword ? 'text' : 'password'} placeholder="Password (min. 8 karakter)" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] pr-10 placeholder:text-gray-500"/>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-700"><EyeOff size={20} className={showPassword ? '' : 'hidden'}/><Eye size={20} className={showPassword ? 'hidden' : ''}/></button>
                            </div>
                            <input type="password" placeholder="Konfirmasi Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder:text-gray-500"/>
                         </>
                    )}
                    {error && <p className="text-[var(--danger-color)] text-sm">{error}</p>}
                    <div className="flex gap-4 pt-2">
                        {step > 1 && <button type="button" onClick={prevStep} className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors">Kembali</button>}
                        {step < 3 && <button type="button" onClick={nextStep} className="w-full btn-gradient-primary hover:opacity-90 text-white font-bold py-3 rounded-lg transition-colors">Berikutnya</button>}
                        {step === 3 && <button type="submit" className="w-full btn-gradient-primary hover:opacity-90 text-white font-bold py-3 rounded-lg transition-colors">Daftar</button>}
                    </div>
                </form>
                <p className="mt-8 text-gray-500">Sudah punya akun? <button onClick={onSwitchToLogin} className="font-semibold text-[var(--primary-color)] hover:underline">Login di sini</button></p>
            </div>
        </div>
    );
};

const SplashScreen = ({ onFinish }) => {
    useEffect(() => { const timer = setTimeout(onFinish, 2500); return () => clearTimeout(timer); }, [onFinish]);
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-6">
            <LogoWithName 
                className="justify-center animate-pulse" 
                nameHandColor="var(--primary-color)" 
                nameLeafColor="var(--success-color)" 
                textHandColor="var(--primary-color)"
                textLeafColor="var(--success-color)"
            />
            <p className="text-gray-500 text-lg mt-4">{APP_SLOGAN}</p>
        </div>
    );
};

const ForgotPasswordScreen = ({ onBack, onResetSuccess, handleShowToast, onGoToRegister }) => {
    const [step, setStep] = useState('sendCode');
    const [credential, setCredential] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showRegisterSuggestion, setShowRegisterSuggestion] = useState(false);
    
    const handleSendCode = (e) => {
        e.preventDefault();
        setError('');
        setShowRegisterSuggestion(false);
        if (!Object.values(simulatedUsers).some(u => u.email === credential || u.phone === credential)) {
            setError('Email atau nomor telepon tidak terdaftar.');
            setShowRegisterSuggestion(true);
            return;
        }
        handleShowToast(`Kode verifikasi telah dikirim ke ${credential}. (Kodenya 123456)`);
        setStep('verifyCode');
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        setError('');
        if (code !== '123456') {
            setError('Kode verifikasi salah.');
            return;
        }
        if (newPassword.length < 8) {
            setError('Kata sandi baru minimal 8 karakter.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Konfirmasi kata sandi tidak cocok.');
            return;
        }

        const userKey = Object.keys(simulatedUsers).find(k => simulatedUsers[k].email === credential || simulatedUsers[k].phone === credential);
        if (userKey) {
            simulatedUsers[userKey].password = newPassword;
        }
        onResetSuccess();
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-[var(--cream)] to-[var(--light-bg)] flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-sm text-center">
                <ShieldQuestion size={60} className="mx-auto text-[var(--primary-color)] mb-4"/>
                <h1 className="text-3xl font-bold text-[#050505] mb-2">Lupa Kata Sandi</h1>
                {step === 'sendCode' ? (
                    <>
                        <p className="text-gray-500 mb-8">Masukkan email atau nomor telepon Anda, kami akan mengirimkan kode verifikasi.</p>
                        <form onSubmit={handleSendCode} className="space-y-4">
                            <input type="text" placeholder="Email atau No. Tlp" value={credential} onChange={e => setCredential(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder:text-gray-500"/>
                             {error && <p className="text-[var(--danger-color)] text-sm">{error}</p>}
                             {showRegisterSuggestion && (
                                 <button type="button" onClick={onGoToRegister} className="w-full mt-2 text-white font-bold py-2 px-4 rounded-lg btn-gradient-primary">
                                    Daftar di Sini
                                </button>
                            )}
                            <button type="submit" className="w-full btn-gradient-primary hover:opacity-90 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">Kirim Kode</button>
                        </form>
                    </>
                ) : (
                     <>
                        <p className="text-gray-500 mb-8">Masukkan kode verifikasi dan kata sandi baru Anda.</p>
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <input type="text" placeholder="Kode Verifikasi" value={code} onChange={e => setCode(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder:text-gray-500"/>
                            <input type="password" placeholder="Kata Sandi Baru (min. 8 karakter)" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder:text-gray-500"/>
                            <input type="password" placeholder="Konfirmasi Kata Sandi Baru" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-white/70 backdrop-blur-sm border border-[var(--light-gray-border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] placeholder:text-gray-500"/>
                             {error && <p className="text-[var(--danger-color)] text-sm">{error}</p>}
                            <button type="submit" className="w-full btn-gradient-primary hover:opacity-90 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">Reset Kata Sandi</button>
                        </form>
                    </>
                )}
               
                <button onClick={onBack} className="mt-8 font-semibold text-gray-600 hover:underline">Kembali ke Login</button>
            </div>
        </div>
    );
};


const FoodCard = ({ food, onClaimFood, currentUser, handleShowToast, handleNavigate }) => {
    const [timeRemaining, setTimeRemaining] = useState(food.timeRemaining);
    const [claimQuantity, setClaimQuantity] = useState(1);
    const isMyDonation = currentUser && food.giver === currentUser.name;
    
    useEffect(() => {
        if (food.timeRemaining <= 0) { setTimeRemaining(0); return; };
        const timer = setInterval(() => { setTimeRemaining(prev => prev > 0 ? prev - 1000 : 0); }, 1000);
        return () => clearInterval(timer);
    }, [food.timeRemaining]);

    const isExpired = timeRemaining <= 0;
    const priceDisplay = food.price === 0 ? 'Gratis' : `Rp ${food.price.toLocaleString('id-ID')}`;
    
    const handleCardClaim = (e) => {
        e.stopPropagation();
        if (isMyDonation) { handleShowToast("Anda tidak dapat mengklaim donasi sendiri."); return; }
        if (food.stock > 0 && !isExpired && food.status === 'available') {
            onClaimFood(food, claimQuantity);
        }
    };
    
    const handleQuantityChange = (e) => {
        e.stopPropagation();
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            setClaimQuantity(1);
        } else if (value > food.stock) {
            setClaimQuantity(food.stock);
        } else {
            setClaimQuantity(value);
        }
    }


    return (
        <div onClick={() => handleNavigate(`food-detail/${food.id}`)} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col relative border border-transparent dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full">
            <img src={food.photos[0]} alt={food.category} className="w-full h-40 object-cover" onError={(e) => { e.target.src="https://placehold.co/300x200/EBEBEB/999090?text=No+Image"; }}/>
            <div className="p-3 flex-grow flex flex-col">
                <h3 className="font-semibold text-base md:text-sm text-gray-900 dark:text-gray-100 leading-tight flex-grow">{food.category}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Stok: {food.stock}/{food.totalStock}</p>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-2"><MapPin size={12} className="mr-1 text-[var(--primary-color)]" /> {food.location}</div>
                <div className="flex items-center text-red-500 text-xs mt-1"><Clock size={12} className="mr-1" /> Sisa Waktu: {formatTime(timeRemaining)}</div>
                <div className="flex items-center justify-between mt-2.5">
                    <span className="font-bold text-base md:text-sm text-gray-800 dark:text-white">{priceDisplay}</span>
                    { !isMyDonation && (
                        <div className="flex items-center gap-2">
                            <button disabled={isMyDonation} onClick={(e) => { e.stopPropagation(); setClaimQuantity(p => Math.max(1, p - 1)); }} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold w-6 h-6 rounded-md flex items-center justify-center text-sm hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">-</button>
                            <input type="number" value={claimQuantity} onChange={handleQuantityChange} onClick={(e) => e.stopPropagation()} className="w-8 text-center text-gray-800 dark:text-gray-100 text-sm border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:ring-0 focus:border-[var(--primary-color)] hide-scrollbar" />
                            <button disabled={isMyDonation} onClick={(e) => { e.stopPropagation(); setClaimQuantity(p => Math.min(food.stock, p + 1)); }} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold w-6 h-6 rounded-md flex items-center justify-center text-sm hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50">+</button>
                            <button onClick={handleCardClaim} disabled={isMyDonation} className="btn-gradient-primary text-white font-bold py-1 px-3 rounded-md text-xs shadow-sm hover:opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">Klaim</button>
                        </div>
                    )}
                </div>
            </div>
             {food.giverRating > 0 && <div className="absolute top-2 right-2 flex items-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full px-1.5 py-0.5 text-xs text-gray-600 dark:text-gray-300"><Star size={10} className="fill-yellow-400 text-yellow-400 mr-1" />{food.giverRating}</div>}
        </div>
    );
};
const FoodDetailScreen = ({ foodId, onBack, onClaimFood, foodList, currentUser, handleShowToast, onShowRecipeModal, setZoomedImage }) => {
    const food = useMemo(() => foodList.find(f => f.id === foodId), [foodList, foodId]);
    
    const [timeRemaining, setTimeRemaining] = useState(food?.timeRemaining || 0);
    const [claimQuantity, setClaimQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(food?.photos[0]);

    useEffect(() => {
        if (food) {
            setTimeRemaining(food.timeRemaining);
            setClaimQuantity(1);
            setMainImage(food.photos[0]);
        }
    }, [food]);
    
    useEffect(() => {
        if (!food || food.timeRemaining <= 0) {
            setTimeRemaining(0);
            return;
        }
        const timer = setInterval(() => setTimeRemaining(prev => Math.max(0, prev - 1000)), 1000);
        return () => clearInterval(timer);
    }, [food]);

    if (!food) {
      return (
          <div className="flex flex-col h-full bg-transparent">
              <Header title="Error" onBack={onBack} primary={true} />
              <div className="flex-grow flex flex-col items-center justify-center p-4">
                  <XCircle size={48} className="text-red-500 mb-4" />
                  <h2 className="text-xl font-bold mb-2">Makanan Tidak Ditemukan</h2>
                  <p className="text-gray-600 dark:text-gray-400">Item ini mungkin sudah tidak tersedia.</p>
              </div>
          </div>
      ); 
    }

    const isMyDonation = currentUser && food.giver === currentUser.name;
    const isExpired = timeRemaining <= 0;
    const priceDisplay = food.price === 0 ? 'Gratis' : `Rp ${food.price.toLocaleString('id-ID')}`;
    
    const handleClaimClick = () => {
        if (isMyDonation) { handleShowToast("Anda tidak dapat mengklaim donasi sendiri."); return; }
        if (isExpired || food.status !== 'available' || food.stock <= 0) { handleShowToast('Maaf, makanan ini tidak dapat diklaim.'); return; }
        onClaimFood(food, claimQuantity);
    };
    
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) {
            setClaimQuantity(1);
        } else if (value > food.stock) {
            setClaimQuantity(food.stock);
        } else {
            setClaimQuantity(value);
        }
    }


    return (
        <div className="flex flex-col h-full bg-white dark:bg-black">
            <Header title="Detail Pemberian" onBack={onBack} primary />
            <div className="flex-grow overflow-y-auto pb-24 md:pb-4">
                <div className="max-w-7xl mx-auto md:grid md:grid-cols-2 md:gap-8 md:p-4">
                    {/* Kolom Gambar */}
                    <div className="w-full">
                        <img src={mainImage} alt={food.category} className="w-full h-64 md:h-96 object-cover cursor-pointer md:rounded-lg" onClick={() => setZoomedImage(mainImage)} onError={(e) => { e.target.src="https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image"; }} />
                         {food.photos.length > 1 && (
                            <div className="flex space-x-2 p-2 bg-gray-100 dark:bg-gray-800 overflow-x-auto md:rounded-b-lg">
                                {food.photos.map((photo, index) => (
                                    <img 
                                        key={index} 
                                        src={photo} 
                                        alt={`Thumbnail ${index + 1}`} 
                                        className={`h-14 w-14 md:h-20 md:w-20 object-cover rounded-md cursor-pointer border-2 ${mainImage === photo ? 'border-[var(--primary-color)]' : 'border-transparent'}`}
                                        onClick={() => setMainImage(photo)}
                                    />
                                ))}
                            </div>
                         )}
                    </div>
                    
                    {/* Kolom Info */}
                    <div className="p-3 md:p-0 space-y-4">
                        <div className="md:hidden">
                             <h2 className="text-xl md:text-3xl font-bold text-gray-800 dark:text-white">{food.category}</h2>
                            <p className="text-sm md:text-lg font-semibold text-gray-700 dark:text-gray-300">{priceDisplay}</p>
                        </div>
                         <div className="p-3 rounded-lg bg-[var(--primary-color)] text-white">
                            <p className="text-sm">{food.description}</p>
                            <button onClick={() => onShowRecipeModal(food)} className="mt-3 w-full flex items-center justify-center text-xs font-semibold text-[var(--primary-color)] bg-white py-2 rounded-lg shadow-md hover:bg-gray-100">
                                 <ChefHat size={14} className="mr-2"/> Dapatkan Ide Resep/Sajian
                             </button>
                        </div>
                        
                        <div className="p-3 rounded-lg bg-[var(--primary-color)] text-white">
                            <h3 className="font-semibold text-base mb-2">Informasi Detail</h3>
                            <div className="space-y-2 text-xs">
                               <div className="flex items-start gap-2.5"><MapPin className="text-white mt-0.5 flex-shrink-0" size={14} /><p>{food.location} ({food.distance})</p></div>
                               <div className="flex items-center gap-2.5"><Clock className="text-white flex-shrink-0" size={14} /><p>Sisa Waktu: {formatTime(timeRemaining)}</p></div>
                               <div className="flex items-center gap-2.5"><Star className="text-white flex-shrink-0" size={14} /><p>Rating Pemberi: {food.giverRating} ({food.reviewCount || 0} ulasan)</p></div>
                               <div className="flex items-center gap-2.5"><List className="text-white flex-shrink-0" size={14} /><p>Jenis Kategori: {food.type}</p></div>
                               <div className="flex items-center gap-2.5"><Package className="text-white flex-shrink-0" size={14} /><p>Stok Tersedia: {food.stock}/{food.totalStock} Unit</p></div>
                            </div>
                        </div>
                        
                        {!isMyDonation && (
                            <>
                                <div className="p-3 rounded-lg bg-[var(--primary-color)] text-white">
                                    <h3 className="font-semibold text-base mb-1">Jumlah yang ingin diklaim</h3>
                                    <p className="text-xs opacity-80 mb-2">Maksimal klaim: {food.stock} item</p>
                                    <div className="flex items-center justify-center mt-2">
                                        <button disabled={isMyDonation || claimQuantity <= 1} onClick={() => setClaimQuantity(p => Math.max(1, p - 1))} className="bg-white/20 font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-white/30 disabled:opacity-50">-</button>
                                        <input type="number" value={claimQuantity} onChange={handleQuantityChange} className="text-xl font-bold mx-4 w-12 text-center border-b-2 border-white/50 focus:outline-none focus:border-white bg-transparent hide-scrollbar" />
                                        <button disabled={isMyDonation || claimQuantity >= food.stock} onClick={() => setClaimQuantity(p => Math.min(food.stock, p + 1))} className="bg-white/20 font-bold w-8 h-8 rounded-full flex items-center justify-center text-lg hover:bg-white/30 disabled:opacity-50">+</button>
                                    </div>
                                </div>
                                
                                <div className="p-3 rounded-lg bg-[var(--primary-color)] text-white">
                                    <h3 className="font-semibold text-base mb-1.5">Catatan Penting dari Pemberi</h3>
                                    <p className="text-xs opacity-90">Ini adalah makanan sedekah, bukan untuk diperjualbelikan.</p>
                                </div>
        
                                 <div className="fixed bottom-16 left-0 right-0 p-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-[var(--light-gray-border)] dark:border-gray-700 z-30 md:static md:bottom-auto md:bg-transparent md:dark:bg-transparent md:border-none md:p-0 md:mt-4">
                                     <button onClick={handleClaimClick} disabled={isExpired || food.status !== 'available' || food.stock <= 0 || isMyDonation} className="btn-gradient-primary hover:opacity-90 text-white font-bold py-3 px-5 rounded-full shadow-lg w-full flex items-center justify-center text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"><CheckCircle size={18} className="mr-2" /> Klaim Kepedulian</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
const PostFoodScreen = ({ onPostFood, onBack, handleShowToast, unreadCount, onShowNotifications }) => {
    const [photos, setPhotos] = useState([]);
    const [itemName, setItemName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [quantity, setQuantity] = useState('');
    const [timeLimit, setTimeLimit] = useState('');
    const [isFree, setIsFree] = useState(true);
    const [price, setPrice] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const generateDescription = async () => {
        if (!itemName) {
            handleShowToast("Mohon isi nama makanan terlebih dahulu.");
            return;
        }
        setIsGenerating(true);
        const prompt = `Buat deskripsi donasi yang menarik dan singkat dalam Bahasa Indonesia (sekitar 15-25 kata) untuk item makanan "${itemName}" dalam kategori "${category}". Fokus pada kelezatan dan ajakan untuk segera mengklaim. Jangan gunakan tanda kutip.`;
        
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text.trim() || "";
            setDescription(text);
        } catch (error) {
            console.error("Error generating description:", error);
            handleShowToast("Gagal membuat deskripsi. Coba lagi.");
        } finally {
            setIsGenerating(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!itemName || !category || !quantity || !timeLimit || !location) { handleShowToast('Mohon lengkapi semua kolom wajib.'); return; }
        const newFood = { id: `f${Date.now()}`, type: category, category: itemName, description, photos, location, timeRemaining: parseInt(timeLimit) * 60 * 1000, price: isFree ? 0 : parseFloat(price), stock: parseInt(quantity), totalStock: parseInt(quantity), status: 'available' };
        onPostFood(newFood);
    };
    const categories = ['Makanan Jadi', 'Buah-buahan', 'Sayuran', 'Minuman', 'Roti & Kue', 'Lainnya'];
    
    const handlePhotoUpload = (e) => {
        if (e.target.files.length > 0) {
            const fileArray = Array.from(e.target.files).map(file => URL.createObjectURL(file));
            setPhotos(prevPhotos => [...prevPhotos, ...fileArray]);
        }
    }
    
    return (
        <div className="flex flex-col h-full bg-transparent">
            <Header title="Bagikan Kepedulian" onShowNotifications={onShowNotifications} unreadCount={unreadCount} primary={true} />
            <div className="flex-grow overflow-y-auto p-4 pb-24 md:pb-4 max-w-4xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border border-[var(--light-gray-border)] dark:border-gray-700">
                        <label className="block font-bold mb-2">Foto Makanan (Bisa lebih dari 1)</label>
                        <div className="flex items-center justify-center h-40 w-full border-2 border-dashed rounded-lg bg-gray-100 dark:bg-gray-700 relative overflow-hidden cursor-pointer hover:border-[var(--primary-color)]">
                            <div className="text-[var(--gray-text)] dark:text-gray-400 flex flex-col items-center justify-center"><Camera size={40}/><p className="mt-2 text-sm font-medium">Unggah Foto</p></div>
                            <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="absolute inset-0 opacity-0"/>
                        </div>
                        {photos.length > 0 && 
                            <div className="mt-2 flex space-x-2 overflow-x-auto">
                                {photos.map((photo, index) => <img key={index} src={photo} alt="Preview" className="h-20 w-20 object-cover rounded-md"/>)}
                            </div>
                        }
                    </div>
                    <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border border-[var(--light-gray-border)] dark:border-gray-700"><label htmlFor="itemName" className="block font-bold mb-2">Nama Makanan <span className="text-[var(--danger-color)]">*</span></label><input type="text" id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} required className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"/></div>
                    <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border border-[var(--light-gray-border)] dark:border-gray-700"><label htmlFor="category" className="block font-bold mb-2">Kategori <span className="text-[var(--danger-color)]">*</span></label><select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-[var(--light-card)] dark:bg-[var(--dark-card)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"><option value="">Pilih Kategori</option>{categories.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
                    <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border border-[var(--light-gray-border)] dark:border-gray-700">
                        <div className="flex justify-between items-center mb-2">
                           <label htmlFor="description" className="block font-bold">Deskripsi Tambahan</label>
                           <button type="button" onClick={generateDescription} disabled={isGenerating} className="flex items-center text-xs font-semibold text-[var(--primary-color)] bg-[var(--cream)] px-2 py-1 rounded-full disabled:opacity-50">
                               {isGenerating ? <LoadingSpinner size="h-4 w-4" color="border-gray-500" /> : <Sparkles size={14} className="mr-1"/>}
                               Buat Otomatis
                           </button>
                        </div>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent h-20" placeholder="Contoh: Dibuat pagi ini, level pedas, dll."/>
                    </div>
                    <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border border-[var(--light-gray-border)] dark:border-gray-700"><label htmlFor="location" className="block font-bold mb-2">Alamat Pengambilan <span className="text-[var(--danger-color)]">*</span></label><textarea id="location" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent h-20" placeholder="Contoh: Jl. Gatot Subroto No. 1, depan toko buku."/></div>
                    <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border border-[var(--light-gray-border)] dark:border-gray-700"><label className="block font-bold mb-2">Harga</label><div className="flex items-center space-x-4"><label className="flex items-center"><input type="radio" name="price" checked={isFree} onChange={()=>setIsFree(true)} className="w-4 h-4 text-[var(--primary-color)] bg-gray-100 border-gray-300"/> <span className="ml-2">Gratis</span></label><label className="flex items-center"><input type="radio" name="price" checked={!isFree} onChange={()=>setIsFree(false)} className="w-4 h-4 text-[var(--primary-color)] bg-gray-100 border-gray-300"/> <span className="ml-2">Tetapkan Harga</span></label></div>{!isFree && <div className="relative mt-2"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">Rp</span><input type="number" value={price} onChange={e=>setPrice(e.target.value)} className="w-full p-2 pl-8 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent"/></div>}</div>
                    <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border border-[var(--light-gray-border)] dark:border-gray-700"><label htmlFor="quantity" className="block font-bold mb-2">Jumlah (Porsi/Unit) <span className="text-[var(--danger-color)]">*</span></label><input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent hide-scrollbar"/></div>
                    <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border border-[var(--light-gray-border)] dark:border-gray-700"><label htmlFor="timeLimit" className="block font-bold mb-2">Batas Waktu (Menit) <span className="text-[var(--danger-color)]">*</span></label><input type="number" id="timeLimit" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} required className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent hide-scrollbar"/></div>
                    <button type="submit" className="btn-gradient-primary hover:opacity-90 text-white font-bold py-3 rounded-full shadow-lg w-full flex items-center justify-center text-lg"><Heart size={20} className="mr-2" /> Confirm My Care</button>
                </form>
            </div>
        </div>
    );
};
const MyItemsScreen = ({ onBack, myDonations, myClaims, loading, onShowNotifications, unreadCount, onShowClaimProof, onConfirmCollection, onRate, onNavigate }) => {
    const [activeFilter, setActiveFilter] = useState('donations');
    
    return (
        <div className="flex flex-col h-full bg-transparent">
            <Header title="Aktivitas Saya" onShowNotifications={onShowNotifications} unreadCount={unreadCount} primary={true} />
            <div className="flex-grow overflow-y-auto p-4 pb-24 md:pb-4 max-w-5xl mx-auto w-full">
                <div className="p-1 bg-gray-200 dark:bg-gray-800 flex justify-center space-x-1 mb-4 rounded-full max-w-sm mx-auto">
                    <button onClick={() => setActiveFilter('donations')} className={`w-full py-2 px-5 rounded-full font-semibold text-sm transition-colors ${activeFilter === 'donations' ? 'bg-white dark:bg-[var(--dark-card)] text-[var(--primary-color)] shadow' : 'text-gray-600 dark:text-gray-300'}`}>Donasiku</button>
                    <button onClick={() => setActiveFilter('claims')} className={`w-full py-2 px-5 rounded-full font-semibold text-sm transition-colors ${activeFilter === 'claims' ? 'bg-white dark:bg-[var(--dark-card)] text-[var(--primary-color)] shadow' : 'text-gray-600 dark:text-gray-300'}`}>Klaimku</button>
                </div>
                
                {loading ? <div className="flex justify-center mt-10"><LoadingSpinner /></div> : 
                    <div className="space-y-3">
                        {activeFilter === 'donations' && (myDonations.length > 0 ? myDonations.map(item => (
                            <div key={item.id} onClick={() => onNavigate(item.isRequestFulfillment ? `request-detail/${item.requestId}` : `food-detail/${item.id}`)} className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border-l-4 border-[var(--primary-color)] cursor-pointer hover:shadow-lg">
                                <h3 className="font-semibold">{item.category || item.item}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Status: {item.status || 'Tersedia'}</p>
                            </div>
                        )) : <p className="col-span-full text-center text-[var(--gray-text)] mt-10">Anda belum berbagi kepedulian.</p>)}
                        
                        {activeFilter === 'claims' && (myClaims.length > 0 ? myClaims.map(claim => (
                            <div key={claim.id} onClick={() => onNavigate(claim.isRequestFulfillment ? `request-detail/${claim.requestId}` : `food-detail/${claim.id}`)} className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border-l-4 border-[var(--success-color)] cursor-pointer hover:shadow-lg">
                                <h3 className="font-semibold">{claim.category || claim.item}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Dari: {claim.giver || claim.organization}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Status: {claim.status}</p>
                                <div className="flex space-x-2 mt-2">
                                    {claim.status === 'claimed' && <button onClick={(e) => { e.stopPropagation(); onConfirmCollection(claim.id); }} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200">Konfirmasi Pengambilan</button>}
                                    {claim.status === 'delivered_by_helper' && <button onClick={(e) => { e.stopPropagation(); onConfirmCollection(claim.id); }} className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200">Konfirmasi Penerimaan</button>}
                                    {claim.status === 'collected' && !claim.isRated && <button onClick={(e) => { e.stopPropagation(); onRate(claim); }} className="text-xs bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full hover:bg-yellow-200">Beri Rating</button>}
                                </div>
                            </div>
                        )) : <p className="col-span-full text-center text-[var(--gray-text)] mt-10">Anda belum menerima kepedulian.</p>)}
                    </div>
                }
            </div>
        </div>
    );
};
 const HomeScreen = ({ loading, foodList, onClaimFood, onShowNotifications, unreadCount, onHelpRequest, handleNavigate, currentUser, handleShowToast, urgentRequests }) => {
    const [filterCategory, setFilterCategory] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const categories = ['Semua', 'Makanan Jadi', 'Buah', 'Sayur', 'Minuman', 'Roti & Kue'];

    const filteredFood = useMemo(() => {
        if (!foodList || !Array.isArray(foodList)) return [];
        return foodList.filter(food => {
            const byCategory = filterCategory === 'Semua' || food.type === filterCategory;
            const bySearch = searchQuery === '' || food.category.toLowerCase().includes(searchQuery.toLowerCase()) || food.description.toLowerCase().includes(searchQuery.toLowerCase()) || food.giver.toLowerCase().includes(searchQuery.toLowerCase());
            return byCategory && bySearch;
        })
    }, [foodList, filterCategory, searchQuery]);

    const myDonations = useMemo(() => currentUser ? filteredFood.filter(food => food.giver === currentUser.name) : [], [filteredFood, currentUser]);
    const otherDonations = useMemo(() => currentUser ? filteredFood.filter(food => food.giver !== currentUser.name) : filteredFood, [filteredFood, currentUser]);


    const [currentBanner, setCurrentBanner] = useState(0);

    useEffect(() => {
        const bannerTimer = setInterval(() => {
            setCurrentBanner(prev => (prev + 1) % bannerImages.length);
        }, 5000);
        return () => clearInterval(bannerTimer);
    }, []);

    return (
        <div className="flex flex-col h-full bg-transparent">
            <Header showLogo={true} onShowNotifications={onShowNotifications} unreadCount={unreadCount} primary={true}/>
            <div className="flex-grow overflow-y-auto pb-24 md:pb-4 px-4 sm:px-6 lg:px-8">
                <div className="my-4">
                    <div className="relative h-40 md:h-64 rounded-2xl overflow-hidden shadow-lg">
                        <img 
                            src={bannerImages[currentBanner]} 
                            alt="Berbagi makanan" 
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out" 
                            key={currentBanner}
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <h2 className="text-xl md:text-3xl font-bold text-white">Jadilah Pahlawan Pangan!</h2>
                            <p className="text-sm md:text-base mt-1 text-white/90">Setiap donasi Anda berarti.</p>
                        </div>
                    </div>
                </div>
                
                 <div className="w-full mt-8">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="font-bold text-lg md:text-xl text-gray-800 dark:text-gray-100">Permintaan Mendesak</h2>
                        <button onClick={() => handleNavigate('requests')} className="text-sm font-semibold text-[var(--primary-color)] hover:underline">Lihat Semua</button>
                    </div>
                    {urgentRequests && urgentRequests.filter(r => r.type === 'Mendesak').length > 0 ? (
                         <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4">
                            {urgentRequests.filter(r => r.type === 'Mendesak').map(req => (
                                <div key={req.id} onClick={() => handleNavigate(`request-detail/${req.id}`)} className="bg-white/80 backdrop-blur-sm dark:bg-[var(--dark-card)] rounded-lg p-3 shadow-md border border-[var(--light-gray-border)] dark:border-gray-700 cursor-pointer">
                                    <h3 className="font-semibold text-sm truncate">{req.item}</h3>
                                    <p className="text-xs text-gray-800 dark:text-gray-200 mt-1">Oleh: {req.organization}</p>
                                    <p className="text-xs text-[var(--gray-text)] dark:text-gray-400 mt-2">{req.timeAgo}</p>
                                </div>
                            ))}
                        </div>
                        ) : (<p className="text-center text-[var(--gray-text)] text-sm py-4">Belum ada permintaan mendesak saat ini.</p>)}
                </div>

                <div className="my-4">
                    <div className="relative"><Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" placeholder="Cari Makanan, Minuman atau Kebaikan..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-full bg-[var(--light-card)] dark:bg-[var(--dark-card)] text-gray-800 dark:text-gray-100 placeholder-[var(--gray-text)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] border border-gray-200 dark:border-gray-600 shadow-sm"/></div>
                    <div className="flex space-x-2 overflow-x-auto hide-scrollbar mt-3 pb-2">{categories.map((cat) => (<button key={cat} onClick={() => setFilterCategory(cat)} className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${ filterCategory === cat ? 'btn-gradient-primary text-white shadow-md' : 'bg-[var(--light-card)] dark:bg-[var(--dark-card)] text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{cat}</button>))}</div>
                </div>

                <div className="space-y-6">
                    {loading ? <div className="flex justify-center mt-10"><LoadingSpinner/></div> :
                    (<>
                        {myDonations.length > 0 && (
                            <div>
                                <h2 className="font-bold text-lg md:text-xl text-gray-800 dark:text-gray-100 mb-3">Donasi dari Anda</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                     {myDonations.map(food => (<FoodCard key={food.id + '-mine'} food={food} onClaimFood={onClaimFood} currentUser={currentUser} handleShowToast={handleShowToast} handleNavigate={handleNavigate} />))}
                                </div>
                            </div>
                        )}
                        
                        <div>
                            <h2 className="font-bold text-lg md:text-xl text-gray-800 dark:text-gray-100 mb-3">Daftar Pemberian</h2>
                             {otherDonations.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    {otherDonations.map(food => (<FoodCard key={food.id + '-desktop'} food={food} onClaimFood={onClaimFood} currentUser={currentUser} handleShowToast={handleShowToast} handleNavigate={handleNavigate} />))}
                                </div>
                            ) : (<div className="text-center text-[var(--gray-text)] mt-8 p-6 bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-md border border-[var(--light-gray-border)] dark:border-gray-700"><Utensils size={40} className="mx-auto text-gray-400 mb-3" /><p className="text-base font-semibold mb-1">Tidak ada donasi lain saat ini.</p></div>)}
                        </div>
                    </>)}
                </div>
            </div>
        </div>
    );
};
const ProfileScreen = ({ user, onLogout, onNavigate, onShowNotifications, unreadCount }) => { 
    return (
        <div className="flex flex-col h-full bg-transparent">
            <Header title="Profil" onShowNotifications={onShowNotifications} unreadCount={unreadCount} primary={true} />
            <div className="flex-grow overflow-y-auto p-4 md:p-8 pb-24 md:pb-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] p-4 shadow-sm flex flex-col items-center text-center rounded-xl h-full">
                            <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full border-4 border-emerald-200 object-cover" onError={(e) => { e.target.src=`https://placehold.co/100x100/061346/FFFFFF?text=${user.name.charAt(0)}`; }}/>
                            <h2 className="text-xl font-bold mt-4">{user.name}</h2>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                            <p className="text-sm text-[var(--gray-text)] dark:text-gray-400">{user.email}</p>
                            <p className="text-sm text-[var(--gray-text)] dark:text-gray-400">{user.phone}</p>
                            <p className="mt-2 text-sm font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100 px-3 py-1 rounded-full">{user.level}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-gradient-to-br from-[var(--cream)] to-white/80 dark:from-[var(--dark-card)] dark:to-gray-800 text-gray-800 dark:text-white p-4 rounded-xl shadow-lg"><h3 className="font-bold text-lg flex items-center text-[var(--primary-color)] dark:text-emerald-400"><Heart size={20} className="mr-2"/> Jejak Kepedulian Saya</h3><p className="mt-2 text-base">Anda telah peduli pada <span className="font-bold text-2xl">{user.familiesCaredFor || 0}</span> kesempatan bulan ini.</p><p className="mt-1 text-sm">Poin Kebaikan: <span className="font-bold">{user.points || 0}</span></p></div>
                        <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm border border-[var(--light-gray-border)] dark:border-gray-700">
                             <button onClick={() => onNavigate('redeem-points')} className="flex items-center w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors justify-between text-gray-800 dark:text-gray-200"><span className="flex items-center"><Award size={20} className="mr-3 text-yellow-500" /> Tukar Poin Kebaikan</span><ChevronRight size={20} className="text-gray-400" /></button>
                             <button onClick={() => onNavigate('activities')} className="flex items-center w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors justify-between text-gray-800 dark:text-gray-200 border-t border-[var(--light-gray-border)] dark:border-gray-700"><span className="flex items-center"><ClipboardList size={20} className="mr-3 text-[var(--primary-color)]" /> Aktivitas Saya</span><ChevronRight size={20} className="text-gray-400" /></button>
                            <button onClick={() => onNavigate('account-settings')} className="flex items-center w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors justify-between text-gray-800 dark:text-gray-200 border-t border-[var(--light-gray-border)] dark:border-gray-700"><span className="flex items-center"><Settings size={20} className="mr-3 text-[var(--gray-text)]" /> Pengaturan Akun</span><ChevronRight size={20} className="text-gray-400" /></button>
                             <button onClick={() => onNavigate('about-us')} className="flex items-center w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors justify-between text-gray-800 dark:text-gray-200 border-t border-[var(--light-gray-border)] dark:border-gray-700"><span className="flex items-center"><Info size={20} className="mr-3 text-[var(--gray-text)]" /> Tentang NURISHARE</span><ChevronRight size={20} className="text-gray-400" /></button>
                            <button onClick={() => onNavigate('help-center')} className="flex items-center w-full p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors justify-between text-gray-800 dark:text-gray-200 border-t border-[var(--light-gray-border)] dark:border-gray-700"><span className="flex items-center"><HelpCircle size={20} className="mr-3 text-[var(--gray-text)]" /> Pusat Bantuan & FAQ</span><ChevronRight size={20} className="text-gray-400" /></button>
                        </div>
                        <button onClick={onLogout} className="btn-gradient-danger hover:opacity-90 text-white font-semibold py-3 px-6 rounded-full w-full shadow-lg transition-colors flex items-center justify-center"><LogOut size={18} className="mr-2"/> Keluar Akun</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const NotificationsScreen = ({ notifications, onBack, onMarkAsRead, onDeleteNotification, onMarkAllRead, onClearHistory, onNotifClick, onShowNotifications, unreadCount }) => {
    return (
        <div className="flex flex-col h-full bg-transparent">
            <Header title="Notifikasi" onBack={onBack} onShowNotifications={onShowNotifications} unreadCount={unreadCount} primary={true} />
            <div className="flex-grow overflow-y-auto p-4 pb-24 md:pb-4 max-w-2xl mx-auto w-full">
                <div className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800 border-b border-[var(--light-gray-border)] dark:border-gray-700 sticky top-0 rounded-t-xl">
                    <button onClick={onMarkAllRead} className="text-sm text-[var(--primary-color)] font-semibold flex items-center gap-1">
                        <CheckCircle size={16}/> Tandai semua dibaca
                    </button>
                    <button onClick={onClearHistory} className="text-sm text-[var(--danger-color)] font-semibold flex items-center gap-1">
                        <Trash2 size={16}/> Hapus Semua
                    </button>
                </div>
                <div className="space-y-3 mt-4">
                    {notifications.length > 0 ? (
                        notifications.map(notif => (
                            <div key={notif.id} className={`p-4 flex items-center gap-3 transition-colors rounded-lg shadow-sm border border-transparent dark:border-gray-700 ${!notif.read ? 'bg-[var(--cream)] dark:bg-[var(--dark-card)]' : 'bg-[var(--light-card)] dark:bg-[var(--dark-card)]'}`}>
                                <div className="flex-grow cursor-pointer" onClick={() => onNotifClick(notif)}><p className="text-gray-800 dark:text-gray-200 text-sm">{notif.text}</p><p className="text-xs text-[var(--gray-text)] mt-1">{notif.timeAgo}</p></div>
                                <div className="flex items-center gap-2">
                                    {!notif.read && (<button onClick={() => onMarkAsRead(notif.id)} className="p-1 text-gray-400 hover:text-[var(--success-color)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><Check size={18} /></button>)}
                                    <button onClick={() => onDeleteNotification(notif.id)} className="p-1 text-gray-400 hover:text-[var(--danger-color)] rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-[var(--gray-text)] p-10 mt-20"><Bell size={50} className="mx-auto mb-4" /><h3 className="font-semibold text-lg">Tidak Ada Notifikasi</h3><p className="text-sm">Semua notifikasi Anda akan muncul di sini.</p></div>
                    )}
                </div>
            </div>
        </div>
    );
};
const RequestsScreen = ({ requests, onCreateRequest, onHelpRequest, currentUser, handleShowToast, loading, unreadCount, onShowNotifications, onNavigate }) => {
    const [showForm, setShowForm] = useState(false);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [details, setDetails] = useState('');
    const [location, setLocation] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);

    const myRequests = requests.filter(r => r.organization === currentUser.name);
    const otherRequests = requests.filter(r => r.organization !== currentUser.name);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!itemName || !quantity || !location) { handleShowToast("Harap isi item, kuantitas, dan lokasi."); return; }
        const newRequest = { id: `ur${Date.now()}`, organization: currentUser.name, item: itemName, quantity, detail: details, location, timeAgo: 'Baru saja', type: isUrgent ? 'Mendesak' : 'Biasa' };
        onCreateRequest(newRequest); 
        setShowForm(false);
        setItemName(''); setQuantity(''); setDetails(''); setLocation(''); setIsUrgent(false);
    };

    return(
        <div className="flex flex-col h-full bg-transparent">
            <Header title="Permintaan Pangan" primary={true} onShowNotifications={onShowNotifications} unreadCount={unreadCount} />
            <div className="flex-grow overflow-y-auto p-4 pb-24 md:pb-4 max-w-5xl mx-auto w-full">
                <button onClick={() => setShowForm(!showForm)} className="btn-gradient-primary text-white font-semibold py-3 px-6 rounded-full w-full shadow-lg hover:opacity-90 transition-colors mb-4 flex items-center justify-center"><PlusCircle size={20} className="mr-2" /> {showForm ? 'Tutup Form' : 'Buat Permintaan Baru'}</button>
                {showForm && (
                    <form onSubmit={handleFormSubmit} className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-md p-4 mb-6 border border-[var(--light-gray-border)] dark:border-gray-700 space-y-3">
                        <h3 className="font-bold text-lg">Form Permintaan Baru</h3>
                         <div><label htmlFor="reqItem" className="block text-sm font-semibold mb-1">Item Dibutuhkan:*</label><input type="text" id="reqItem" value={itemName} onChange={e => setItemName(e.target.value)} className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent" placeholder="Nasi Kotak, Sayuran Segar" required /></div>
                         <div><label htmlFor="reqQuantity" className="block text-sm font-semibold mb-1">Kuantitas:*</label><input type="text" id="reqQuantity" value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent" placeholder="50 kotak, 10 kg" required /></div>
                         <div><label htmlFor="reqLocation" className="block text-sm font-semibold mb-1">Lokasi Penyaluran:*</label><input type="text" id="reqLocation" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent" placeholder="Panti Asuhan Pelita Harapan, Jl. Kasih" required /></div>
                         <div><label htmlFor="reqDetail" className="block text-sm font-semibold mb-1">Detail Tambahan:</label><textarea id="reqDetail" value={details} onChange={e => setDetails(e.target.value)} className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg h-20 bg-transparent" placeholder="Contoh: Untuk makan siang anak-anak panti"></textarea></div>
                         <div className="flex items-center"><input type="checkbox" id="isUrgent" checked={isUrgent} onChange={(e) => setIsUrgent(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)]" /><label htmlFor="isUrgent" className="ml-2 block text-sm">Tandai sebagai permintaan mendesak</label></div>
                        <button type="submit" className="btn-gradient-primary text-white font-semibold py-2 px-4 rounded-full w-full hover:opacity-90"><CheckCircle size={18} className="mr-2 inline"/> Ajukan Permintaan</button>
                    </form>
                )}
                
                 {loading ? <div className="flex justify-center mt-10"><LoadingSpinner /></div> : 
                    <div className="space-y-6">
                        {myRequests.length > 0 && (
                            <div>
                                <h2 className="font-bold text-lg mb-3">Permintaan Saya</h2>
                                <div className="space-y-3">
                                    {myRequests.map(req => (<div key={req.id} onClick={() => onNavigate(`request-detail/${req.id}`)} className={`bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border-l-4 ${req.type === 'Mendesak' ? 'border-red-500' : 'border-[var(--primary-color)]'} cursor-pointer hover:shadow-md transition-shadow`}>
                                        <h3 className="font-semibold text-base">{req.item}</h3>
                                        <p className={`text-xs font-bold mt-2 ${req.status === 'open' ? 'text-green-600' : 'text-yellow-600'}`}>Status: {req.status === 'open' ? 'Terbuka' : 'Dalam Bantuan'}</p>
                                    </div>))}
                                </div>
                            </div>
                        )}
                        <div>
                            <h2 className="font-bold text-lg mb-3">Permintaan Orang Lain</h2>
                            <div className="space-y-3">
                                {otherRequests.length > 0 ? (otherRequests.map(req => (<div key={req.id} onClick={() => onNavigate(`request-detail/${req.id}`)} className={`bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl shadow-sm p-4 border-l-4 ${req.type === 'Mendesak' ? 'border-red-500' : 'border-[var(--primary-color)]'} cursor-pointer hover:shadow-md transition-shadow`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-base">{req.item}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Oleh: <span className="font-medium">{req.organization}</span></p>
                                        </div>
                                        {req.type === 'Mendesak' && <span className="text-xs font-bold text-white bg-red-500 px-2 py-1 rounded-full">Mendesak</span>}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Lokasi: <span className="font-medium">{req.location}</span></p>
                                    <p className={`text-xs font-bold mt-2 ${req.status === 'open' ? 'text-green-600' : 'text-yellow-600'}`}>Status: {req.status === 'open' ? 'Terbuka' : 'Dalam Bantuan'}</p>
                                </div>))) : ( <p className="text-center text-[var(--gray-text)] mt-8">Belum ada permintaan dari orang lain saat ini.</p> )}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};
const AccountSettingsScreen = ({ user, onBack, onSave, theme, setTheme, handleShowToast, unreadCount, onShowNotifications, onNavigate }) => {
    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [photo, setPhoto] = useState(user.profilePicture);
    const fileInputRef = useRef(null);

    const handleSave = () => { 
        onSave({ ...user, name, username, email, phone, profilePicture: photo }); 
        handleShowToast("Perubahan berhasil disimpan!");
    };
    
    const handlePhoneChange = (e) => {
        const sanitizedValue = e.target.value.replace(/[^0-9+]/g, '');
        setPhone(sanitizedValue);
    };

    const handlePhotoChange = (e) => {
        if(e.target.files && e.target.files[0]){
            setPhoto(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <div className="flex flex-col h-full bg-transparent">
            <Header title="Pengaturan Akun" onBack={onBack} onShowNotifications={onShowNotifications} unreadCount={unreadCount} primary={true}/>
            <div className="flex-grow overflow-y-auto p-4 pb-24 md:pb-4 max-w-2xl mx-auto w-full">
                <div className="flex flex-col items-center mt-4">
                    <div className="relative">
                        <img src={photo} alt="Profile" className="w-28 h-28 rounded-full border-4 border-white dark:border-[var(--dark-card)] object-cover shadow-lg" onError={(e) => { e.target.src=`https://placehold.co/112x112/061346/FFFFFF?text=${user.name.charAt(0)}`; }}/>
                        <input type="file" ref={fileInputRef} onChange={handlePhotoChange} className="hidden" accept="image/*"/>
                        <button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-[var(--primary-color)] p-2 rounded-full text-white shadow-md border-2 border-white"><Camera size={16} /></button>
                    </div>
                </div>
                <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl p-4 shadow-sm border border-[var(--light-gray-border)] dark:border-gray-700 mt-6 space-y-4">
                    <div><label className="block text-sm font-medium mb-1">Nama Lengkap</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent"/></div>
                    <div><label className="block text-sm font-medium mb-1">Nama Pengguna</label><input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent"/></div>
                    <div><label className="block text-sm font-medium mb-1">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent"/></div>
                    <div><label className="block text-sm font-medium mb-1">No. Tlp</label><input type="tel" value={phone} onChange={handlePhoneChange} className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent"/></div>

                    <button onClick={() => onNavigate('change-password')} className="text-sm text-[var(--primary-color)] hover:underline">Ganti Kata Sandi</button>
                </div>
                <div className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl p-4 shadow-sm border border-[var(--light-gray-border)] dark:border-gray-700 mt-6">
                    <h3 className="font-bold mb-3">Tampilan Aplikasi</h3>
                    <div className="space-y-2">
                       <label className="block text-sm font-medium mb-1">Mode</label>
                       <div className="flex items-center space-x-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                           <button onClick={() => setTheme({...theme, mode:'light'})} className={`w-full text-center rounded-full p-1.5 text-sm ${theme.mode === 'light' ? 'bg-white dark:bg-gray-500 shadow' : ''}`}><Sun size={16} className="inline mr-1"/> Terang</button>
                           <button onClick={() => setTheme({...theme, mode:'dark'})} className={`w-full text-center rounded-full p-1.5 text-sm ${theme.mode === 'dark' ? 'bg-gray-900 text-white shadow' : ''}`}><Moon size={16} className="inline mr-1"/> Gelap</button>
                       </div>
                    </div>
                </div>
                <button onClick={handleSave} className="w-full btn-gradient-primary text-white font-bold py-3 mt-6 rounded-full shadow-lg hover:opacity-90">Simpan Perubahan</button>
            </div>
        </div>
    );
};

const ChangePasswordScreen = ({ onBack, onSubmit }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Semua kolom wajib diisi.');
            return;
        }
        if (newPassword.length < 8) {
            setError('Kata sandi baru minimal 8 karakter.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Konfirmasi kata sandi baru tidak cocok.');
            return;
        }

        const result = onSubmit(currentPassword, newPassword);
        if (result && !result.success) {
            setError(result.message);
        }
    };

    return (
        <div className="flex flex-col h-full bg-transparent">
            <Header title="Ganti Kata Sandi" onBack={onBack} primary={true}/>
            <div className="flex-grow overflow-y-auto p-4 pb-24 md:pb-4 max-w-2xl mx-auto w-full">
                <form onSubmit={handleSubmit} className="bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-xl p-6 shadow-sm border border-[var(--light-gray-border)] dark:border-gray-700 mt-6 space-y-4">
                    <h2 className="text-xl font-bold text-center mb-4">Perbarui Keamanan Akun Anda</h2>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Kata Sandi Saat Ini</label>
                        <div className="relative">
                            <input 
                                type={showCurrent ? 'text' : 'password'} 
                                value={currentPassword} 
                                onChange={(e) => setCurrentPassword(e.target.value)} 
                                className="w-full p-2 pr-10 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                required 
                            />
                            <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-700">
                                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Kata Sandi Baru</label>
                         <div className="relative">
                            <input 
                                type={showNew ? 'text' : 'password'} 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                                className="w-full p-2 pr-10 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                placeholder="Minimal 8 karakter"
                                required 
                            />
                             <button type="button" onClick={() => setShowNew(!showNew)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-700">
                                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-1">Konfirmasi Kata Sandi Baru</label>
                        <div className="relative">
                            <input 
                                type={showConfirm ? 'text' : 'password'}
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                                className="w-full p-2 pr-10 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
                                required 
                            />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-700">
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                    
                    {error && <p className="text-[var(--danger-color)] text-sm text-center">{error}</p>}

                    <button type="submit" className="w-full btn-gradient-primary text-white font-bold py-3 mt-6 rounded-full shadow-lg hover:opacity-90 flex items-center justify-center">
                        <CheckCircle size={20} className="mr-2"/>
                        Ganti Kata Sandi
                    </button>
                </form>
            </div>
        </div>
    );
};

const HelpCenterScreen = ({ onBack, unreadCount, onShowNotifications }) => {
    const faqs = [
        { q: "Apa itu NURISHARE?", a: "NURISHARE adalah platform komunitas yang bertujuan untuk mengurangi limbah makanan dengan menghubungkan mereka yang memiliki makanan berlebih dengan yang membutuhkan, didasari oleh semangat kepedulian (care)." },
        { q: "Bagaimana cara membagikan makanan?", a: "Klik tombol '+' di navigasi bawah, isi detail makanan yang ingin Anda bagikan, lalu publikasikan. Pastikan informasi yang Anda berikan jelas dan akurat." },
        { q: "Bagaimana cara mengklaim makanan?", a: "Telusuri daftar makanan yang tersedia di halaman utama. Jika menemukan yang Anda inginkan, klik pada kartu makanan lalu tekan tombol 'Klaim Kepedulian' dan ikuti instruksi untuk pengambilan." },
        { q: "Bagaimana Poin Kebaikan bekerja?", a: "Anda mendapatkan poin untuk setiap aksi positif, seperti membagikan makanan. Poin ini akan meningkatkan Level Kepedulian Anda, sebagai bentuk apresiasi atas kontribusi Anda." }
    ];
    const [openFaq, setOpenFaq] = useState(null);
    return (
        <div className="flex flex-col h-full bg-transparent">
            <Header title="Pusat Bantuan" onBack={onBack} onShowNotifications={onShowNotifications} unreadCount={unreadCount} primary={true}/>
            <div className="flex-grow overflow-y-auto p-4 pb-24 md:pb-4 max-w-2xl mx-auto w-full">
                <h2 className="text-xl font-bold mb-4">Pertanyaan Umum (FAQ)</h2>
                <div className="space-y-2">{faqs.map((faq, index) => (<div key={index} className="border-b dark:border-gray-700 bg-[var(--light-card)] dark:bg-[var(--dark-card)] rounded-lg"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full flex justify-between items-center text-left p-4"><span className="font-semibold">{faq.q}</span><ChevronDown className={`transform transition-transform ${openFaq === index ? 'rotate-180' : ''}`} size={20} /></button>{openFaq === index && <div className="p-4 pt-0 text-gray-600 dark:text-gray-300"><p>{faq.a}</p></div>}</div>))}</div>
                <div className="mt-8 bg-[var(--light-card)] dark:bg-[var(--dark-card)] p-4 rounded-lg shadow-sm border border-[var(--light-gray-border)] dark:border-gray-700"><h3 className="font-bold text-lg mb-2">Butuh Bantuan Lain?</h3><p>Jika Anda memiliki pertanyaan lain, hubungi tim kami di <a href="mailto:dukungan@nurishare.app" className="text-[var(--primary-color)] font-semibold">dukungan@nurishare.app</a>.</p></div>
            </div>
        </div>
    );
};
const AboutUsScreen = ({ onBack, unreadCount, onShowNotifications }) => {
    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-[var(--cream)] to-white dark:from-[var(--dark-card)] dark:to-black">
            <Header title="Tentang NURISHARE" onBack={onBack} onShowNotifications={onShowNotifications} unreadCount={unreadCount} primary={true}/>
            <div className="flex-grow overflow-y-auto p-6 pb-24 md:pb-4 text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 max-w-2xl mx-auto w-full">
                <div className="text-center">
                    <LogoWithName 
                        className="justify-center" 
                        nameHandColor="var(--primary-color)" 
                        nameLeafColor="var(--success-color)" 
                        textHandColor="var(--primary-color)"
                        textLeafColor="var(--success-color)"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-4">An Ecosystem of Care</h2>
                <p>Nama NURISHARE terinspirasi dari tiga nilai utama: <strong className="text-[var(--primary-color)]">Nourish</strong> (Memberi Gizi), <strong className="text-[var(--success-color)]">Share</strong> (Berbagi), dan <strong className="text-[var(--primary-color)]">Care</strong> (Kepedulian).</p>
                <p>'Care' atau kepedulian, menjadi detak jantung dari setiap aksi berbagi di platform kami. Kami percaya bahwa setiap tindakan berbagi bukan hanya soal transfer makanan, tetapi juga transfer empati dan kehangatan.</p>
                <p>Misi kami adalah membangun ekosistem di mana tidak ada makanan yang terbuang dan tidak ada seorang pun yang kelaparan, semua didasari oleh rasa kepedulian satu sama lain. Terima kasih telah menjadi bagian dari gerakan ini.</p>
            </div>
        </div>
    );
};
const HelpRequestModal = ({ request, onClose, onConfirmHelp }) => {
    if (!request) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-b from-[var(--cream)] to-white dark:from-[var(--dark-card)] dark:to-black rounded-xl shadow-2xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto relative text-gray-800 dark:text-gray-200">
                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"><XCircle size={24} /></button>
                <h3 className="text-xl font-bold mb-2 flex items-center text-[var(--primary-color)]"><Heart size={22} className="mr-2"/>Bantu Permintaan Ini?</h3>
                <div className="mb-4 p-3 bg-white/50 dark:bg-black/20 border-l-4 border-[var(--primary-color)] rounded-r-lg">
                    <p className="font-semibold">{request.item} untuk {request.organization}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{request.detail}</p>
                </div>
                <p className="text-sm">Dengan mengklik 'Ya', Anda berkomitmen untuk menyediakan bantuan ini. Aksi Anda akan tercatat di halaman Aktivitas.</p>
                <button onClick={() => onConfirmHelp(request)} className="mt-6 w-full btn-gradient-primary text-white font-bold py-2.5 rounded-full shadow-lg hover:opacity-90">Ya, Saya akan Bantu</button>
            </div>
        </div>
    );
};
const NotificationDetailModal = ({ notification, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-b from-[var(--cream)] to-white dark:from-[var(--dark-card)] dark:to-black rounded-xl shadow-2xl p-6 w-full max-w-sm relative text-gray-800 dark:text-gray-200">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"><XCircle size={24} /></button>
            <h3 className="text-xl font-bold mb-4">Detail Notifikasi</h3>
            <p className="text-sm">{notification.text}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">{notification.timeAgo}</p>
        </div>
    </div>
);


const SuccessModal = ({ title, message, buttonText, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-b from-[var(--cream)] to-white dark:from-[var(--dark-card)] dark:to-black rounded-xl shadow-2xl p-8 w-full max-w-sm relative text-center text-gray-800 dark:text-gray-200">
           <PartyPopper size={60} className="mx-auto text-[var(--primary-color)] mb-4"/>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="mb-6">{message}</p>
            <button onClick={onClose} className="w-full btn-gradient-primary text-white font-bold py-3 rounded-lg transition-colors shadow-lg">{buttonText}</button>
        </div>
    </div>
);

const ImageZoomModal = ({ imageUrl, onClose }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
            <XCircle size={32} />
        </button>
        <img src={imageUrl} alt="Zoomed" className="max-w-full max-h-full rounded-lg" />
    </div>
);


const PaymentScreen = ({ item, onBack, onPaymentSuccess }) => {
    const [selectedMethod, setSelectedMethod] = useState(null);

    const handlePayment = () => {
        if (!selectedMethod) {
            alert("Pilih metode pembayaran terlebih dahulu.");
            return;
        }
        onPaymentSuccess(selectedMethod);
    };

    const paymentMethods = [
        { name: 'mBanking', icon: CreditCard, details: 'Virtual Account: 123-456-7890' },
        { name: 'OVO', icon: Smartphone, details: 'Bayar ke nomor 0812-xxxx-xxxx' },
        { name: 'Dana', icon: Smartphone, details: 'Bayar ke nomor 0812-xxxx-xxxx' },
        { name: 'Cash on Delivery (COD)', icon: Truck, details: 'Bayar di tempat saat pengambilan' },
    ];

    return (
        <div className="flex flex-col h-full bg-transparent">
            <Header title="Pembayaran" onBack={onBack} primary />
            <div className="flex-grow p-4 md:p-8 space-y-4 pb-24 md:pb-4 max-w-5xl mx-auto w-full md:grid md:grid-cols-2 md:gap-8">
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white dark:bg-[var(--dark-card)] p-4 rounded-xl shadow">
                        <h2 className="font-bold text-lg">Detail Pesanan</h2>
                        <div className="flex justify-between mt-2 text-sm">
                            <span>{item.category} (x{item.claimedQuantity})</span>
                            <span>Rp {(item.price * item.claimedQuantity).toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between mt-2 pt-2 border-t border-dashed font-bold">
                            <span>Total Pembayaran</span>
                            <span>Rp {(item.price * item.claimedQuantity).toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    {selectedMethod && (
                         <div className="bg-white dark:bg-[var(--dark-card)] p-4 rounded-xl shadow">
                            <h2 className="font-bold text-lg mb-2">Instruksi Pembayaran</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{selectedMethod.details}</p>
                        </div>
                    )}
                </div>
                <div className="md:col-span-1 bg-white dark:bg-[var(--dark-card)] p-4 rounded-xl shadow">
                    <h2 className="font-bold text-lg mb-3">Pilih Metode Pembayaran</h2>
                    <div className="space-y-2">
                        {paymentMethods.map(method => {
                            const Icon = method.icon;
                            return (
                                <button key={method.name} onClick={() => setSelectedMethod(method)} className={`w-full flex items-center p-3 rounded-lg border-2 transition-colors ${selectedMethod?.name === method.name ? 'border-[var(--primary-color)] bg-[var(--cream)]' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                    <Icon className="mr-3 text-[var(--primary-color)]" />
                                    <span>{method.name}</span>
                                    {selectedMethod?.name === method.name && <CheckCircle size={20} className="ml-auto text-[var(--success-color)]" />}
                                </button>
                            )
                        })}
                    </div>
                </div>

            </div>
            <div className="fixed bottom-16 left-0 right-0 p-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 z-30 md:static md:bottom-auto md:w-1/2 md:mx-auto md:p-0 md:mb-4">
                 <button onClick={handlePayment} disabled={!selectedMethod} className="w-full btn-gradient-primary text-white font-bold py-3 px-5 rounded-full shadow-lg flex items-center justify-center text-sm transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                     Bayar Sekarang
                 </button>
            </div>
        </div>
    )
}

const ClaimProofModal = ({ claim, onClose }) => {
    if(!claim) return null;
    return (
         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[var(--dark-card)] p-6 rounded-2xl w-full max-w-sm text-center relative">
                 <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700">
                    <XCircle size={24} />
                </button>
                <h2 className="text-xl font-bold mb-2 text-[var(--primary-color)]">Bukti Klaim</h2>
                <p className="mb-4 text-sm text-gray-600">Tunjukkan kode ini kepada donatur.</p>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                     <p className="text-lg font-semibold">{claim.category} (x{claim.claimedQuantity})</p>
                     <p className="text-sm text-gray-500">Dari: {claim.giver}</p>
                </div>
                <div className="p-4 border-2 border-dashed border-[var(--primary-color)] rounded-lg">
                    <p className="text-3xl font-bold tracking-widest text-gray-800 dark:text-gray-200">{claim.id.slice(-6).toUpperCase()}</p>
                </div>
            </div>
        </div>
    )
}

const RatingModal = ({ item, onClose, onSubmitRating }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[var(--dark-card)] p-6 rounded-2xl w-full max-w-sm relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"><XCircle size={24} /></button>
                <h2 className="text-xl font-bold mb-2">Beri Rating</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Beri rating untuk donasi "{item.item || item.category}" dari {item.giver || item.organization}.</p>
                <div className="flex justify-center my-4">
                    {[1, 2, 3, 4, 5].map(star => (
                        <button key={star} onClick={() => setRating(star)}>
                            <Star size={36} className={`cursor-pointer ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        </button>
                    ))}
                </div>
                <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Tulis komentar (opsional)..." className="w-full p-2 border border-[var(--light-gray-border)] dark:border-gray-600 rounded-lg bg-transparent h-24 mb-4"/>
                <button onClick={() => onSubmitRating(item.id, rating, comment)} className="w-full btn-gradient-primary text-white font-bold py-3 rounded-lg">Kirim Rating</button>
            </div>
        </div>
    );
};

const ConfirmLogoutModal = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl shadow-2xl p-6 w-full max-w-sm text-center text-white">
                <h2 className="text-2xl font-bold mb-2">Yakin Ingin Keluar?</h2>
                <p className="text-gray-300 mb-6">Anda harus login kembali untuk melanjutkan.</p>
                <div className="flex justify-center gap-4">
                    <button onClick={onCancel} className="w-full bg-gray-600 hover:bg-gray-500 font-semibold py-2 px-4 rounded-lg transition-colors">Batal</button>
                    <button onClick={onConfirm} className="w-full btn-gradient-danger hover:opacity-90 font-semibold py-2 px-4 rounded-lg transition-colors">Ya, Keluar</button>
                </div>
            </div>
        </div>
    );
};


function App() {
  const [appState, setAppState] = useState('splash');
  const [currentUser, setCurrentUser] = useState(null);
  const [authScreen, setAuthScreen] = useState('login');
  
  const [history, setHistory] = useState(['home']);
  const activeRoute = history[history.length - 1];
  const activeTab = activeRoute.split('/')[0];

  const [foodList, setFoodList] = useState(initialFoodList);
  const [claimHistory, setClaimHistory] = useState([]);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [urgentRequests, setUrgentRequests] = useState(initialUrgentRequests);
  const [donatedItems, setDonatedItems] = useState([]);
  
  const [toastMessage, setToastMessage] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showResetSuccessModal, setShowResetSuccessModal] = useState(false);
  const [showClaimProof, setShowClaimProof] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showNotifDetail, setShowNotifDetail] = useState(null);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [paymentItem, setPaymentItem] = useState(null);
  const [recipeModalItem, setRecipeModalItem] = useState(null);
  const [ratingItem, setRatingItem] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);


  
  const [theme, setTheme] = useState({ mode: 'light', color: 'navy' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme.mode);
    
    Object.keys(PALETTE).forEach(key => {
        root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, PALETTE[key]);
    });
     root.style.setProperty('--primary-color', PALETTE.primaryAccent);
     root.style.setProperty('--primary-color-dark', THEMES.navy.dark);


  }, [theme]);
  
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
        setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);
  
  const myDonations = useMemo(() => {
    if (!currentUser) return [];
    const regularDonations = foodList.filter(food => food.giver === currentUser.name);
    const helpDonations = donatedItems.filter(item => item.giver === currentUser.name);
    return [...regularDonations, ...helpDonations];
  }, [foodList, donatedItems, currentUser]);

  const handleShowToast = useCallback((message) => { setToastMessage(message); }, []);

  const handleLogin = (user) => { 
    setCurrentUser(user); 
    setAppState('main'); 
    let message = `Selamat datang kembali, ${user.name}!`;
    if(user.isNewUser){
        message = `Selamat datang di NURISHARE, ${user.name}! Akun Anda berhasil dibuat.`;
        simulatedUsers[user.email].isNewUser = false; 
        setNotifications(prev => [{id: `notif-${Date.now()}`, text: message, timeAgo: 'Baru saja', read: false}, ...prev]);
    } else {
        setNotifications(prev => [{id: `notif-${Date.now()}`, text: message, timeAgo: 'Baru saja', read: false}, ...prev]);
    }
    handleShowToast(message);
    
  };
  const handleRegister = (newUser) => { 
      simulatedUsers[newUser.email] = newUser; 
      setShowWelcomeModal(true);
  };
  const handleLogout = () => { 
      setShowLogoutModal(false);
      setAppState('auth'); 
      setCurrentUser(null); 
      setHistory(['home']); 
      handleShowToast('Anda telah berhasil keluar.');
      setClaimHistory([]); 
      setNotifications([]);
  };
  
  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    simulatedUsers[updatedUser.email] = { ...simulatedUsers[updatedUser.email], ...updatedUser };
    handleShowToast("Informasi akun berhasil diperbarui.");
  };
  
  const handleResetSuccess = () => {
    setShowResetSuccessModal(true);
  };

  const handleChangePassword = (currentPassword, newPassword) => {
    if (simulatedUsers[currentUser.email].password !== currentPassword) {
        return { success: false, message: "Kata sandi saat ini salah." };
    }
    simulatedUsers[currentUser.email].password = newPassword;
    const updatedUser = { ...currentUser, password: newPassword };
    setCurrentUser(updatedUser);
    handleShowToast("Kata sandi berhasil diubah!");
    handleBack();
    return { success: true };
  };

  const handleNavigate = (tab, reset = false) => {
      if (reset) { setHistory([tab]); }
      else { setHistory(prev => [...prev, tab]); }
  };
  
  const handleBack = () => { 
      if(paymentItem) {
          setPaymentItem(null);
          return;
      }
      if(history.length > 1) setHistory(prev => prev.slice(0, -1)); 
  };
  
  const processClaim = (item, quantity) => {
    const claimId = `claim-${Date.now()}`;
    const newClaim = { ...item, claimedQuantity: quantity, id: claimId, status: 'claimed' };
    
    setClaimHistory(prev => [newClaim, ...prev]);
    
    setFoodList(prevList => prevList.map(food => 
        food.id === item.id ? { ...food, stock: food.stock - quantity, status: food.stock - quantity <= 0 ? 'claimed' : food.status } : food
    ));
    
    handleShowToast(`Klaim ${item.category} berhasil!`);
    setNotifications(prev => [
        {id: `notif-${Date.now()}`, text: `Anda berhasil mengklaim ${quantity} ${item.category}.`, timeAgo: 'Baru saja', read: false},
        ...prev
    ]);
    
    handleNavigate('activities', true);
  };

  const handleClaimFood = (item, quantity) => {
    if(item.price > 0){
        setPaymentItem({ ...item, claimedQuantity: quantity });
    } else {
        processClaim(item, quantity);
    }
  };
  
  const handlePaymentSuccess = (method) => {
      handleShowToast(`Pembayaran dengan ${method.name} berhasil!`);
      processClaim(paymentItem, paymentItem.claimedQuantity);
      setPaymentItem(null);
  }

  const handleConfirmHelp = (request) => {
      const donationId = `don-${Date.now()}`;
      // Buat item donasi baru untuk pelacakan di halaman aktivitas
      const newDonation = {
          id: donationId,
          item: request.item,
          quantity: request.quantity,
          giver: currentUser.name,
          receiver: request.organization,
          status: 'delivered_by_helper', // Status awal donasi
          isRequestFulfillment: true, // Tandai ini sebagai pemenuhan permintaan
          requestId: request.id
      };
      setDonatedItems(prev => [...prev, newDonation]);

      // Buat item klaim untuk si penerima
      const newClaimForReceiver = {
          id: donationId, // Gunakan ID yang sama untuk sinkronisasi
          item: request.item,
          quantity: request.quantity,
          giver: currentUser.name,
          status: 'delivered_by_helper',
          isRequestFulfillment: true,
          requestId: request.id
      };
      setClaimHistory(prev => [...prev, newClaimForReceiver]);

      // Ubah status permintaan asli
      setUrgentRequests(prev => prev.map(r => r.id === request.id ? { ...r, status: 'being_helped' } : r));

      // Notifikasi untuk pemohon dan donatur
      setNotifications(prev => [{id: `notif-${Date.now()}-1`, text: `${currentUser.name} akan membantu permintaan Anda untuk "${request.item}".`, timeAgo: 'Baru saja', read: false, for: request.organization }, ...prev]);
      setNotifications(prev => [{id: `notif-${Date.now()}-2`, text: `Terima kasih! Komitmen Anda untuk membantu "${request.item}" telah dicatat.`, timeAgo: 'Baru saja', read: false }, ...prev]);
      
      handleShowToast("Terima kasih! Komitmen bantuan Anda telah dikonfirmasi.");
      setShowHelpModal(false);
      handleNavigate('activities', true);
  }

  const handleConfirmCollection = (itemId) => {
      // Update di daftar donasi helper
      setDonatedItems(prev => prev.map(d => d.id === itemId ? { ...d, status: 'collected' } : d));
      // Update di daftar klaim receiver
      setClaimHistory(prev => prev.map(c => c.id === itemId ? { ...c, status: 'collected' } : c));
      
      const item = donatedItems.find(d=>d.id === itemId) || claimHistory.find(c=>c.id === itemId);
      const itemName = item.item || item.category
      
      // Notifikasi untuk helper dan receiver
      setNotifications(prev => [{id: `notif-${Date.now()}-1`, text: `Bantuan Anda untuk "${itemName}" telah dikonfirmasi oleh penerima.`, timeAgo: 'Baru saja', read: false}, ...prev]);
      setNotifications(prev => [{id: `notif-${Date.now()}-2`, text: `Anda telah mengonfirmasi penerimaan "${itemName}". Jangan lupa beri rating!`, timeAgo: 'Baru saja', read: false, for: item.receiver}, ...prev]);

      handleShowToast("Penerimaan bantuan telah dikonfirmasi.");
  };
  
  const handleSubmitRating = (itemId, rating, comment) => {
      const claimToUpdate = claimHistory.find(c => c.id === itemId);
      
      setClaimHistory(prev => prev.map(c => c.id === itemId ? { ...c, isRated: true, rating, comment, status: 'completed' } : c));
      
      setDonatedItems(prev => prev.map(d => d.id === itemId ? { ...d, status: 'completed' } : d));

      // Beri poin pada donatur
      // (asumsi kita perlu mencari user donatur, tapi di simulasi kita update currentUser saja)
      handleShowToast("Rating berhasil dikirim! Donatur akan mendapat poin kebaikan.");
      
      const itemName = claimToUpdate.item || claimToUpdate.category;
      setNotifications(prev => [{id: `notif-${Date.now()}-1`, text: `Anda mendapat rating ${rating} bintang untuk bantuan "${itemName}"!`, timeAgo: 'Baru saja', read: false, for: claimToUpdate.giver}, ...prev]);

      setRatingItem(null);
  };


  const handlePostFood = (newFood) => {
    const newPoints = (currentUser.points || 0) + 15;
    const level = newPoints > 100 ? "Pahlawan Nutrisi" : newPoints > 50 ? "Agen Kebaikan" : "Donatur Baik Hati";
    setCurrentUser(prev => ({ ...prev, points: newPoints, level }));
    const foodWithGiver = { ...newFood, giver: currentUser.name, giverRating: 0 };
    setFoodList(prevList => [foodWithGiver, ...prevList]);
    setNotifications(prev => [{id: `notif-${Date.now()}`, text: `Terima kasih! Donasi "${newFood.category}" Anda telah dibagikan.`, timeAgo: 'Baru saja', read: false}, ...prev]);
    handleShowToast('Terima kasih atas kepedulian Anda!');
    handleNavigate('home', true);
  };
  
  const handleCreateRequest = (newRequest) => {
    setUrgentRequests(prev => [newRequest, ...prev]);
    handleShowToast('Permintaan berhasil dibuat!');
  };

  const handleMarkAsRead = (id) => { setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n)); };
  const handleMarkAllRead = () => { setNotifications(prev => prev.map(n => ({ ...n, read: true }))); };
  const handleDeleteNotification = (id) => { setNotifications(prev => prev.filter(n => n.id !== id)); };
  const handleDeleteAllNotifications = () => { setNotifications([]); handleShowToast('Semua notifikasi dihapus.'); };

  const handleRedeemPoints = (item) => {
      if(currentUser.points < item.cost) {
          handleShowToast("Poin Anda tidak cukup!");
          return;
      }
      const remainingPoints = currentUser.points - item.cost;
      setCurrentUser(prev => ({...prev, points: remainingPoints}));
      handleShowToast(`Anda berhasil menukar ${item.name}!`);
      setNotifications(prev => [{id: `notif-${Date.now()}`, text: `Anda menukar ${item.cost} poin untuk ${item.name}.`, timeAgo: 'Baru saja', read: false}, ...prev]);
  }

  const renderScreen = () => {
    if(paymentItem) {
        return <PaymentScreen item={paymentItem} onBack={handleBack} onPaymentSuccess={handlePaymentSuccess} />
    }
    
    const page = activeRoute.split('/')[0];
    const pageId = activeRoute.split('/')[1] || null;

    const commonProps = { currentUser, handleNavigate, handleShowToast, loading, onShowNotifications: () => handleNavigate('notifications'), unreadCount, onNavigate: handleNavigate };
    
    const pageProps = {
        home: { foodList, onClaimFood: handleClaimFood, onHelpRequest: (req) => { setSelectedRequest(req); setShowHelpModal(true); }, urgentRequests, ...commonProps },
        requests: { requests: urgentRequests, onCreateRequest: handleCreateRequest, ...commonProps },
        post: { onPostFood: handlePostFood, ...commonProps },
        activities: { myDonations, myClaims: claimHistory, onConfirmCollection: handleConfirmCollection, onRate: (item) => setRatingItem(item), onShowClaimProof: (claim) => setShowClaimProof(claim), ...commonProps },
        profile: { user: currentUser, onLogout: () => setShowLogoutModal(true), ...commonProps },
        'food-detail': { foodId: pageId, foodList, onClaimFood: handleClaimFood, onBack: handleBack, ...commonProps, onShowRecipeModal: (item) => setRecipeModalItem(item), setZoomedImage },
        'request-detail': { requestId: pageId, requests: urgentRequests, onHelpRequest: (req) => { setSelectedRequest(req); setShowHelpModal(true); }, onBack: handleBack, ...commonProps },
        notifications: { notifications, onMarkAsRead: handleMarkAsRead, onMarkAllRead: handleMarkAllRead, onDeleteNotification: handleDeleteNotification, onClearHistory: handleDeleteAllNotifications, onNotifClick: (notif) => setShowNotifDetail(notif), onBack: handleBack, ...commonProps },
        'account-settings': { user: currentUser, onSave: handleUpdateUser, theme, setTheme, onBack: handleBack, ...commonProps },
        'change-password': { onBack: handleBack, onSubmit: handleChangePassword, ...commonProps },
        'help-center': { onBack: handleBack, ...commonProps },
        'about-us': { onBack: handleBack, ...commonProps },
        'redeem-points': { onBack: handleBack, user: currentUser, handleShowToast, onRedeem: handleRedeemPoints, ...commonProps },
        'forgot-password': { onBack: () => handleNavigate('account-settings', true), onResetSuccess: handleResetSuccess, handleShowToast: handleShowToast, onGoToRegister: () => onNavigate('register', true) }
    };

    const pages = {
        home: HomeScreen,
        requests: RequestsScreen,
        post: PostFoodScreen,
        activities: MyItemsScreen,
        profile: ProfileScreen,
        'food-detail': FoodDetailScreen,
        'request-detail': ({requestId, requests, onHelpRequest, onBack, currentUser}) => {
             const request = requests.find(r => r.id === requestId);
             if(!request) return <div className="p-4">Permintaan tidak ditemukan.</div>
             return (
                 <div className="flex flex-col h-full bg-transparent">
                    <Header title="Detail Permintaan" onBack={onBack} primary />
                    <div className="flex-grow p-4 space-y-4 max-w-2xl mx-auto w-full">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow space-y-2">
                             <h2 className="text-xl font-bold">{request.item}</h2>
                             <p>Oleh: <span className="font-semibold">{request.organization}</span></p>
                             <p>Jumlah: <span className="font-semibold">{request.quantity}</span></p>
                             <p>Lokasi: <span className="font-semibold">{request.location}</span></p>
                             <p>Detail: {request.detail}</p>
                             <p className={`text-sm font-bold mt-2 ${request.status === 'open' ? 'text-green-600' : 'text-yellow-600'}`}>Status: {request.status === 'open' ? 'Terbuka' : 'Dalam Bantuan'}</p>
                        </div>
                        { currentUser.name !== request.organization &&
                            <button onClick={() => onHelpRequest(request)} disabled={request.status !== 'open'} className="w-full btn-gradient-primary text-white font-bold py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed">Saya Mau Bantu</button>
                        }
                    </div>
                 </div>
             )
        },
        notifications: NotificationsScreen,
        'account-settings': AccountSettingsScreen,
        'change-password': ChangePasswordScreen,
        'help-center': HelpCenterScreen,
        'about-us': AboutUsScreen,
        'redeem-points': ({onBack, user, handleShowToast, onRedeem}) => (
            <div className="flex flex-col h-full bg-transparent">
                <Header title="Tukar Poin" onBack={onBack} primary />
                <div className="flex-grow overflow-y-auto p-4 pb-24 md:pb-4 max-w-2xl mx-auto w-full">
                    <div className="bg-white dark:bg-[var(--dark-card)] p-4 rounded-xl shadow text-center mb-4">
                        <p className="text-sm text-gray-500">Poin Kebaikan Anda</p>
                        <p className="text-3xl font-bold text-[var(--primary-color)] flex items-center justify-center gap-2">
                           <Award size={28} className="text-yellow-500" /> {user.points}
                        </p>
                    </div>
                    <h2 className="font-bold text-lg mb-3">Tukar dengan Hadiah</h2>
                    <div className="space-y-3">
                        {redeemableItemsData.map(item => {
                            const Icon = item.icon;
                            const canRedeem = user.points >= item.cost;
                            return (
                                <div key={item.id} className="bg-white dark:bg-[var(--dark-card)] p-3 rounded-xl shadow flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Icon size={24} className="mr-3 text-[var(--primary-color)]" />
                                        <div>
                                            <p className="font-semibold">{item.name}</p>
                                            <p className="text-xs text-yellow-600 font-bold">{item.cost} Poin</p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => onRedeem(item)} 
                                        disabled={!canRedeem}
                                        className="text-xs font-semibold bg-green-600 text-white px-3 py-1.5 rounded-full hover:opacity-80 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                        Tukar
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    };
    
    const PageComponent = pages[page] || HomeScreen;
    return <PageComponent {...pageProps[page]} />;
  };
  
  if (appState === 'splash') { return <SplashScreen onFinish={() => setAppState('auth')} />; }
  if (appState === 'auth') {
    return (
      <>
        {authScreen === 'login' && <LoginScreen onLogin={handleLogin} onSwitchToRegister={() => setAuthScreen('register')} onForgotPassword={() => setAuthScreen('forgot')} />}
        {authScreen === 'register' && <RegisterScreen onRegister={handleRegister} onSwitchToLogin={() => setAuthScreen('login')} />}
        {authScreen === 'forgot' && <ForgotPasswordScreen onBack={() => setAuthScreen('login')} onResetSuccess={handleResetSuccess} handleShowToast={handleShowToast} onGoToRegister={() => setAuthScreen('register')} />}
        {showWelcomeModal && <SuccessModal title="Pendaftaran Berhasil!" message="Selamat bergabung dengan NURISHARE. Mari kita mulai berbagi kepedulian." buttonText="Lanjutkan ke Login" onClose={() => { setShowWelcomeModal(false); setAuthScreen('login'); }} />}
        {showResetSuccessModal && <SuccessModal title="Kata Sandi Diperbarui!" message="Kata sandi Anda telah berhasil diubah. Silakan login kembali." buttonText="Kembali ke Login" onClose={() => { setShowResetSuccessModal(false); setAuthScreen('login'); }} />}
      </>
    );
  }

  return (
    <div className="min-h-screen font-sans flex">
        <Nav activeTab={activeTab} onTabChange={(tab) => handleNavigate(tab, true)} />
        <main className="flex-1 md:ml-20 h-screen w-full">
             <div className="w-full h-full">
                {renderScreen()}
            </div>
        </main>
        <BottomNav activeTab={activeTab} onTabChange={(tab) => handleNavigate(tab, true)} />
      {toastMessage && <CustomToast message={toastMessage} onClose={() => setToastMessage(null)} />}
      {showHelpModal && <HelpRequestModal request={selectedRequest} onClose={() => setShowHelpModal(false)} onConfirmHelp={handleConfirmHelp} />}
      {showNotifDetail && <NotificationDetailModal notification={showNotifDetail} onClose={() => setShowNotifDetail(null)}/>}
      {showClaimProof && <ClaimProofModal claim={showClaimProof} onClose={() => setShowClaimProof(null)} />}
      {zoomedImage && <ImageZoomModal imageUrl={zoomedImage} onClose={() => setZoomedImage(null)} />}
      {recipeModalItem && <RecipeModal item={recipeModalItem} onClose={() => setRecipeModalItem(null)} />}
      {ratingItem && <RatingModal item={ratingItem} onClose={()=>setRatingItem(null)} onSubmitRating={handleSubmitRating}/>}
      {showLogoutModal && <ConfirmLogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutModal(false)} />}
    </div>
  );
}

const RecipeModal = ({ item, onClose }) => {
    const [recipe, setRecipe] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const generateRecipe = async () => {
            setLoading(true);
            const prompt = `Berikan ide resep atau cara penyajian yang menarik dan mudah dibuat untuk "${item.category}". Sertakan daftar bahan dan langkah-langkah singkat. Gunakan format Markdown dengan heading dan list.`;
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const apiKey = ""; 
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
            try {
                const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                const result = await response.json();
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "Tidak dapat memuat resep saat ini.";
                setRecipe(text);
            } catch (error) {
                console.error("Error generating recipe:", error);
                setRecipe("Gagal memuat resep. Coba lagi nanti.");
            } finally {
                setLoading(false);
            }
        };

        generateRecipe();
    }, [item]);

    // Simple markdown to HTML parser
    const renderMarkdown = (text) => {
        return text
            .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-4 mb-2">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')
            .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br />');
    };


    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[var(--primary-color)] flex items-center gap-2"><ChefHat size={22}/> Ide Resep untuk {item.category}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <XCircle size={24} />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center h-48">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(recipe) }}></div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default App;
