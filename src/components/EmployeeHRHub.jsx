import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  DollarSign, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Download, 
  Printer, 
  ShieldCheck, 
  MapPin, 
  Laptop, 
  Building2, 
  AlertTriangle, 
  Search, 
  Filter, 
  X,
  CreditCard,
  Briefcase,
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { useAgency } from '../context/AgencyContext';

export const EmployeeHRHub = () => {
  const { 
    currentUser, 
    teamMembers, 
    attendance, 
    markAttendance, 
    payroll, 
    savePayrollRecord, 
    leaves, 
    applyLeave, 
    reviewLeave, 
    hrDocuments, 
    uploadHrDocument, 
    hrPolicies 
  } = useAgency();

  const [activeTab, setActiveTab] = useState('attendance'); // 'attendance' | 'payroll' | 'leaves' | 'documents' | 'policies'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Modals state
  const [isPaySlipModalOpen, setIsPaySlipModalOpen] = useState(false);
  const [selectedPayRecord, setSelectedPayRecord] = useState(null);

  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [salaryForm, setSalaryForm] = useState({
    memberId: teamMembers[0]?.id || 'tm-1',
    memberName: teamMembers[0]?.name || 'Neha Gupta',
    designation: 'Creative Specialist',
    department: 'Video Editing & VFX',
    month: 'November 2026',
    baseSalary: 50000,
    allowances: 10000,
    bonus: 5000,
    deductions: 4000,
    paymentStatus: 'Pending',
    paymentMode: 'Bank Transfer (IMPS)'
  });

  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Casual Leave',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    daysCount: 1,
    reason: ''
  });

  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [docForm, setDocForm] = useState({
    memberId: teamMembers[0]?.id || 'tm-1',
    memberName: teamMembers[0]?.name || 'Neha Gupta',
    title: 'Signed Employment Contract',
    docType: 'Contract',
    fileName: 'Employment_Contract_Signed.pdf'
  });

  // Today's attendance calculation
  const today = new Date().toISOString().split('T')[0];
  const myTodayRecord = attendance.find(a => a.memberId === currentUser.id && a.date === today);
  const isCheckedIn = !!myTodayRecord;
  const isCheckedOut = myTodayRecord && !!myTodayRecord.checkOutTime;

  const presentCount = attendance.filter(a => a.date === today && (a.status === 'Present' || a.status === 'Late')).length;
  const wfhCount = attendance.filter(a => a.date === today && a.status === 'Work From Home').length;
  const onLeaveCount = attendance.filter(a => a.date === today && a.status === 'On Leave').length;
  const lateCount = attendance.filter(a => a.date === today && a.status === 'Late').length;

  const isAdmin = currentUser.role === 'management' || currentUser.role === 'admin';

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/20">
              Agency HRMS & Staff Suite
            </span>
            <span className="text-xs text-blue-200">
              {teamMembers.length} Employees Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight">
            Employee & Operations Command
          </h1>
          <p className="text-xs text-blue-100/80 max-w-2xl">
            Live attendance timesheets, payroll slips, leave approval workflows, document vaults, and agency policies.
          </p>
        </div>

        {/* Quick Punch In / Out Card */}
        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-4 shrink-0">
          <div>
            <p className="text-[10px] uppercase font-bold text-blue-200">Personal Punch Clock</p>
            <p className="text-xs font-bold text-white mt-0.5">
              {isCheckedOut 
                ? `Checked Out (${myTodayRecord?.checkOutTime})` 
                : isCheckedIn 
                  ? `Checked In (${myTodayRecord?.checkInTime})` 
                  : 'Not Checked In Yet'}
            </p>
          </div>

          <button
            onClick={() => markAttendance('Present', 'Office')}
            disabled={isCheckedOut}
            className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md transition flex items-center gap-1.5 ${
              isCheckedOut
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : isCheckedIn
                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{isCheckedOut ? 'Completed' : isCheckedIn ? 'Punch Out' : 'Punch In Now'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'attendance', label: 'Attendance & Timesheet', icon: Clock, count: `${presentCount + wfhCount} Active` },
          { id: 'payroll', label: 'Payroll & Salary Slips', icon: DollarSign, count: `₹${payroll.reduce((s, p) => s + p.netPay, 0).toLocaleString()}` },
          { id: 'leaves', label: 'Leave Management', icon: Calendar, count: `${leaves.filter(l => l.status === 'Pending').length} Pending` },
          { id: 'documents', label: 'HR Documents Vault', icon: FileCheck, count: `${hrDocuments.length} Files` },
          { id: 'policies', label: 'Working Policies & Holidays', icon: Briefcase, count: '12 Holidays' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ============================================================== */}
      {/* TAB 1: ATTENDANCE & TIMESHEET */}
      {/* ============================================================== */}
      {activeTab === 'attendance' && (
        <div className="space-y-4">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Present (Office)</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{presentCount}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Punch verified at HQ</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Work From Home</p>
              <p className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{wfhCount}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Remote session active</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">Late Arrivals</p>
              <p className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{lateCount}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">After 10:15 AM grace</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-[11px] font-bold uppercase text-slate-500 dark:text-slate-400">On Approved Leave</p>
              <p className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{onLeaveCount}</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Planned leave granted</p>
            </div>
          </div>

          {/* Quick Mark Toolbar for Employee */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Quick Mark Status:</span>
              <button
                onClick={() => markAttendance('Present', 'Office', 'In Office HQ')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
              >
                🏢 Mark Office Present
              </button>
              <button
                onClick={() => markAttendance('Work From Home', 'WFH', 'Remote workstation')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
              >
                🏠 Mark WFH
              </button>
            </div>

            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Shift Policy: 10:00 AM – 07:00 PM (15m grace period)
            </span>
          </div>

          {/* Attendance Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Live Attendance Roster & Punch Log
              </h3>
              <span className="text-xs font-mono text-slate-500">Date: {today}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Punch In</th>
                    <th className="py-3 px-4">Punch Out</th>
                    <th className="py-3 px-4">Hours</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {attendance.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-slate-400">
                        No attendance records recorded yet. Punch in above to record attendance.
                      </td>
                    </tr>
                  ) : (
                    attendance.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                          {att.memberName}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                          {att.department}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-emerald-600 dark:text-emerald-400">
                          {att.checkInTime || '--:--'}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-amber-600 dark:text-amber-400">
                          {att.checkOutTime || '--:--'}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold">
                          {att.hoursWorked ? `${att.hoursWorked} hrs` : '--'}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                          {att.workLocation}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            att.status === 'Present'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400'
                              : att.status === 'Work From Home'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400'
                                : att.status === 'Late'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400'
                                  : 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400'
                          }`}>
                            {att.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[11px] text-slate-500 truncate max-w-xs">
                          {att.notes || '-'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 2: PAYROLL & SALARY SLIPS */}
      {/* ============================================================== */}
      {activeTab === 'payroll' && (
        <div className="space-y-4">
          {/* Payroll Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Monthly Staff Compensation & Payroll Registry
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate itemized pay slips, mark disbursements, and track TDS & bonuses
              </p>
            </div>

            {isAdmin && (
              <button
                onClick={() => setIsSalaryModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add / Adjust Salary Record</span>
              </button>
            )}
          </div>

          {/* Salary Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Role & Dept</th>
                    <th className="py-3 px-4">Month</th>
                    <th className="py-3 px-4">Base (₹)</th>
                    <th className="py-3 px-4">Allowances</th>
                    <th className="py-3 px-4">Bonus</th>
                    <th className="py-3 px-4">Deductions</th>
                    <th className="py-3 px-4">Net Salary</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {payroll.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="py-8 text-center text-slate-400">
                        No payroll records found. Click 'Add / Adjust Salary Record' to create one.
                      </td>
                    </tr>
                  ) : (
                    payroll.map((pay) => (
                      <tr key={pay.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                          {pay.memberName}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                          <p className="font-semibold text-[11px]">{pay.designation}</p>
                          <p className="text-[10px] text-slate-400">{pay.department}</p>
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                          {pay.month}
                        </td>
                        <td className="py-3 px-4 font-mono font-medium">
                          ₹{pay.baseSalary.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400">
                          +₹{pay.allowances.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">
                          +₹{pay.bonus.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono text-rose-600 dark:text-rose-400">
                          -₹{pay.deductions.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 font-mono font-black text-slate-900 dark:text-white text-sm">
                          ₹{pay.netPay.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            pay.paymentStatus === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400'
                          }`}>
                            {pay.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setSelectedPayRecord(pay);
                              setIsPaySlipModalOpen(true);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold transition inline-flex items-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Slip</span>
                          </button>

                          {isAdmin && pay.paymentStatus !== 'Paid' && (
                            <button
                              onClick={() => savePayrollRecord({ ...pay, paymentStatus: 'Paid', paidOn: today })}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                            >
                              Mark Paid
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 3: LEAVE MANAGEMENT */}
      {/* ============================================================== */}
      {activeTab === 'leaves' && (
        <div className="space-y-4">
          {/* Leave Balances Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="text-[11px] font-bold uppercase text-slate-500">Casual Leave (CL)</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">12</span>
                <span className="text-xs text-slate-400">Days / Year</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">For personal errands & family obligations</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="text-[11px] font-bold uppercase text-slate-500">Sick Leave (SL)</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">8</span>
                <span className="text-xs text-slate-400">Days / Year</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Medical & dental health recovery</p>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <p className="text-[11px] font-bold uppercase text-slate-500">Earned / Privilege Leave</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black text-purple-600 dark:text-purple-400">15</span>
                <span className="text-xs text-slate-400">Days / Year</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Planned vacations & annual breaks</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">Need Time Off?</h3>
              <p className="text-[11px] text-slate-500">Submit an application for leadership review</p>
            </div>
            <button
              onClick={() => setIsLeaveModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Apply for Leave</span>
            </button>
          </div>

          {/* Leaves Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Dates</th>
                    <th className="py-3 px-4">Days</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Approval Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {leaves.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-slate-400">
                        No leave applications submitted yet.
                      </td>
                    </tr>
                  ) : (
                    leaves.map((lev) => (
                      <tr key={lev.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                          {lev.memberName}
                        </td>
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                          {lev.department}
                        </td>
                        <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                          {lev.leaveType}
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px]">
                          {lev.startDate} {lev.startDate !== lev.endDate ? `to ${lev.endDate}` : ''}
                        </td>
                        <td className="py-3 px-4 font-bold">
                          {lev.daysCount} d
                        </td>
                        <td className="py-3 px-4 text-[11px] text-slate-500 max-w-xs truncate">
                          {lev.reason}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            lev.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400'
                              : lev.status === 'Rejected'
                                ? 'bg-rose-100 text-rose-800 dark:bg-rose-500/20 dark:text-rose-400'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400'
                          }`}>
                            {lev.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                          {isAdmin && lev.status === 'Pending' ? (
                            <>
                              <button
                                onClick={() => reviewLeave(lev.id, 'Approved', 'Approved by Operations Head')}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => reviewLeave(lev.id, 'Rejected', 'Coverage constraints on shoot day')}
                                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition"
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <span className="text-[11px] text-slate-400">
                              {lev.approvedBy || 'Completed'}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 4: HR DOCUMENTS VAULT */}
      {/* ============================================================== */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Employee Document Locker & Compliance Vault
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Aadhaar, Passport KYC, Signed NDAs, Offer Letters & Experience Certificates
              </p>
            </div>

            <button
              onClick={() => setIsDocModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Upload HR Document</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hrDocuments.map((doc) => (
              <div 
                key={doc.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-blue-500/40 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-500/20">
                    {doc.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Owner: {doc.memberName}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                    {doc.fileName} ({doc.fileSize})
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Uploaded {doc.uploadedOn}</span>
                  <button 
                    onClick={() => alert(`Downloading verified copy of: ${doc.fileName}`)}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TAB 5: POLICIES & HOLIDAYS */}
      {/* ============================================================== */}
      {activeTab === 'policies' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Agency Policy Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Standard Agency Operating Policies (SOP)
            </h3>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <p className="font-bold text-slate-900 dark:text-white">Core Working Hours</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{hrPolicies.workingHours}</p>
                <p className="text-[11px] text-slate-500">Grace Period: {hrPolicies.gracePeriodMinutes} minutes (until 10:15 AM)</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <p className="font-bold text-slate-900 dark:text-white">Half-Day & Overtime Protocol</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{hrPolicies.halfDayTiming}</p>
                <p className="text-[11px] text-slate-500">Weekend shoots & night rendering eligible for compensatory off.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
                <p className="font-bold text-slate-900 dark:text-white">Annual Leave Entitlements</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  • Casual Leave: {hrPolicies.leaveAllowances.casual} days/year<br />
                  • Sick Leave: {hrPolicies.leaveAllowances.sick} days/year<br />
                  • Earned Leave: {hrPolicies.leaveAllowances.earned} days/year
                </p>
              </div>
            </div>
          </div>

          {/* 2026 Holidays List */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Official 2026 Agency Holiday Schedule (12 Days)
            </h3>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {hrPolicies.holidays.map((h, i) => (
                <div 
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{h.name}</p>
                    <p className="text-[11px] text-slate-500">{h.day}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-mono text-[11px] font-bold">
                    {h.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 1: ITEMIZED PAY SLIP GENERATOR */}
      {/* ============================================================== */}
      {isPaySlipModalOpen && selectedPayRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Official Salary Slip — {selectedPayRecord.month}
                </h3>
              </div>
              <button onClick={() => setIsPaySlipModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Letterhead & Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs" id="printable-payslip">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    BrainBinary <span className="text-blue-600">Media Agency</span>
                  </h2>
                  <p className="text-[11px] text-slate-500">Corporate Tower B, Tech Park, Mumbai - 400051</p>
                  <p className="text-[11px] text-slate-500">GST: 27AABCB9182C1ZS • CIN: U72900MH2023PTC412345</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
                    DISBURSED & VERIFIED
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">Ref: {selectedPayRecord.transactionRef || 'BBI-PAY-202611'}</p>
                </div>
              </div>

              {/* Employee Meta */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Employee Name</p>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedPayRecord.memberName}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Designation: {selectedPayRecord.designation}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Department</p>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedPayRecord.department}</p>
                  <p className="text-[11px] text-slate-500 mt-1">Bank Account: {selectedPayRecord.accountNumber || '••••••••8492'}</p>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-[10px] uppercase font-bold text-slate-500">
                    <tr>
                      <th className="py-2.5 px-4">Earnings Component</th>
                      <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                      <th className="py-2.5 px-4">Deductions</th>
                      <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr>
                      <td className="py-2.5 px-4">Basic Salary</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold">₹{selectedPayRecord.baseSalary.toLocaleString()}</td>
                      <td className="py-2.5 px-4">Income Tax / TDS</td>
                      <td className="py-2.5 px-4 text-right font-mono text-rose-500">₹{(selectedPayRecord.deductions * 0.7).toFixed(0)}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4">House Rent & Travel Allowance</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold">₹{selectedPayRecord.allowances.toLocaleString()}</td>
                      <td className="py-2.5 px-4">Provident Fund (PF)</td>
                      <td className="py-2.5 px-4 text-right font-mono text-rose-500">₹{(selectedPayRecord.deductions * 0.3).toFixed(0)}</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4">Performance Bonus & Incentives</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold">₹{selectedPayRecord.bonus.toLocaleString()}</td>
                      <td className="py-2.5 px-4 font-bold">Total Deductions</td>
                      <td className="py-2.5 px-4 text-right font-mono text-rose-600 font-bold">₹{selectedPayRecord.deductions.toLocaleString()}</td>
                    </tr>
                    <tr className="bg-blue-50 dark:bg-blue-950/40 font-bold">
                      <td className="py-3 px-4 text-sm text-blue-900 dark:text-blue-300">Net Take-Home Salary</td>
                      <td colSpan="3" className="py-3 px-4 text-right text-base font-black font-mono text-blue-700 dark:text-blue-400">
                        ₹{selectedPayRecord.netPay.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">System generated slip • No physical signature required</span>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Pay Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: ADD / EDIT SALARY RECORD */}
      {/* ============================================================== */}
      {isSalaryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Record Employee Salary</h3>
              <button onClick={() => setIsSalaryModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Select Employee</label>
                <select
                  value={salaryForm.memberId}
                  onChange={(e) => {
                    const m = teamMembers.find(t => t.id === e.target.value);
                    if (m) {
                      setSalaryForm({
                        ...salaryForm,
                        memberId: m.id,
                        memberName: m.name,
                        designation: m.role,
                        department: m.department
                      });
                    }
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold"
                >
                  {teamMembers.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Base Salary (₹)</label>
                  <input
                    type="number"
                    value={salaryForm.baseSalary}
                    onChange={(e) => setSalaryForm({ ...salaryForm, baseSalary: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Allowances (₹)</label>
                  <input
                    type="number"
                    value={salaryForm.allowances}
                    onChange={(e) => setSalaryForm({ ...salaryForm, allowances: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Bonus (₹)</label>
                  <input
                    type="number"
                    value={salaryForm.bonus}
                    onChange={(e) => setSalaryForm({ ...salaryForm, bonus: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Deductions (₹)</label>
                  <input
                    type="number"
                    value={salaryForm.deductions}
                    onChange={(e) => setSalaryForm({ ...salaryForm, deductions: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  savePayrollRecord(salaryForm);
                  setIsSalaryModalOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
              >
                Save & Disburse Salary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: APPLY FOR LEAVE */}
      {/* ============================================================== */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Apply for Leave</h3>
              <button onClick={() => setIsLeaveModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Leave Type</label>
                <select
                  value={leaveForm.leaveType}
                  onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                >
                  <option value="Casual Leave">Casual Leave (CL)</option>
                  <option value="Sick Leave">Sick Leave (SL)</option>
                  <option value="Earned Leave">Earned Leave (EL)</option>
                  <option value="Compensatory Off">Compensatory Off (Shoot OT)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Start Date</label>
                  <input
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">End Date</label>
                  <input
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Reason for Absence</label>
                <textarea
                  rows="3"
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  placeholder="Provide brief explanation for leave approval..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <button
                onClick={() => {
                  applyLeave(leaveForm);
                  setIsLeaveModalOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
              >
                Submit Leave Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: UPLOAD HR DOCUMENT */}
      {/* ============================================================== */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Register HR Document</h3>
              <button onClick={() => setIsDocModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Select Employee</label>
                <select
                  value={docForm.memberId}
                  onChange={(e) => {
                    const m = teamMembers.find(t => t.id === e.target.value);
                    if (m) setDocForm({ ...docForm, memberId: m.id, memberName: m.name });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                >
                  {teamMembers.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.department})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">Document Title</label>
                <input
                  type="text"
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  placeholder="e.g. Passport Copy & Address Proof"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Document Category</label>
                <select
                  value={docForm.docType}
                  onChange={(e) => setDocForm({ ...docForm, docType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold"
                >
                  <option value="Contract">Signed Employment Contract</option>
                  <option value="KYC Proof">National ID / Aadhaar / Passport</option>
                  <option value="Offer Letter">Official Offer Letter</option>
                  <option value="Certifications">Degree & Technical Certifications</option>
                  <option value="Relieving">Relieving / Experience Certificate</option>
                </select>
              </div>

              <div>
                <label className="block font-bold mb-1">File Name</label>
                <input
                  type="text"
                  value={docForm.fileName}
                  onChange={(e) => setDocForm({ ...docForm, fileName: e.target.value })}
                  placeholder="e.g. Employee_Signed_NDA.pdf"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono"
                />
              </div>

              <button
                onClick={() => {
                  uploadHrDocument(docForm);
                  setIsDocModalOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
              >
                Upload & Register Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
