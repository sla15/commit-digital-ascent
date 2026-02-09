import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { supabase } from '../src/integrations/supabase/client';
import { 
  LogOut, Save, Settings, FileText, Phone, Users, MessageSquare, 
  ChevronDown, ChevronRight, Check, AlertCircle, Trash2, Eye, EyeOff,
  Menu, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COMPANY_INFO, SERVICES, VALUES, CONTACT_INFO } from '../constants';

type TabId = 'about' | 'services' | 'contact' | 'submissions';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const TABS: TabConfig[] = [
  { id: 'about', label: 'About Us', icon: Users },
  { id: 'services', label: 'Services', icon: Settings },
  { id: 'contact', label: 'Contact Info', icon: Phone },
  { id: 'submissions', label: 'Messages', icon: MessageSquare },
];

export const AdminPage: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('about');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // About content
  const [overview, setOverview] = useState(COMPANY_INFO.overview);
  const [mission, setMission] = useState(COMPANY_INFO.mission);
  const [vision, setVision] = useState(COMPANY_INFO.vision);

  // Services content
  const [services, setServices] = useState(
    SERVICES.map(s => ({ id: s.id, title: s.title, description: s.description }))
  );

  // Contact content
  const [contactEmail, setContactEmail] = useState(CONTACT_INFO.email);
  const [contactPhone, setContactPhone] = useState(CONTACT_INFO.phone);
  const [contactAddress, setContactAddress] = useState(CONTACT_INFO.address);

  // Values
  const [values, setValues] = useState(
    VALUES.map(v => ({ id: v.id, title: v.title, description: v.description || '' }))
  );

  // Contact submissions
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  // Load existing content from Supabase
  useEffect(() => {
    const loadContent = async () => {
      const { data } = await supabase.from('site_content').select('section, key, content');
      if (data) {
        data.forEach((row: any) => {
          const c = row.content;
          if (row.section === 'about') {
            if (row.key === 'company_info') {
              if (c.overview) setOverview(c.overview);
              if (c.mission) setMission(c.mission);
              if (c.vision) setVision(c.vision);
            }
            if (row.key === 'values' && Array.isArray(c)) {
              setValues(c);
            }
          }
          if (row.section === 'services' && row.key === 'list' && Array.isArray(c)) {
            setServices(c);
          }
          if (row.section === 'contact' && row.key === 'info') {
            if (c.email) setContactEmail(c.email);
            if (c.phone) setContactPhone(c.phone);
            if (c.address) setContactAddress(c.address);
          }
        });
      }
    };
    loadContent();
  }, []);

  // Load submissions
  useEffect(() => {
    if (activeTab === 'submissions') {
      loadSubmissions();
    }
  }, [activeTab]);

  const loadSubmissions = async () => {
    setSubmissionsLoading(true);
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    setSubmissions(data || []);
    setSubmissionsLoading(false);
  };

  const upsertContent = async (section: string, key: string, content: any) => {
    const { error } = await supabase
      .from('site_content')
      .upsert(
        { section, key, content, updated_by: user?.id },
        { onConflict: 'section,key' }
      );
    return error;
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMessage('');
    let hasError = false;

    if (activeTab === 'about') {
      const err1 = await upsertContent('about', 'company_info', { overview, mission, vision });
      const err2 = await upsertContent('about', 'values', values);
      if (err1 || err2) hasError = true;
    }

    if (activeTab === 'services') {
      const err = await upsertContent('services', 'list', services);
      if (err) hasError = true;
    }

    if (activeTab === 'contact') {
      const err = await upsertContent('contact', 'info', {
        email: contactEmail,
        phone: contactPhone,
        address: contactAddress,
      });
      if (err) hasError = true;
    }

    setSaveMessage(hasError ? 'Error saving. Check console.' : 'Saved successfully!');
    setSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const toggleRead = async (id: string, current: boolean) => {
    await supabase.from('contact_submissions').update({ is_read: !current }).eq('id', id);
    loadSubmissions();
  };

  const deleteSubmission = async (id: string) => {
    if (confirm('Delete this submission?')) {
      await supabase.from('contact_submissions').delete().eq('id', id);
      loadSubmissions();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-brand-950 text-white p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/favicon.png" alt="CommIT" className="h-8 w-auto" />
          <span className="font-bold font-display">Admin</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${mobileMenuOpen ? 'block' : 'hidden'} md:block
        w-full md:w-72 bg-brand-950 text-white md:min-h-screen flex-shrink-0
        md:sticky md:top-0 md:h-screen overflow-y-auto z-40
      `}>
        <div className="hidden md:flex items-center gap-3 p-6 border-b border-brand-900">
          <img src="/favicon.png" alt="CommIT" className="h-10 w-auto" />
          <div>
            <h2 className="font-bold font-display text-lg">Admin Panel</h2>
            <p className="text-brand-300 text-xs truncate">{user.email}</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/20'
                  : 'text-brand-200 hover:bg-brand-900 hover:text-white'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-brand-900">
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-brand-300 hover:bg-brand-900 hover:text-white transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 font-display">
            {TABS.find(t => t.id === activeTab)?.label}
          </h1>
          {activeTab !== 'submissions' && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-brand-900 text-white rounded-xl hover:bg-brand-800 transition-colors disabled:opacity-50 font-semibold text-sm shadow-lg shadow-brand-900/20"
            >
              <Save size={18} />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          )}
        </div>

        {saveMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              saveMessage.includes('Error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            {saveMessage.includes('Error') ? <AlertCircle size={18} /> : <Check size={18} />}
            {saveMessage}
          </motion.div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <ContentCard title="Company Overview">
              <TextArea value={overview} onChange={setOverview} rows={4} />
            </ContentCard>

            <ContentCard title="Mission Statement">
              <TextArea value={mission} onChange={setMission} rows={3} />
            </ContentCard>

            <ContentCard title="Vision Statement">
              <TextArea value={vision} onChange={setVision} rows={3} />
            </ContentCard>

            <ContentCard title="Core Values">
              {values.map((val, i) => (
                <div key={val.id} className="flex flex-col sm:flex-row gap-3 mb-4 pb-4 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0">
                  <input
                    value={val.title}
                    onChange={(e) => {
                      const copy = [...values];
                      copy[i] = { ...copy[i], title: e.target.value };
                      setValues(copy);
                    }}
                    className="flex-shrink-0 sm:w-40 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all font-semibold text-sm"
                    placeholder="Value title"
                  />
                  <input
                    value={val.description}
                    onChange={(e) => {
                      const copy = [...values];
                      copy[i] = { ...copy[i], description: e.target.value };
                      setValues(copy);
                    }}
                    className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-sm"
                    placeholder="Description"
                  />
                </div>
              ))}
            </ContentCard>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {services.map((service, i) => (
              <ContentCard key={service.id} title={`Service ${i + 1}`}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Title</label>
                    <input
                      value={service.title}
                      onChange={(e) => {
                        const copy = [...services];
                        copy[i] = { ...copy[i], title: e.target.value };
                        setServices(copy);
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1">Description</label>
                    <TextArea
                      value={service.description}
                      onChange={(val) => {
                        const copy = [...services];
                        copy[i] = { ...copy[i], description: val };
                        setServices(copy);
                      }}
                      rows={3}
                    />
                  </div>
                </div>
              </ContentCard>
            ))}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <ContentCard title="Contact Details">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Address</label>
                <TextArea value={contactAddress} onChange={setContactAddress} rows={2} />
              </div>
            </div>
          </ContentCard>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="space-y-4">
            {submissionsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full mx-auto"></div>
              </div>
            ) : submissions.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No submissions yet</p>
              </div>
            ) : (
              submissions.map((sub) => (
                <div
                  key={sub.id}
                  className={`bg-white rounded-2xl border p-5 md:p-6 transition-all ${
                    sub.is_read ? 'border-slate-100 opacity-70' : 'border-brand-200 shadow-md'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-bold text-slate-900">
                        {sub.first_name} {sub.last_name}
                        {!sub.is_read && <span className="ml-2 inline-block w-2 h-2 bg-brand-500 rounded-full"></span>}
                      </h4>
                      <p className="text-sm text-slate-500">{sub.email} {sub.phone && `• ${sub.phone}`}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">
                        {new Date(sub.created_at).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => toggleRead(sub.id, sub.is_read)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        title={sub.is_read ? 'Mark unread' : 'Mark read'}
                      >
                        {sub.is_read ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => deleteSubmission(sub.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-2">{sub.subject}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{sub.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

// Reusable components
const ContentCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-6 shadow-sm">
    <h3 className="text-lg font-bold text-slate-900 mb-4 font-display">{title}</h3>
    {children}
  </div>
);

const TextArea: React.FC<{ value: string; onChange: (v: string) => void; rows?: number }> = ({ value, onChange, rows = 3 }) => (
  <textarea
    value={value}
    onChange={(e) => onChange(e.target.value)}
    rows={rows}
    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all resize-none text-sm leading-relaxed"
  />
);
