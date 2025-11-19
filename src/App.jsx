import React, { useState, useEffect, useRef } from 'react';
import { Camera, Gift, Users, TrendingUp, Settings, Check, X, Sparkles, Trophy, Crown, Star, Zap, ChevronRight, LogOut, HelpCircle, Copy } from 'lucide-react';

// Telegram WebApp integration
const getTelegramWebApp = () => window.Telegram?.WebApp || null;
const getTelegramUser = () => {
  const tg = getTelegramWebApp();
  return tg?.initDataUnsafe?.user || null;
};
const hapticFeedback = (type = 'light') => {
  const tg = getTelegramWebApp();
  if (tg?.HapticFeedback) {
    tg.HapticFeedback.impactOccurred(type);
  }
};

// Modern 2025 Styles - Fixed fonts and improved design
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #000;
    color: #fff;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
  
  #root {
    width: 100%;
    min-height: 100vh;
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #FFB800 0%, #FF6B00 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .card-glass {
    background: linear-gradient(135deg, rgba(255, 184, 0, 0.08) 0%, rgba(255, 107, 0, 0.08) 100%);
    border: 1px solid rgba(255, 184, 0, 0.2);
    backdrop-filter: blur(20px);
  }
  
  .btn-gradient {
    background: linear-gradient(135deg, #FFB800 0%, #FF6B00 100%);
    color: #000;
    font-weight: 700;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: none;
    cursor: pointer;
  }
  
  .btn-gradient:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(255, 184, 0, 0.4);
  }
  
  .btn-gradient:active:not(:disabled) {
    transform: translateY(0);
  }
  
  .btn-outline {
    background: transparent;
    border: 2px solid rgba(255, 184, 0, 0.3);
    color: #FFB800;
    font-weight: 600;
    transition: all 0.3s;
    cursor: pointer;
  }
  
  .btn-outline:hover:not(:disabled) {
    background: rgba(255, 184, 0, 0.1);
    border-color: #FFB800;
  }
  
  .sharp-corner {
    clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
  }
  
  .sharp-corner-alt {
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
  }
  
  @keyframes slideInfinite {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  
  @keyframes glow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .animate-slide {
    animation: slideInfinite 15s linear infinite;
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  input:focus, textarea:focus {
    outline: none;
  }
  
  input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  .scroll-hide::-webkit-scrollbar {
    display: none;
  }
  
  .scroll-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
    
    hapticFeedback('medium');
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    onComplete({ evmAddress, twitterUsername });
  };
  
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: '#000'
    }}>
      <style>{styles}</style>
      <div style={{maxWidth: '448px', width: '100%'}}>
        {/* Logo */}
        <div className="text-center mb-12 animate-float">
          <Zap className="w-20 h-20 mx-auto mb-6" style={{
            filter: 'drop-shadow(0 0 30px rgba(255, 184, 0, 0.8))',
            color: '#FFB800'
          }} />
          <h1 className="text-5xl font-black mb-2 gradient-text" style={{letterSpacing: '-0.02em'}}>
            KABBALAH
          </h1>
          <h2 className="text-3xl font-black text-white" style={{letterSpacing: '-0.01em'}}>
            CODE
          </h2>
          <p className="text-gray-400 mt-3 text-sm">Mystical Web3 Rewards</p>
        </div>
        
        <div className="card-glass sharp-corner p-8">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {[1, 2].map(i => (
              <div
                key={i}
                className="h-1 flex-1 transition-all duration-300"
                style={{
                  background: i <= step 
                    ? 'linear-gradient(90deg, #FFB800 0%, #FF6B00 100%)' 
                    : 'rgba(255, 255, 255, 0.1)'
                }}
              />
            ))}
          </div>
          
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-[#FFB800] mb-3 text-sm font-bold uppercase tracking-wider">
                  EVM Wallet Address
                </label>
                <input
                  type="text"
                  value={evmAddress}
                  onChange={(e) => setEvmAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-black/50 border-2 border-[#FFB800]/30 sharp-corner px-4 py-4 text-white font-medium focus:border-[#FFB800] transition-all"
                  style={{fontSize: '16px'}}
                />
                {evmAddress && !validateEVM(evmAddress) && (
                  <p className="text-red-500 text-xs mt-2 font-medium">Invalid address format</p>
                )}
              </div>
              
              <button
                onClick={() => setStep(2)}
                disabled={!validateEVM(evmAddress)}
                className="w-full btn-gradient sharp-corner py-4 text-base font-bold flex items-center justify-center gap-2"
              >
                CONTINUE <ChevronRight size={20} />
              </button>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-[#FFB800] mb-3 text-sm font-bold uppercase tracking-wider">
                  Twitter Username
                </label>
                <input
                  type="text"
                  value={twitterUsername}
                  onChange={(e) => setTwitterUsername(e.target.value.replace('@', ''))}
                  placeholder="username"
                  className="w-full bg-black/50 border-2 border-[#FFB800]/30 sharp-corner px-4 py-4 text-white font-medium focus:border-[#FFB800] transition-all"
                  style={{fontSize: '16px'}}
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 btn-outline sharp-corner py-4 text-base font-bold"
                >
                  BACK
                </button>
                <button
                  onClick={handleComplete}
                  disabled={!twitterUsername || loading}
                  className="flex-1 btn-gradient sharp-corner py-4 text-base font-bold"
                >
                  {loading ? 'LOADING...' : 'BEGIN'}
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
    hapticFeedback('success');
    setVerifying(true);
    const result = await API.verifyCode(code);
    if (result.success) {
      onClaim(result.points);
    }
    setVerifying(false);
  };
  
  const generateTweet = () => {
    hapticFeedback('light');
    const text = `Got my daily prediction from Kabbalah Code! 🔮✨

${prediction.text}

Verification Code: ${prediction.code}

#KabbalahCode #Web3Mysticism`;
    
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#FFB800] border-t-transparent rounded-full animate-spin" style={{animation: 'spin 1s linear infinite'}}></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="card-glass sharp-corner p-6">
        <div className="aspect-square rounded-xl overflow-hidden mb-6 border-2 border-[#FFB800]/30">
          <img src={prediction.imageUrl} alt="Prediction" className="w-full h-full object-cover" />
        </div>
        
        <p className="text-white text-lg leading-relaxed mb-6 font-medium">
          {prediction.text}
        </p>
        
        <button
          onClick={generateTweet}
          className="w-full py-4 sharp-corner font-bold text-base mb-4"
          style={{background: '#1DA1F2', color: 'white'}}
        >
          SHARE ON TWITTER
        </button>
        
        <div className="space-y-3">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Enter code from tweet"
            className="w-full bg-black/50 border-2 border-[#FFB800]/30 sharp-corner px-4 py-4 text-white font-medium focus:border-[#FFB800]"
            style={{fontSize: '16px'}}
          />
          
          <button
            onClick={handleVerify}
            disabled={!code || verifying}
            className="w-full btn-gradient sharp-corner py-4 text-base font-bold"
          >
            {verifying ? 'VERIFYING...' : 'VERIFY & EARN +100 PTS'}
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
    hapticFeedback('medium');
    setSpinning(true);
    setResult(null);
    
    const data = await API.spinTape();
    
    setTimeout(() => {
      setResult(data.points);
      setSpinning(false);
      hapticFeedback('success');
      onSpin(data.points);
    }, 2000);
  };
  
  return (
    <div className="card-glass sharp-corner p-6">
      <h2 className="text-2xl font-black text-center mb-6 gradient-text">
        FORTUNE TAPE
      </h2>
      
      <div className="relative h-32 overflow-hidden mb-6 border-2 border-[#FFB800]/30 sharp-corner" style={{background: 'rgba(0,0,0,0.5)'}}>
        <div className="absolute inset-0 flex items-center gap-4" style={{paddingLeft: spinning ? 0 : '50%'}}>
          <div className={`flex gap-4 ${spinning ? 'animate-slide' : ''}`} style={{minWidth: '200%'}}>
            {[...prizes, ...prizes].map((prize, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-24 h-24 flex items-center justify-center border-2 border-[#FFB800]/50 sharp-corner"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 107, 0, 0.1) 100%)'
                }}
              >
                <span className="text-3xl font-black gradient-text">{prize}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute inset-y-0 left-1/2 w-1 bg-[#FFB800] -translate-x-1/2 animate-glow" />
      </div>
      
      {result && (
        <div className="text-center mb-4 animate-float">
          <p className="text-5xl font-black gradient-text">+{result}</p>
          <p className="text-gray-400 text-sm mt-1">POINTS</p>
        </div>
      )}
      
      <button
        onClick={handleSpin}
        disabled={spinning}
        className="w-full btn-gradient sharp-corner py-4 text-base font-bold"
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
      a: "A Web3-powered mystical prediction platform combining ancient Kabbalistic wisdom with modern blockchain technology."
    },
    {
      q: "How do I earn points?",
      a: "Through daily predictions, sharing on Twitter, spinning the Fortune Tape, and referring friends. Complete tasks for bonus points!"
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
      <h2 className="text-2xl font-black mb-6 gradient-text">FAQ</h2>
      {faqs.map((faq, i) => (
        <div key={i} className="card-glass sharp-corner overflow-hidden">
          <button
            onClick={() => {
              hapticFeedback('light');
              setOpenIndex(openIndex === i ? null : i);
            }}
            className="w-full p-4 flex justify-between items-center text-left"
          >
            <span className="font-bold text-white pr-4">{faq.q}</span>
            <ChevronRight 
              className="text-[#FFB800] transition-transform flex-shrink-0" 
              style={{transform: openIndex === i ? 'rotate(90deg)' : 'rotate(0deg)'}}
              size={20} 
            />
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 text-gray-300 leading-relaxed">
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
  
  return (
    <div className="min-h-screen bg-black p-4">
      <style>{styles}</style>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black gradient-text">ADMIN PANEL</h1>
          <button
            onClick={onLogout}
            className="btn-outline px-6 py-3 sharp-corner flex items-center gap-2 text-sm font-bold"
          >
            <LogOut size={18} />
            LOGOUT
          </button>
        </div>
        
        <div className="card-glass sharp-corner p-6">
          <p className="text-center text-gray-400">Admin features coming soon...</p>
        </div>
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
    hapticFeedback('success');
    navigator.clipboard.writeText('t.me/kabbalah_bot?start=ref_12345');
  };
  
  if (!isOnboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }
  
  if (isAdmin) {
    return <AdminPanel onLogout={handleAdminLogout} />;
  }
  
  return (
    <div className="min-h-screen bg-black pb-24">
      <style>{styles}</style>
      
      {/* Header */}
      <div className="bg-black/90 backdrop-blur-lg border-b border-[#FFB800]/20 p-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sharp-corner flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #FFB800 0%, #FF6B00 100%)'
            }}>
              <Zap className="text-black" size={28} />
            </div>
            <div>
              <h2 className="font-black text-white text-lg">LEVEL {userData?.level || 1}</h2>
              <div className="w-40 h-2 bg-gray-800 overflow-hidden mt-1">
                <div 
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${((userData?.xp || 0) / (userData?.xpToNext || 1)) * 100}%`,
                    background: 'linear-gradient(90deg, #FFB800 0%, #FF6B00 100%)'
                  }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 font-medium">{userData?.xp}/{userData?.xpToNext} XP</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-black gradient-text">{userData?.points?.toLocaleString() || 0}</p>
            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Points</p>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="text-center py-6">
              <h1 className="text-4xl font-black mb-2 gradient-text">
                YOUR RITUAL
              </h1>
              <p className="text-gray-400 font-medium">Daily guidance from the mystic code</p>
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
          <div className="card-glass sharp-corner p-6">
            <h2 className="text-2xl font-black text-center mb-6 gradient-text">REFERRAL PROGRAM</h2>
            <div className="space-y-6">
              <div className="bg-black/50 p-4 sharp-corner">
                <p className="text-center text-[#FFB800] mb-3 text-sm font-bold uppercase tracking-wider">Your Referral Link</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="t.me/kabbalah_bot?start=ref_12345"
                    readOnly
                    className="flex-1 bg-black/80 border border-[#FFB800]/30 sharp-corner px-4 py-3 text-white font-medium"
                    style={{fontSize: '14px'}}
                  />
                  <button 
                    onClick={copyReferralLink}
                    className="px-6 btn-gradient sharp-corner font-bold"
                  >
                    <Copy size={20} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[
                  {value: userData?.referrals || 0, label: 'Referrals'},
                  {value: '10%', label: 'Level 1'},
                  {value: '5%', label: 'Level 2'}
                ].map((item, i) => (
                  <div key={i} className="bg-black/50 p-4 sharp-corner text-center">
                    <p className="text-3xl font-black gradient-text">{item.value}</p>
                    <p className="text-sm text-gray-400 mt-1 font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'leaderboard' && (
          <div className="card-glass sharp-corner p-6">
            <h2 className="text-2xl font-black text-center mb-6 gradient-text">LEADERBOARD</h2>
            <div className="space-y-2">
              {[...Array(20)].map((_, i) => {
                const isUser = i === 7;
                return (
                  <div 
                    key={i} 
                    className={`p-4 sharp-corner flex items-center justify-between ${
                      isUser ? 'bg-gradient-to-r from-[#FFB800]/20 to-[#FF6B00]/20 border-2 border-[#FFB800]' : 'bg-black/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-black w-8 text-center" style={{
                        color: i < 3 ? '#FFB800' : '#666'
                      }}>
                        #{i + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-white">
                          {isUser ? 'YOU' : `seeker_${1000 - i * 10}`}
                        </h3>
                        <p className="text-sm text-gray-400 font-medium">Level {Math.max(1, 20 - i)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black gradient-text">{(100000 - i * 5000).toLocaleString()}</p>
                      <p className="text-sm text-gray-400 font-medium">points</p>
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
      <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-[#FFB800]/20">
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
              onClick={() => {
                hapticFeedback('light');
                setActiveTab(tab.id);
              }}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-all ${
                activeTab === tab.id
                  ? 'text-[#FFB800]'
                  : 'text-gray-500 hover:text-[#FFB800]'
              }`}
            >
              <tab.icon size={22} strokeWidth={2.5} />
              <span className="text-xs font-bold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Admin Access Button */}
      <button
        onClick={() => {
          hapticFeedback('medium');
          setShowAdminPrompt(true);
        }}
        className="fixed bottom-20 right-4 w-14 h-14 sharp-corner flex items-center justify-center shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #FFB800 0%, #FF6B00 100%)',
          boxShadow: '0 10px 30px rgba(255, 184, 0, 0.3)'
        }}
      >
        <Settings size={24} className="text-black" />
      </button>
      
      {/* Admin Prompt */}
      {showAdminPrompt && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
          <div className="card-glass sharp-corner p-6 max-w-md w-full">
            <h3 className="text-2xl font-black gradient-text mb-4">ADMIN ACCESS</h3>
            <input
              type="password"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              placeholder="Enter secret token"
              className="w-full bg-black/80 border-2 border-[#FFB800]/30 sharp-corner px-4 py-4 text-white font-medium focus:border-[#FFB800] mb-4"
              style={{fontSize: '16px'}}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdminPrompt(false)}
                className="flex-1 btn-outline sharp-corner py-3 text-base font-bold"
              >
                CANCEL
              </button>
              <button
                onClick={checkAdminAccess}
                className="flex-1 btn-gradient sharp-corner py-3 text-base font-bold"
              >
                LOGIN
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center font-medium">
              Hint: KABBALAH_ADMIN_2025
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
