// services/geminiService.ts
import type { Part } from "@google/genai";

/**
 * Convert a File object to a base64-encoded 'part'
 */
const fileToGenerativePart = async (file: File): Promise<Part> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("File read failed"));
    reader.onloadend = () => {
      if (typeof reader.result !== "string") return reject("Invalid result");
      const base64 = reader.result.split(",")[1] ?? "";
      resolve({
        type: "image",
        mimeType: file.type || "image/png",
        data: base64,
      } as any);
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Main image editing function
 */
export const editImage = async (prompt: string, images: File[]): Promise<string> => {
  try {
    const imageParts = await Promise.all(images.map(fileToGenerativePart));
    const imageMarkdowns = imageParts.map(
      (p: any, i: number) => `![image_${i + 1}](data:${p.mimeType};base64,${p.data})`
    );

    const response = await fetch("/api/edit-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, images: imageMarkdowns }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const result =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      "No response from OpenRouter model.";

    return result;
  } catch (err: any) {
    console.error("❌ editImage error:", err);
    throw new Error(`Failed to edit image: ${err.message}`);
  }
};
