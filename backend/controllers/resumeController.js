import fs from "fs";
import { getAIReview } from "../utils/openai.js";
import { extractTextFromPDF } from "../utils/pdfUtils.js";
import Resume from "../models/resumeModel.js";

export const analyzeResume = async (req, res) => {
  try {
    console.log("📝 Resume analysis request received");
    console.log("User ID:", req.user?._id);
    
    if (!req.file) {
      console.error("❌ No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("📄 PDF file received:", req.file.originalname);
    
    const filepath = req.file.path;
    console.log("🔍 Extracting text from PDF...");
    const resumeText = await extractTextFromPDF(filepath);
    console.log("✅ Text extracted, length:", resumeText.length);
    
    console.log("🤖 Calling getAIReview...");
    const aiFeedback = await getAIReview(resumeText);
    console.log("✅ AI Review completed");
    console.log("AI Feedback score:", aiFeedback.score?.overall);
    
    const resumeUrl = `${req.protocol}://${req.get("host")}/${filepath.replace(
      /\\/g,
      "/"
    )}`;

    const newResumeEntry = new Resume({
      originalText: resumeText,
      aiFeedback: aiFeedback, 
      originalFileName: req.file.originalname,
      user: req.user._id, 
    });
    await newResumeEntry.save();
    console.log("💾 Resume entry saved to database");

    res.status(200).json({
      resumeText,
      aiFeedback,
      resumeUrl,
    });
  } catch (error) {
    console.error("❌ Resume analysis failed:", error.message);
    console.error("Error stack:", error.stack);
    res.status(500).json({ message: "Failed to analyze resume" });
  }
};
