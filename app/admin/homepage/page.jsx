'use client';

import React, { useState, useEffect } from 'react';
import ImageUploadField from '@/components/admin/ImageUploadField';
import {
  Sliders,
  Eye,
  Save,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Truck,
  CreditCard,
  ShieldCheck,
  Users,
  Clock,
  Headphones,
  RotateCcw,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

const ICON_OPTIONS = [
  { value: 'Truck', label: 'Delivery / Shipping', Icon: Truck },
  { value: 'CreditCard', label: 'Payment / Card', Icon: CreditCard },
  { value: 'ShieldCheck', label: 'Security / Guarantee', Icon: ShieldCheck },
  { value: 'Users', label: 'Customers / Community', Icon: Users },
  { value: 'Clock', label: 'Time / Fast Return', Icon: Clock },
  { value: 'Headphones', label: 'Support / Care', Icon: Headphones },
];

export default function AdminHomepageCMS() {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error' | null
  const [activeTab, setActiveTab] = useState('sections'); // 'sections' | 'hero' | 'banners' | 'trust' | 'shipping' | 'store'

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveStatus(null);
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) throw new Error('Failed to save settings');
      const data = await res.json();
      setSettings(data.settings);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3500);
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    } finally {
      setSaving(false);
    }
  };

  // Sections management
  const moveSection = (index, direction) => {
    const newSections = [...(settings.sections || [])];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    // re-index order
    const updated = newSections.map((s, i) => ({ ...s, order: i + 1 }));
    setSettings({ ...settings, sections: updated });
  };

  const toggleSection = (id) => {
    const updated = (settings.sections || []).map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    setSettings({ ...settings, sections: updated });
  };

  // Trust Badges management
  const updateBadge = (id, field, value) => {
    const updated = (settings.trustBadges || []).map((b) =>
      b.id === id ? { ...b, [field]: value } : b
    );
    setSettings({ ...settings, trustBadges: updated });
  };

  const toggleBadge = (id) => {
    const updated = (settings.trustBadges || []).map((b) =>
      b.id === id ? { ...b, enabled: !b.enabled } : b
    );
    setSettings({ ...settings, trustBadges: updated });
  };

  const addBadge = () => {
    const newBadge = {
      id: `tb_${Date.now()}`,
      icon: 'ShieldCheck',
      title: 'New Specification',
      description: 'Highlight your unique store service or promise.',
      accent: '#05DF72',
      enabled: true,
    };
    setSettings({
      ...settings,
      trustBadges: [...(settings.trustBadges || []), newBadge],
    });
  };

  const removeBadge = (id) => {
    setSettings({
      ...settings,
      trustBadges: (settings.trustBadges || []).filter((b) => b.id !== id),
    });
  };

  if (loading || !settings) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[50vh] text-slate-500">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-medium">Loading CMS configuration...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'sections', label: 'Sections & Order' },
    { id: 'hero', label: 'Hero Headline & Main Banner' },
    { id: 'banners', label: 'Promo Banners 1 & 2' },
    { id: 'trust', label: 'Trust Badges & Specs' },
    { id: 'shipping', label: '🇧🇩 Bangladesh Delivery & Rates' },
    { id: 'store', label: 'Store Information' },
  ];

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-6 h-6 text-emerald-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
              Homepage Content & CMS Manager
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Customize texts, images, promotional banners, section ordering, and trust specifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 shadow-sm transition active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Save Feedback Alerts */}
      {saveStatus === 'success' && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-sm font-medium animate-fadeIn">
          <Check className="w-5 h-5 text-emerald-600" />
          <span>Homepage CMS settings saved and published successfully! Changes are live immediately.</span>
        </div>
      )}

      {saveStatus === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-sm font-medium">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          <span>Failed to save changes. Please verify and try again.</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-slate-200 pb-1 scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: Sections Enable/Disable & Reorder */}
      {activeTab === 'sections' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-800">Homepage Section Order & Visibility</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Drag or use arrows to rearrange sections on your storefront, or toggle visibility on/off.
            </p>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {settings.sections?.map((section, idx) => (
              <div
                key={section.id}
                className={`flex items-center justify-between p-4 transition ${
                  section.enabled ? 'bg-white' : 'bg-slate-50/70 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{section.name}</p>
                    <p className="text-[11px] text-slate-400">ID: {section.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, -1)}
                      className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === settings.sections.length - 1}
                      onClick={() => moveSection(idx, 1)}
                      className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Toggle switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={section.enabled}
                      onChange={() => toggleSection(section.id)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                  <span className="text-xs font-medium w-14 text-right text-slate-600">
                    {section.enabled ? 'Enabled' : 'Hidden'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Hero Editor */}
      {activeTab === 'hero' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-800">Hero Headline & Main Showcase Banner</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              The primary banner visitors see when they land on MustBuy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Top News / Alert Badge Text
                </label>
                <input
                  type="text"
                  value={settings.hero?.badge || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: { ...settings.hero, badge: e.target.value },
                    })
                  }
                  className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="e.g. 🔥 Fast Delivery Across Bangladesh"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Main Headline
                </label>
                <textarea
                  rows={3}
                  value={settings.hero?.title || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      hero: { ...settings.hero, title: e.target.value },
                    })
                  }
                  className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="e.g. Gadgets & lifestyle products you'll love."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Starting Price (৳)
                  </label>
                  <input
                    type="text"
                    value={settings.hero?.price || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, price: e.target.value },
                      })
                    }
                    className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="299"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hero Background Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.hero?.bgColor || '#dcfce7'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          hero: { ...settings.hero, bgColor: e.target.value },
                        })
                      }
                      className="w-10 h-10 border rounded cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={settings.hero?.bgColor || '#dcfce7'}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          hero: { ...settings.hero, bgColor: e.target.value },
                        })
                      }
                      className="flex-1 text-xs px-2 py-2 border rounded-lg border-slate-300 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={settings.hero?.buttonText || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, buttonText: e.target.value },
                      })
                    }
                    className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="SHOP NOW"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CTA Button Link
                  </label>
                  <input
                    type="text"
                    value={settings.hero?.buttonLink || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        hero: { ...settings.hero, buttonLink: e.target.value },
                      })
                    }
                    className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="/shop"
                  />
                </div>
              </div>
            </div>

            {/* Hero Image upload with specifications */}
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <ImageUploadField
                label="Hero Model / Showcase Image"
                value={settings.hero?.imageUrl || ''}
                onChange={(url) =>
                  setSettings({
                    ...settings,
                    hero: { ...settings.hero, imageUrl: url },
                  })
                }
                recommendedWidth={1200}
                recommendedHeight={800}
                recommendedRatio="3:2"
                recommendedFormat="PNG (transparent background) or WebP"
                maxSizeMB={5}
                helperText="Use a high quality product shot or model image. Transparent PNG looks best on the colored card."
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Side Banners 1 & 2 */}
      {activeTab === 'banners' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Banner 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800">Promo Banner 1 (Top Side)</h2>
              <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-medium">
                Banner 1
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={settings.banner1?.title || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      banner1: { ...settings.banner1, title: e.target.value },
                    })
                  }
                  className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                  placeholder="e.g. Best Gadgets"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / CTA</label>
                  <input
                    type="text"
                    value={settings.banner1?.subtitle || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        banner1: { ...settings.banner1, subtitle: e.target.value },
                      })
                    }
                    className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                    placeholder="e.g. View more"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Link</label>
                  <input
                    type="text"
                    value={settings.banner1?.link || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        banner1: { ...settings.banner1, link: e.target.value },
                      })
                    }
                    className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                    placeholder="/shop"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.banner1?.bgColor || '#fed7aa'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        banner1: { ...settings.banner1, bgColor: e.target.value },
                      })
                    }
                    className="w-10 h-10 border rounded cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={settings.banner1?.bgColor || '#fed7aa'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        banner1: { ...settings.banner1, bgColor: e.target.value },
                      })
                    }
                    className="flex-1 text-xs px-2 py-2 border rounded-lg font-mono"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Banner 1 Product Image"
                value={settings.banner1?.imageUrl || ''}
                onChange={(url) =>
                  setSettings({
                    ...settings,
                    banner1: { ...settings.banner1, imageUrl: url },
                  })
                }
                recommendedWidth={400}
                recommendedHeight={400}
                recommendedRatio="1:1"
                recommendedFormat="PNG (transparent) or WebP"
                maxSizeMB={5}
              />
            </div>
          </div>

          {/* Banner 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800">Promo Banner 2 (Bottom Side)</h2>
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-medium">
                Banner 2
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={settings.banner2?.title || ''}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      banner2: { ...settings.banner2, title: e.target.value },
                    })
                  }
                  className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                  placeholder="e.g. 20% Discounts"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Subtitle / CTA</label>
                  <input
                    type="text"
                    value={settings.banner2?.subtitle || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        banner2: { ...settings.banner2, subtitle: e.target.value },
                      })
                    }
                    className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                    placeholder="e.g. View more"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Link</label>
                  <input
                    type="text"
                    value={settings.banner2?.link || ''}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        banner2: { ...settings.banner2, link: e.target.value },
                      })
                    }
                    className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                    placeholder="/shop"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.banner2?.bgColor || '#bfdbfe'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        banner2: { ...settings.banner2, bgColor: e.target.value },
                      })
                    }
                    className="w-10 h-10 border rounded cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={settings.banner2?.bgColor || '#bfdbfe'}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        banner2: { ...settings.banner2, bgColor: e.target.value },
                      })
                    }
                    className="flex-1 text-xs px-2 py-2 border rounded-lg font-mono"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Banner 2 Product Image"
                value={settings.banner2?.imageUrl || ''}
                onChange={(url) =>
                  setSettings({
                    ...settings,
                    banner2: { ...settings.banner2, imageUrl: url },
                  })
                }
                recommendedWidth={400}
                recommendedHeight={400}
                recommendedRatio="1:1"
                recommendedFormat="PNG (transparent) or WebP"
                maxSizeMB={5}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Trust Badges & Specifications */}
      {activeTab === 'trust' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800">
                Trust Badges & Specifications Editor
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                These specifications display on the Homepage ("Our Specifications") and on every Product Details page.
              </p>
            </div>
            <button
              type="button"
              onClick={addBadge}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Badge</span>
            </button>
          </div>

          <div className="space-y-4">
            {settings.trustBadges?.map((badge, index) => {
              const matchedIcon = ICON_OPTIONS.find((opt) => opt.value === badge.icon) || ICON_OPTIONS[0];
              const CurrentIcon = matchedIcon.Icon;

              return (
                <div
                  key={badge.id}
                  className={`border rounded-xl p-4 transition ${
                    badge.enabled ? 'border-slate-300 bg-white' : 'border-slate-200 bg-slate-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0 shadow-xs"
                        style={{ backgroundColor: badge.accent || '#05DF72' }}
                      >
                        <CurrentIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400">Badge #{index + 1}</span>
                        <h3 className="text-sm font-bold text-slate-800">{badge.title}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={badge.enabled}
                          onChange={() => toggleBadge(badge.id)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                      <button
                        type="button"
                        onClick={() => removeBadge(badge.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition"
                        title="Delete Badge"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-3 border-t border-slate-100">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Title / Guarantee Headline
                      </label>
                      <input
                        type="text"
                        value={badge.title}
                        onChange={(e) => updateBadge(badge.id, 'title', e.target.value)}
                        className="w-full text-sm px-3 py-1.5 border rounded-lg border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Select Icon
                      </label>
                      <select
                        value={badge.icon}
                        onChange={(e) => updateBadge(badge.id, 'icon', e.target.value)}
                        className="w-full text-xs px-3 py-2 border rounded-lg border-slate-300 bg-white"
                      >
                        {ICON_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Description / Secondary Text
                      </label>
                      <input
                        type="text"
                        value={badge.description}
                        onChange={(e) => updateBadge(badge.id, 'description', e.target.value)}
                        className="w-full text-xs px-3 py-1.5 border rounded-lg border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Accent Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={badge.accent || '#05DF72'}
                          onChange={(e) => updateBadge(badge.id, 'accent', e.target.value)}
                          className="w-8 h-8 rounded border cursor-pointer p-0.5"
                        />
                        <input
                          type="text"
                          value={badge.accent || '#05DF72'}
                          onChange={(e) => updateBadge(badge.id, 'accent', e.target.value)}
                          className="flex-1 text-xs px-2 py-1.5 border rounded-lg font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: Bangladesh Delivery & Rates */}
      {activeTab === 'shipping' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🇧🇩</span>
              <h2 className="text-base font-bold text-slate-800">
                Bangladesh Shipping & Delivery Rates Configuration
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure delivery charges for Dhaka and outside Dhaka, COD options, and customer delivery notices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Inside Dhaka Delivery Charge (৳)
              </label>
              <input
                type="number"
                value={settings.shipping?.insideDhakaRate ?? 60}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    shipping: {
                      ...settings.shipping,
                      insideDhakaRate: Number(e.target.value),
                    },
                  })
                }
                className="w-full text-sm font-semibold px-3 py-2 border rounded-lg border-slate-300 bg-white"
                placeholder="60"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">Standard metro delivery fee.</p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Outside Dhaka Delivery Charge (৳)
              </label>
              <input
                type="number"
                value={settings.shipping?.outsideDhakaRate ?? 120}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    shipping: {
                      ...settings.shipping,
                      outsideDhakaRate: Number(e.target.value),
                    },
                  })
                }
                className="w-full text-sm font-semibold px-3 py-2 border rounded-lg border-slate-300 bg-white"
                placeholder="120"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">Courier delivery across all districts.</p>
            </div>

            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Free Delivery Above Cart Total (৳)
              </label>
              <input
                type="number"
                value={settings.shipping?.freeShippingThreshold ?? 2000}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    shipping: {
                      ...settings.shipping,
                      freeShippingThreshold: Number(e.target.value),
                    },
                  })
                }
                className="w-full text-sm font-semibold px-3 py-2 border rounded-lg border-slate-300 bg-white"
                placeholder="2000"
              />
              <p className="text-[11px] text-slate-400 mt-1.5">Set 0 to disable free delivery rule.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dhaka Delivery Timeline
              </label>
              <input
                type="text"
                value={settings.shipping?.deliveryTimeDhaka || '24-48 Hours'}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    shipping: {
                      ...settings.shipping,
                      deliveryTimeDhaka: e.target.value,
                    },
                  })
                }
                className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                placeholder="24-48 Hours"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Outside Dhaka Delivery Timeline
              </label>
              <input
                type="text"
                value={settings.shipping?.deliveryTimeOutsideDhaka || '2-4 Days'}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    shipping: {
                      ...settings.shipping,
                      deliveryTimeOutsideDhaka: e.target.value,
                    },
                  })
                }
                className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                placeholder="2-4 Days"
              />
            </div>

            <div className="flex items-center justify-between border border-slate-200 rounded-xl p-4">
              <div>
                <p className="text-xs font-bold text-slate-800">Cash on Delivery (COD)</p>
                <p className="text-[11px] text-slate-500">Enable cash payment upon delivery</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.shipping?.codAvailable ?? true}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      shipping: {
                        ...settings.shipping,
                        codAvailable: e.target.checked,
                      },
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Shipping & Cash on Delivery Notice (Displayed on Checkout & Product Pages)
            </label>
            <textarea
              rows={3}
              value={settings.shipping?.shippingPolicyNote || ''}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  shipping: {
                    ...settings.shipping,
                    shippingPolicyNote: e.target.value,
                  },
                })
              }
              className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
              placeholder="e.g. We deliver all over Bangladesh with safe courier handling and Cash on Delivery option."
            />
          </div>
        </div>
      )}

      {/* TAB 6: Store Information */}
      {activeTab === 'store' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-800">MustBuy Store Brand & Contact</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Contact info displayed in Header, Footer, and customer order emails.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Store Name</label>
              <input
                type="text"
                value={settings.store?.name || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    store: { ...settings.store, name: e.target.value },
                  })
                }
                className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                placeholder="MustBuy"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.store?.tagline || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    store: { ...settings.store, tagline: e.target.value },
                  })
                }
                className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                placeholder="Buy The Chosen Ones"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Customer Support Phone
              </label>
              <input
                type="text"
                value={settings.store?.phone || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    store: { ...settings.store, phone: e.target.value },
                  })
                }
                className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                placeholder="+880 1700-000000"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Support Email Address
              </label>
              <input
                type="email"
                value={settings.store?.email || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    store: { ...settings.store, email: e.target.value },
                  })
                }
                className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                placeholder="support@mustbuy.com.bd"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Store / Office Address in Bangladesh
              </label>
              <input
                type="text"
                value={settings.store?.address || ''}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    store: { ...settings.store, address: e.target.value },
                  })
                }
                className="w-full text-sm px-3 py-2 border rounded-lg border-slate-300"
                placeholder="Dhaka, Bangladesh"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
