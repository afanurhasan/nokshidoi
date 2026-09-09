import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Allowed formats and maximum size (5MB)
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') || formData.get('files') || formData.get('image');

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'No valid file provided. Please attach an image file.' },
        { status: 400 }
      );
    }

    // Size validation
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds 5MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.` },
        { status: 400 }
      );
    }

    // Type validation
    if (file.type && !ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${file.type}. Allowed formats: JPG, PNG, WebP, GIF, SVG.` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Try forwarding to Strapi if STRAPI_URL and admin/api token is available
    const strapiBase = process.env.NEXT_PUBLIC_STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_URL;
    const strapiToken = process.env.STRAPI_ADMIN_TOKEN || process.env.STRAPI_API_TOKEN;

    if (strapiBase && strapiToken) {
      try {
        const strapiFormData = new FormData();
        const blob = new Blob([buffer], { type: file.type || 'image/jpeg' });
        strapiFormData.append('files', blob, file.name || 'image.jpg');

        const strapiRes = await fetch(`${strapiBase.replace(/\/$/, '')}/api/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${strapiToken}`,
          },
          body: strapiFormData,
        });

        if (strapiRes.ok) {
          const strapiData = await strapiRes.json();
          const uploadedFile = Array.isArray(strapiData) ? strapiData[0] : strapiData;
          if (uploadedFile?.url) {
            const finalUrl = uploadedFile.url.startsWith('http')
              ? uploadedFile.url
              : `${strapiBase.replace(/\/$/, '')}${uploadedFile.url}`;
            return NextResponse.json({
              success: true,
              url: finalUrl,
              name: uploadedFile.name || file.name,
              size: file.size,
              provider: 'strapi',
            });
          }
        }
      } catch (err) {
        console.warn('Strapi upload failed, falling back to local storage:', err.message);
      }
    }

    // Fallback: Safe local filesystem storage in public/uploads/
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    // Sanitize filename and create unique timestamp
    const ext = path.extname(file.name || '') || (file.type === 'image/png' ? '.png' : file.type === 'image/webp' ? '.webp' : '.jpg');
    const cleanBaseName = (path.basename(file.name || 'image', ext) || 'image')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase()
      .slice(0, 30);
    const uniqueFileName = `${cleanBaseName}-${Date.now()}${ext}`;
    const filePath = path.join(uploadsDir, uniqueFileName);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      name: uniqueFileName,
      size: file.size,
      provider: 'local',
    });
  } catch (error) {
    console.error('Upload error in /api/upload:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image. Please try again.' },
      { status: 500 }
    );
  }
}
