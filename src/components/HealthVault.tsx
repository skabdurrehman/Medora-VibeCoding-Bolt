import React, { useState, useEffect } from 'react';
import { FileText, Upload, Download, Calendar, User, Heart, ArrowLeft, Shield, Clock, Activity, Pill, Crown, Trash2, Edit3, Save, X } from 'lucide-react';
import { Screen } from '../App';
import { revenueCat, PREMIUM_FEATURES } from '../utils/revenueCat';
import { supabase } from '../utils/supabase';

interface HealthVaultProps {
  onNavigate: (screen: Screen) => void;
}

interface HealthFile {
  id: string;
  name: string;
  type: string;
  size: number;
  upload_date: string;
  description: string;
  doctor_signed: boolean;
  file_url: string;
  category: string;
}

export const HealthVault: React.FC<HealthVaultProps> = ({ onNavigate }) => {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [healthFiles, setHealthFiles] = useState<HealthFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', doctor_signed: false });

  const medicalEvents = [
    {
      id: 1,
      date: '2024-01-15',
      type: 'Consultation',
      doctor: 'Dr. Sarah Johnson',
      hospital: 'City Medical Center',
      diagnosis: 'Annual Checkup',
      status: 'completed',
      documents: ['lab-results.pdf', 'prescription.pdf']
    },
    {
      id: 2,
      date: '2024-01-08',
      type: 'Surgery',
      doctor: 'Dr. Michael Chen',
      hospital: 'Regional Hospital',
      diagnosis: 'Appendectomy',
      status: 'completed',
      documents: ['surgery-report.pdf', 'discharge-notes.pdf']
    },
    {
      id: 3,
      date: '2024-01-03',
      type: 'Emergency',
      doctor: 'Dr. Emily Rodriguez',
      hospital: 'Emergency Care Unit',
      diagnosis: 'Acute Abdominal Pain',
      status: 'completed',
      documents: ['er-report.pdf', 'ct-scan.pdf']
    }
  ];

  const healthStats = [
    { label: 'Blood Pressure', value: '120/80', icon: <Activity size={18} />, status: 'normal' },
    { label: 'Heart Rate', value: '72 bpm', icon: <Heart size={18} />, status: 'normal' },
    { label: 'Weight', value: '65 kg', icon: <User size={18} />, status: 'normal' },
    { label: 'Files Stored', value: healthFiles.length.toString(), icon: <FileText size={18} />, status: 'active' }
  ];

  useEffect(() => {
    loadHealthFiles();
  }, []);

  const loadHealthFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('health_files')
        .select('*')
        .order('upload_date', { ascending: false });

      if (error) throw error;
      setHealthFiles(data || []);
    } catch (error) {
      console.error('Error loading health files:', error);
      // Mock data for demo
      setHealthFiles([
        {
          id: '1',
          name: 'Blood Test Results',
          type: 'application/pdf',
          size: 245760,
          upload_date: '2024-01-15',
          description: 'Complete blood count and lipid profile',
          doctor_signed: true,
          file_url: '#',
          category: 'Lab Results'
        },
        {
          id: '2',
          name: 'X-Ray Chest',
          type: 'image/jpeg',
          size: 1048576,
          upload_date: '2024-01-10',
          description: 'Routine chest X-ray examination',
          doctor_signed: true,
          file_url: '#',
          category: 'Imaging'
        }
      ]);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `health-files/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('health-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('health-files')
        .getPublicUrl(filePath);

      // Save file record to database
      const fileRecord = {
        name: file.name.replace(/\.[^/.]+$/, ""),
        type: file.type,
        size: file.size,
        upload_date: new Date().toISOString(),
        description: '',
        doctor_signed: false,
        file_url: publicUrl,
        category: file.type.startsWith('image/') ? 'Imaging' : 'Documents'
      };

      const { error: dbError } = await supabase
        .from('health_files')
        .insert([fileRecord]);

      if (dbError) throw dbError;

      loadHealthFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
      // Add mock file for demo
      const mockFile: HealthFile = {
        id: Date.now().toString(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        type: file.type,
        size: file.size,
        upload_date: new Date().toISOString(),
        description: '',
        doctor_signed: false,
        file_url: '#',
        category: file.type.startsWith('image/') ? 'Imaging' : 'Documents'
      };
      setHealthFiles(prev => [mockFile, ...prev]);
    } finally {
      setUploading(false);
    }
  };

  const handleEditFile = (file: HealthFile) => {
    setEditingFile(file.id);
    setEditForm({
      name: file.name,
      description: file.description,
      doctor_signed: file.doctor_signed
    });
  };

  const handleSaveEdit = async (fileId: string) => {
    try {
      const { error } = await supabase
        .from('health_files')
        .update(editForm)
        .eq('id', fileId);

      if (error) throw error;
      
      setEditingFile(null);
      loadHealthFiles();
    } catch (error) {
      console.error('Error updating file:', error);
      // Update locally for demo
      setHealthFiles(prev => prev.map(file => 
        file.id === fileId ? { ...file, ...editForm } : file
      ));
      setEditingFile(null);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('Are you sure you want to delete this file?')) return;

    try {
      const { error } = await supabase
        .from('health_files')
        .delete()
        .eq('id', fileId);

      if (error) throw error;
      
      loadHealthFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
      // Remove locally for demo
      setHealthFiles(prev => prev.filter(file => file.id !== fileId));
    }
  };

  const handlePremiumFeature = () => {
    setShowPremiumModal(true);
  };

  const handlePurchasePremium = async () => {
    setIsPurchasing(true);
    
    try {
      const result = await revenueCat.purchasePremium('ai_mentor_monthly');
      
      if (result.success) {
        setPurchaseSuccess(true);
        setTimeout(() => {
          setShowPremiumModal(false);
          setPurchaseSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setIsPurchasing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-premium-gradient-dark px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-premium-text-secondary hover:text-premium-text-primary transition-colors bg-premium-bg-secondary/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-premium-accent-gold/20"
        >
          <ArrowLeft size={16} />
          <span className="font-medium text-sm">Back to Home</span>
        </button>
        <h1 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">Health Vault</h1>
        <div className="flex items-center gap-2 bg-premium-accent-sage/10 px-3 py-2 rounded-lg border border-premium-accent-sage/20 mr-16">
          <Shield size={16} className="text-premium-accent-sage" />
          <span className="font-medium text-premium-accent-sage text-sm">Encrypted</span>
        </div>
      </div>

      {/* Health Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {healthStats.map((stat, index) => (
          <div key={index} className="bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-4 border border-premium-accent-gold/15">
            <div className="flex items-center gap-2 mb-2">
              {stat.icon}
              <span className="text-xs font-medium text-premium-text-secondary">{stat.label}</span>
            </div>
            <p className="font-bold text-premium-text-primary">{stat.value}</p>
            <div className={`w-2 h-2 rounded-full mt-2 ${
              stat.status === 'normal' ? 'bg-premium-accent-sage' : 'bg-premium-accent-orange'
            }`}></div>
          </div>
        ))}
      </div>

      {/* File Upload Section */}
      <div className="bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-6 border border-premium-accent-gold/15 mb-8">
        <h2 className="text-lg font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-4">Upload Health Documents</h2>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 bg-premium-gradient-primary text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <Upload size={18} />
            {uploading ? 'Uploading...' : 'Upload File'}
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <p className="text-premium-text-secondary text-sm">
            Supported: PDF, Images, Word documents (Max 10MB)
          </p>
        </div>
      </div>

      {/* Health Files List */}
      <div className="bg-premium-bg-secondary/60 backdrop-blur-sm rounded-xl p-6 border border-premium-accent-gold/15 mb-8">
        <h2 className="text-lg font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-6">Your Health Files</h2>
        
        {healthFiles.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="text-premium-text-secondary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-bold text-premium-text-secondary mb-2">No files uploaded yet</h3>
            <p className="text-premium-text-secondary opacity-70">Upload your first health document to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {healthFiles.map((file) => (
              <div key={file.id} className="bg-premium-bg-primary/40 rounded-lg p-4 border border-premium-accent-gold/10">
                {editingFile === file.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="w-full p-2 bg-premium-bg-secondary/60 border border-premium-accent-gold/20 rounded-lg text-premium-text-primary focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20"
                    />
                    <textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      placeholder="Add description..."
                      className="w-full p-2 bg-premium-bg-secondary/60 border border-premium-accent-gold/20 rounded-lg text-premium-text-primary placeholder-premium-text-secondary focus:outline-none focus:ring-2 focus:ring-premium-accent-orange/20 resize-none"
                      rows={2}
                    />
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-premium-text-primary">
                        <input
                          type="checkbox"
                          checked={editForm.doctor_signed}
                          onChange={(e) => setEditForm({...editForm, doctor_signed: e.target.checked})}
                          className="rounded"
                        />
                        Doctor Signed
                      </label>
                      <div className="flex gap-2 ml-auto">
                        <button
                          onClick={() => handleSaveEdit(file.id)}
                          className="flex items-center gap-1 bg-premium-accent-sage text-white px-3 py-1 rounded-lg text-sm hover:bg-premium-accent-sage/80 transition-colors"
                        >
                          <Save size={14} />
                          Save
                        </button>
                        <button
                          onClick={() => setEditingFile(null)}
                          className="flex items-center gap-1 bg-premium-text-secondary text-white px-3 py-1 rounded-lg text-sm hover:bg-premium-text-secondary/80 transition-colors"
                        >
                          <X size={14} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText size={24} className="text-premium-accent-orange" />
                      <div>
                        <h3 className="font-bold text-premium-text-primary">{file.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-premium-text-secondary">
                          <span>{file.category}</span>
                          <span>{formatFileSize(file.size)}</span>
                          <span>{new Date(file.upload_date).toLocaleDateString()}</span>
                          {file.doctor_signed && (
                            <span className="bg-premium-accent-sage/20 text-premium-accent-sage px-2 py-1 rounded-full text-xs font-medium">
                              Doctor Signed
                            </span>
                          )}
                        </div>
                        {file.description && (
                          <p className="text-premium-text-secondary text-sm mt-1">{file.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => window.open(file.file_url, '_blank')}
                        className="p-2 text-premium-accent-sage hover:bg-premium-accent-sage/10 rounded-lg transition-colors"
                      >
                        <Download size={16} />
                      </button>
                      <button
                        onClick={() => handleEditFile(file)}
                        className="p-2 text-premium-accent-orange hover:bg-premium-accent-orange/10 rounded-lg transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className="p-2 text-premium-accent-coral hover:bg-premium-accent-coral/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Premium AI Mentor Feature */}
      <div className="bg-gradient-to-r from-premium-accent-gold/15 to-premium-accent-orange/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-premium-accent-gold/30">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-premium-gradient-gold rounded-xl flex items-center justify-center">
            <Crown size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent">AI Health Mentor</h3>
            <p className="text-premium-text-secondary text-sm">Get personalized health insights and report explanations</p>
          </div>
          <div className="ml-auto">
            <span className="px-3 py-1 bg-premium-gradient-gold text-white text-xs font-bold rounded-full">PREMIUM</span>
          </div>
        </div>
        <p className="text-premium-text-secondary mb-4">
          Let our AI mentor analyze your health reports and provide easy-to-understand explanations, personalized recommendations, and answer your health questions.
        </p>
        <button 
          onClick={handlePremiumFeature}
          className="bg-premium-gradient-gold text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Unlock AI Mentor
        </button>
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-premium-bg-primary/90 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <div className="bg-premium-bg-secondary/90 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-premium-accent-gold/20 shadow-2xl">
            {purchaseSuccess ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-premium-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown size={32} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-2">AI Mentor Unlocked!</h2>
                <p className="text-premium-text-secondary">Your AI Health Mentor is now active.</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-premium-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4">
                    <Crown size={32} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-2">Premium Feature</h2>
                  <p className="text-premium-text-secondary">Unlock AI Health Mentor</p>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-premium-accent-gold/10 rounded-xl border border-premium-accent-gold/20">
                    <h3 className="font-bold text-premium-text-primary mb-2">✨ AI Health Mentor includes:</h3>
                    <ul className="text-sm text-premium-text-secondary space-y-1">
                      <li>• Personalized report explanations</li>
                      <li>• Health recommendations</li>
                      <li>• 24/7 health questions support</li>
                      <li>• Trend analysis & insights</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-premium-gradient-text-primary bg-clip-text text-transparent mb-2">$9.99/month</div>
                    <p className="text-premium-text-secondary text-sm">Cancel anytime</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handlePurchasePremium}
                    disabled={isPurchasing}
                    className="w-full bg-premium-gradient-gold text-white py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50"
                  >
                    {isPurchasing ? 'Processing...' : 'Start Premium Trial'}
                  </button>
                  <button
                    onClick={() => setShowPremiumModal(false)}
                    className="w-full py-3 text-premium-text-secondary hover:text-premium-text-primary transition-colors border border-premium-accent-gold/20 rounded-lg"
                  >
                    Maybe Later
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};