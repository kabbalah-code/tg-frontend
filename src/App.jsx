import React, { useState, useEffect, useRef } from 'react';
import { Camera, Gift, Users, TrendingUp, Settings, Check, X, Sparkles, Trophy, Crown, Star, Zap, ChevronRight, LogOut, HelpCircle, Copy } from 'lucide-react';

// Modern 2025 Styles
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Syne:wght@700;800&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Space Grotesk', sans-serif;
    background: #0a0a0a;
    color: #fff;
    overflow-x: hidden;
  }
  
  .title-font {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  
  .bg-primary {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  }
  
  .text-gradient {
    background: linear-gradient(135deg, #FFB800 0%, #FF6B00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .card-modern {
    background: linear-gradient(135deg, rgba(255, 184, 0, 0.05) 0%, rgba(255, 107, 0, 0.05) 100%);
    border: 1px solid rgba(255, 184, 0, 0.2);
    backdrop-filter: blur(20px);
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #FFB800 0%, #FF6B00 100%);
    color: #0a0a0a;
    font-weight: 700;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(255, 184, 0, 0.3);
  }
  
  .btn-secondary {
    background: rgba(255, 184, 0, 0.1);
    border: 1px solid rgba(255, 184, 0, 0.3);
    color: #FFB800;
    transition: all 0.3s;
  }
  
  .btn-secondary:hover {
    background: rgba(255, 184, 0, 0.2);
    border-color: #FFB800;
  }
  
  @keyframes slideLeft {
    from { transform: translateX(100%); }
    to { transform: translateX(-100%); }
  }
  
  @keyframes glow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .animate-slide {
    animation: slideLeft 20s linear infinite;
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  
  .clip-sharp {
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
  }
  
  .clip-corner {
    clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px);
  }
  
  input:focus {
    outline: none;
  }
  
  .scroll-hide::-webkit-scrollbar {
    display: none;
  }
  
  .scroll-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// API Mock
const API = {
  async authenticate(initData) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          userId: 'user_' + Math.random().toString(36).substr(2, 9),
          username: 'seeker_' + Math.floor(Math.random() * 1000)
        });
      }, 500);
    });
  },
  
  async getDailyPrediction() {
    const predictions = [
      "Today the gates of ancient wisdom open. Sephira Chokmah illuminates your path.",
      "Energies of Binah protect you. Time for deep meditation.",
      "Malkuth grants material abundance. Act boldly!",
      "Tiferet harmonizes your endeavors. A day for important decisions."
    ];
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          text: predictions[Math.floor(Math.random() * predictions.length)],
          imageUrl: 'https://via.placeholder.com/400x400/0a0a0a/FFB800?text=Mystical+Vision',
          code: 'KC' + Math.random().toString(36).substr(2, 6).toUpperCase()
        });
      }, 800);
    });
  },
  
  async verifyCode(code) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, points: 100 });
      }, 500);
    });
  },
  
  async spinTape() {
    const prizes = [50, 100, 150, 200, 500, 1000];
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ points: prizes[Math.floor(Math.random() * prizes.length)] });
      }, 2000);
    });
  },
  
  async getUserData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          level: 5,
          xp: 2340,
          xpToNext: 3000,
          points: 15670,
          referrals: 12,
          spinAvailable: true
        });
      }, 300);
    });
  }
};

