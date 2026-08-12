import { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';

const STATS = [
  { label: 'Active Students', value: '2,846', change: '+18%', tone: 'blue' },
  { label: 'Verified Employers', value: '128', change: '+12%', tone: 'green' },
  { label: 'Open Jobs', value: '342', change: '+24%', tone: 'yellow' },
  { label: 'Pending Reviews', value: '17', change: '-6%', tone: 'red' },
];

const STUDENTS = [
  { name: 'Hasala Shehan', id: 'TG/2022/1357', skill: 'Full-stack Development', status: 'Open to work' },
  { name: 'Tharushi Perera', id: 'TG/2021/1042', skill: 'UI Design', status: 'Verified' },
  { name: 'Naveen Dilshan', id: 'TG/2023/0918', skill: 'PC Repair', status: 'Pending' },
];

const JOBS = [
  { title: 'React Landing Page', owner: 'Ceylon Digital Labs', amount: 'Rs. 25,000', status: 'Open' },
  { title: 'Weekend Retail Assistant', owner: 'Colombo Mart', amount: 'Rs. 3,500/day', status: 'Review' },
  { title: 'Logo Design Package', owner: 'Lanka Beans', amount: 'Rs. 12,000', status: 'Assigned' },
];

const StatusPill = ({ children }) => (
  <span className={`dashboard-pill dashboard-pill-${children.toLowerCase().replaceAll(' ', '-')}`}>
    {children}
  </span>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    if (activeTab === 'students') {
      return (
        <section className="dashboard-section fade-up">
          <div className="dashboard-section-head">
            <div>
              <h2>Student Management</h2>
              <p>Review student accounts, skills, and verification state.</p>
            </div>
            <button className="dashboard-action">Add Student</button>
          </div>
          <div className="dashboard-table">
            {STUDENTS.map(student => (
              <div className="dashboard-row" key={student.id}>
                <div>
                  <strong>{student.name}</strong>
                  <span>{student.id}</span>
                </div>
                <span>{student.skill}</span>
                <StatusPill>{student.status}</StatusPill>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === 'jobs') {
      return (
        <section className="dashboard-section fade-up">
          <div className="dashboard-section-head">
            <div>
              <h2>Job Listings</h2>
              <p>Track posted work, assignment status, and moderation queues.</p>
            </div>
            <button className="dashboard-action">Review Queue</button>
          </div>
          <div className="dashboard-table">
            {JOBS.map(job => (
              <div className="dashboard-row" key={job.title}>
                <div>
                  <strong>{job.title}</strong>
                  <span>{job.owner}</span>
                </div>
                <span>{job.amount}</span>
                <StatusPill>{job.status}</StatusPill>
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === 'employers') {
      return (
        <section className="dashboard-section fade-up">
          <div className="dashboard-section-head">
            <div>
              <h2>Employer Accounts</h2>
              <p>Approve company and retailer profiles before they publish jobs.</p>
            </div>
            <button className="dashboard-action">Export List</button>
          </div>
          <div className="dashboard-split">
            <div className="dashboard-panel">
              <span className="dashboard-kicker">Companies</span>
              <strong>84 verified</strong>
              <p>12 new corporate accounts are waiting for document checks.</p>
            </div>
            <div className="dashboard-panel">
              <span className="dashboard-kicker">Retailers</span>
              <strong>44 verified</strong>
              <p>Local business profiles are growing fastest around Colombo and Galle.</p>
            </div>
          </div>
        </section>
      );
    }

    if (activeTab === 'settings') {
      return (
        <section className="dashboard-section fade-up">
          <div className="dashboard-section-head">
            <div>
              <h2>Admin Settings</h2>
              <p>Manage access rules and platform defaults.</p>
            </div>
            <button className="dashboard-action">Save Changes</button>
          </div>
          <div className="dashboard-settings">
            {['Require student verification', 'Notify admins about new employers', 'Enable job moderation'].map(item => (
              <label className="dashboard-toggle" key={item}>
                <span>{item}</span>
                <input type="checkbox" defaultChecked />
              </label>
            ))}
          </div>
        </section>
      );
    }

    return (
      <div className="dashboard-grid fade-up">
        <section className="dashboard-section dashboard-section-wide">
          <div className="dashboard-section-head">
            <div>
              <h2>Platform Snapshot</h2>
              <p>Today&apos;s activity across UniLift students, employers, and jobs.</p>
            </div>
            <button className="dashboard-action">Generate Report</button>
          </div>
          <div className="dashboard-chart" aria-label="Weekly activity chart">
            {[42, 58, 48, 74, 64, 88, 76].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-head">
            <div>
              <h2>Quick Actions</h2>
              <p>Common admin tasks.</p>
            </div>
          </div>
          <div className="dashboard-quick-list">
            <button>Approve students</button>
            <button>Review new jobs</button>
            <button>Invite employer</button>
          </div>
        </section>
      </div>
    );
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <section className="dashboard-stats" aria-label="Dashboard stats">
        {STATS.map(stat => (
          <article className={`dashboard-stat dashboard-stat-${stat.tone}`} key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.change} this month</small>
          </article>
        ))}
      </section>

      {renderTabContent()}
    </DashboardLayout>
  );
}
