// EduManage Initial Realistic Sample Data
export const INITIAL_STUDENTS = [
  {
    id: "STU-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-001", "CRS-003"],
    batch: "JEE Advanced 2026",
    rollNumber: "2026-JEE-042",
    admissionDate: "2025-04-10",
    attendanceRate: 94,
    feeStatus: "Paid",
    totalFees: 85000,
    paidFees: 85000,
    pendingAmount: 0,
    performanceGrade: "A+",
    guardianName: "Rajesh Sharma",
    guardianPhone: "+91 98765 11111",
    address: "B-42, Vasant Vihar, New Delhi",
    status: "Active"
  },
  {
    id: "STU-002",
    name: "Diya Patel",
    email: "diya.patel@example.com",
    phone: "+91 98234 56789",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-002", "CRS-004"],
    batch: "NEET Elite 2026",
    rollNumber: "2026-NEET-018",
    admissionDate: "2025-04-12",
    attendanceRate: 91,
    feeStatus: "Pending",
    totalFees: 90000,
    paidFees: 60000,
    pendingAmount: 30000,
    performanceGrade: "A",
    guardianName: "Kirit Patel",
    guardianPhone: "+91 98234 22222",
    address: "Flat 301, Sunrise Apts, Ahmedabad",
    status: "Active"
  },
  {
    id: "STU-003",
    name: "Rohan Verma",
    email: "rohan.verma@example.com",
    phone: "+91 98123 45678",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-001", "CRS-005"],
    batch: "JEE Main Intensive",
    rollNumber: "2026-JEE-089",
    admissionDate: "2025-05-01",
    attendanceRate: 88,
    feeStatus: "Pending",
    totalFees: 75000,
    paidFees: 45000,
    pendingAmount: 30000,
    performanceGrade: "B+",
    guardianName: "Sunil Verma",
    guardianPhone: "+91 98123 33333",
    address: "H.No 12/B, Indirapuram, Ghaziabad",
    status: "Active"
  },
  {
    id: "STU-004",
    name: "Ananya Iyer",
    email: "ananya.iyer@example.com",
    phone: "+91 97654 32109",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-002", "CRS-006"],
    batch: "NEET Foundation 11th",
    rollNumber: "2026-NEET-104",
    admissionDate: "2025-05-15",
    attendanceRate: 96,
    feeStatus: "Paid",
    totalFees: 80000,
    paidFees: 80000,
    pendingAmount: 0,
    performanceGrade: "A+",
    guardianName: "R. Iyer",
    guardianPhone: "+91 97654 44444",
    address: "7th Cross, Malleshwaram, Bengaluru",
    status: "Active"
  },
  {
    id: "STU-005",
    name: "Kabir Sen",
    email: "kabir.sen@example.com",
    phone: "+91 98345 67890",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-005", "CRS-007"],
    batch: "Full Stack Web Mastery",
    rollNumber: "2026-FSW-015",
    admissionDate: "2025-06-01",
    attendanceRate: 85,
    feeStatus: "Paid",
    totalFees: 45000,
    paidFees: 45000,
    pendingAmount: 0,
    performanceGrade: "A",
    guardianName: "Debashis Sen",
    guardianPhone: "+91 98345 55555",
    address: "Salt Lake Sector V, Kolkata",
    status: "Active"
  },
  {
    id: "STU-006",
    name: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 98456 71234",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-003", "CRS-008"],
    batch: "CBSE Class 12 Boards",
    rollNumber: "2026-CBS-031",
    admissionDate: "2025-04-20",
    attendanceRate: 93,
    feeStatus: "Pending",
    totalFees: 50000,
    paidFees: 25000,
    pendingAmount: 25000,
    performanceGrade: "A",
    guardianName: "P. Nair",
    guardianPhone: "+91 98456 66666",
    address: "Panampilly Nagar, Kochi",
    status: "Active"
  },
  {
    id: "STU-007",
    name: "Aditya Kulkarni",
    email: "aditya.k@example.com",
    phone: "+91 98901 23456",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-001", "CRS-004"],
    batch: "JEE Advanced 2026",
    rollNumber: "2026-JEE-055",
    admissionDate: "2025-04-18",
    attendanceRate: 79,
    feeStatus: "Overdue",
    totalFees: 85000,
    paidFees: 35000,
    pendingAmount: 50000,
    performanceGrade: "B",
    guardianName: "Sanjay Kulkarni",
    guardianPhone: "+91 98901 77777",
    address: "Model Colony, Pune",
    status: "Active"
  },
  {
    id: "STU-008",
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    phone: "+91 97012 34567",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-002", "CRS-006"],
    batch: "NEET Elite 2026",
    rollNumber: "2026-NEET-073",
    admissionDate: "2025-05-02",
    attendanceRate: 92,
    feeStatus: "Paid",
    totalFees: 90000,
    paidFees: 90000,
    pendingAmount: 0,
    performanceGrade: "A+",
    guardianName: "Venkat Reddy",
    guardianPhone: "+91 97012 88888",
    address: "Jubilee Hills, Hyderabad",
    status: "Active"
  },
  {
    id: "STU-009",
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    phone: "+91 99112 23344",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-005", "CRS-007"],
    batch: "Data Science & AI",
    rollNumber: "2026-DSA-008",
    admissionDate: "2025-06-10",
    attendanceRate: 90,
    feeStatus: "Paid",
    totalFees: 55000,
    paidFees: 55000,
    pendingAmount: 0,
    performanceGrade: "A",
    guardianName: "Alok Malhotra",
    guardianPhone: "+91 99112 99999",
    address: "Civil Lines, Jaipur",
    status: "Active"
  },
  {
    id: "STU-010",
    name: "Pooja Hegde",
    email: "pooja.h@example.com",
    phone: "+91 98860 12345",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-001", "CRS-003"],
    batch: "JEE Main Intensive",
    rollNumber: "2026-JEE-112",
    admissionDate: "2025-05-20",
    attendanceRate: 86,
    feeStatus: "Pending",
    totalFees: 75000,
    paidFees: 50000,
    pendingAmount: 25000,
    performanceGrade: "B+",
    guardianName: "Girish Hegde",
    guardianPhone: "+91 98860 22334",
    address: "Kankanady, Mangaluru",
    status: "Active"
  },
  {
    id: "STU-011",
    name: "Tanmay Deshmukh",
    email: "tanmay.d@example.com",
    phone: "+91 97632 11223",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-004", "CRS-008"],
    batch: "CBSE Class 12 Boards",
    rollNumber: "2026-CBS-067",
    admissionDate: "2025-04-25",
    attendanceRate: 95,
    feeStatus: "Paid",
    totalFees: 50000,
    paidFees: 50000,
    pendingAmount: 0,
    performanceGrade: "A+",
    guardianName: "Prasad Deshmukh",
    guardianPhone: "+91 97632 33445",
    address: "Kothrud, Pune",
    status: "Active"
  },
  {
    id: "STU-012",
    name: "Kavya Choudhury",
    email: "kavya.c@example.com",
    phone: "+91 98711 44556",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-002", "CRS-006"],
    batch: "NEET Elite 2026",
    rollNumber: "2026-NEET-092",
    admissionDate: "2025-05-08",
    attendanceRate: 89,
    feeStatus: "Pending",
    totalFees: 90000,
    paidFees: 60000,
    pendingAmount: 30000,
    performanceGrade: "A",
    guardianName: "Bimal Choudhury",
    guardianPhone: "+91 98711 55667",
    address: "Dispur, Guwahati",
    status: "Active"
  },
  {
    id: "STU-013",
    name: "Arjun Bhatia",
    email: "arjun.bhatia@example.com",
    phone: "+91 98114 77889",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-001", "CRS-005"],
    batch: "JEE Advanced 2026",
    rollNumber: "2026-JEE-023",
    admissionDate: "2025-04-10",
    attendanceRate: 97,
    feeStatus: "Paid",
    totalFees: 85000,
    paidFees: 85000,
    pendingAmount: 0,
    performanceGrade: "A+",
    guardianName: "Manoj Bhatia",
    guardianPhone: "+91 98114 88990",
    address: "Sector 14, Chandigarh",
    status: "Active"
  },
  {
    id: "STU-014",
    name: "Ishita Roy",
    email: "ishita.roy@example.com",
    phone: "+91 98300 22119",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-003", "CRS-007"],
    batch: "Full Stack Web Mastery",
    rollNumber: "2026-FSW-041",
    admissionDate: "2025-06-05",
    attendanceRate: 91,
    feeStatus: "Paid",
    totalFees: 45000,
    paidFees: 45000,
    pendingAmount: 0,
    performanceGrade: "A",
    guardianName: "Subrata Roy",
    guardianPhone: "+91 98300 33441",
    address: "Ballygunge, Kolkata",
    status: "Active"
  },
  {
    id: "STU-015",
    name: "Nikhil Joshi",
    email: "nikhil.j@example.com",
    phone: "+91 98220 66778",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-001", "CRS-004"],
    batch: "JEE Main Intensive",
    rollNumber: "2026-JEE-145",
    admissionDate: "2025-05-22",
    attendanceRate: 83,
    feeStatus: "Pending",
    totalFees: 75000,
    paidFees: 40000,
    pendingAmount: 35000,
    performanceGrade: "B",
    guardianName: "Dinkar Joshi",
    guardianPhone: "+91 98220 88991",
    address: "Dharampeth, Nagpur",
    status: "Active"
  },
  {
    id: "STU-016",
    name: "Riya Sen",
    email: "riya.sen@example.com",
    phone: "+91 98199 44332",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-002", "CRS-008"],
    batch: "NEET Foundation 11th",
    rollNumber: "2026-NEET-129",
    admissionDate: "2025-05-18",
    attendanceRate: 94,
    feeStatus: "Paid",
    totalFees: 80000,
    paidFees: 80000,
    pendingAmount: 0,
    performanceGrade: "A",
    guardianName: "Soumitra Sen",
    guardianPhone: "+91 98199 55443",
    address: "Bandra West, Mumbai",
    status: "Active"
  },
  {
    id: "STU-017",
    name: "Siddharth Jain",
    email: "sid.jain@example.com",
    phone: "+91 94140 55667",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-005", "CRS-007"],
    batch: "Data Science & AI",
    rollNumber: "2026-DSA-029",
    admissionDate: "2025-06-12",
    attendanceRate: 90,
    feeStatus: "Pending",
    totalFees: 55000,
    paidFees: 30000,
    pendingAmount: 25000,
    performanceGrade: "B+",
    guardianName: "Mahaveer Jain",
    guardianPhone: "+91 94140 77889",
    address: "C-Scheme, Jaipur",
    status: "Active"
  },
  {
    id: "STU-018",
    name: "Tanya Kapoor",
    email: "tanya.k@example.com",
    phone: "+91 98722 33445",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-003", "CRS-006"],
    batch: "CBSE Class 12 Boards",
    rollNumber: "2026-CBS-099",
    admissionDate: "2025-04-28",
    attendanceRate: 98,
    feeStatus: "Paid",
    totalFees: 50000,
    paidFees: 50000,
    pendingAmount: 0,
    performanceGrade: "A+",
    guardianName: "Harish Kapoor",
    guardianPhone: "+91 98722 55667",
    address: "Urban Estate, Ludhiana",
    status: "Active"
  },
  {
    id: "STU-019",
    name: "Varun Mehta",
    email: "varun.m@example.com",
    phone: "+91 99200 88776",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-001", "CRS-004"],
    batch: "JEE Advanced 2026",
    rollNumber: "2026-JEE-078",
    admissionDate: "2025-04-15",
    attendanceRate: 76,
    feeStatus: "Overdue",
    totalFees: 85000,
    paidFees: 30000,
    pendingAmount: 55000,
    performanceGrade: "C+",
    guardianName: "Pradeep Mehta",
    guardianPhone: "+91 99200 99887",
    address: "Vile Parle East, Mumbai",
    status: "Active"
  },
  {
    id: "STU-020",
    name: "Zoya Khan",
    email: "zoya.khan@example.com",
    phone: "+91 98930 11445",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    enrolledCourses: ["CRS-002", "CRS-005"],
    batch: "NEET Elite 2026",
    rollNumber: "2026-NEET-051",
    admissionDate: "2025-04-14",
    attendanceRate: 95,
    feeStatus: "Paid",
    totalFees: 90000,
    paidFees: 90000,
    pendingAmount: 0,
    performanceGrade: "A+",
    guardianName: "Tariq Khan",
    guardianPhone: "+91 98930 33667",
    address: "Arera Colony, Bhopal",
    status: "Active"
  }
];

