import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import tfLogo from '../assets/tf_logo.webp';
import { LogOut, RefreshCw, Home } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import './Auth.css';

export default function AdminPanel() {
  const [overview, setOverview] = useState(null);
  const [users, setUsers] = useState([]);
  const [referrals, setReferrals] = useState([]);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Overview states
  const [chartDays, setChartDays] = useState(30);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [overviewError, setOverviewError] = useState('');
  
  // Leaderboard states
  const [leaderboard, setLeaderboard] = useState(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [leaderboardError, setLeaderboardError] = useState('');
  
  // Send Email states
  const [noPasswordUsers, setNoPasswordUsers] = useState([]);
  const [noPasswordLoading, setNoPasswordLoading] = useState(false);
  const [sendingEmailId, setSendingEmailId] = useState(null);
  
  // Selection states
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());
  const [savingSelection, setSavingSelection] = useState(false);
  
  // History states
  const [emailHistory, setEmailHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  
  // Filtering states
  const [userSearch, setUserSearch] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState('All');
  
  // Action & Modal states
  const [actionMenuOpenId, setActionMenuOpenId] = useState(null);
  const [viewUserModal, setViewUserModal] = useState(null);
  const [changeRefModal, setChangeRefModal] = useState(null);
  const [newRefCode, setNewRefCode] = useState('');
  
  const navigate = useNavigate();

  const fetchOverviewData = useCallback(async (isInitial = false) => {
    if (!isInitial) setRefreshing(true);
    setOverviewError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch(`/api/admin/overview?days=${chartDays}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch overview data.');
      const data = await res.json();
      setOverview(data);
      
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setLastUpdated(`${hours}:${minutes} ${ampm}`);
    } catch (err) {
      setOverviewError(err.message);
    } finally {
      if (!isInitial) setRefreshing(false);
    }
  }, [chartDays]);

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [usersRes, referralsRes, meRes] = await Promise.all([
          fetch('/api/admin/users', { headers }),
          fetch('/api/admin/referrals', { headers }),
          fetch('/api/auth/me', { headers })
        ]);

        if (!usersRes.ok || !referralsRes.ok || !meRes.ok) {
          throw new Error('Failed to fetch admin data. Unauthorized.');
        }

        const [usersData, referralsData, meData] = await Promise.all([
          usersRes.json(),
          referralsRes.json(),
          meRes.json()
        ]);

        setUsers(usersData);
        setReferrals(referralsData);
        setAdminUser(meData.user);
      } catch (err) {
        setError(err.message);
        navigate('/'); // redirect non-admins
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  useEffect(() => {
    fetchOverviewData(true);
  }, [fetchOverviewData]);

  const fetchLeaderboardData = useCallback(async (isInitial = false) => {
    if (isInitial && !leaderboard) setLeaderboardLoading(true);
    else if (!isInitial) setLeaderboardLoading(true);
    
    setLeaderboardError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('/api/admin/leaderboard', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch leaderboard data.');
      
      setLeaderboard(data.leaderboard);
    } catch (err) {
      console.error('Leaderboard API error:', err);
      setLeaderboardError(err.message);
    } finally {
      setLeaderboardLoading(false);
    }
  }, [leaderboard]);

  useEffect(() => {
    if (activeTab === 'leaderboard' && !leaderboard) {
      fetchLeaderboardData(true);
    }
  }, [activeTab, leaderboard, fetchLeaderboardData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (activeTab === 'overview') fetchOverviewData(false);
      else if (activeTab === 'leaderboard') fetchLeaderboardData(false);
    }, 30000);
    return () => clearInterval(interval);
  }, [activeTab, fetchOverviewData, fetchLeaderboardData]);

  const fetchEligibleUsers = useCallback(async () => {
    setNoPasswordLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('/api/admin/email-eligible', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch eligible users');
      setNoPasswordUsers(data);
    } catch (err) {
      console.error('Fetch eligible users error:', err);
    } finally {
      setNoPasswordLoading(false);
    }
  }, []);

  const fetchEmailHistory = useCallback(async () => {
    setHistoryLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('/api/admin/email-history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch history');
      setEmailHistory(data);
    } catch (err) {
      console.error('Fetch history error:', err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const handleSendEmail = async (user) => {
    if (!window.confirm(`Send email to ${user.name} (${user.email})?`)) return;
    
    setSendingEmailId(user.id);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${user.id}/send-email`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || 'Failed to send email');
      
      if (data.status === 'COMPLETED') {
        alert('Email sent successfully!');
      } else {
        alert(data.message || 'Operation returned status: ' + data.status);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setSendingEmailId(null);
      fetchEligibleUsers();
      fetchEmailHistory();
    }
  };

  const fetchSelections = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await fetch('/api/admin/email-selection', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setSelectedUserIds(new Set(data));
      }
    } catch (err) {
      console.error('Fetch selections error:', err);
    }
  }, []);

  const handleSaveSelection = async () => {
    setSavingSelection(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/email-selection', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ userIds: Array.from(selectedUserIds) })
      });
      if (!res.ok) throw new Error('Failed to save selection');
      alert('Selection saved successfully!');
    } catch (err) {
      alert(err.message);
    } finally {
      setSavingSelection(false);
    }
  };

  const [syncingSheet, setSyncingSheet] = useState(false);
  const handleSyncSheet = async () => {
    setSyncingSheet(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/admin/sync-sheet', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.status === 401 || res.status === 403) {
        alert("Authentication expired or invalid. Please log in again.");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return;
      }
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google Sheet synchronization failed. Please check the Google Sheets connection and try again.');
      
      const sum = data.summary || {};
      alert(`Google Sheet Sync Complete\n\nNew registrations: ${sum.newRecords || 0}\nExisting registrations: ${sum.existingRecords || 0}\nDuplicates detected: ${sum.duplicatesDetected || 0}\nErrors: ${sum.errors || 0}\n\nExisting users were preserved.`);
      // Refresh list
      window.location.reload();
    } catch (err) {
      alert(err.message);
    } finally {
      setSyncingSheet(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchSelections();
    }
  }, [activeTab, fetchSelections]);

  useEffect(() => {
    if (activeTab === 'send-email') {
      fetchEligibleUsers();
      fetchEmailHistory();
    }
  }, [activeTab, fetchEligibleUsers, fetchEmailHistory]);

  const toggleActionMenu = (id) => {
    setActionMenuOpenId(prev => prev === id ? null : id);
  };

  const handleUpdateStatus = async (user, newStatus) => {
    if (!window.confirm(`Are you sure you want to ${newStatus === 'ACTIVE' ? 'activate' : 'deactivate'} this user?`)) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${user.id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');
      alert(data.message || `User ${newStatus === 'ACTIVE' ? 'activated' : 'deactivated'} successfully.`);
      
      setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
      setActionMenuOpenId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateReferral = async (e) => {
    e.preventDefault();
    if (!window.confirm("Save new referral code?")) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/users/${changeRefModal.id}/referral-code`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ referralCode: newRefCode })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update referral code');
      alert(data.message || 'Referral code updated successfully.');
      
      setUsers(users.map(u => u.id === changeRefModal.id ? { ...u, referralCode: data.user.referralCode } : u));
      setChangeRefModal(null);
      setActionMenuOpenId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div className="admin-loading">Loading Admin Panel...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  const filteredUsers = users.filter(u => {
    const searchLower = userSearch.toLowerCase();
    const matchesSearch = 
      (u.name && u.name.toLowerCase().includes(searchLower)) ||
      (u.email && u.email.toLowerCase().includes(searchLower)) ||
      (u.referralCode && u.referralCode.toLowerCase().includes(searchLower));
    
    const matchesStatus = 
      userStatusFilter === 'All' || 
      (u.status || 'ACTIVE') === userStatusFilter; // default ACTIVE if null

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-page">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <img src={tfLogo} alt="TechUtopia Logo" className="admin-logo" />
            <h2>Admin Panel</h2>
          </div>
          <nav className="admin-nav">
            <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>Users</button>
            <button className={activeTab === 'referrals' ? 'active' : ''} onClick={() => setActiveTab('referrals')}>Referrals</button>
            <button className={activeTab === 'leaderboard' ? 'active' : ''} onClick={() => setActiveTab('leaderboard')}>🏆 Leaderboard</button>
            <button className={activeTab === 'send-email' ? 'active' : ''} onClick={() => setActiveTab('send-email')}>📧 Send Email</button>
          </nav>
          {adminUser && (
            <div className="admin-user-info">
              <div className="admin-user-details">
                <span className="admin-name">{adminUser.name}</span>
                <span className="admin-email">{adminUser.email}</span>
              </div>
              <div style={{ display: 'flex' }}>
                <button 
                  className="admin-home-icon" 
                  title="Go Back to Website" 
                  onClick={() => navigate('/')}
                >
                  <Home size={18} />
                </button>
                <button 
                  className="admin-logout-icon" 
                  title="Logout" 
                  onClick={() => { localStorage.removeItem('token'); navigate('/login'); }}
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          )}
        </aside>
        
        <main className="admin-content">
          <header className="admin-header">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </header>

        {activeTab === 'overview' && (
          <div className="admin-overview-container">
            {overviewError ? (
              <div className="admin-error-box" style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', marginBottom: '20px' }}>
                <p style={{ color: '#ef4444', marginBottom: '10px' }}>Unable to load latest analytics. {overviewError}</p>
                <button className="btn btn--primary" onClick={() => fetchOverviewData(false)}>Retry</button>
              </div>
            ) : !overview ? (
              <div className="admin-loading" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading analytics...</div>
            ) : (
              <>
                <div className="admin-overview">
                  <div className="stat-card">
                    <h3>Total Users</h3>
                    <p>{overview.stats.totalUsers}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Referrals</h3>
                    <p>{overview.stats.totalReferrals}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Total Referral Points</h3>
                    <p>{overview.stats.totalReferralPoints}</p>
                  </div>
                </div>

                <div className="admin-analytics-section" style={{ marginTop: '30px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '12px', padding: '25px' }}>
                  <div className="analytics-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
                    <div>
                      <h2 style={{ margin: 0, fontSize: '20px', color: '#fff' }}>Student Registrations</h2>
                      <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Daily student registrations</p>
                    </div>
                    <div className="analytics-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div className="date-range-selector" style={{ display: 'flex', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', padding: '4px' }}>
                        {[7, 30, 90].map(days => (
                          <button 
                            key={days}
                            onClick={() => setChartDays(days)}
                            style={{ 
                              background: chartDays === days ? 'rgba(255, 154, 0, 0.2)' : 'transparent',
                              color: chartDays === days ? '#fbbf24' : '#94a3b8',
                              border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: chartDays === days ? 'bold' : 'normal', transition: 'all 0.2s'
                            }}
                          >
                            {days} Days
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => fetchOverviewData(false)}
                        title="Refresh analytics"
                        style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.color = '#fff'}
                        onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                      >
                        <RefreshCw size={16} className={refreshing ? 'spinning' : ''} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
                      </button>
                    </div>
                  </div>

                  <div className="analytics-chart-container" style={{ width: '100%', height: '300px', marginBottom: '20px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={overview.registrations} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="date" stroke="#64748b" fontSize={12} tickMargin={10} minTickGap={30} tickFormatter={(val) => { const d = new Date(val); return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) }} />
                        <YAxis stroke="#64748b" fontSize={12} allowDecimals={false} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.95)', borderColor: 'rgba(255, 154, 0, 0.3)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                          itemStyle={{ color: '#fbbf24', fontWeight: 'bold' }}
                          labelStyle={{ color: '#fff', marginBottom: '5px', fontSize: '13px' }}
                          formatter={(value) => [`${value} students registered`, '']}
                          labelFormatter={(label) => { const d = new Date(label); return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                        />
                        <Line type="monotone" dataKey="count" stroke="#fbbf24" strokeWidth={3} dot={{ r: 3, fill: '#0b0f19', stroke: '#fbbf24', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#fbbf24', stroke: '#fff', strokeWidth: 2 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="analytics-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px', fontSize: '13px' }}>
                    <div className="today-stat" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#94a3b8' }}>Today's Registrations:</span>
                      <span style={{ color: '#fff', fontWeight: 'bold', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '2px 8px', borderRadius: '10px' }}>{overview.todayCount}</span>
                    </div>
                    {lastUpdated && <div style={{ color: '#64748b' }}>Last updated: {lastUpdated}</div>}
                  </div>
                </div>
                <style>{`
                  @keyframes spin { 100% { transform: rotate(360deg); } }
                `}</style>
              </>
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <>
            <div className="admin-filters" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
                <input 
                  type="text" 
                  placeholder="Search by name, email, or referral code..." 
                  value={userSearch} 
                  onChange={e => setUserSearch(e.target.value)}
                  style={{ flex: 1 }}
                />
                <select value={userStatusFilter} onChange={e => setUserStatusFilter(e.target.value)}>
                  <option value="All">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={handleSyncSheet}
                  className="btn btn--secondary"
                  disabled={syncingSheet}
                >
                  {syncingSheet ? 'Syncing...' : 'Sync Google Sheet'}
                </button>
                <button 
                  onClick={handleSaveSelection}
                  className="btn btn--primary"
                  disabled={savingSelection}
                >
                  {savingSelection ? 'Saving...' : 'Save Selection'}
                </button>
              </div>
            </div>
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>
                      <input 
                        type="checkbox" 
                        onChange={(e) => {
                          if (e.target.checked) {
                            const newSet = new Set(selectedUserIds);
                            filteredUsers.forEach(u => newSet.add(u.id));
                            setSelectedUserIds(newSet);
                          } else {
                            const newSet = new Set(selectedUserIds);
                            filteredUsers.forEach(u => newSet.delete(u.id));
                            setSelectedUserIds(newSet);
                          }
                        }}
                        checked={filteredUsers.length > 0 && filteredUsers.every(u => selectedUserIds.has(u.id))}
                      />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>College</th>
                    <th>Referral Code</th>
                    <th>Points</th>
                    <th>Referrals</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(u => {
                    const status = u.status || 'ACTIVE';
                    return (
                      <tr key={u.id}>
                        <td>
                          <input 
                            type="checkbox" 
                            checked={selectedUserIds.has(u.id)}
                            onChange={(e) => {
                              const newSet = new Set(selectedUserIds);
                              if (e.target.checked) newSet.add(u.id);
                              else newSet.delete(u.id);
                              setSelectedUserIds(newSet);
                            }}
                          />
                        </td>
                        <td>{u.name || 'N/A'}</td>
                        <td>{u.email}</td>
                        <td>{u.college || 'N/A'}</td>
                        <td>{u.referralCode}</td>
                        <td>{u.referralPoints}</td>
                        <td>{u._count?.invitedUsers || 0}</td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div className="status-indicator">
                            <span className={`status-dot ${status.toLowerCase()}`}></span>
                            {status === 'ACTIVE' ? 'Active' : 'Inactive'}
                          </div>
                        </td>
                        <td>
                          <div className="actions-menu-container">
                            <button className="actions-btn" onClick={() => toggleActionMenu(u.id)}>⋮</button>
                            {actionMenuOpenId === u.id && (
                              <div className="actions-dropdown">
                                <button onClick={() => { setViewUserModal(u); setActionMenuOpenId(null); }}>View User</button>
                                {status === 'ACTIVE' ? (
                                  <button onClick={() => handleUpdateStatus(u, 'INACTIVE')}>Deactivate</button>
                                ) : (
                                  <button onClick={() => handleUpdateStatus(u, 'ACTIVE')}>Activate</button>
                                )}
                                <button onClick={() => { setChangeRefModal(u); setNewRefCode(u.referralCode); setActionMenuOpenId(null); }}>Change Referral Code</button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'referrals' && (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Referrer</th>
                  <th>Referrer Code</th>
                  <th>Referred User Email</th>
                  <th>Bonus</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map(r => (
                  <tr key={r.id}>
                    <td>{r.referrer?.name || 'N/A'}</td>
                    <td>{r.referrer?.referralCode || 'N/A'}</td>
                    <td>{r.referredEmail}</td>
                    <td>+{r.bonusAwarded}</td>
                    <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="admin-leaderboard">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: '#fff', fontSize: '20px' }}>Top Referrers</h2>
              <button 
                onClick={() => fetchLeaderboardData(false)}
                className="btn btn--secondary"
                disabled={leaderboardLoading}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '6px 12px', borderRadius: '6px', cursor: leaderboardLoading ? 'not-allowed' : 'pointer' }}
              >
                {leaderboardLoading ? 'Refreshing...' : '↻ Refresh'}
              </button>
            </div>

            {leaderboardError ? (
              <div className="admin-error-box" style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px' }}>
                <p style={{ color: '#ef4444', marginBottom: '10px' }}>Unable to load leaderboard. {leaderboardError}</p>
                <button className="btn btn--primary" onClick={() => fetchLeaderboardData(true)}>Retry</button>
              </div>
            ) : leaderboardLoading && !leaderboard ? (
              <p style={{ color: '#94a3b8' }}>Loading leaderboard...</p>
            ) : leaderboard && leaderboard.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ margin: 0, color: '#fff' }}>🏆 No referral data yet</h3>
                <p style={{ color: '#94a3b8', marginTop: '10px' }}>When students make successful referrals, they will appear here.</p>
              </div>
            ) : leaderboard ? (
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Rank</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Referral Count</th>
                      <th>Referral Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map(user => (
                      <tr key={user.rank}>
                        <td>
                          {user.rank === 1 ? '🥇 ' : user.rank === 2 ? '🥈 ' : user.rank === 3 ? '🥉 ' : `#${user.rank}`}
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.referralCount}</td>
                        <td style={{ color: '#fbbf24', fontWeight: 'bold' }}>{user.referralPoints}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        )}

        {activeTab === 'send-email' && (
          <div className="admin-send-email">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ margin: 0, color: '#fff', fontSize: '20px' }}>SELECTED REGISTERED STUDENTS</h2>
              </div>
              <button 
                onClick={() => { fetchEligibleUsers(); fetchEmailHistory(); }}
                className="btn btn--secondary"
                disabled={noPasswordLoading || historyLoading}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', padding: '6px 12px', borderRadius: '6px', cursor: noPasswordLoading ? 'not-allowed' : 'pointer' }}
              >
                {(noPasswordLoading || historyLoading) ? 'Refreshing...' : '↻ Refresh'}
              </button>
            </div>
            
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Password Status</th>
                    <th>Email Status</th>
                    <th>Sending Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {noPasswordUsers.map(user => {
                    const lastRecord = user.emailSendRecords && user.emailSendRecords.length > 0 ? user.emailSendRecords[0] : null;
                    const hasPassword = user.password && user.password !== 'NOT_SET' && user.password !== '';
                    
                    let statusLabel = '—';
                    let emailStatus = 'Not Sent';
                    let actionText = 'SEND EMAIL';
                    let disabled = false;
                    
                    if (lastRecord) {
                      statusLabel = lastRecord.status;
                      
                      if (lastRecord.status === 'PENDING') {
                        emailStatus = 'Sending';
                        actionText = 'Sending...';
                        disabled = true;
                      } else if (lastRecord.status === 'COMPLETED') {
                        emailStatus = 'Sent';
                        actionText = 'RESEND EMAIL';
                      } else if (lastRecord.status === 'REJECTED' || lastRecord.status === 'FAILED') {
                        emailStatus = 'Failed';
                        actionText = 'RETRY EMAIL';
                      }
                    }

                    if (sendingEmailId === user.id) {
                      emailStatus = 'Sending';
                      statusLabel = 'PENDING';
                      actionText = 'Sending...';
                      disabled = true;
                    }

                    const badgeColor = statusLabel === 'COMPLETED' ? '#10b981' : statusLabel === 'PENDING' ? '#fbbf24' : statusLabel === 'REJECTED' ? '#ef4444' : '#64748b';

                    return (
                      <tr key={user.id}>
                        <td>{user.name || 'N/A'}</td>
                        <td>{user.email}</td>
                        <td>
                          {hasPassword ? 'Set' : 'Not Set'}
                        </td>
                        <td>
                          {emailStatus}
                        </td>
                        <td>
                          <span style={{
                            display: 'inline-block',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: statusLabel === '—' ? 'transparent' : `${badgeColor}22`,
                            color: statusLabel === '—' ? '#94a3b8' : badgeColor,
                            border: statusLabel === '—' ? 'none' : `1px solid ${badgeColor}44`
                          }}>
                            {statusLabel}
                          </span>
                        </td>
                        <td>
                          <button 
                            onClick={() => handleSendEmail(user)}
                            className="btn btn--primary"
                            disabled={disabled}
                            style={{ padding: '6px 12px', fontSize: '13px' }}
                          >
                            {actionText}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                  {noPasswordUsers.length === 0 && !noPasswordLoading && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '30px' }}>No students currently selected. Please select users from the Users tab.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '40px' }}>
              <h2 style={{ margin: 0, color: '#fff', fontSize: '20px', marginBottom: '20px' }}>EMAIL HISTORY</h2>
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Sent At</th>
                      <th>Resend ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailHistory.map(record => {
                      const badgeColor = record.status === 'COMPLETED' ? '#10b981' : record.status === 'PENDING' ? '#fbbf24' : record.status === 'REJECTED' ? '#ef4444' : '#64748b';
                      let dateStr = '—';
                      if (record.completedAt) dateStr = new Date(record.completedAt).toLocaleString();
                      else if (record.pendingAt) dateStr = 'Pending';
                      else if (record.rejectedAt) dateStr = 'Failed';

                      return (
                        <tr key={record.id}>
                          <td>{record.user?.name || 'N/A'}</td>
                          <td>{record.recipientEmail}</td>
                          <td>{record.emailType}</td>
                          <td>
                            <span style={{
                              display: 'inline-block',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              backgroundColor: `${badgeColor}22`,
                              color: badgeColor,
                              border: `1px solid ${badgeColor}44`
                            }}>
                              {record.status}
                            </span>
                          </td>
                          <td>{dateStr}</td>
                          <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{record.resendEmailId || '—'}</td>
                        </tr>
                      );
                    })}
                    {emailHistory.length === 0 && !historyLoading && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>No email history.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        </main>
      </div>

      {/* View User Modal */}
      {viewUserModal && (
        <div className="modal-overlay" onClick={() => setViewUserModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>User Details</h3>
            <div className="modal-details">
              <p><strong>Name:</strong> {viewUserModal.name || 'N/A'}</p>
              <p><strong>Email:</strong> {viewUserModal.email}</p>
              <p><strong>College:</strong> {viewUserModal.college || 'N/A'}</p>
              <p><strong>Registration Date:</strong> {new Date(viewUserModal.createdAt).toLocaleString()}</p>
              <p><strong>Referral Code:</strong> {viewUserModal.referralCode}</p>
              <p><strong>Referral Points:</strong> {viewUserModal.referralPoints}</p>
              <p><strong>Successful Referrals:</strong> {viewUserModal._count?.invitedUsers || 0}</p>
              <p><strong>Referred By:</strong> {viewUserModal.referredBy ? `${viewUserModal.referredBy.name || 'Unknown'} (${viewUserModal.referredBy.email})` : 'None'}</p>
              <p><strong>Account Status:</strong> {viewUserModal.status || 'ACTIVE'}</p>
            </div>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setViewUserModal(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Change Referral Code Modal */}
      {changeRefModal && (
        <div className="modal-overlay" onClick={() => setChangeRefModal(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Change Referral Code</h3>
            <div className="modal-details">
              <p><strong>User:</strong> {changeRefModal.name || changeRefModal.email}</p>
              <p><strong>Current Code:</strong> {changeRefModal.referralCode}</p>
              <div className="form-group" style={{ marginTop: '15px' }}>
                <label>New Referral Code:</label>
                <input 
                  type="text" 
                  value={newRefCode} 
                  onChange={e => setNewRefCode(e.target.value)} 
                  placeholder="e.g. TECH-XYZ123"
                />
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setChangeRefModal(null)}>Cancel</button>
              <button className="modal-btn save" onClick={handleUpdateReferral}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
