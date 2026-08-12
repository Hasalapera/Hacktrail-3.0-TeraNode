import { useState } from 'react';
import api from '../api/axiosInstance';
import Papa from 'papaparse'; // Note: This dependency needs to be installed (`npm install papaparse`)

// A small component to display generated credentials with a copy button
const CredentialsDisplay = ({ credentials, onCopy }) => (
  <div className="space-y-2">
    {credentials.map(({ university_id, password }) => (
      <div key={university_id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md text-sm">
        <div className="font-mono text-gray-700">
          <span className="font-semibold">{university_id}:</span> {password}
        </div>
        <button
          type="button"
          onClick={() => onCopy(password)}
          className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold py-1 px-2 rounded"
        >
          Copy
        </button>
      </div>
    ))}
  </div>
);

export default function AddUser() {
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
      // You can add a "Copied!" toast notification here for better UX
      console.log('Password copied to clipboard');
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg sm:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800 sm:text-3xl">
            Onboard New Students
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Add students individually or upload a list in bulk.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="my-8 flex rounded-lg border border-slate-200 bg-slate-100 p-1">
          <button
            onClick={() => handleTabChange('single')}
            className={`flex-1 rounded-md py-2 px-2 text-sm font-semibold transition-all duration-200 focus:outline-none ${
              activeTab === 'single' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            Single Student
          </button>
          <button
            onClick={() => handleTabChange('bulk')}
            className={`flex-1 rounded-md py-2 px-2 text-sm font-semibold transition-all duration-200 focus:outline-none ${
              activeTab === 'bulk' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-200'
            }`}
          >
            Bulk Add (CSV)
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'single' && (
            <form className="space-y-6" onSubmit={handleSingleSubmit} noValidate>
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={singleForm.name}
                  onChange={handleSingleChange}
                  placeholder="e.g., Hasala Shehan"
                  className="w-full rounded-xl border-[1.5px] border-slate-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#1A3268] focus:shadow-[0_0_0_3px_rgba(26,50,104,0.1)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-600">University Index Number</label>
                <input
                  type="text"
                  name="university_id"
                  value={singleForm.university_id}
                  onChange={handleSingleChange}
                  placeholder="e.g., TG/2022/1357"
                  className="w-full rounded-xl border-[1.5px] border-slate-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#1A3268] focus:shadow-[0_0_0_3px_rgba(26,50,104,0.1)]"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-600">Skills (optional)</label>
                <input
                  type="text"
                  name="skills"
                  value={singleForm.skills}
                  onChange={handleSingleChange}
                  placeholder="e.g., Graphic Design, PC Repair, Tutoring"
                  className="w-full rounded-xl border-[1.5px] border-slate-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#1A3268] focus:shadow-[0_0_0_3px_rgba(26,50,104,0.1)]"
                />
                <p className="mt-1 text-xs text-gray-500">Enter skills separated by commas.</p>
              </div>

              {singleError && (
                <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  <span>⚠</span>{singleError}
                </div>
              )}

              {singleSuccess && (
                <div className="space-y-2 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                  <p className="font-semibold">{singleSuccess.message}</p>
                  <div className="flex items-center justify-between rounded-md bg-green-100 p-2">
                    <div className="font-mono text-green-900">
                      <span className="font-semibold">{singleSuccess.university_id}:</span> {singleSuccess.password}
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(singleSuccess.password)}
                      className="rounded bg-green-200 py-1 px-2 text-xs font-semibold text-green-900 hover:bg-green-300"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              )}

              <button type="submit" disabled={singleLoading} className="w-full rounded-xl bg-[#0D1F4C] py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:bg-[#1A3268] hover:shadow-[0_4px_16px_rgba(13,31,76,0.25)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none">
                {singleLoading ? 'Adding Student…' : 'Add Student'}
              </button>
            </form>
          )}

          {activeTab === 'bulk' && (
            <div className="space-y-6">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm">
                <h4 className="mb-2 font-semibold text-blue-800">CSV File Instructions</h4>
                <ul className="list-inside list-disc space-y-1 text-blue-700">
                  <li>The file must be a valid CSV.</li>
                  <li>The first row must be a header with columns: <strong>name</strong>, <strong>university_id</strong>, and (optionally) <strong>skills</strong>.</li>
                  <li>For the <strong>skills</strong> column, separate multiple skills with a semicolon (<strong>;</strong>).</li>
                  <li>Example: `Graphic Design;Video Editing`</li>
                </ul>
              </div>

              <form onSubmit={handleBulkSubmit}>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-600">Upload CSV File</label>
                  <label htmlFor="file-upload" className="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 hover:border-gray-400 hover:bg-gray-100">
                    <div className="text-center">
                      <svg className="mx-auto h-10 w-10 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      <p className="mt-2 text-sm text-gray-600">
                        <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">{fileName || 'CSV file'}</p>
                    </div>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".csv" onChange={handleFileChange} />
                  </label>
                </div>

                {bulkError && (
                  <div className="mt-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    <span>⚠</span>{bulkError}
                  </div>
                )}

                {bulkSuccess && (
                  <div className="mt-4 space-y-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
                    <p className="font-semibold">{bulkSuccess.message}</p>
                    <CredentialsDisplay credentials={bulkSuccess.credentials} onCopy={copyToClipboard} />
                  </div>
                )}

                <button type="submit" disabled={bulkLoading || !file} className="mt-5 w-full rounded-xl bg-[#0D1F4C] py-3.5 text-sm font-semibold tracking-wide text-white transition-all hover:bg-[#1A3268] hover:shadow-[0_4px_16px_rgba(13,31,76,0.25)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none">
                  {bulkLoading ? 'Processing File…' : 'Upload and Add Students'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}