export const INITIAL_TEACHERS = [
  {
    id: "TCH-001",
    name: "Dr. Vikramaditya Rathore",
    email: "vikram.rathore@edumanage.com",
    phone: "+91 98110 99881",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    subject: "Physics",
    designation: "Head of Physics & JEE Lead",
    experience: "14 Years",
    qualification: "Ph.D. in Applied Physics (IIT Delhi)",
    assignedCourses: ["CRS-001", "CRS-003"],
    activeStatus: "Active",
    bio: "Ex-Allen senior faculty with 14+ years of expertise mentoring top 100 JEE Advanced rankers."
  },
  {
    id: "TCH-002",
    name: "Prof. Sunita Deshpande",
    email: "sunita.d@edumanage.com",
    phone: "+91 98224 88772",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    subject: "Chemistry",
    designation: "Senior Faculty - Organic Chemistry",
    experience: "11 Years",
    qualification: "M.Sc. Organic Chemistry (UDCT Mumbai)",
    assignedCourses: ["CRS-001", "CRS-002"],
    activeStatus: "Active",
    bio: "Author of standard NEET Organic Chemistry problem solving guides and national olympiad trainer."
  },
  {
    id: "TCH-003",
    name: "Dr. Rajeshwar Rao",
    email: "rajeshwar.rao@edumanage.com",
    phone: "+91 98450 77663",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    subject: "Mathematics",
    designation: "Lead Mentor - Higher Mathematics",
    experience: "16 Years",
    qualification: "Ph.D. Mathematics (IISc Bangalore)",
    assignedCourses: ["CRS-001", "CRS-004"],
    activeStatus: "Active",
    bio: "Passionate educator specializing in calculus, algebra & combinatorics for competitive engineering tests."
  },
  {
    id: "TCH-004",
    name: "Dr. Shalini Mukhopadhyay",
    email: "shalini.m@edumanage.com",
    phone: "+91 98311 66554",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    subject: "Biology & Zoology",
    designation: "Head of Medical Sciences",
    experience: "12 Years",
    qualification: "M.B.B.S, M.D. (AIIMS New Delhi)",
    assignedCourses: ["CRS-002", "CRS-006"],
    activeStatus: "Active",
    bio: "AIIMS alumnus guiding medical aspirants with 3D diagrammatic pedagogy and clinical correlation methods."
  },
  {
    id: "TCH-005",
    name: "Er. Aman Singhal",
    email: "aman.singhal@edumanage.com",
    phone: "+91 99100 55443",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    subject: "Computer Science & AI",
    designation: "Lead Tech Instructor",
    experience: "8 Years",
    qualification: "B.Tech Computer Science (IIT Roorkee)",
    assignedCourses: ["CRS-005", "CRS-007"],
    activeStatus: "Active",
    bio: "Former Google software engineer sharing industry-standard full stack engineering and AI practices."
  }
];

