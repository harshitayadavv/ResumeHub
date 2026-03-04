import { extractTextFromPDF } from "../utils/pdfUtils.js";
import { getOpenAIResponse } from "../utils/openai.js";
import multer from "multer";
import fs from "fs";
import Resume from "../models/resumeModel.js";

export const customizeResume = async (req, res) => {
  try {
    console.log("🎨 Customize resume request received");
    const jobDesc = req.body.jobDesc;
    const resumeFile = req.file;

    if (!resumeFile || !jobDesc) {
      console.error("❌ Missing resume file or job description");
      return res.status(400).json({
        message: "Both resume PDF and job description are required",
      });
    }

    console.log("📄 Extracting text from resume...");
    const resumeText = await extractTextFromPDF(resumeFile.path);
    console.log("✅ Resume text extracted, length:", resumeText.length);

    const prompt = `
You are an expert resume writer. Your task is to rewrite the provided RESUME to align with the given JOB DESCRIPTION.

**CRITICAL FORMATTING INSTRUCTIONS:**
Your entire output must be a single block of plain text.

1.  **HEADER:** The first few lines must be the applicant's name, contact info, and social media links. Do not add any heading like "## RESUME ##".
2.  **SECTION HEADINGS:** Enclose all section headings in double hash signs (e.g., ## SUMMARY ##).
3.  **DATES:** For education and work experience, place the date range on its own separate line immediately following the title/institution.
4.  **BULLET POINTS:** Start every bullet point on a new line with a hyphen "-".

Do not use any other special formatting or markdown.

---
**EXAMPLE OF CORRECT OUTPUT:**
Aaditya Tyagi
+91 9015152707 | Delhi, India | aadityatyagi0004@gmail.com
LINKEDIN | GITHUB
## SUMMARY ##
- An aspiring and motivated software developer...
## EDUCATION ##
Bachelor of Information Technology, Guru Tegh Bahadur Institute of Technology
2022 - 2026
## PROJECTS ##
TaskZen - Full-Stack Task Management Web App
- Built secure user authentication system with JWT.

---
**JOB DESCRIPTION:**
"""
${jobDesc}
"""

---
**ORIGINAL RESUME TO REWRITE:**
"""
${resumeText}
"""
`;

    console.log("🤖 Calling AI to customize resume...");
    const aiResponse = await getOpenAIResponse(prompt);
    console.log("✅ AI response received, length:", aiResponse.length);

    const newResumeEntry = new Resume({
      customizedText: aiResponse,
      originalFileName: resumeFile.originalname,
      user: req.user._id,
    });
    await newResumeEntry.save();
    console.log("💾 Resume entry saved to database");

    // Delete the uploaded file after use
    fs.unlinkSync(resumeFile.path);

    res.status(200).json({ customizedText: aiResponse });
  } catch (error) {
    console.error("❌ Customize Resume Error:", error.message);
    console.error("Error details:", error);
    res.status(500).json({ message: "AI resume customization failed" });
  }
};
