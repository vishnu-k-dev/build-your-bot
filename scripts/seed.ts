/**
 * Run this locally to seed the WCT knowledge base directly.
 * Usage: npx tsx scripts/seed.ts
 */
import { createClient } from '@supabase/supabase-js'
import { CohereClient } from 'cohere-ai'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY! })

const BOT_ID = '00000000-0000-0000-0000-000000000001'
const COLLEGE_NAME = 'Westbrook College of Technology'
const BOT_NAME = 'WCT Assistant'

const WCT_SYSTEM_PROMPT = `You are WCT Assistant, the official AI student support chatbot for Westbrook College of Technology (WCT), Bangalore.

TODAY: {day}, {date}

You help students with timetables, exam dates, fees, faculty contact details, hostel rules, attendance policy, admissions, and college announcements.

RULES:
- Answer directly and specifically using ONLY the knowledge base below.
- For timetable queries, use today's day ({day}) to give the right schedule.
- When giving faculty info, always include their email and office hours.
- Be concise, clear, and student-friendly.
- If a student asks something not in the knowledge base, say: "I don't have that information. Please contact the college helpdesk at info@westbrooktech.edu.in or +91-80-4567-8900."

{context}`

// ---------- KNOWLEDGE BASE ----------
const DOCS: { name: string; content: string }[] = [
  {
    name: 'MCA Semester 4 Timetable',
    content: `MCA SEMESTER 4 CLASS TIMETABLE — 2024-25

MONDAY:
09:00–10:00 | Machine Learning (CS401) | Room 301 | Prof. Ananya Krishnan
10:00–11:00 | Cloud Computing (CS402) | Room 301 | Prof. Rajan Mehta
11:00–01:00 | AI & ML Lab (CS401L) | Lab 201 | Prof. Ananya Krishnan
02:00–03:00 | Soft Skills (HS401) | Room 301 | Prof. Divya Nair
03:00–04:00 | Data Engineering Elective (CS4E1) | Room 301 | Prof. Mohan Rao

TUESDAY:
09:00–10:00 | Cloud Computing (CS402) | Room 301 | Prof. Rajan Mehta
10:00–11:00 | Mobile App Development (CS403) | Room 301 | Prof. Priya Sharma
11:00–12:00 | Machine Learning (CS401) | Room 301 | Prof. Ananya Krishnan
12:00–01:00 | Data Engineering Elective (CS4E1) | Room 301 | Prof. Mohan Rao
02:00–04:00 | Cloud & DevOps Lab (CS402L) | Lab 202 | Prof. Rajan Mehta

WEDNESDAY:
09:00–10:00 | Data Engineering Elective (CS4E1) | Room 301 | Prof. Mohan Rao
10:00–11:00 | Mobile App Development (CS403) | Room 301 | Prof. Priya Sharma
11:00–12:00 | Soft Skills (HS401) | Room 301 | Prof. Divya Nair
12:00–01:00 | Machine Learning (CS401) | Room 301 | Prof. Ananya Krishnan
02:00–05:00 | Major Project Work (CS404) | Lab 204 | Guide: Respective Faculty

THURSDAY:
09:00–10:00 | Machine Learning (CS401) | Room 301 | Prof. Ananya Krishnan
10:00–11:00 | Cloud Computing (CS402) | Room 301 | Prof. Rajan Mehta
11:00–01:00 | Mobile App Dev Lab (CS403L) | Lab 203 | Prof. Priya Sharma
02:00–03:00 | Data Engineering Elective (CS4E1) | Room 301 | Prof. Mohan Rao
03:00–05:00 | Project Work (CS404) | Lab 204

FRIDAY:
09:00–10:00 | Mobile App Development (CS403) | Room 301 | Prof. Priya Sharma
10:00–11:00 | Machine Learning (CS401) | Room 301 | Prof. Ananya Krishnan
11:00–12:00 | Data Engineering Elective (CS4E1) | Room 301 | Prof. Mohan Rao
12:00–01:00 | Cloud Computing (CS402) | Room 301 | Prof. Rajan Mehta
02:00–05:00 | Guest Lecture / Seminar / Mini Project

SATURDAY:
09:00–11:00 | Makeup Classes / Extra Sessions (as announced on notice board)
11:00–01:00 | Library / Self Study
Note: Internal Assessment Tests (IATs) are held on Saturdays — check notice board.`,
  },
  {
    name: 'BCA Semester 6 Timetable',
    content: `BCA SEMESTER 6 CLASS TIMETABLE — 2024-25

MONDAY:
09:00–10:00 | Web Technology (BCA601) | Room 201 | Prof. Arun Verma
10:00–11:00 | Software Engineering (BCA602) | Room 201 | Prof. Sunita Das
11:00–01:00 | Web Technology Lab (BCA601L) | Lab 101 | Prof. Arun Verma
02:00–03:00 | Data Analytics (BCA603) | Room 201 | Prof. Kiran Patil
03:00–04:00 | Cyber Security Elective (BCA6E1) | Room 201 | Prof. Suman Jha

TUESDAY:
09:00–10:00 | Software Engineering (BCA602) | Room 201 | Prof. Sunita Das
10:00–11:00 | Data Analytics (BCA603) | Room 201 | Prof. Kiran Patil
11:00–12:00 | Web Technology (BCA601) | Room 201 | Prof. Arun Verma
02:00–04:00 | Data Analytics Lab (BCA603L) | Lab 102 | Prof. Kiran Patil

WEDNESDAY:
09:00–12:00 | Project Work (BCA604) | Lab / Classroom | Guide: Respective Faculty
02:00–03:00 | Cyber Security Elective (BCA6E1) | Room 201 | Prof. Suman Jha
03:00–04:00 | Aptitude & Reasoning (HS601) | Room 201 | Prof. Meena Pillai

THURSDAY:
09:00–10:00 | Data Analytics (BCA603) | Room 201 | Prof. Kiran Patil
10:00–12:00 | Software Engineering Lab (BCA602L) | Lab 101 | Prof. Sunita Das
02:00–04:00 | Project Work (BCA604)

FRIDAY:
09:00–10:00 | Web Technology (BCA601) | Room 201 | Prof. Arun Verma
10:00–11:00 | Software Engineering (BCA602) | Room 201 | Prof. Sunita Das
11:00–12:00 | Aptitude & Reasoning (HS601) | Room 201 | Prof. Meena Pillai
02:00–05:00 | Project Work / Guest Lecture

SATURDAY:
09:00–12:00 | Makeup / Extra Classes / Internal Tests (as announced)`,
  },
  {
    name: 'End-Semester Exam Schedule June 2025',
    content: `END-SEMESTER EXAMINATIONS — JUNE 2025
Westbrook College of Technology
Contact: examcell@westbrooktech.edu.in | +91-80-4567-8921

IMPORTANT RULES:
- Carry Hall Ticket + College ID to every exam. No entry without both.
- Hall Tickets: available for download from student portal from May 20, 2025
- Report 30 minutes before exam start time
- Mobile phones, smart watches, earphones strictly prohibited in exam hall
- Only blue/black pens allowed

MCA SEMESTER 4 EXAMS:
June 2 (Monday) | 10:00 AM–1:00 PM | Machine Learning (CS401) | Exam Hall A (EA-101)
June 4 (Wednesday) | 10:00 AM–1:00 PM | Cloud Computing (CS402) | Exam Hall A (EA-101)
June 6 (Friday) | 10:00 AM–1:00 PM | Mobile App Development (CS403) | Exam Hall B (EA-102)
June 9 (Monday) | 10:00 AM–1:00 PM | Data Engineering Elective (CS4E1) | Exam Hall A (EA-101)
June 11 (Wednesday) | 10:00 AM–12:00 PM | Soft Skills (HS401) | Exam Hall B (EA-102)
June 13 (Friday) | Project Viva/Presentation | Time as per guide | Dept. Seminar Hall

BCA SEMESTER 6 EXAMS:
June 3 (Tuesday) | 10:00 AM–1:00 PM | Web Technology (BCA601) | Exam Hall C (EA-201)
June 5 (Thursday) | 10:00 AM–1:00 PM | Software Engineering (BCA602) | Exam Hall C (EA-201)
June 7 (Saturday) | 10:00 AM–1:00 PM | Data Analytics (BCA603) | Exam Hall D (EA-202)
June 10 (Tuesday) | 10:00 AM–12:00 PM | Cyber Security Elective (BCA6E1) | Exam Hall C (EA-201)
June 12 (Thursday) | Project Viva | As per faculty schedule

B.TECH SEMESTER 8:
June 2 (Monday) | 2:00 PM–5:00 PM | Distributed Systems (CS801) | Exam Hall E
June 4 (Wednesday) | 2:00 PM–5:00 PM | Elective 4 | Exam Hall E
June 6 (Friday) | 2:00 PM–5:00 PM | Elective 5 | Exam Hall E

PRACTICAL EXAMS: June 16–20, 2025 | 9:00 AM–5:00 PM | Respective Labs
RESULT DECLARATION: Expected July 10, 2025 (VTU portal + WCT student portal)
SUPPLEMENTARY EXAMS: August 2025 (dates announced on notice board)

ATTENDANCE FOR EXAM ELIGIBILITY:
Minimum 75% attendance required in each subject. Below 65% = detained (must repeat semester).
Condonation (65–74%): Apply at Exam Cell with valid reason and ₹500 fee.`,
  },
  {
    name: 'Fee Structure 2024-25',
    content: `FEE STRUCTURE — WESTBROOK COLLEGE OF TECHNOLOGY 2024-25
All amounts in Indian Rupees (INR). Contact: fees@westbrooktech.edu.in

MCA (Master of Computer Applications) — Per Year:
Tuition Fee: ₹1,20,000
University & Exam Fee: ₹8,000
Library & Lab Fee: ₹6,000
Student Activity Fee: ₹3,000
Development Fee: ₹5,000
Caution Deposit (one-time, refundable on leaving): ₹10,000
TOTAL (Day Scholar): ₹1,42,000/year
Hostel — Twin Sharing (optional): ₹48,000/year
Hostel — Single Room (optional): ₹60,000/year
Mess Charges: ₹42,000/year (₹3,500/month approx.)
TOTAL (Hosteller, twin sharing): ₹2,32,000/year

BCA (Bachelor of Computer Applications) — Per Year:
Tuition Fee: ₹65,000
University & Exam Fee: ₹6,000
Library & Lab Fee: ₹4,000
Student Activity Fee: ₹2,000
Development Fee: ₹3,000
Caution Deposit (one-time): ₹5,000
TOTAL (Day Scholar): ₹80,000/year
Hostel + Mess: ₹90,000/year
TOTAL (Hosteller): ₹1,70,000/year

B.Tech CSE / IT — Per Year:
Tuition Fee: ₹1,05,000
All other fees: ₹19,000
Caution Deposit: ₹10,000
TOTAL (Day Scholar): ₹1,24,000/year
Hostel + Mess: ₹90,000/year
TOTAL (Hosteller): ₹2,14,000/year

FEE PAYMENT DEADLINES (IMPORTANT — late fee of ₹500/month applies):
Odd Semester fees (Sem 1, 3, 5, 7): Due by July 31, 2025
Even Semester fees (Sem 2, 4, 6, 8): Due by January 31, 2026

HOW TO PAY:
Online: Student portal → Fee Payment (Net banking / UPI / Debit/Credit card / Razorpay)
Offline: Fee Counter, Admin Block, 9:30 AM–3:30 PM (Mon–Fri)
DD: In favor of "Westbrook College of Technology", payable at Bangalore

SCHOLARSHIPS:
Merit Scholarship: Top 5% of class → 25% tuition waiver (apply by Aug 15)
SC/ST Scholarship: Government scholarship → scholarship.kar.gov.in
Sports Quota: 50% tuition waiver for state/national athletes
Sibling Discount: 10% tuition discount for two siblings enrolled simultaneously
EWS: Family income < ₹8 LPA → apply for fee concession at Admin Block`,
  },
  {
    name: 'Faculty Directory and How to Approach',
    content: `FACULTY DIRECTORY — WESTBROOK COLLEGE OF TECHNOLOGY
How to approach faculty: Email first, then visit during office hours. Be polite and brief.

MCA / CS DEPARTMENT:

Dr. Suresh Babu — Head of Department (MCA & CS)
Room: Faculty Block B, F-201 | Email: suresh.babu@westbrooktech.edu.in
Specialization: Artificial Intelligence, Deep Learning
Office Hours: Monday & Thursday, 2:00–4:00 PM
For: Department-level issues, academic problems, NOC letters, bonafide certificates

Prof. Ananya Krishnan — Associate Professor
Subjects: Machine Learning (CS401), AI Fundamentals, Data Structures
Room: F-202 | Email: ananya.k@westbrooktech.edu.in
Office Hours: Tuesday & Friday, 11:00 AM–12:00 PM
For: ML assignment doubts, lab help, project guidance on AI topics

Prof. Rajan Mehta — Associate Professor
Subjects: Cloud Computing (CS402), Operating Systems, Networks
Room: F-203 | Email: rajan.m@westbrooktech.edu.in
Office Hours: Monday & Wednesday, 3:00–4:30 PM
For: Cloud lab issues, DevOps questions, attendance concerns for CS402

Prof. Priya Sharma — Assistant Professor
Subjects: Mobile App Development (CS403), Web Programming, Java
Room: F-204 | Email: priya.s@westbrooktech.edu.in
Office Hours: Tuesday & Thursday, 9:00–10:00 AM
For: Android/Flutter project help, lab doubts for CS403

Prof. Mohan Rao — Assistant Professor
Subjects: Data Engineering (CS4E1), Database Management, Big Data
Room: F-205 | Email: mohan.r@westbrooktech.edu.in
Office Hours: Wednesday & Friday, 2:00–3:30 PM
For: Elective subject doubts, database project queries

Prof. Divya Nair — Assistant Professor
Subjects: Soft Skills (HS401), Business Communication, Technical Writing
Room: F-206 | Email: divya.n@westbrooktech.edu.in
Office Hours: Mon–Fri, 12:00–1:00 PM (lunch hour)
For: Resume review, communication practice, presentation skills

BCA DEPARTMENT:

Dr. Leena Thomas — Head of Department (BCA)
Room: F-301 | Email: leena.t@westbrooktech.edu.in
Office Hours: Tuesday & Thursday, 2:00–4:00 PM
For: BCA department issues, TC, migration, academic grievances

Prof. Arun Verma — Web Technology, HTML/CSS/JS, React
Room: F-302 | Email: arun.v@westbrooktech.edu.in | Office Hours: Mon & Wed, 11 AM–12 PM

Prof. Sunita Das — Software Engineering, Project Management, UML
Room: F-303 | Email: sunita.d@westbrooktech.edu.in | Office Hours: Tue & Thu, 10–11 AM

Prof. Kiran Patil — Data Analytics, Python, Statistics
Room: F-304 | Email: kiran.p@westbrooktech.edu.in | Office Hours: Mon & Fri, 2–3 PM

Prof. Suman Jha — Cyber Security, Networking, Ethical Hacking
Room: F-305 | Email: suman.j@westbrooktech.edu.in | Office Hours: Wed & Fri, 11 AM–12 PM

ADMINISTRATION:
Principal: Dr. Ramesh Iyer | principal@westbrooktech.edu.in | +91-80-4567-8900
Vice Principal (Academics): Dr. Kavitha Menon | vp.academics@westbrooktech.edu.in
Exam Controller: Mrs. Padmini Rao | examcell@westbrooktech.edu.in | +91-80-4567-8921
Student Welfare Officer: Mr. Deepak Nair | studentwelfare@westbrooktech.edu.in | +91-80-4567-8930
Placement Officer: Mr. Aditya Shetty | placement@westbrooktech.edu.in | +91-80-4567-8940`,
  },
  {
    name: 'Student FAQs',
    content: `FREQUENTLY ASKED QUESTIONS — WCT STUDENTS

Q: How do I get a bonafide certificate?
A: Apply at the department office (HOD's room). Bring your college ID. Takes 2 working days. Free of cost.

Q: How do I get a transfer certificate (TC)?
A: Submit a written application to the Registrar's office along with your ID card and fee clearance certificate. Processing time: 5–7 working days.

Q: What is the minimum attendance required?
A: 75% attendance in each subject is mandatory to appear for end-semester exams. Below 65% = detained.

Q: I missed classes due to illness. What do I do?
A: Submit a medical certificate to the department office within 3 working days of returning. It will be considered for attendance condonation (only if attendance is between 65–74%).

Q: How do I check my attendance?
A: Log in to the student portal at portal.westbrooktech.edu.in using your enrollment number. Default password is your date of birth (DDMMYYYY format).

Q: Who do I contact for fee payment issues?
A: Visit the Fee Counter in the Admin Block (9:30 AM–3:30 PM, Mon–Fri) or email fees@westbrooktech.edu.in.

Q: What if I fail in one subject?
A: You can appear for the supplementary exam (August 2025). If you fail by up to 10 marks, you may apply for grace marks at the Exam Cell by July 20, 2025 with a ₹100 fee.

Q: Can I change my elective subject?
A: Elective changes are allowed only in the first week of the semester. Contact your HOD with a written request.

Q: How do I apply for a scholarship?
A: Merit scholarship: apply online at the student portal by August 15. Government scholarships (SC/ST, EWS): visit scholarship.kar.gov.in. For sports quota: contact the Student Welfare Officer.

Q: How do I register a complaint or grievance?
A: Drop a letter in the Grievance Box at the Admin Block, or email studentwelfare@westbrooktech.edu.in. You can also meet the Student Welfare Officer (Mr. Deepak Nair) directly.

Q: What are the library timings?
A: Monday–Saturday: 8:00 AM–8:00 PM. Sunday: 10:00 AM–4:00 PM. Students can borrow up to 3 books for 14 days.

Q: How do I get my hall ticket for exams?
A: Download it from the student portal (portal.westbrooktech.edu.in) from May 20, 2025. If not available, contact the Exam Cell immediately.

Q: When are results declared?
A: End-semester results are expected on July 10, 2025 on the VTU portal and WCT student portal.

Q: Is the campus Wi-Fi free?
A: Yes. Connect to "WCT_Campus" using your enrollment number as username and your student portal password.

Q: What documents do I need for the first-year admission process?
A: 10th & 12th marksheets, degree marksheets (for PG), TC, Migration certificate (if outside Karnataka), Aadhar card, 6 passport photos, caste certificate (if applicable), and medical certificate.

Q: How do I approach a faculty member for project guidance?
A: Email the faculty first with your name, USN, and a brief description of what help you need. Then visit during their office hours. Do not visit the staff room without an appointment.

Q: Where is the placement cell and how do I register?
A: Placement Cell is in the Admin Block, ground floor. Meet Mr. Aditya Shetty (placement@westbrooktech.edu.in). Register for placement training by September 30 of your final year.`,
  },
  {
    name: 'Recent Circulars and Announcements',
    content: `RECENT CIRCULARS & ANNOUNCEMENTS — WESTBROOK COLLEGE OF TECHNOLOGY
Updated: May 2025

CIRCULAR 001/2025 — Study Holidays:
Study holidays commence from May 21, 2025 (Wednesday). No classes after this date. Students are expected to use this time for exam preparation. Labs will remain open till 5 PM for project work.

CIRCULAR 002/2025 — Hall Ticket Download:
Hall tickets for the June 2025 end-semester exams are available for download from the student portal (portal.westbrooktech.edu.in) from May 20, 2025. Students who face issues downloading their hall ticket must contact the Exam Cell (examcell@westbrooktech.edu.in) before May 28, 2025.

CIRCULAR 003/2025 — Project Submission Deadline:
All MCA Semester 4 and BCA Semester 6 students must submit their final project report to their guide by May 15, 2025. Hard-bound copy submission to the department: May 19, 2025. Late submissions will not be accepted.

CIRCULAR 004/2025 — Fee Payment Reminder:
Students who have not paid Even Semester (2024-25) fees must pay immediately to avoid a late fine of ₹500/month. Clearance certificate required before applying for hall ticket. Contact: fees@westbrooktech.edu.in.

CIRCULAR 005/2025 — Guest Lecture Series:
A guest lecture on "AI in Industry" by Mr. Vikram Anand (Senior Engineer, Google India) is scheduled on May 23, 2025 at 10:00 AM in the Main Auditorium. Attendance is mandatory for all MCA and final-year B.Tech students.

CIRCULAR 006/2025 — Anti-Ragging Awareness:
The Anti-Ragging Committee reminds all students that ragging is a criminal offence. Report any incident immediately to the Anti-Ragging helpline: 1800-180-5522 (toll-free) or email antiragging@westbrooktech.edu.in.

CIRCULAR 007/2025 — Semester Registration (2025-26):
Registration for Odd Semester 2025-26 will begin from June 25, 2025. Students must clear all dues (fees, library books, lab equipment) before registering. New academic year begins July 21, 2025.

IMPORTANT UPCOMING DATES:
May 15 — Project report submission deadline
May 19 — Hard-bound project copy submission
May 20 — Hall ticket download opens
May 21 — Study holidays begin
May 23 — Guest lecture (mandatory for MCA & B.Tech final year)
May 28 — Last date to resolve hall ticket issues
June 1 — Pre-exam briefing session (10 AM, Auditorium)
June 2 — End-semester exams begin (MCA Sem 4, B.Tech Sem 8)
June 3 — End-semester exams begin (BCA Sem 6)
June 13 — Last theory exam
June 16-20 — Practical/Viva examinations
June 23 — All exams end
June 25 — Next semester registration opens
July 10 — Results expected
July 21 — New academic year begins`,
  },
  {
    name: 'Hostel Rules and Campus Policies',
    content: `HOSTEL & CAMPUS POLICIES — WESTBROOK COLLEGE OF TECHNOLOGY

HOSTEL CONTACTS:
Warden (Boys): Mr. Ramaiah | +91-9876543201 | hostel.boys@westbrooktech.edu.in
Warden (Girls): Mrs. Savitha | +91-9876543202 | hostel.girls@westbrooktech.edu.in

HOSTEL TIMINGS:
Weekdays (Mon–Thu): Must be inside hostel by 9:30 PM
Weekends (Fri–Sat): Must be inside hostel by 10:30 PM
Sunday: Must be inside hostel by 9:30 PM
Late pass (till 11:30 PM): Apply to warden — maximum 2 per month
Overnight outpass: Apply 48 hours in advance. Parent's signature mandatory.

ROOM TYPES & FEES:
Twin sharing: ₹48,000/year
Single room: ₹60,000/year (limited — apply by April 30)
AC upgrade: ₹12,000 extra/year
Wi-Fi: Free throughout campus and hostel (200 Mbps)

MESS TIMINGS:
Breakfast: 7:30–9:00 AM
Lunch: 12:30–2:00 PM
Evening Snacks: 5:00–6:00 PM
Dinner: 8:00–9:30 PM
Both vegetarian and non-vegetarian options available.
Special diet (medical): Contact mess supervisor with doctor's certificate.

CAMPUS RULES:
College ID card must be worn at all times on campus.
Dress code: Formal attire in classrooms and labs. No torn jeans, sleeveless tops, or slippers.
Mobile phones on silent mode in classrooms and library.
Strictly NO smoking, alcohol, or tobacco anywhere on campus — leads to expulsion.
Minimum 75% attendance required per subject.

DISCIPLINE:
For disciplinary issues, report to Student Welfare Officer: Mr. Deepak Nair (+91-80-4567-8930)
Ragging helpline: 1800-180-5522 (toll-free, 24/7)

PLACEMENT:
Average package (2024 batch): ₹6.2 LPA
Highest package: ₹18 LPA
Top recruiters: Infosys, Wipro, TCS, Cognizant, Accenture, Amazon, Flipkart, Razorpay
Placement training: Starts 5th semester. Register by September 30 of final year.
Contact: placement@westbrooktech.edu.in | +91-80-4567-8940`,
  },
]