export const INITIAL_COURSES = [
  {
    id: "CRS-001",
    title: "JEE Advanced Pinnacle Batch",
    category: "Engineering",
    tagline: "Comprehensive Masterclass for IIT-JEE Aspirants",
    description: "Intensive 2-year classroom and problem-solving master program targeting top 500 ranks in IIT-JEE Advanced. Includes rigorous test series, personal doubt sessions, and daily practice sets.",
    duration: "24 Months",
    instructor: "Dr. Vikramaditya Rathore & Dr. Rao",
    instructorId: "TCH-001",
    fee: 85000,
    level: "Advanced",
    rating: 4.9,
    studentsEnrolled: 184,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&auto=format&fit=crop&q=80",
    badge: "Bestseller",
    syllabus: [
      {
        module: "Module 1: Mechanics & Newton's Laws",
        lessons: [
          { title: "Kinematics in 1D and 2D", duration: "1h 45m", completed: true },
          { title: "Newton's Laws of Motion & Friction", duration: "2h 10m", completed: true },
          { title: "Work, Energy & Power Dynamics", duration: "1h 55m", completed: true },
          { title: "Rotational Dynamics & Torque", duration: "2h 30m", completed: false }
        ]
      },
      {
        module: "Module 2: Electrodynamics & Magnetism",
        lessons: [
          { title: "Coulomb's Law & Gauss Theorem", duration: "2h 00m", completed: false },
          { title: "Electrostatic Potential & Capacitance", duration: "2h 15m", completed: false },
          { title: "Current Electricity & Kirchoff's Laws", duration: "1h 50m", completed: false }
        ]
      },
      {
        module: "Module 3: Advanced Calculus & Vectors",
        lessons: [
          { title: "Limits, Continuity & Differentiability", duration: "2h 20m", completed: true },
          { title: "Application of Derivatives & Maxima", duration: "2h 05m", completed: false },
          { title: "Definite Integration & Area Under Curves", duration: "2h 40m", completed: false }
        ]
      }
    ]
  },
  {
    id: "CRS-002",
    title: "NEET Elite Medical Foundation",
    category: "Medical",
    tagline: "The Gold Standard for NEET UG Top Scores",
    description: "Exhaustive coaching program focusing on NCERT line-by-line mastery, high-yield biological diagrams, organic reaction mechanisms, and speed-optimized physics calculations.",
    duration: "24 Months",
    instructor: "Dr. Shalini Mukhopadhyay",
    instructorId: "TCH-004",
    fee: 90000,
    level: "Intermediate to Advanced",
    rating: 4.95,
    studentsEnrolled: 210,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
    badge: "Top Rated",
    syllabus: [
      {
        module: "Module 1: Human Physiology & Genetics",
        lessons: [
          { title: "Digestion and Absorption Mechanics", duration: "1h 40m", completed: true },
          { title: "Neural Control and Coordination", duration: "2h 10m", completed: true },
          { title: "Mendelian Principles and Gene Linkage", duration: "2h 35m", completed: false }
        ]
      },
      {
        module: "Module 2: Organic Chemistry Reaction Mechanisms",
        lessons: [
          { title: "Electrophilic and Nucleophilic Substitution", duration: "2h 00m", completed: true },
          { title: "Aldehydes, Ketones and Carboxylic Acids", duration: "2h 20m", completed: false },
          { title: "Biomolecules & Polymer Pathways", duration: "1h 45m", completed: false }
        ]
      }
    ]
  },
  {
    id: "CRS-003",
    title: "CBSE Class 12 Science Board Accelerator",
    category: "Board Exam",
    tagline: "Target 95%+ in Physics, Chemistry & Math",
    description: "Tailored specifically for Class 12 CBSE board syllabus. Complete coverage of theoretical explanations, derivation steps, NCERT back exercises, and sample question papers.",
    duration: "10 Months",
    instructor: "Dr. Vikramaditya Rathore",
    instructorId: "TCH-001",
    fee: 50000,
    level: "Intermediate",
    rating: 4.8,
    studentsEnrolled: 145,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80",
    badge: "Board Special",
    syllabus: [
      {
        module: "Module 1: Core Physics Derivations",
        lessons: [
          { title: "Wave Optics & Young's Double Slit Experiment", duration: "1h 30m", completed: true },
          { title: "Semiconductors & Logic Gates", duration: "1h 50m", completed: true },
          { title: "Electromagnetic Induction & AC Circuits", duration: "2h 00m", completed: false }
        ]
      }
    ]
  },
  {
    id: "CRS-004",
    title: "Mathematics Olympiad & Advanced Calculus",
    category: "Mathematics",
    tagline: "Pure Mathematics, Proofs, and Problem Solving",
    description: "Deep dive into number theory, geometry, functional equations, and advanced calculus designed for PRMO, RMO, and engineering aspirants looking for extreme analytical edge.",
    duration: "12 Months",
    instructor: "Dr. Rajeshwar Rao",
    instructorId: "TCH-003",
    fee: 60000,
    level: "Advanced",
    rating: 4.88,
    studentsEnrolled: 88,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=80",
    badge: "Olympiad",
    syllabus: [
      {
        module: "Module 1: Number Theory & Diophantine Equations",
        lessons: [
          { title: "Modular Arithmetic & Fermat's Little Theorem", duration: "2h 15m", completed: true },
          { title: "Euclidean Algorithm and GCD Properties", duration: "1h 45m", completed: true }
        ]
      }
    ]
  },
  {
    id: "CRS-005",
    title: "Full Stack Web Mastery with React & Node",
    category: "Technology",
    tagline: "From Absolute Beginner to Production Developer",
    description: "Hands-on project-based boot camp. Build 10 real-world apps with React 19, Tailwind CSS, TypeScript, Node.js, Express, and cloud deployment pipelines.",
    duration: "6 Months",
    instructor: "Er. Aman Singhal",
    instructorId: "TCH-005",
    fee: 45000,
    level: "Beginner to Advanced",
    rating: 4.92,
    studentsEnrolled: 260,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80",
    badge: "Trending",
    syllabus: [
      {
        module: "Module 1: Modern Frontend with React 19",
        lessons: [
          { title: "Modern ES6+ Syntax and Component Lifecycle", duration: "2h 00m", completed: true },
          { title: "State Management with Hooks and Context", duration: "2h 30m", completed: true },
          { title: "Client-side Routing & Protected Routes", duration: "1h 45m", completed: true },
          { title: "Tailwind CSS Design Systems", duration: "2h 10m", completed: false }
        ]
      }
    ]
  },
  {
    id: "CRS-006",
    title: "NEET Crash Course & Mock Test Intensive",
    category: "Medical",
    tagline: "90-Day Rapid Revision and Test Drills",
    description: "Fast-track high-yield revision covering all 97 chapters of NEET syllabus with daily 180-question mock tests, error analysis, and time management strategies.",
    duration: "3 Months",
    instructor: "Dr. Shalini Mukhopadhyay",
    instructorId: "TCH-004",
    fee: 35000,
    level: "Intensive",
    rating: 4.79,
    studentsEnrolled: 175,
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=600&auto=format&fit=crop&q=80",
    badge: "Crash Course",
    syllabus: [
      {
        module: "Module 1: Botany & Zoology Speed Drills",
        lessons: [
          { title: "Plant Kingdom & Morphology Flashcards", duration: "1h 40m", completed: true },
          { title: "Ecology & Environmental Biology Shortcuts", duration: "1h 20m", completed: false }
        ]
      }
    ]
  },
  {
    id: "CRS-007",
    title: "Applied Data Science & Machine Learning",
    category: "Technology",
    tagline: "Python, Statistical Modeling, and Deep Neural Networks",
    description: "Master modern AI and machine learning workflows. Learn Pandas, Scikit-learn, PyTorch, model optimization, LLM fine-tuning, and deployment as production web apps.",
    duration: "8 Months",
    instructor: "Er. Aman Singhal",
    instructorId: "TCH-005",
    fee: 55000,
    level: "Intermediate",
    rating: 4.87,
    studentsEnrolled: 130,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&auto=format&fit=crop&q=80",
    badge: "AI Powered",
    syllabus: [
      {
        module: "Module 1: Exploratory Data Analysis & Statistics",
        lessons: [
          { title: "NumPy & Pandas High-Performance Dataframes", duration: "2h 00m", completed: true },
          { title: "Probability Distributions & Hypothesis Testing", duration: "2h 30m", completed: false }
        ]
      }
    ]
  },
  {
    id: "CRS-008",
    title: "Chemistry Masterclass: Physical & Inorganic",
    category: "Chemistry",
    tagline: "Concept Clarity & Numerical Mastery",
    description: "Complete mastery over Thermodynamics, Equilibrium, Coordination Compounds, and Periodic Trends with formula cheat sheets and 1000+ solved numericals.",
    duration: "12 Months",
    instructor: "Prof. Sunita Deshpande",
    instructorId: "TCH-002",
    fee: 45000,
    level: "Intermediate",
    rating: 4.84,
    studentsEnrolled: 115,
    image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=600&auto=format&fit=crop&q=80",
    badge: "Concept Booster",
    syllabus: [
      {
        module: "Module 1: Chemical Thermodynamics & Energetics",
        lessons: [
          { title: "First & Second Laws of Thermodynamics", duration: "2h 10m", completed: true },
          { title: "Gibbs Free Energy & Spontaneity", duration: "1h 50m", completed: false }
        ]
      }
    ]
  }
];