// Onboarding Component
const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [evmAddress, setEvmAddress] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [loading, setLoading] = useState(false);
  
  const validateEVM = (addr) => /^0x[a-fA-F0-9]{40}$/.test(addr);
  
  const handleComplete = async () => {
    if (!validateEVM(evmAddress) || !twitterUsername) return;
    
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    onComplete({ evmAddress, twitterUsername });
  };
  
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <style>{styles}</style>
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Zap className="w-16 h-16 mx-auto mb-4 text-gradient" style={{filter: 'drop-shadow(0 0 20px rgba(255, 184, 0, 0.5))'}} />
          <h1 className="title-font text-5xl mb-2">
            <span className="text-gradient">KABBALAH</span>
          </h1>
          <h2 className="title-font text-3xl text-white">CODE</h2>
        </div>
        
        <div className="card-modern clip-sharp p-8">
          <div className="flex gap-2 mb-8">
            {[1, 2].map(i => (
              <div
                key={i}
                className={`h-1 flex-1 ${
                  i <= step ? 'bg-gradient-to-r from-[#FFB800] to-[#FF6B00]' : 'bg-gray-800'
                }`}
              />
            ))}
          </div>
          
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-[#FFB800] mb-2 text-sm font-semibold uppercase tracking-wider">
                  EVM Wallet Address
                </label>
                <input
                  type="text"
                  value={evmAddress}
                  onChange={(e) => setEvmAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-black/50 border border-[#FFB800]/30 px-4 py-4 text-white focus:border-[#FFB800] transition-all clip-corner"
                />
                {evmAddress && !validateEVM(evmAddress) && (
                  <p className="text-red-500 text-xs mt-2">Invalid address format</p>
                )}
              </div>
              
              <button
                onClick={() => setStep(2)}
                disabled={!validateEVM(evmAddress)}
                className="w-full btn-primary py-4 clip-sharp disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CONTINUE <ChevronRight className="inline ml-2" size={20} />
              </button>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-[#FFB800] mb-2 text-sm font-semibold uppercase tracking-wider">
                  Twitter Username
                </label>
                <input
                  type="text"
                  value={twitterUsername}
                  onChange={(e) => setTwitterUsername(e.target.value.replace('@', ''))}
                  placeholder="username"
                  className="w-full bg-black/50 border border-[#FFB800]/30 px-4 py-4 text-white focus:border-[#FFB800] transition-all clip-corner"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 btn-secondary py-4 clip-sharp"
                >
                  BACK
                </button>
                <button
                  onClick={handleComplete}
                  disabled={!twitterUsername || loading}
                  className="flex-1 btn-primary py-4 clip-sharp disabled:opacity-50"
                >
                  {loading ? 'LOADING...' : 'BEGIN RITUAL'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Daily Prediction
const DailyPrediction = ({ onClaim }) => {
  const [prediction, setPrediction] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  
  useEffect(() => {
    API.getDailyPrediction().then(data => {
      setPrediction(data);
      setLoading(false);
    });
  }, []);
  
  const handleVerify = async () => {
    setVerifying(true);
    const result = await API.verifyCode(code);
    if (result.success) {
      onClaim(result.points);
    }
    setVerifying(false);
  };
  
  const generateTweet = () => {
    const text = `Got my daily prediction from Kabbalah Code! 🔮✨

${prediction.text}

Verification Code: ${prediction.code}

#KabbalahCode #Web3Mysticism`;
    
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#FFB800] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="card-modern clip-sharp p-6">
        <div className="aspect-square rounded-lg overflow-hidden mb-4 border border-[#FFB800]/30">
          <img src={prediction.imageUrl} alt="Prediction Art" className="w-full h-full object-cover" />
        </div>
        <p className="text-white text-lg leading-relaxed mb-6">{prediction.text}</p>
        
        <button
          onClick={generateTweet}
          className="w-full bg-[#1DA1F2] text-white font-bold py-4 clip-sharp hover:bg-[#1a8cd8] transition-all mb-4"
        >
          SHARE ON TWITTER
        </button>
        
        <div className="space-y-3">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter code from tweet"
            className="w-full bg-black/50 border border-[#FFB800]/30 px-4 py-3 text-white focus:border-[#FFB800] clip-corner"
          />
          
          <button
            onClick={handleVerify}
            disabled={!code || verifying}
            className="w-full btn-primary py-4 clip-sharp disabled:opacity-50"
          >
            {verifying ? 'VERIFYING...' : 'VERIFY & EARN +100 POINTS'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Running Tape Spinner
const RunningTape = ({ onSpin }) => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const prizes = [50, 100, 150, 200, 500, 1000, 50, 100, 150, 200];
  
  const handleSpin = async () => {
    setSpinning(true);
    setResult(null);
    
    const data = await API.spinTape();
    
    setTimeout(() => {
      setResult(data.points);
      setSpinning(false);
      onSpin(data.points);
    }, 2000);
  };
  
  return (
    <div className="card-modern clip-sharp p-6">
      <h2 className="title-font text-2xl text-gradient mb-6 text-center">FORTUNE TAPE</h2>
      
      <div className="relative h-32 overflow-hidden mb-6 border border-[#FFB800]/30 clip-corner bg-black/50">
        <div className="absolute inset-0 flex items-center">
          <div className={`flex gap-4 ${spinning ? 'animate-slide' : ''}`}>
            {[...prizes, ...prizes, ...prizes].map((prize, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-24 h-24 flex items-center justify-center border border-[#FFB800]/50 clip-sharp"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 107, 0, 0.1) 100%)'
                }}
              >
                <span className="text-3xl font-bold text-gradient">{prize}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute inset-y-0 left-1/2 w-1 bg-[#FFB800] -translate-x-1/2 animate-glow" />
      </div>
      
      {result && (
        <div className="text-center mb-4">
          <p className="text-4xl font-bold text-gradient">+{result} POINTS!</p>
        </div>
      )}
      
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="w-full btn-primary py-4 clip-sharp disabled:opacity-50"
      >
        {spinning ? 'SPINNING...' : 'SPIN (1/DAY)'}
      </button>
    </div>
  );
};

// FAQ Component
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  const faqs = [
    {
      q: "What is Kabbalah Code?",
      a: "Kabbalah Code is a Web3-powered mystical prediction platform that combines ancient Kabbalistic wisdom with modern blockchain technology."
    },
    {
      q: "How do I earn points?",
      a: "Earn points through daily predictions, sharing on Twitter, spinning the Fortune Tape, and referring friends. Complete tasks for bonus points!"
    },
    {
      q: "What are referral levels?",
      a: "Level 1: 10% of direct referrals' points, Level 2: 5% of 2nd-level referrals, Level 3: 2% of 3rd-level referrals."
    },
    {
      q: "How does NFT minting work?",
      a: "As you level up, you unlock unique Seeker, Archetype, and Master NFTs that can be minted on Base/Polygon networks."
    },
    {
      q: "Can I use points for rewards?",
      a: "Points determine your leaderboard position and unlock exclusive content, NFT mints, and community ritual participation."
    }
  ];
  
  return (
    <div className="space-y-3">
      <h2 className="title-font text-2xl text-gradient mb-6">FAQ</h2>
      {faqs.map((faq, i) => (
        <div key={i} className="card-modern clip-sharp overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full p-4 flex justify-between items-center text-left"
          >
            <span className="font-semibold text-white">{faq.q}</span>
            <ChevronRight 
              className={`text-[#FFB800] transition-transform ${openIndex === i ? 'rotate-90' : ''}`} 
              size={20} 
            />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 text-gray-400">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Admin Panel
const AdminPanel = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Retweet announcement', points: 50, type: 'retweet' },
    { id: 2, title: 'Write article', points: 500, type: 'article' }
  ]);
  
  const [ugcSubmissions, setUgcSubmissions] = useState([
    { id: 1, user: 'seeker_123', type: 'video', url: 'https://youtube.com/...', status: 'pending' },
    { id: 2, user: 'seeker_456', type: 'article', url: 'https://medium.com/...', status: 'pending' }
  ]);
  
  const tabs = [
    { id: 'tasks', label: 'Tasks', icon: Settings },
    { id: 'ugc', label: 'Moderation', icon: Camera },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'tape', label: 'Tape Config', icon: Gift }
  ];
  
  const approveSubmission = (id) => {
    setUgcSubmissions(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'approved' } : s
    ));
  };
  
  const rejectSubmission = (id) => {
    setUgcSubmissions(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'rejected' } : s
    ));
  };
  
  return (
    <div className="min-h-screen bg-primary p-4">
      <style>{styles}</style>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="title-font text-3xl text-gradient">ADMIN PANEL</h1>
          <button
            onClick={onLogout}
            className="btn-secondary px-4 py-2 clip-sharp flex items-center gap-2"
          >
            <LogOut size={18} />
            LOGOUT
          </button>
        </div>
        
        <div className="flex gap-2 mb-6 overflow-x-auto scroll-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 clip-sharp font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'btn-primary'
                  : 'btn-secondary'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>
        
        {activeTab === 'tasks' && (
          <div className="card-modern clip-sharp p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Task Management</h2>
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="bg-black/50 p-4 clip-corner flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white">{task.title}</h3>
                    <p className="text-sm text-[#FFB800]">{task.points} points</p>
                  </div>
                  <button className="btn-secondary px-4 py-2 clip-sharp">
                    EDIT
                  </button>
                </div>
              ))}
              <button className="w-full py-3 border-2 border-dashed border-[#FFB800]/50 clip-sharp text-[#FFB800] hover:bg-[#FFB800]/10">
                + ADD TASK
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'ugc' && (
          <div className="card-modern clip-sharp p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">UGC Moderation</h2>
            <div className="space-y-3">
              {ugcSubmissions.filter(s => s.status === 'pending').map(sub => (
                <div key={sub.id} className="bg-black/50 p-4 clip-corner">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-white">{sub.user}</h3>
                      <p className="text-sm text-gray-400">{sub.type}</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-600/20 text-yellow-500 text-xs clip-sharp border border-yellow-600/50">PENDING</span>
                  </div>
                  <a href={sub.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm break-all hover:underline">
                    {sub.url}
                  </a>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => approveSubmission(sub.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 clip-sharp hover:bg-green-700"
                    >
                      <Check size={18} />
                      APPROVE
                    </button>
                    <button
                      onClick={() => rejectSubmission(sub.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-600 clip-sharp hover:bg-red-700"
                    >
                      <X size={18} />
                      REJECT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div className="card-modern clip-sharp p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Top 100 Users</h2>
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-black/50 p-4 clip-corner flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-gradient">#{i + 1}</span>
                    <div>
                      <h3 className="font-bold text-white">seeker_{1000 - i * 10}</h3>
                      <p className="text-sm text-gray-400">Level {10 - i}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gradient">{(50000 - i * 5000).toLocaleString()}</p>
                    <p className="text-sm text-gray-400">points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'tape' && (
          <div className="card-modern clip-sharp p-6">
            <h2 className="text-2xl font-bold mb-4 text-white">Tape Configuration</h2>
            <div className="space-y-4">
              {[50, 100, 150, 200, 500, 1000].map(prize => (
                <div key={prize} className="bg-black/50 p-4 clip-corner flex justify-between items-center">
                  <span className="text-white">{prize} points</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="50"
                    className="w-1/2"
                  />
                  <span className="text-gray-400">50%</span>
                </div>
              ))}
              <button className="w-full py-3 btn-primary clip-sharp">
                SAVE SETTINGS
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main App
export default function KabbalahCodeApp() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  
  useEffect(() => {
    API.getUserData().then(setUserData);
  }, []);
  
  const handleOnboardingComplete = (data) => {
    setIsOnboarded(true);
  };
  
  const handleClaimPoints = (points) => {
    setUserData(prev => ({ ...prev, points: prev.points + points }));
  };
  
  const checkAdminAccess = () => {
    if (adminToken === 'KABBALAH_ADMIN_2025') {
      setIsAdmin(true);
      setShowAdminPrompt(false);
    }
  };
  
  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminToken('');
  };
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText('t.me/kabbalah_bot?start=ref_12345');
  };
  
  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }
  
  if (isAdmin) {
    return <AdminPanel onLogout={handleAdminLogout} />;
  }
  
  return (
    <div className="min-h-screen bg-primary pb-24">
      <style>{styles}</style>
      
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-lg border-b border-[#FFB800]/20 p-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 clip-sharp bg-gradient-to-br from-[#FFB800] to-[#FF6B00] flex items-center justify-center">
              <Zap className="text-black" size={28} />
            </div>
            <div>
              <h2 className="font-bold text-white text-lg">LEVEL {userData?.level || 1}</h2>
              <div className="w-40 h-1.5 bg-gray-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FFB800] to-[#FF6B00]"
                  style={{ width: `${((userData?.xp || 0) / (userData?.xpToNext || 1)) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">{userData?.xp}/{userData?.xpToNext} XP</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-gradient">{userData?.points?.toLocaleString() || 0}</p>
            <p className="text-xs text-gray-400 uppercase">Points</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="text-center py-6">
              <h1 className="title-font text-4xl mb-2">
                <span className="text-gradient">YOUR RITUAL</span>
              </h1>
              <p className="text-gray-400">Daily guidance from the mystic code</p>
            </div>
            <DailyPrediction onClaim={handleClaimPoints} />
          </div>
        )}
        
        {activeTab === 'tape' && (
          <div className="py-8">
            <RunningTape onSpin={handleClaimPoints} />
          </div>
        )}
        
        {activeTab === 'referral' && (
          <div className="card-modern clip-sharp p-6">
            <h2 className="title-font text-2xl text-gradient mb-6 text-center">REFERRAL PROGRAM</h2>
            <div className="space-y-6">
              <div className="bg-black/50 p-4 clip-corner">
                <p className="text-center text-[#FFB800] mb-3 text-sm uppercase tracking-wider">Your Referral Link</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="t.me/kabbalah_bot?start=ref_12345"
                    readOnly
                    className="flex-1 bg-black/80 border border-[#FFB800]/30 px-4 py-3 text-white clip-corner"
                  />
                  <button 
                    onClick={copyReferralLink}
                    className="px-6 btn-primary clip-sharp"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-black/50 p-4 clip-corner text-center">
                  <p className="text-3xl font-bold text-gradient">{userData?.referrals || 0}</p>
                  <p className="text-sm text-gray-400 mt-1">Referrals</p>
                </div>
                <div className="bg-black/50 p-4 clip-corner text-center">
                  <p className="text-3xl font-bold text-[#FFB800]">10%</p>
                  <p className="text-sm text-gray-400 mt-1">Level 1</p>
                </div>
                <div className="bg-black/50 p-4 clip-corner text-center">
                  <p className="text-3xl font-bold text-[#FF6B00]">5%</p>
                  <p className="text-sm text-gray-400 mt-1">Level 2</p>
                </div>
              </div>
              
              <div className="bg-black/50 p-4 clip-corner">
                <h3 className="font-bold text-white mb-3 uppercase text-sm tracking-wider">How It Works</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <Star className="text-[#FFB800] mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">Level 1:</strong> Earn 10% of direct referrals' points</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="text-[#FF6B00] mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">Level 2:</strong> Earn 5% of 2nd-level referrals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Star className="text-[#FF8C00] mt-0.5 flex-shrink-0" size={16} />
                    <span><strong className="text-white">Level 3:</strong> Earn 2% of 3rd-level referrals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'leaderboard' && (
          <div className="card-modern clip-sharp p-6">
            <h2 className="title-font text-2xl text-gradient mb-6 text-center">LEADERBOARD</h2>
            <div className="space-y-2">
              {[...Array(20)].map((_, i) => {
                const isUser = i === 7;
                return (
                  <div 
                    key={i} 
                    className={`p-4 clip-corner flex items-center justify-between ${
                      isUser ? 'bg-gradient-to-r from-[#FFB800]/20 to-[#FF6B00]/20 border border-[#FFB800]' : 'bg-black/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {i < 3 ? (
                        <Crown className={`${
                          i === 0 ? 'text-[#FFD700]' : i === 1 ? 'text-[#C0C0C0]' : 'text-[#CD7F32]'
                        }`} size={24} />
                      ) : (
                        <span className="text-xl font-bold text-gradient w-8 text-center">#{i + 1}</span>
                      )}
                      <div>
                        <h3 className="font-bold text-white">
                          {isUser ? 'YOU' : `seeker_${1000 - i * 10}`}
                        </h3>
                        <p className="text-sm text-gray-400">Level {Math.max(1, 20 - i)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gradient">{(100000 - i * 5000).toLocaleString()}</p>
                      <p className="text-sm text-gray-400">points</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {activeTab === 'faq' && <FAQ />}
      </div>
      
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-[#FFB800]/20">
        <div className="max-w-6xl mx-auto flex justify-around py-2">
          {[
            { id: 'home', icon: Sparkles, label: 'Home' },
            { id: 'tape', icon: Zap, label: 'Tape' },
            { id: 'referral', icon: Users, label: 'Referral' },
            { id: 'leaderboard', icon: TrendingUp, label: 'Leaders' },
            { id: 'faq', icon: HelpCircle, label: 'FAQ' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-all ${
                activeTab === tab.id
                  ? 'text-[#FFB800]'
                  : 'text-gray-500 hover:text-[#FFB800]'
              }`}
            >
              <tab.icon size={22} />
              <span className="text-xs font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Admin Access Button */}
      <button
        onClick={() => setShowAdminPrompt(true)}
        className="fixed bottom-20 right-4 w-12 h-12 bg-gradient-to-br from-[#FFB800] to-[#FF6B00] clip-sharp flex items-center justify-center shadow-lg hover:shadow-[#FFB800]/50 transition-all"
      >
        <Settings size={20} className="text-black" />
      </button>
      
      {/* Admin Prompt */}
      {showAdminPrompt && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="card-modern clip-sharp p-6 max-w-md w-full">
            <h3 className="title-font text-2xl text-gradient mb-4">ADMIN ACCESS</h3>
            <input
              type="password"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              placeholder="Enter secret token"
              className="w-full bg-black/80 border border-[#FFB800]/30 clip-corner px-4 py-3 text-white focus:border-[#FFB800] mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdminPrompt(false)}
                className="flex-1 btn-secondary py-3 clip-sharp"
              >
                CANCEL
              </button>
              <button
                onClick={checkAdminAccess}
                className="flex-1 btn-primary py-3 clip-sharp"
              >
                LOGIN
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Hint: KABBALAH_ADMIN_2025
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