async function chunkText(text: string, size = 1800, overlap = 150): Promise<string[]> {
  const chunks: string[] = []
  let i = 0
  while (i < text.length) {
    chunks.push(text.slice(i, i + size))
    i += size - overlap
  }
  return chunks
}

async function embedBatch(texts: string[]): Promise<number[][]> {
  const res = await cohere.v2.embed({
    model: 'embed-english-light-v3.0',
    texts,
    inputType: 'search_document',
    embeddingTypes: ['float'],
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (res.embeddings as any).float
}

async function main() {
  console.log('🌱 Seeding WCT knowledge base...\n')

  // Upsert bot config
  const { error: cfgErr } = await supabase.from('bot_config').upsert({
    id: BOT_ID,
    business_name: COLLEGE_NAME,
    bot_name: BOT_NAME,
    survey: { industry: 'Education' },
    system_prompt: WCT_SYSTEM_PROMPT,
  })
  if (cfgErr) { console.error('❌ bot_config error:', cfgErr.message); process.exit(1) }
  console.log('✅ Bot config upserted')

  for (let d = 0; d < DOCS.length; d++) {
    const doc = DOCS[d]
    console.log(`\n📄 [${d + 1}/${DOCS.length}] ${doc.name}`)

    // Upsert source
    const { data: existing } = await supabase.from('sources').select('id').eq('name', doc.name).eq('bot_id', BOT_ID).single()
    let sourceId: string
    if (existing) {
      sourceId = existing.id
      await supabase.from('chunks').delete().eq('source_id', sourceId)
      console.log('  ↻ Replaced existing source')
    } else {
      const { data: s, error } = await supabase.from('sources')
        .insert({ bot_id: BOT_ID, name: doc.name, type: 'faq', raw_text: doc.content })
        .select('id').single()
      if (error || !s) { console.error('  ❌ Insert failed:', error?.message); continue }
      sourceId = s.id
    }

    const chunks = await chunkText(doc.content)
    console.log(`  ✂️  ${chunks.length} chunks`)

    const BATCH = 5
    let total = 0
    for (let i = 0; i < chunks.length; i += BATCH) {
      const batch = chunks.slice(i, i + BATCH)
      const embeddings = await embedBatch(batch)
      const rows = batch.map((content, j) => ({
        source_id: sourceId,
        content,
        embedding: embeddings[j],
        metadata: { source_name: doc.name, chunk_index: i + j },
      }))
      const { error } = await supabase.from('chunks').insert(rows)
      if (error) { console.error('  ❌ Chunk insert failed:', error.message); break }
      total += batch.length
    }
    console.log(`  ✅ ${total} chunks embedded and stored`)
  }

  console.log('\n🎉 Done! WCT knowledge base is ready.')
  process.exit(0)
}

main().catch(e => { console.error(e); process.exit(1) })