export const INITIAL_ATTENDANCE = [
  { id: "ATT-101", date: "2026-10-15", studentId: "STU-001", studentName: "Aarav Sharma", courseId: "CRS-001", subject: "Physics", status: "Present", remark: "On time" },
  { id: "ATT-102", date: "2026-10-15", studentId: "STU-002", studentName: "Diya Patel", courseId: "CRS-002", subject: "Chemistry", status: "Present", remark: "On time" },
  { id: "ATT-103", date: "2026-10-15", studentId: "STU-003", studentName: "Rohan Verma", courseId: "CRS-001", subject: "Physics", status: "Late", remark: "10 mins late" },
  { id: "ATT-104", date: "2026-10-15", studentId: "STU-007", studentName: "Aditya Kulkarni", courseId: "CRS-001", subject: "Physics", status: "Absent", remark: "Medical leave" },
  { id: "ATT-105", date: "2026-10-16", studentId: "STU-001", studentName: "Aarav Sharma", courseId: "CRS-001", subject: "Mathematics", status: "Present", remark: "Active participation" },
  { id: "ATT-106", date: "2026-10-16", studentId: "STU-002", studentName: "Diya Patel", courseId: "CRS-002", subject: "Biology", status: "Present", remark: "On time" },
  { id: "ATT-107", date: "2026-10-17", studentId: "STU-001", studentName: "Aarav Sharma", courseId: "CRS-003", subject: "Chemistry", status: "Present", remark: "On time" },
  { id: "ATT-108", date: "2026-10-17", studentId: "STU-004", studentName: "Ananya Iyer", courseId: "CRS-002", subject: "Biology", status: "Present", remark: "On time" },
  { id: "ATT-109", date: "2026-10-18", studentId: "STU-001", studentName: "Aarav Sharma", courseId: "CRS-001", subject: "Physics", status: "Present", remark: "On time" },
  { id: "ATT-110", date: "2026-10-18", studentId: "STU-005", studentName: "Kabir Sen", courseId: "CRS-005", subject: "Web Dev", status: "Present", remark: "Project demo" },
  { id: "ATT-111", date: "2026-10-19", studentId: "STU-001", studentName: "Aarav Sharma", courseId: "CRS-001", subject: "Mathematics", status: "Absent", remark: "Informed leave" },
  { id: "ATT-112", date: "2026-10-20", studentId: "STU-001", studentName: "Aarav Sharma", courseId: "CRS-001", subject: "Physics", status: "Present", remark: "On time" }
];

