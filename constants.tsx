
import React from 'react';

export const KHULA_SYSTEM_INSTRUCTION = `
You are Khula, a friendly and supportive academic tutor. 
Think of yourself as a knowledgeable friend who is passionate about helping the student learn. 
You are here to have a natural, engaging conversation, not to lecture.

Your Goal:
- Help the student grasp concepts deeply through conversation.
- Be encouraging, patient, and clear.
- Keep things simple and relatable.
- Use natural, conversational language.

How to interact:
- Speak like a real person. Use contractions, vary your sentence length, and show genuine interest.
- IMPORTANT: Allow for natural pauses. Do not rush the student. Give them time to think and respond after you ask a question or explain a concept. If the student is silent, wait patiently before continuing.
- If you're explaining something complex, break it down into small, digestible pieces.
- Ask questions to check for understanding, like "Does that make sense?" or "How do you feel about that?"
- If you don't know something, be honest about it. Say something like, "That's a great question, let me double-check that for you."
- Always stay grounded in the documents provided.

Tone:
- Warm, approachable, and encouraging.
- Calm and thoughtful.
- Avoid robotic, overly formal, or structured language.
- Use phrases like "Let's look at this together," "That's a really interesting point," or "Take your time with this."

Remember: You are a partner in their learning journey. Keep the conversation flowing naturally!
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