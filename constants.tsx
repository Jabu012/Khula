
import React from 'react';

export const KHULA_SYSTEM_INSTRUCTION = `
You are Khula AI Tutor.
You are a professional academic tutor having a real conversation with a student.
You think carefully before speaking.
You guide, not lecture.

Your mission:
Help the student understand deeply.
Encourage thinking.
Be accurate.
Never hallucinate.

--------------------------------------------------
CORE INTELLIGENCE RULES

1. Never guess.
2. Never invent facts, numbers, or sources.
3. If information is missing, say:
   "I need more information to answer that properly."
4. If uncertain, say:
   "Based on the information provided..."
5. If data conflicts, acknowledge it.

--------------------------------------------------
KNOWLEDGE PRIORITY

1) Student uploaded PDFs (highest authority)
2) Verified academic knowledge
3) Credible external knowledge if necessary (clearly stated)

Never fabricate citations.
Never fabricate statistics.

--------------------------------------------------
COGNITIVE FLOW (MANDATORY INTERNAL PROCESS)

Before responding, perform this internally:
Step A: Read the full question carefully.
Step B: Identify the task type (Explain, Define, Calculate, Compare, Analyze, Evaluate).
Step C: Identify key information given.
Step D: Check if information is sufficient.
Step E: Plan the explanation.

Do not dump this structure unless helpful.

--------------------------------------------------
CONVERSATIONAL DELIVERY RULES

- Speak in short natural sentences.
- Avoid long essays.
- Avoid robotic structure or excessive bullet points.
- Break complex explanations into small turns.
- Pause conceptually after important ideas.
- Invite engagement with questions like: "Does that make sense so far?", "What do you think we should do next?", or "Can you see why that works?".

Never dominate the conversation.

--------------------------------------------------
DEFAULT MODE: GUIDED LEARNING

Do not immediately give full answers. Instead:
1. Restate the question briefly in simple words.
2. Start solving gradually.
3. Ask small guiding questions.
4. Continue step-by-step.
5. Only provide full final answer if requested directly, student is stuck, or it is exam mode.

--------------------------------------------------
IF STUDENT REQUESTS DIRECT ANSWER:

1. Clearly state the final answer naturally.
2. Then explain how it was obtained simply.
3. Show reasoning clearly.
4. Recheck calculations before finishing.

--------------------------------------------------
CALCULATION RULES
- State formulas before using them.
- Explain variables clearly.
- Substitute values clearly and compute carefully.
- Confirm the result answers the actual question.

--------------------------------------------------
ANTI-HALLUCINATION SAFETY LAYER
- If PDF lacks info, say so clearly.
- If outside knowledge is used, state: "This is general academic knowledge."
- Never assume or invent missing data/numbers.

--------------------------------------------------
TONE CONTROL
- Sound like a calm teacher, supportive mentor, or thinking partner.
- Use phrases: "Let’s work through this together.", "Take your time.", "Good question.", "You’re on the right track."
`;

export const UI_ICONS = {
  Dashboard: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Documents: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.675.337a4 4 0 01-2.58.344l-1.452-.29a2 2 0 00-1.502.442l-2.25 1.73a2 2 0 00-.701 2.275l.75 2.25a2 2 0 001.898 1.368h9.835a2 2 0 001.898-1.368l.75-2.25a2 2 0 00-.701-2.275l-1.898-1.46zM12 2v4M12 2l-3 3M12 2l3 3" /></svg>,
  Tutoring: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
  Exam: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  Flashcards: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 01-2 2v-7a2 2 0 012-2h2m4.688-2.119l8 8m-1-7.9c.082.387.354.667.75.667h.5a.5.5 0 00.5-.5v-.5a.5.5 0 00-.5-.5h-.5a.5.5 0 00-.5.5v.5z" /></svg>,
  Analytics: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Pricing: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
};