export const INITIAL_FEES = [
  {
    id: "FEE-001",
    studentId: "STU-001",
    studentName: "Aarav Sharma",
    courseTitle: "JEE Advanced Pinnacle Batch",
    installmentNo: 1,
    amount: 45000,
    dueDate: "2025-05-10",
    paidDate: "2025-05-08",
    status: "Paid",
    paymentMode: "UPI / Net Banking",
    receiptNumber: "EDM-REC-2025-0089",
    transactionId: "TXN984920412"
  },
  {
    id: "FEE-002",
    studentId: "STU-001",
    studentName: "Aarav Sharma",
    courseTitle: "JEE Advanced Pinnacle Batch",
    installmentNo: 2,
    amount: 40000,
    dueDate: "2025-11-10",
    paidDate: "2025-11-09",
    status: "Paid",
    paymentMode: "HDFC Credit Card",
    receiptNumber: "EDM-REC-2025-0451",
    transactionId: "TXN778392011"
  },
  {
    id: "FEE-003",
    studentId: "STU-002",
    studentName: "Diya Patel",
    courseTitle: "NEET Elite Medical Foundation",
    installmentNo: 1,
    amount: 45000,
    dueDate: "2025-05-15",
    paidDate: "2025-05-12",
    status: "Paid",
    paymentMode: "UPI",
    receiptNumber: "EDM-REC-2025-0112",
    transactionId: "TXN654321987"
  },
  {
    id: "FEE-004",
    studentId: "STU-002",
    studentName: "Diya Patel",
    courseTitle: "NEET Elite Medical Foundation",
    installmentNo: 2,
    amount: 45000,
    dueDate: "2026-11-15",
    paidDate: null,
    status: "Pending",
    paymentMode: "Pending",
    receiptNumber: "EDM-INV-2026-0044",
    transactionId: "-"
  },
  {
    id: "FEE-005",
    studentId: "STU-007",
    studentName: "Aditya Kulkarni",
    courseTitle: "JEE Advanced Pinnacle Batch",
    installmentNo: 2,
    amount: 50000,
    dueDate: "2026-09-01",
    paidDate: null,
    status: "Overdue",
    paymentMode: "Pending",
    receiptNumber: "EDM-INV-2026-0019",
    transactionId: "-"
  }
];

