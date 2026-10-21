# EduManage – Coaching Management System (Frontend)

![EduManage Banner](https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80)

> A modern, professional, fully responsive **Coaching Management System** web application built with **React 19**, **Vite**, and **Tailwind CSS**. Designed for real-world developer portfolios, demonstrating advanced state architecture, interactive mock testing with live timers, attendance analytics, downloadable receipts, and role-based demo switching.

---

## 🌟 Live Demo & Portfolio Highlights

- **Live Application URL**: Deployed with Vercel SPA routing (`vercel.json` included).
- **Frontend-Only Architecture**: All data persistence is simulated using browser `LocalStorage` and rich local datasets. No server setup or external database needed.
- **Role-Based Experience**: Instant 1-click demo login for **Student**, **Teacher**, and **Admin** personas.
- **Light & Dark Mode**: Persistent theme toggle adhering to modern accessibility and system preferences.

---

## 🚀 Key Features

### 1. Public Portal
- **Hero & Value Proposition**: Engaging headline, quick action buttons, trust badges, and live statistics counter.
- **Popular Courses & Syllabus Detail**: 8+ comprehensive courses (JEE Advanced, NEET Foundation, Class 12 Boards, Full Stack Web, Olympiad) with module breakdowns, durations, and ratings.
- **About Us**: Institute background, 3-tier pedagogy (*First Principles -> Tiered Problem Sets -> Diagnostic Analytics*), faculty introductions, and timeline.
- **Contact Us**: Form validation powered by `react-hook-form` with toast feedback and campus location details.
- **Demo Login**: 1-click persona selection cards with clearly documented credentials.

### 2. Student Dashboard
- **Executive Overview**: Quick metrics for attendance rate, pending fees, enrolled courses, and completed tests.
- **My Courses**: Enrolled courses with real-time percentage progress bar and interactive lesson completion checklist.
- **Classroom Attendance**: Attendance percentage, monthly attendance trend charts (`Recharts`), and date/subject filtered records.
- **Tuition & Fees**: Fee installment schedule, payment due dates, simulated *"Mark as Paid"* action, and printable/downloadable official demo receipt with verification stamp.
- **Digital Study Vault**: Searchable formula sheets, PDF summaries, and lecture notes with modal preview.
- **Online Mock Test Runner**: Interactive computer-based mock test featuring a real-time countdown timer, question palette navigator, auto-scoring, full question-by-question explanations, and celebratory confetti upon passing.
- **Academic Results**: Percentile grades, subject-wise performance charts, and test history.
- **Announcements**: Circulars, exam alerts, and holiday notices with read/unread status toggle.
- **Profile & Security**: Editable personal profile form and simulated password change modal.

### 3. Faculty / Teacher Dashboard
- **Command Center**: Assigned students count, today's schedule, pending assignments, and cohort performance graphs.
- **Roll Call Attendance**: Interactive *Present / Absent / Late* student buttons with batch saving to `LocalStorage`.
- **Class Timetable**: Day-by-day weekly schedule with lecture hall and room allocations.
- **Assignment Manager**: Create problem sets with due dates and track submission rates.
- **Study Materials Upload**: Upload notes and PDFs with local file selector simulation.
- **Mock Test Creator**: Configure test duration, passing marks, and MCQ questions with step-by-step explanations.
- **Faculty Announcements**: Broadcast urgent circulars directly to student dashboards.

### 4. Admin Management Console
- **Institute Overview**: Realized revenue vs pending fee flow charts, student enrollment metrics, and live activity feeds.
- **Student Management (CRUD)**: Searchable, paginated student directory with Add, Edit, Delete, and Profile Inspection modals.
- **Faculty Management (CRUD)**: Add, edit, and toggle active/inactive status for instructors across departments.
- **Course & Batch Catalog (CRUD)**: Create, edit, and manage coaching programs, fees, and syllabi.
- **Institute Attendance Audit**: Batch and date filtering for classroom attendance records.
- **Fees & Payment Records**: Complete installment tracking, status updates, and invoice generation.
- **Exam Oversight**: Deploy institute-wide mock tests and review student submissions.
- **Announcements Manager**: Publish campus-wide bulletins.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Core Framework** | React.js (v19) + Vite (v8) |
| **Styling** | Tailwind CSS (v4) with `@tailwindcss/vite` |
| **Routing** | React Router DOM (v7) |
| **Icons** | Lucide React |
| **Charts & Visualizations** | Recharts (Area, Bar, Cartesian Grid, Responsive Container) |
| **Form Management** | React Hook Form |
| **Celebrations** | Canvas Confetti |
| **State & Persistence** | React Context API + Browser LocalStorage |

