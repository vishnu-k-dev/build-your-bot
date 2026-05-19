// Synthetic knowledge base for Westbrook College of Technology (WCT)
// Used to seed the bot with realistic college data

export const COLLEGE_NAME = 'Westbrook College of Technology'
export const BOT_NAME = 'WCT Assistant'
export const BOT_ID = '00000000-0000-0000-0000-000000000001'

export const WCT_SYSTEM_PROMPT = `You are WCT Assistant, the official AI-powered student support chatbot for Westbrook College of Technology (WCT), Bangalore.

TODAY'S DATE: {date} ({day})

ROLE: Help students with academic and administrative queries — timetables, exam schedules, fee details, admission procedures, faculty contacts, hostel rules, and attendance policies.

INSTRUCTIONS:
- Answer ONLY using the provided context from the WCT knowledge base.
- If the answer is not in the context, say: "I don't have that information right now. Please contact the college helpdesk at info@westbrooktech.edu.in or visit the Admin Block."
- When asked about "today's" timetable or schedule, use the current day ({day}) to find the right answer.
- Keep answers clear, structured, and student-friendly.
- For exam dates, fee deadlines, or important dates — be precise and accurate.
- If a student seems stressed (exams, fees), be empathetic and helpful.

{context}`

export const KNOWLEDGE_BASE: { name: string; content: string }[] = [
  {
    name: 'College Overview',
    content: `
WESTBROOK COLLEGE OF TECHNOLOGY (WCT)
Electronic City Phase 1, Bangalore - 560100, Karnataka, India
Phone: +91-80-4567-8900 | Email: info@westbrooktech.edu.in
Website: www.westbrooktech.edu.in
Affiliated to: Visvesvaraya Technological University (VTU)
Approved by: AICTE | NAAC Grade: A | Established: 2005

ABOUT WCT:
Westbrook College of Technology is a premier technical institution in Bangalore offering undergraduate, postgraduate, and doctoral programs in engineering, computer applications, and management. The college has state-of-the-art labs, high-speed Wi-Fi campus, a 5000-seat auditorium, and a central library with over 50,000 volumes.

PROGRAMS OFFERED:
- MCA (Master of Computer Applications) — 2 years, 4 semesters
- BCA (Bachelor of Computer Applications) — 3 years, 6 semesters
- B.Tech Computer Science & Engineering — 4 years, 8 semesters
- B.Tech Information Technology — 4 years, 8 semesters
- MBA (Master of Business Administration) — 2 years, 4 semesters

CAMPUS TIMINGS:
College Hours: 8:30 AM to 5:30 PM (Monday to Saturday)
Library: 8:00 AM to 8:00 PM (Monday to Saturday), 10:00 AM to 4:00 PM (Sunday)
Computer Labs: 8:00 AM to 6:00 PM on working days
Hostel Gate Timings: 9:30 PM (weekdays), 10:30 PM (weekends)

HELPDESK:
Academic Queries: academics@westbrooktech.edu.in
Admissions: admissions@westbrooktech.edu.in
Fee Payment: fees@westbrooktech.edu.in
Hostel: hostel@westbrooktech.edu.in
Placement: placement@westbrooktech.edu.in
Exam Cell: examcell@westbrooktech.edu.in
`,
  },
  {
    name: 'MCA Timetable - Semester 4 (2024-25)',
    content: `
MCA SEMESTER 4 TIMETABLE — ACADEMIC YEAR 2024-25
Effective from: February 3, 2025

MONDAY:
09:00 - 10:00 | Machine Learning (CS401) | Room 301 | Prof. Ananya Krishnan
10:00 - 11:00 | Cloud Computing (CS402) | Room 301 | Prof. Rajan Mehta
11:00 - 01:00 | AI & ML Lab (CS401L) | Lab 201 | Prof. Ananya Krishnan & TA Sai Kumar
01:00 - 02:00 | LUNCH BREAK
02:00 - 03:00 | Soft Skills & Communication (HS401) | Room 301 | Prof. Divya Nair
03:00 - 04:00 | Professional Elective (CS4E1) | Room 301 | Prof. Mohan Rao
04:00 - 04:30 | Self-Study / Mentoring

TUESDAY:
09:00 - 10:00 | Cloud Computing (CS402) | Room 301 | Prof. Rajan Mehta
10:00 - 11:00 | Mobile Application Development (CS403) | Room 301 | Prof. Priya Sharma
11:00 - 12:00 | Machine Learning (CS401) | Room 301 | Prof. Ananya Krishnan
12:00 - 01:00 | Professional Elective (CS4E1) | Room 301 | Prof. Mohan Rao
01:00 - 02:00 | LUNCH BREAK
02:00 - 04:00 | Cloud & DevOps Lab (CS402L) | Lab 202 | Prof. Rajan Mehta & TA Neha Joshi

WEDNESDAY:
09:00 - 10:00 | Professional Elective (CS4E1) | Room 301 | Prof. Mohan Rao
10:00 - 11:00 | Mobile Application Development (CS403) | Room 301 | Prof. Priya Sharma
11:00 - 12:00 | Soft Skills & Communication (HS401) | Room 301 | Prof. Divya Nair
12:00 - 01:00 | Machine Learning (CS401) | Room 301 | Prof. Ananya Krishnan
01:00 - 02:00 | LUNCH BREAK
02:00 - 05:00 | Project Work & Seminar (CS404) | Room 301 / Lab | Guide: Respective Faculty

THURSDAY:
09:00 - 10:00 | Machine Learning (CS401) | Room 301 | Prof. Ananya Krishnan
10:00 - 11:00 | Cloud Computing (CS402) | Room 301 | Prof. Rajan Mehta
11:00 - 01:00 | Mobile App Dev Lab (CS403L) | Lab 203 | Prof. Priya Sharma & TA Arjun Rao
01:00 - 02:00 | LUNCH BREAK
02:00 - 03:00 | Professional Elective (CS4E1) | Prof. Mohan Rao
03:00 - 05:00 | Project Work (CS404) | Self-directed | Lab 204

FRIDAY:
09:00 - 10:00 | Mobile Application Development (CS403) | Room 301 | Prof. Priya Sharma
10:00 - 11:00 | Machine Learning (CS401) | Room 301 | Prof. Ananya Krishnan
11:00 - 12:00 | Professional Elective (CS4E1) | Room 301 | Prof. Mohan Rao
12:00 - 01:00 | Cloud Computing (CS402) | Room 301 | Prof. Rajan Mehta
01:00 - 02:00 | LUNCH BREAK
02:00 - 05:00 | Mini Project / Guest Lecture / Seminar

SATURDAY:
09:00 - 11:00 | Makeup Classes / Extra Sessions (as announced)
11:00 - 01:00 | Library / Self Study
Note: Saturdays may be used for internal assessment tests. Check notice board for updates.

SUBJECTS — MCA SEMESTER 4:
CS401 — Machine Learning (4 credits) | Prof. Ananya Krishnan | ananya.k@westbrooktech.edu.in
CS402 — Cloud Computing (4 credits) | Prof. Rajan Mehta | rajan.m@westbrooktech.edu.in
CS403 — Mobile Application Development (4 credits) | Prof. Priya Sharma | priya.s@westbrooktech.edu.in
CS4E1 — Professional Elective: Data Engineering (3 credits) | Prof. Mohan Rao | mohan.r@westbrooktech.edu.in
HS401 — Soft Skills & Communication (2 credits) | Prof. Divya Nair | divya.n@westbrooktech.edu.in
CS404 — Major Project Phase 2 (6 credits) | Various Guides
CS401L — AI & ML Lab (2 credits)
CS402L — Cloud & DevOps Lab (2 credits)
CS403L — Mobile App Dev Lab (2 credits)
`,
  },
  {
    name: 'BCA Timetable - Semester 6 (2024-25)',
    content: `
BCA SEMESTER 6 TIMETABLE — ACADEMIC YEAR 2024-25
Effective from: February 3, 2025

MONDAY:
09:00 - 10:00 | Web Technology (BCA601) | Room 201 | Prof. Arun Verma
10:00 - 11:00 | Software Engineering (BCA602) | Room 201 | Prof. Sunita Das
11:00 - 01:00 | Web Tech Lab (BCA601L) | Lab 101 | Prof. Arun Verma
01:00 - 02:00 | LUNCH BREAK
02:00 - 03:00 | Data Analytics (BCA603) | Room 201 | Prof. Kiran Patil
03:00 - 04:00 | Elective: Cyber Security (BCA6E1) | Room 201 | Prof. Suman Jha

TUESDAY:
09:00 - 10:00 | Software Engineering (BCA602) | Room 201 | Prof. Sunita Das
10:00 - 11:00 | Data Analytics (BCA603) | Room 201 | Prof. Kiran Patil
11:00 - 12:00 | Web Technology (BCA601) | Room 201 | Prof. Arun Verma
01:00 - 02:00 | LUNCH BREAK
02:00 - 04:00 | Data Analytics Lab (BCA603L) | Lab 102 | Prof. Kiran Patil

WEDNESDAY:
09:00 - 12:00 | Project Work (BCA604) | Lab / Classroom | Guide: Respective Faculty
01:00 - 02:00 | LUNCH BREAK
02:00 - 03:00 | Elective: Cyber Security (BCA6E1) | Room 201 | Prof. Suman Jha
03:00 - 04:00 | Aptitude & Reasoning (HS601) | Room 201 | Prof. Meena Pillai

THURSDAY:
09:00 - 10:00 | Data Analytics (BCA603) | Room 201 | Prof. Kiran Patil
10:00 - 12:00 | Software Engineering Lab (BCA602L) | Lab 101 | Prof. Sunita Das
01:00 - 02:00 | LUNCH BREAK
02:00 - 04:00 | Project Work (BCA604)

FRIDAY:
09:00 - 10:00 | Web Technology (BCA601) | Room 201 | Prof. Arun Verma
10:00 - 11:00 | Software Engineering (BCA602) | Room 201 | Prof. Sunita Das
11:00 - 12:00 | Aptitude & Reasoning (HS601) | Prof. Meena Pillai
01:00 - 02:00 | LUNCH BREAK
02:00 - 05:00 | Project Work / Guest Lecture
`,
  },
  {
    name: 'End-Semester Exam Schedule - June 2025',
    content: `
END-SEMESTER EXAMINATIONS — JUNE 2025
Westbrook College of Technology
Exam Cell: examcell@westbrooktech.edu.in | Phone: +91-80-4567-8921

IMPORTANT INSTRUCTIONS:
- Students must carry their Hall Ticket and College ID for every exam
- Hall Tickets available for download from the student portal from May 20, 2025
- Reporting time: 30 minutes before exam start
- Mobile phones, smart watches, and electronic devices strictly prohibited
- Blue/black pens only. No pencils except for drawing

MCA SEMESTER 4 EXAMS:
Date: June 2, 2025 (Monday) | Time: 10:00 AM - 1:00 PM | Subject: Machine Learning (CS401) | Venue: Exam Hall A (EA-101)
Date: June 4, 2025 (Wednesday) | Time: 10:00 AM - 1:00 PM | Subject: Cloud Computing (CS402) | Venue: Exam Hall A (EA-101)
Date: June 6, 2025 (Friday) | Time: 10:00 AM - 1:00 PM | Subject: Mobile Application Development (CS403) | Venue: Exam Hall B (EA-102)
Date: June 9, 2025 (Monday) | Time: 10:00 AM - 1:00 PM | Subject: Professional Elective — Data Engineering (CS4E1) | Venue: Exam Hall A (EA-101)
Date: June 11, 2025 (Wednesday) | Time: 10:00 AM - 12:00 PM | Subject: Soft Skills & Communication (HS401) | Venue: Exam Hall B (EA-102)
Date: June 13, 2025 (Friday) | Subject: Project Viva / Presentation | Time: As per guide allocation | Venue: Department Seminar Hall

BCA SEMESTER 6 EXAMS:
Date: June 3, 2025 (Tuesday) | Time: 10:00 AM - 1:00 PM | Subject: Web Technology (BCA601) | Venue: Exam Hall C (EA-201)
Date: June 5, 2025 (Thursday) | Time: 10:00 AM - 1:00 PM | Subject: Software Engineering (BCA602) | Venue: Exam Hall C (EA-201)
Date: June 7, 2025 (Saturday) | Time: 10:00 AM - 1:00 PM | Subject: Data Analytics (BCA603) | Venue: Exam Hall D (EA-202)
Date: June 10, 2025 (Tuesday) | Time: 10:00 AM - 12:00 PM | Subject: Elective — Cyber Security (BCA6E1) | Venue: Exam Hall C (EA-201)
Date: June 12, 2025 (Thursday) | Subject: Project Viva | Time: As per faculty schedule

B.TECH SEMESTER 8 EXAMS:
Date: June 2, 2025 (Monday) | Time: 2:00 PM - 5:00 PM | Subject: Distributed Systems (CS801) | Venue: Exam Hall E
Date: June 4, 2025 (Wednesday) | Time: 2:00 PM - 5:00 PM | Subject: Elective 4 | Venue: Exam Hall E
Date: June 6, 2025 (Friday) | Time: 2:00 PM - 5:00 PM | Subject: Elective 5 | Venue: Exam Hall E

PRACTICAL EXAMS (All Programs):
June 16-20, 2025 | Time: 9:00 AM - 5:00 PM | Venue: Respective Labs | Report to concerned faculty

RESULT DECLARATION:
Expected: July 10, 2025 (results on VTU portal and WCT student portal)

SUPPLEMENTARY EXAMS (if applicable):
August 2025 (dates TBA — check notice board)

GRACE MARKS POLICY:
Students who fail in one subject by up to 10 marks may apply for grace marks. Submit form at Exam Cell by July 20, 2025.
`,
  },
  {
    name: 'Fee Structure 2024-25',
    content: `
FEE STRUCTURE — WESTBROOK COLLEGE OF TECHNOLOGY
Academic Year: 2024-25 | All amounts in Indian Rupees (INR)

MCA (Master of Computer Applications) — Per Year:
Tuition Fee: ₹1,20,000
University & Exam Fee: ₹8,000
Library & Lab Fee: ₹6,000
Student Activity Fee: ₹3,000
Development Fee: ₹5,000
Caution Deposit (one-time, refundable): ₹10,000
TOTAL (Day Scholar): ₹1,42,000 per year
Hostel (optional): ₹48,000 per year (twin sharing) / ₹60,000 (single room)
Mess Charges: ₹42,000 per year (approx. ₹3,500/month)
TOTAL (Hosteller - twin sharing): ₹2,32,000 per year

BCA (Bachelor of Computer Applications) — Per Year:
Tuition Fee: ₹65,000
University & Exam Fee: ₹6,000
Library & Lab Fee: ₹4,000
Student Activity Fee: ₹2,000
Development Fee: ₹3,000
Caution Deposit (one-time, refundable): ₹5,000
TOTAL (Day Scholar): ₹80,000 per year
Hostel + Mess: ₹90,000 per year
TOTAL (Hosteller): ₹1,70,000 per year

B.Tech CSE / IT — Per Year:
Tuition Fee: ₹1,05,000
University & Exam Fee: ₹7,000
Library & Lab Fee: ₹5,500
Student Activity Fee: ₹2,500
Development Fee: ₹4,000
Caution Deposit (one-time, refundable): ₹10,000
TOTAL (Day Scholar): ₹1,24,000 per year
Hostel + Mess: ₹90,000 per year
TOTAL (Hosteller): ₹2,14,000 per year

MBA — Per Year:
Tuition Fee: ₹1,35,000
University & Exam Fee: ₹9,000
All other fees: ₹15,000
TOTAL: ₹1,59,000 per year

FEE PAYMENT DEADLINES:
Odd Semester (Aug-Jan): Pay before July 31, 2025. Late fee: ₹500/month
Even Semester (Feb-Jul): Pay before January 31, 2026. Late fee: ₹500/month

PAYMENT METHODS:
Online: Student portal → Fee Payment (Net banking / UPI / Debit card)
Offline: Fee Counter, Administrative Block, 9:30 AM - 3:30 PM (Mon-Fri)
DD: Drawn in favor of "Westbrook College of Technology", payable at Bangalore

SCHOLARSHIPS:
Merit Scholarship: Top 5% students get 25% tuition waiver (apply by August 15 each year)
SC/ST Scholarship: Government scholarship — apply at scholarship.kar.gov.in
Sports Quota: 50% tuition waiver for state/national level athletes
Sibling Discount: 10% tuition discount for siblings enrolled simultaneously
EWS Scholarship: Students with family income < ₹8 LPA may apply for fee concession

FEE RECEIPT: Always collect receipt. Disputes must be raised within 30 days of payment.
REFUND POLICY: No refund after the last date of admission withdrawal (generally August 31).
`,
  },
  {
    name: 'Admission Information 2025-26',
    content: `
ADMISSIONS 2025-26 — WESTBROOK COLLEGE OF TECHNOLOGY

IMPORTANT DATES:
Online Application Opens: March 1, 2025
Last Date to Apply: May 15, 2025 (5:00 PM)
WCT Entrance Test (WCTET): June 1, 2025 (10:00 AM - 12:00 PM)
WCTET Results: June 10, 2025 (on portal by 5 PM)
Counseling Round 1: June 15-16, 2025
Counseling Round 2: June 20-21, 2025
Document Verification: June 23-25, 2025
Fee Payment Deadline (new admits): July 5, 2025
Classes Begin: July 21, 2025

HOW TO APPLY:
1. Visit www.westbrooktech.edu.in → Admissions → Apply Online
2. Register with your email ID and mobile number
3. Fill the application form and upload required documents
4. Pay application fee: ₹800 (non-refundable) via online payment
5. Appear for WCTET at the designated center

ELIGIBILITY:
MCA: BCA / B.Sc. (CS/IT/Maths) with minimum 50% aggregate (45% for SC/ST)
BCA: 10+2 (any stream) with minimum 45% aggregate. Maths preferred.
B.Tech: 10+2 (PCM) with minimum 45% aggregate. Must have qualified Karnataka CET / JEE Mains.
MBA: Any bachelor's degree with 50% aggregate. CAT/MAT/KMAT score accepted.

DOCUMENTS REQUIRED:
- 10th Marksheet & Certificate (original + 2 photocopies)
- 12th Marksheet & Certificate (original + 2 photocopies)
- Degree Marksheets (for PG programs, all semesters)
- Transfer Certificate (TC) from last institution
- Migration Certificate (if from outside Karnataka)
- Caste/Category Certificate (if applicable)
- Aadhar Card (self-attested photocopy)
- 6 recent passport-size photographs
- Income Certificate (if applying for scholarship)
- Medical Fitness Certificate

MANAGEMENT / NRI QUOTA:
A certain percentage of seats are available under management quota. Contact admissions office directly.
NRI seats: 15% of total intake. Apply directly to the college.

CONTACT ADMISSIONS OFFICE:
Phone: +91-80-4567-8901 | +91-98765-43210
Email: admissions@westbrooktech.edu.in
Walk-in: Administrative Block, 9:30 AM - 4:30 PM (Mon-Sat)
`,
  },
  {
    name: 'Faculty Directory',
    content: `
FACULTY DIRECTORY — WESTBROOK COLLEGE OF TECHNOLOGY

DEPARTMENT OF COMPUTER SCIENCE & MCA

Dr. Suresh Babu — Head of Department (MCA & CS)
Email: suresh.babu@westbrooktech.edu.in | Room: Faculty Block B, F-201
Specialization: Artificial Intelligence, Deep Learning
Office Hours: Monday & Thursday, 2:00 PM - 4:00 PM

Prof. Ananya Krishnan — Associate Professor
Subjects: Machine Learning, AI Fundamentals, Data Structures
Email: ananya.k@westbrooktech.edu.in | Room: F-202
Office Hours: Tuesday & Friday, 11:00 AM - 12:00 PM

Prof. Rajan Mehta — Associate Professor
Subjects: Cloud Computing, Operating Systems, Computer Networks
Email: rajan.m@westbrooktech.edu.in | Room: F-203
Office Hours: Monday & Wednesday, 3:00 PM - 4:30 PM

Prof. Priya Sharma — Assistant Professor
Subjects: Mobile App Development, Web Programming, Java
Email: priya.s@westbrooktech.edu.in | Room: F-204
Office Hours: Tuesday & Thursday, 9:00 AM - 10:00 AM

Prof. Mohan Rao — Assistant Professor
Subjects: Data Engineering, Database Management, Big Data
Email: mohan.r@westbrooktech.edu.in | Room: F-205
Office Hours: Wednesday & Friday, 2:00 PM - 3:30 PM

Prof. Divya Nair — Assistant Professor
Subjects: Soft Skills, Business Communication, Technical Writing
Email: divya.n@westbrooktech.edu.in | Room: F-206
Office Hours: Monday to Friday, 12:00 PM - 1:00 PM

DEPARTMENT OF BCA

Dr. Leena Thomas — Head of Department (BCA)
Email: leena.t@westbrooktech.edu.in | Room: F-301
Office Hours: Tuesday & Thursday, 2:00 PM - 4:00 PM

Prof. Arun Verma — Assistant Professor
Subjects: Web Technology, HTML/CSS/JS, React
Email: arun.v@westbrooktech.edu.in | Room: F-302

Prof. Sunita Das — Assistant Professor
Subjects: Software Engineering, Project Management, UML
Email: sunita.d@westbrooktech.edu.in | Room: F-303

Prof. Kiran Patil — Assistant Professor
Subjects: Data Analytics, Python, Statistics
Email: kiran.p@westbrooktech.edu.in | Room: F-304

Prof. Suman Jha — Assistant Professor
Subjects: Cyber Security, Networking, Ethical Hacking
Email: suman.j@westbrooktech.edu.in | Room: F-305

ADMINISTRATIVE CONTACTS:
Principal: Dr. Ramesh Iyer | principal@westbrooktech.edu.in | +91-80-4567-8900
Vice Principal (Academics): Dr. Kavitha Menon | vp.academics@westbrooktech.edu.in
Registrar: Mr. Sunil Kumar | registrar@westbrooktech.edu.in | +91-80-4567-8902
Exam Controller: Mrs. Padmini Rao | examcell@westbrooktech.edu.in | +91-80-4567-8921
Student Welfare Officer: Mr. Deepak Nair | studentwelfare@westbrooktech.edu.in | +91-80-4567-8930
`,
  },
  {
    name: 'Hostel & Campus Rules',
    content: `
HOSTEL & CAMPUS INFORMATION — WESTBROOK COLLEGE OF TECHNOLOGY

HOSTEL FACILITIES:
Boys Hostel: WCT Boys Hostel, Block A & B (capacity: 600 students)
Girls Hostel: WCT Girls Hostel, Block C & D (capacity: 400 students)
Warden (Boys): Mr. Ramaiah | +91-9876543201 | hostel.boys@westbrooktech.edu.in
Warden (Girls): Mrs. Savitha | +91-9876543202 | hostel.girls@westbrooktech.edu.in

ROOM TYPES:
Twin Sharing: ₹48,000/year (AC not included)
Single Room: ₹60,000/year (limited availability, apply by April 30)
AC upgrade: ₹12,000 additional per year
Wi-Fi: Free high-speed Wi-Fi (200 Mbps shared) throughout hostel

HOSTEL TIMINGS:
Weekdays: In by 9:30 PM
Weekends (Fri-Sat): In by 10:30 PM
Sunday: In by 9:30 PM
Late night pass (till 11:30 PM): Requires prior warden approval (max 2/month)
Outpass (overnight): Apply 48 hours in advance at warden office. Parent signature mandatory.

MESS FACILITIES:
Mess Timing — Breakfast: 7:30 AM - 9:00 AM | Lunch: 12:30 PM - 2:00 PM | Snacks: 5:00 PM - 6:00 PM | Dinner: 8:00 PM - 9:30 PM
Mess charges: ₹42,000/year (approx.). Vegetarian and non-vegetarian options available.
Special diet requests: Contact mess supervisor with medical certificate.

CAMPUS RULES:
1. College ID card must be worn on campus at all times
2. Dress code: Formal attire (no torn jeans, sleeveless tops, or slippers in classrooms/labs)
3. Mobile phones must be on silent mode in classrooms and library
4. No smoking, alcohol, or tobacco products anywhere on campus — strict action including expulsion
5. Ragging is a criminal offence — Anti-Ragging Committee: +91-9876543200
6. Attendance minimum: 75% per subject (below 75% = not eligible for end-semester exam)
7. Any grievance: Contact Student Welfare Officer or drop a letter in the Grievance Box (Admin Block)

ATTENDANCE POLICY:
Minimum 75% attendance required in each subject to appear for end-semester exams.
Condonation (if 65-74%): Apply at Exam Cell with medical/valid reason. Fee: ₹500
Below 65%: Detained — must repeat the semester.
Medical leave: Submit medical certificate within 3 working days of returning.

ANTI-RAGGING:
WCT has zero tolerance for ragging. Report immediately to:
Anti-Ragging Helpline: 1800-180-5522 (toll free)
College Committee: antiragging@westbrooktech.edu.in | +91-9876543200

PLACEMENT CELL:
Placement Officer: Mr. Aditya Shetty | placement@westbrooktech.edu.in | +91-80-4567-8940
Average Package (2024 batch): ₹6.2 LPA | Highest Package: ₹18 LPA
Top Recruiters: Infosys, Wipro, Cognizant, TCS, Accenture, Amazon, Flipkart, Byju's, Razorpay
Placement training begins in 5th semester. Register with placement cell by September 30.
`,
  },
  {
    name: 'Internal Assessment & Academic Calendar',
    content: `
ACADEMIC CALENDAR — SEMESTER EVEN 2024-25 (February - June 2025)

KEY DATES:
February 3, 2025 — Semester begins, classes start
February 15, 2025 — Last date for admission (even semester)
March 3-7, 2025 — Internal Assessment Test 1 (IAT-1)
March 10, 2025 — IAT-1 results and feedback
March 15, 2025 — Last date to pay even semester fees (without late fine)
March 31, 2025 — Holi holiday
April 9, 2025 — Ugadi / Telugu New Year holiday
April 14, 2025 — Dr. B.R. Ambedkar Jayanti holiday
April 28 - May 2, 2025 — Internal Assessment Test 2 (IAT-2)
May 5, 2025 — IAT-2 results
May 9, 2025 — Ramzan/Id-ul-Fitr holiday (tentative)
May 12, 2025 — Last day of regular classes (even semester)
May 13-19, 2025 — Practical exams (internal)
May 20, 2025 — Hall Tickets available on student portal
May 21, 2025 — Study holidays begin
June 2, 2025 — End-Semester Exams begin (MCA Sem 4, B.Tech Sem 8)
June 3, 2025 — End-Semester Exams begin (BCA Sem 6)
June 11-13, 2025 — Last exam dates for most programs
June 16-20, 2025 — Practical / Viva examinations
June 23, 2025 — Exams officially end
July 10, 2025 — Results expected (VTU portal + WCT portal)
July 21, 2025 — Next academic year begins (Odd Semester 2025-26)

INTERNAL ASSESSMENT SCHEME:
Each subject: 50 marks internal + 100 marks end-semester exam = 150 total marks
Internal breakdown:
- IAT-1: 20 marks (best of attempt)
- IAT-2: 20 marks (best of attempt)
- Assignment/Seminar: 5 marks
- Attendance: 5 marks
Pass criteria: Minimum 40% in internal AND 40% in end-semester exam, with 40% in aggregate.

INTERNAL TEST SYLLABUS:
IAT-1: Covers topics up to Unit 3 of each subject (first half of syllabus)
IAT-2: Covers topics from Unit 4 to Unit 6 (second half of syllabus)

RE-TEST POLICY:
Students absent for IAT-1 or IAT-2 due to medical/genuine reasons may apply for a make-up test within 5 days of the scheduled date. Apply at the Department office with relevant documents.

STUDENT PORTAL: portal.westbrooktech.edu.in
- View attendance, marks, timetable, notices
- Download hall tickets and results
- Apply for bonafide certificate, TC, etc.
Login: College enrollment number | Default password: DOB in DDMMYYYY format
`,
  },
]