export const INITIAL_TESTS = [
  {
    id: "TST-001",
    title: "JEE Advanced Full Physics Mock #04",
    courseId: "CRS-001",
    courseName: "JEE Advanced Pinnacle Batch",
    durationMinutes: 15, // Demo length
    totalQuestions: 5,
    totalMarks: 20,
    passingMarks: 10,
    difficulty: "Advanced",
    status: "Available",
    questions: [
      {
        id: 1,
        question: "A uniform rod of length L and mass M is free to rotate in a vertical plane about a horizontal axis passing through its end. If it is released from a horizontal position, what is its initial angular acceleration?",
        options: [
          "3g / (2L)",
          "2g / (3L)",
          "g / L",
          "3g / L"
        ],
        correctOption: 0,
        explanation: "Torque about pivot τ = M*g*(L/2). Moment of inertia I = (1/3)*M*L^2. Angular acceleration α = τ / I = (M*g*L/2) / (M*L^2/3) = 3g / (2L)."
      },
      {
        id: 2,
        question: "In Young's double slit experiment, if the separation between slits is halved and the distance between the slits and screen is doubled, the fringe width will:",
        options: [
          "Remain unchanged",
          "Double",
          "Quadruple (become 4 times)",
          "Halve"
        ],
        correctOption: 2,
        explanation: "Fringe width β = λD/d. If d' = d/2 and D' = 2D, β' = λ*(2D)/(d/2) = 4*(λD/d) = 4β."
      },
      {
        id: 3,
        question: "What is the electric field inside a uniformly charged solid conducting sphere of radius R carrying charge Q?",
        options: [
          "k*Q / r^2",
          "Zero",
          "k*Q*r / R^3",
          "Infinity"
        ],
        correctOption: 1,
        explanation: "In an electrostatic conductor in equilibrium, all free charges reside on the outer surface. By Gauss's Law, the electric field inside is strictly zero."
      },
      {
        id: 4,
        question: "Two bodies of masses 1 kg and 4 kg have equal kinetic energies. The ratio of their linear momenta is:",
        options: [
          "1 : 4",
          "1 : 2",
          "2 : 1",
          "1 : 16"
        ],
        correctOption: 1,
        explanation: "Momentum p = √(2*m*KE). For equal KE, p1 / p2 = √(m1 / m2) = √(1 / 4) = 1/2."
      },
      {
        id: 5,
        question: "Carnot engine operating between temperatures 500 K and 300 K has an efficiency of:",
        options: [
          "60%",
          "40%",
          "20%",
          "50%"
        ],
        correctOption: 1,
        explanation: "Efficiency η = 1 - (T_cold / T_hot) = 1 - (300 / 500) = 2/5 = 0.40 or 40%."
      }
    ]
  },
  {
    id: "TST-002",
    title: "NEET Zoology & Genetics Diagnostic",
    courseId: "CRS-002",
    courseName: "NEET Elite Medical Foundation",
    durationMinutes: 10,
    totalQuestions: 4,
    totalMarks: 16,
    passingMarks: 8,
    difficulty: "Medium",
    status: "Available",
    questions: [
      {
        id: 1,
        question: "In human blood grouping, ABO blood groups are controlled by the gene I. How many possible genotypes exist in the population?",
        options: ["3", "4", "6", "8"],
        correctOption: 2,
        explanation: "There are 3 alleles (IA, IB, i). The number of genotypes is n(n+1)/2 = 3*(4)/2 = 6 genotypes."
      },
      {
        id: 2,
        question: "Which of the following hormones is not secreted by the human placenta?",
        options: ["hCG", "Estrogen", "Prolactin", "Progesterone"],
        correctOption: 2,
        explanation: "Prolactin is synthesized and secreted by the anterior pituitary gland, not the placenta."
      },
      {
        id: 3,
        question: "The functional unit of the human kidney is the:",
        options: ["Neuron", "Nephron", "Alveoli", "Glomerulus"],
        correctOption: 1,
        explanation: "The nephron is the microscopic structural and functional unit of the kidney."
      },
      {
        id: 4,
        question: "DNA replication in eukaryotic cells occurs during which phase of the cell cycle?",
        options: ["G1 phase", "S phase", "G2 phase", "M phase"],
        correctOption: 1,
        explanation: "S phase (Synthesis phase) is when DNA synthesis and replication take place."
      }
    ]
  }
];

