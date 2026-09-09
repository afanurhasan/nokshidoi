import { NextResponse } from 'next/server';
import { getSettings, saveSettings } from '@/lib/settings';

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Failed to get settings:', error);
    return NextResponse.json({ error: 'Failed to retrieve settings' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const updated = await saveSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error('Failed to save settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
