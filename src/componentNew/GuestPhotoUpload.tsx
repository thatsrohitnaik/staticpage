import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Camera, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

// Initialize Supabase Client
const supabaseUrl = 'https://iwrohbmefqoepezhwxhb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3cm9oYm1lZnFvZXBlemh3eGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MTEwODYsImV4cCI6MjA4NTI4NzA4Nn0.vMElg75aPWDNBgIezmVrTqo54rr5ZniiGtKTNv12cwQ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Props {
    accessToken: string; // The Host's Google Access Token
    albumId: string;     // Your Google Photos Album ID
}

export default function GuestPhotoUpload({ accessToken, albumId }: Props) {
    const [uploading, setUploading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    console.log('accessToken:', accessToken);
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        try {
            setUploading(true);
            setStatus('idle');

            // 1. Convert File to Base64 String
            const base64Data = await fileToBase64(file);

            // 2. Call the Supabase Edge Function
            const { data, error } = await supabase.functions.invoke('upload-to-photos', {
                body: {
                    formData: base64Data,
                    fileName: file.name,
                    accessToken: accessToken,
                    albumId: albumId
                }
            });

            if (error) throw error;

            setStatus('success');
        } catch (err: any) {
            console.error('Upload Error:', err);
            setStatus('error');
            setErrorMessage(err.message || 'Something went wrong');
        } finally {
            setUploading(false);
        }
    };

    // Helper function to convert file to base64
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = (reader.result as string).split(',')[1];
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-900 rounded-3xl border border-gray-800 shadow-xl text-center">
            <div className="flex flex-col items-center">
                {/* Icon State Logic */}
                <div className={`p-4 rounded-full mb-4 ${
                    status === 'success' ? 'bg-green-500/10' :
                        status === 'error' ? 'bg-red-500/10' : 'bg-blue-500/10'
                }`}>
                    {uploading ? (
                        <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
                    ) : status === 'success' ? (
                        <CheckCircle2 className="w-12 h-12 text-green-400" />
                    ) : status === 'error' ? (
                        <AlertCircle className="w-12 h-12 text-red-400" />
                    ) : (
                        <Camera className="w-12 h-12 text-blue-400" />
                    )}
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">Capture the Moment</h2>
                <p className="text-gray-400 mb-6">
                    {status === 'success'
                        ? "Your photo has been added to our wedding album!"
                        : "Snap a photo or pick one from your gallery to share with us."}
                </p>

                {/* Custom Upload Button */}
                <label className={`relative cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-lg transition-all active:scale-95 ${uploading ? 'opacity-50 pointer-events-none' : 'hover:scale-105'}`}>
                    {uploading ? 'Uploading...' : status === 'success' ? 'Add Another' : 'Upload Photo'}
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploading}
                    />
                </label>

                {status === 'error' && (
                    <p className="mt-4 text-red-400 text-sm">{errorMessage}</p>
                )}
            </div>
        </div>
    );
}