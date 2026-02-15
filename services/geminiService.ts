
import { GoogleGenAI, Type, LiveServerMessage, Modality, Blob } from "@google/genai";
import { KHULA_SYSTEM_INSTRUCTION } from "../constants";

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function analyzePDF(file: File) {
  const base64 = await fileToBase64(file);
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
      {
        inlineData: {
          mimeType: file.type || 'application/pdf',
          data: base64,
        },
      },
      {
        text: `COMPREHENSIVE ACADEMIC ANALYSIS:
        1. Extract the full textual content accurately (OCR if necessary).
        2. Provide a 3-sentence high-level academic summary.
        3. Identify a list of key concepts and topics for targeted study.
        4. Extract "Key Definitions": Important terms and their specific meanings.
        5. Assess "Academic Difficulty": (Introductory, Intermediate, or Advanced).
        Return strictly as a JSON object.`
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fullContent: { type: Type.STRING },
          summary: { type: Type.STRING },
          topics: { type: Type.ARRAY, items: { type: Type.STRING } },
          definitions: { type: Type.ARRAY, items: { type: Type.STRING } },
          difficulty: { type: Type.STRING }
        },
        required: ["fullContent", "summary", "topics", "definitions", "difficulty"]
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("JSON Parse Error during PDF analysis:", e);
    return {
      fullContent: `Text could not be fully structured. Filename: ${file.name}`,
      summary: "Manual review required for this document.",
      topics: ["Review Needed"],
      definitions: [],
      difficulty: "Unknown"
    };
  }
}

export async function generateExplanation(topic: string, context: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain this topic: ${topic}. Use the following source context: ${context}`,
    config: {
      systemInstruction: KHULA_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    }
  });
  return response.text;
}

export async function generateQuiz(context: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on the provided material: "${context.substring(0, 10000)}", generate a 5-question multiple choice exam. 
    Crucially: Include 3 questions strictly from the text and 2 highly relevant advanced questions from general academic knowledge that help master these specific concepts. 
    Return strictly as a JSON array.`,
    config: {
      systemInstruction: KHULA_SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
            explanation: { type: Type.STRING }
          },
          required: ["id", "question", "options", "correctAnswer", "explanation"]
        }
      }
    }
  });
  return JSON.parse(response.text);
}

export async function generateFlashcards(context: string, weaknesses: string = "") {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = weaknesses 
    ? `Based on the material: "${context.substring(0, 4000)}", generate 8 study flashcards. Focus specifically on these areas of weakness: "${weaknesses}".`
    : `Based on the material: "${context.substring(0, 4000)}", generate 8 comprehensive flashcards covering key concepts.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: KHULA_SYSTEM_INSTRUCTION + "\nReturn a JSON array of objects with 'id', 'front', and 'back' properties. No other text.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            front: { type: Type.STRING },
            back: { type: Type.STRING }
          },
          required: ["id", "front", "back"]
        }
      }
    }
  });
  return JSON.parse(response.text);
}

export function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export function createPcmBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}