export const INITIAL_STUDY_MATERIALS = [
  {
    id: "MAT-001",
    title: "Rotational Dynamics & Torque Formula Sheet",
    courseId: "CRS-001",
    courseName: "JEE Advanced Pinnacle Batch",
    subject: "Physics",
    type: "PDF",
    size: "3.4 MB",
    author: "Dr. Vikramaditya Rathore",
    date: "2026-10-12",
    downloadCount: 142,
    badge: "High Yield"
  },
  {
    id: "MAT-002",
    title: "Complete Organic Named Reactions & Mechanisms",
    courseId: "CRS-002",
    courseName: "NEET Elite Medical Foundation",
    subject: "Chemistry",
    type: "PDF",
    size: "5.8 MB",
    author: "Prof. Sunita Deshpande",
    date: "2026-10-14",
    downloadCount: 228,
    badge: "Must Read"
  },
  {
    id: "MAT-003",
    title: "Calculus & Limits Quick Reference Mindmap",
    courseId: "CRS-001",
    courseName: "JEE Advanced Pinnacle Batch",
    subject: "Mathematics",
    type: "Notes",
    size: "2.1 MB",
    author: "Dr. Rajeshwar Rao",
    date: "2026-10-16",
    downloadCount: 185,
    badge: "Revision"
  },
  {
    id: "MAT-004",
    title: "Human Endocrine System 3D Annotated Diagrams",
    courseId: "CRS-002",
    courseName: "NEET Elite Medical Foundation",
    subject: "Biology",
    type: "Slides",
    size: "8.6 MB",
    author: "Dr. Shalini Mukhopadhyay",
    date: "2026-10-18",
    downloadCount: 195,
    badge: "Diagrams"
  },
  {
    id: "MAT-005",
    title: "Modern React 19 State Architecture & Hooks Guide",
    courseId: "CRS-005",
    courseName: "Full Stack Web Mastery",
    subject: "Computer Science",
    type: "Notes",
    size: "1.9 MB",
    author: "Er. Aman Singhal",
    date: "2026-10-19",
    downloadCount: 310,
    badge: "Code Guide"
  }
];

