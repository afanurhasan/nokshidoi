'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, CheckCircle2, AlertCircle, Loader2, Image as ImageIcon, Link2 } from 'lucide-react';

export default function ImageUploadField({
  label = 'Image Upload',
  value = '',
  onChange,
  recommendedWidth = 800,
  recommendedHeight = 800,
  recommendedRatio = '1:1',
  recommendedFormat = 'JPG, PNG, WebP',
  maxSizeMB = 5,
  helperText = '',
  placeholder = 'https://example.com/image.jpg',
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('upload'); // 'upload' | 'url'
  const [urlInput, setUrlInput] = useState(value || '');
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds limit (${maxSizeMB}MB). Please upload a smaller image.`);
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload image.');
      }

      onChange(data.url);
      setUrlInput(data.url);
    } catch (err) {
      setError(err.message || 'Error uploading file.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setError(null);
    onChange(urlInput.trim());
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {label}
        </label>
        <div className="flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-0.5 rounded transition ${
              mode === 'upload'
                ? 'bg-emerald-600 text-white font-medium'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            File Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-0.5 rounded transition ${
              mode === 'url'
                ? 'bg-emerald-600 text-white font-medium'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            URL
          </button>
        </div>
      </div>

      {/* Specifications box */}
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-lg p-2.5 text-xs text-emerald-900 dark:text-emerald-300">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-medium">
          <div>
            <span className="text-emerald-700 dark:text-emerald-400 block text-[11px] uppercase tracking-wider">Dimensions</span>
            <span>{recommendedWidth} × {recommendedHeight} px</span>
          </div>
          <div>
            <span className="text-emerald-700 dark:text-emerald-400 block text-[11px] uppercase tracking-wider">Aspect Ratio</span>
            <span>{recommendedRatio}</span>
          </div>
          <div>
            <span className="text-emerald-700 dark:text-emerald-400 block text-[11px] uppercase tracking-wider">Formats</span>
            <span>{recommendedFormat}</span>
          </div>
          <div>
            <span className="text-emerald-700 dark:text-emerald-400 block text-[11px] uppercase tracking-wider">Max File Size</span>
            <span>Up to {maxSizeMB} MB</span>
          </div>
        </div>
        {helperText && <p className="mt-1.5 text-[11px] text-emerald-800 dark:text-emerald-400 italic">{helperText}</p>}
      </div>

      {/* Mode 1: File Upload */}
      {mode === 'upload' ? (
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            onChange={handleFileUpload}
            className="hidden"
            id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          />
          <div
            onClick={() => !loading && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition ${
              loading
                ? 'border-slate-300 bg-slate-50 cursor-not-allowed'
                : 'border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/20'
            }`}
          >
            {loading ? (
              <div className="flex flex-col items-center py-3 text-slate-500">
                <Loader2 className="w-7 h-7 animate-spin text-emerald-600 mb-2" />
                <span className="text-xs font-medium">Uploading image safely...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center py-2 text-center">
                <Upload className="w-6 h-6 text-emerald-600 mb-1" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                  Click to browse or drag & drop image
                </span>
                <span className="text-[11px] text-slate-400">
                  Optimized for fast CDN delivery
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Mode 2: Direct URL */
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="url"
              placeholder={placeholder}
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full text-xs px-3 py-2 border rounded-lg border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <button
            type="submit"
            className="text-xs px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium"
          >
            Apply
          </button>
        </form>
      )}

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded p-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Image Preview */}
      {value && (
        <div className="relative mt-2 p-2 border rounded-xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden border bg-white flex-shrink-0">
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/favicon.ico';
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Image linked successfully</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate max-w-xs">{value}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