---

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── AttendanceTable.jsx
│   ├── ChartCard.jsx
│   ├── ConfirmDialog.jsx
│   ├── CourseCard.jsx
│   ├── DashboardHeader.jsx
│   ├── DataTable.jsx
│   ├── EmptyState.jsx
│   ├── FeeCard.jsx
│   ├── Footer.jsx
│   ├── FormInput.jsx
│   ├── LoadingSkeleton.jsx
│   ├── Modal.jsx          # Accessible <dialog> with closedby="any"
│   ├── Navbar.jsx
│   ├── ReceiptModal.jsx   # Printable tax invoice receipt
│   ├── SearchFilter.jsx
│   ├── Sidebar.jsx        # Collapsible role-based sidebar
│   ├── StatCard.jsx
│   ├── StatusBadge.jsx
│   └── TestCard.jsx
├── context/             # Global application state
│   ├── AuthContext.jsx    # Simulated authentication & role switching
│   ├── DataContext.jsx    # Centralized CRUD & LocalStorage sync
│   ├── ThemeContext.jsx   # Light / dark mode provider
│   └── ToastContext.jsx   # Floating toast notification system
├── data/
│   ├── initialData.js     # 20 students, 5 teachers, 8 courses, tests, fees
│   └── storage.js         # LocalStorage persistence helper
├── layouts/
│   ├── DashboardLayout.jsx
│   └── PublicLayout.jsx
├── pages/
│   ├── admin/             # 8 Admin Console pages
│   ├── public/            # Home, About, Courses, Detail, Contact, Login, 404
│   ├── student/           # 10 Student Portal pages
│   └── teacher/           # 8 Faculty Portal pages
├── index.css            # Custom fonts, scrollbars, dialog backdrop styling
├── main.jsx             # Entrypoint
└── App.jsx              # Complete route tree configuration
```

---

## 🔑 Demo Access & Sample Personas

You can log in instantly using the 1-click persona buttons on the **[Demo Login](/login)** page, or use the following credentials:

| Role | Demo Email | Password | Persona |
|---|---|---|---|
| **Student** | `student@edumanage.com` | `demo123` | **Aarav Sharma** (JEE Advanced Batch, Roll: 2026-JEE-042) |
| **Teacher** | `teacher@edumanage.com` | `demo123` | **Dr. Vikramaditya Rathore** (Physics Lead, Ex-Allen) |
| **Admin** | `admin@edumanage.com` | `demo123` | **Director Rajesh Khurana** (Executive Head) |

> ℹ️ *Note: Authentication is simulated locally for demonstration. Passwords are never sent over a network.*

---

## 💻 Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/coaching-management-system.git
   cd coaching-management-system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

## 🌐 Deployment to Vercel

This repository includes a `vercel.json` file configured with SPA rewrites to ensure client-side routes (e.g. `/student/tests/TST-001`, `/courses/CRS-001`) work upon direct page refresh:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Simply connect this repository to your Vercel account, choose the Vite preset, and deploy.

---

## ⚠️ Frontend-Only Limitations

- **Simulated Persistence**: Data modifications (adding students, recording fees, taking attendance, creating mock tests) are persisted in the browser's `LocalStorage`.
- **Reset Functionality**: If you wish to revert all modifications back to default factory sample data, click the **"Reset Demo Data"** button located at the bottom of the dashboard sidebar.
- **No Backend**: No Node.js/Express server or MongoDB instance is connected. All operations run entirely in the browser.

---

## 📄 License

This project is created for developer portfolio demonstration purposes under the MIT License.