export const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ANC-001",
    title: "Diwali Festive Break & Extra Revision Sessions",
    content: "EduManage Institute will remain closed for offline lectures from Nov 1 to Nov 5 for Diwali celebrations. Special online problem-solving sessions will be hosted on the portal for JEE and NEET batches.",
    category: "Holiday",
    author: "Administration",
    date: "2026-10-20",
    priority: "Normal",
    isRead: false
  },
  {
    id: "ANC-002",
    title: "All-India Grand Mock Test Series #03 Scheduled",
    content: "The upcoming National Rank Booster Mock Test for JEE & NEET 2026 batches will take place on Sunday, Oct 26 at 10:00 AM. Ensure your portal login is active and review prior formula sheets.",
    category: "Exam",
    author: "Examination Cell",
    date: "2026-10-18",
    priority: "Urgent",
    isRead: true
  },
  {
    id: "ANC-003",
    title: "New AI Study Assistant & Digital Library Launched",
    content: "We are thrilled to launch the EduManage Digital Learning Vault with over 500+ curated video lectures, NCERT exemplar solutions, and instant question explanations.",
    category: "General",
    author: "Director Academic Affairs",
    date: "2026-10-15",
    priority: "Normal",
    isRead: true
  }
];

export const INITIAL_ASSIGNMENTS = [
  {
    id: "ASG-001",
    title: "Physics Problem Set: Rotational Equilibrium",
    courseId: "CRS-001",
    courseName: "JEE Advanced Pinnacle Batch",
    dueDate: "2026-10-25",
    totalMarks: 50,
    submittedCount: 28,
    totalStudents: 32,
    description: "Solve problems 14 to 32 from Advanced Irodov volume on rigid body rotation with step-by-step free body diagrams."
  },
  {
    id: "ASG-002",
    title: "Organic Chemistry Synthesis Pathways",
    courseId: "CRS-002",
    courseName: "NEET Elite Medical Foundation",
    dueDate: "2026-10-28",
    totalMarks: 40,
    submittedCount: 35,
    totalStudents: 40,
    description: "Write reaction mechanisms for Grignard reagent reactions with aliphatic aldehydes and ketones."
  }
];
