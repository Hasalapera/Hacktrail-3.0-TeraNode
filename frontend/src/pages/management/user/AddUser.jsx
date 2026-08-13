import { useState } from 'react';
import api from '../../../api/axiosInstance';
import Papa from 'papaparse';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../layout/DashboardLayout';

// A small component to display generated credentials with a copy button
const CredentialsDisplay = ({ credentials, onCopy }) => (
  <div className="space-y-3 mt-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
    {credentials.map(({ university_id, password }) => (
      <div key={university_id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white/60 border border-green-200 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <div className="font-mono text-slate-800 text-sm mb-2 sm:mb-0">
          <span className="font-bold text-slate-900 mr-2">{university_id}:</span> 
          <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{password}</span>
        </div>
        <button
          type="button"
          onClick={() => onCopy(password)}
          className="flex items-center justify-center gap-1 text-xs bg-green-100 hover:bg-green-600 hover:text-white text-green-700 font-semibold py-1.5 px-3 rounded-md transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          Copy
        </button>
      </div>
    ))}
  </div>
);

export default function AddUser() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('single');

  // State for single student form
  const [singleForm, setSingleForm] = useState({ name: '', university_id: '', skills: '' });
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState('');
  const [singleSuccess, setSingleSuccess] = useState(null);

  // State for bulk upload
  const [file, setFile] = useState(null);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [bulkError, setBulkError] = useState('');
  const [bulkSuccess, setBulkSuccess] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Reset states when switching tabs
    setSingleError('');
    setSingleSuccess(null);
    setBulkError('');
    setBulkSuccess(null);
    setFile(null);
    setFileName('');
  };

  const handleSingleChange = (e) => {
    setSingleForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setSingleError('');
    setSingleSuccess(null);
  };

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    if (!singleForm.name.trim() || !singleForm.university_id.trim()) {
      setSingleError('Name and University ID are required.');
      return;
    }
    setSingleLoading(true);
    setSingleError('');
    setSingleSuccess(null);
    try {
      const payload = {
        name: singleForm.name,
        university_id: singleForm.university_id,
        skills: singleForm.skills ? singleForm.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
      };
      const res = await api.post('/admin/students/single', payload);
      setSingleSuccess({
        message: res.data.message,
        password: res.data.generatedPassword,
        university_id: res.data.student.university_id,
      });
      setSingleForm({ name: '', university_id: '', skills: '' }); // Clear form
    } catch (err) {
      setSingleError(err.response?.data?.message || 'Failed to add student. Please try again.');
    } finally {
      setSingleLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setBulkError('');
      setBulkSuccess(null);
    }
  };

  const handleBulkSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setBulkError('Please select a CSV file to upload.');
      return;
    }
    setBulkLoading(true);
    setBulkError('');
    setBulkSuccess(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        if (!results.data.length || !results.meta.fields.includes('name') || !results.meta.fields.includes('university_id')) {
          setBulkError('CSV must contain "name" and "university_id" columns.');
          setBulkLoading(false);
          return;
        }

        const students = results.data.map(row => ({
          name: row.name,
          university_id: row.university_id,
          skills: row.skills ? row.skills.split(';').map(s => s.trim()).filter(Boolean) : [], // Use semicolon for skills to avoid CSV comma issues
        }));

        try {
          const res = await api.post('/admin/students/bulk', { students });
          setBulkSuccess({
            message: res.data.message,
            credentials: res.data.students,
          });
          setFile(null);
          setFileName('');
        } catch (err) {
          setBulkError(err.response?.data?.message || 'Bulk upload failed. Please check the file and try again.');
        } finally {
          setBulkLoading(false);
        }
      },
      error: (err) => {
        setBulkError(`CSV parsing error: ${err.message}`);
        setBulkLoading(false);
      },
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Password copied to clipboard');
    });
  };

  return (
    <DashboardLayout
      activeTab="students"
      onTabChange={(tab) => navigate('/dashboard', { state: { initialTab: tab } })}
    >
      <section className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Onboard New Students</h2>
          <p className="mt-2 text-sm text-slate-500">
            Add students individually or upload a list in bulk. Go back to{' '}
            <Link to="/dashboard" state={{ initialTab: 'students' }} className="text-blue-600 hover:text-blue-700 hover:underline font-semibold transition-colors">
              Student Management
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-6 sm:p-10">
          
          {/* Tab Buttons */}
          <div className="flex p-1 space-x-1 bg-slate-100/80 rounded-xl mb-10 max-w-md mx-auto border border-slate-200/60">
            <button
              onClick={() => handleTabChange('single')}
              className={`flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg transition-all duration-300 focus:outline-none ${
                activeTab === 'single' 
                  ? 'bg-white shadow-sm text-blue-700 ring-1 ring-slate-900/5' 
                  : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700'
              }`}
            >
              Single Student
            </button>
            <button
              onClick={() => handleTabChange('bulk')}
              className={`flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg transition-all duration-300 focus:outline-none ${
                activeTab === 'bulk' 
                  ? 'bg-white shadow-sm text-blue-700 ring-1 ring-slate-900/5' 
                  : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-700'
              }`}
            >
              Bulk Add (CSV)
            </button>
          </div>

          {/* Tab Content */}
          <div className="max-w-xl mx-auto">
            {/* --- SINGLE STUDENT TAB --- */}
            {activeTab === 'single' && (
              <form className="space-y-6" onSubmit={handleSingleSubmit} noValidate>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={singleForm.name}
                    onChange={handleSingleChange}
                    placeholder="e.g., Hasala Shehan"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-slate-700 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">University Index Number</label>
                  <input
                    type="text"
                    name="university_id"
                    value={singleForm.university_id}
                    onChange={handleSingleChange}
                    placeholder="e.g., TG/2022/1357"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-slate-700 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Skills (optional)</label>
                  <input
                    type="text"
                    name="skills"
                    value={singleForm.skills}
                    onChange={handleSingleChange}
                    placeholder="e.g., Graphic Design, PC Repair, Tutoring"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 text-slate-700 placeholder:text-slate-400"
                  />
                  <p className="text-xs text-slate-500 mt-2 font-medium flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Enter skills separated by commas.
                  </p>
                </div>

                {/* Alerts */}
                {singleError && (
                  <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 animate-pulse-once">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                    <span className="text-sm font-medium">{singleError}</span>
                  </div>
                )}

                {singleSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm">
                    <p className="font-bold text-emerald-800 flex items-center gap-2 mb-4">
                      <span className="flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-full text-emerald-600">✓</span>
                      {singleSuccess.message}
                    </p>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-3 rounded-lg border border-emerald-100 shadow-sm">
                      <div className="font-mono text-slate-800 mb-3 sm:mb-0 text-sm">
                        <span className="font-bold text-slate-900 mr-2">{singleSuccess.university_id}:</span> 
                        <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{singleSuccess.password}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(singleSuccess.password)}
                        className="flex items-center gap-1 text-xs bg-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-800 font-bold py-2 px-4 rounded-md transition-all duration-200 w-full sm:w-auto justify-center"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        Copy
                      </button>
                    </div>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={singleLoading} 
                  className={`w-full py-3.5 px-4 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl ${
                    singleLoading 
                      ? 'bg-blue-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.99]'
                  }`}
                >
                  {singleLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Adding Student...
                    </span>
                  ) : 'Add Student'}
                </button>
              </form>
            )}

            {/* --- BULK ADD TAB --- */}
            {activeTab === 'bulk' && (
              <div className="space-y-6">
                <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-xl">
                  <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    CSV Format Instructions
                  </h4>
                  <ul className="space-y-2 text-sm text-blue-800 ml-1">
                    <li className="flex items-start gap-2"><span className="text-blue-400 font-bold">•</span> The file must be a valid CSV.</li>
                    <li className="flex items-start gap-2"><span className="text-blue-400 font-bold">•</span> First row must be a header: <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-900 font-semibold">name</code>, <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-900 font-semibold">university_id</code>, and <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-900 font-semibold">skills</code>.</li>
                    <li className="flex items-start gap-2"><span className="text-blue-400 font-bold">•</span> Separate multiple skills with a semicolon (<strong className="bg-white px-1 rounded shadow-sm">;</strong>).</li>
                  </ul>
                </div>

                <form onSubmit={handleBulkSubmit}>
                  <div className="relative group">
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      accept=".csv" 
                      onChange={handleFileChange} 
                    />
                    <div className={`w-full flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all duration-200 ease-in-out ${
                      fileName ? 'border-blue-400 bg-blue-50/50' : 'border-slate-300 bg-slate-50 group-hover:border-blue-400 group-hover:bg-blue-50/30'
                    }`}>
                      <div className={`p-3 rounded-full mb-3 ${fileName ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600'} transition-colors`}>
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                      </div>
                      <p className="text-sm font-medium text-slate-700 text-center mb-1">
                        {fileName ? (
                          <span className="text-blue-600 font-bold">{fileName}</span>
                        ) : (
                          <>
                            <span className="text-blue-600 font-bold">Click to upload</span> or drag and drop
                          </>
                        )}
                      </p>
                      <p className="text-xs text-slate-500 font-medium">CSV file up to 10MB</p>
                    </div>
                  </div>

                  {bulkError && (
                    <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 mt-5">
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                      <span className="text-sm font-medium">{bulkError}</span>
                    </div>
                  )}

                  {bulkSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm mt-5">
                      <p className="font-bold text-emerald-800 flex items-center gap-2 border-b border-emerald-100 pb-3">
                        <span className="flex items-center justify-center w-6 h-6 bg-emerald-100 rounded-full text-emerald-600">✓</span>
                        {bulkSuccess.message}
                      </p>
                      <CredentialsDisplay credentials={bulkSuccess.credentials} onCopy={copyToClipboard} />
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={bulkLoading || !file} 
                    className={`w-full mt-6 py-3.5 px-4 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-lg ${
                      bulkLoading || !file 
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:scale-[0.99] hover:shadow-xl'
                    }`}
                  >
                    {bulkLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Processing File...
                      </span>
                    ) : 'Upload and Add Students'}
                  </button>
                </form>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </section>
    </DashboardLayout>
  );
}