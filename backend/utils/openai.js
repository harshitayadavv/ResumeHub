import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

console.log("🔑 Gemini API Key configured:", GEMINI_API_KEY ? "✅ Present" : "❌ MISSING");

// Fallback AI review generator (uses intelligent content analysis for differentiated scoring)
const generateFallbackReview = (resumeText) => {
  // INTELLIGENT CONTENT ANALYSIS - Differentiate based on actual resume quality
  
  // 1. SKILLS SCORING (0-10) - Based on count and specificity
  const skillMatches = resumeText.match(/(?:skills?|technologies?|tools?)[:\s]+([^.\n]+)/i);
  const skillsList = skillMatches ? skillMatches[1].split(/[,;]/).map(s => s.trim()).filter(s => s.length > 0) : [];
  const uniqueSkills = [...new Set(skillsList)];
  let skillsScore = Math.min(10, 2 + uniqueSkills.length * 1.2); // 0-10 based on count
  if (uniqueSkills.length === 0) skillsScore = 3;
  else if (uniqueSkills.length < 3) skillsScore = 4;
  
  // 2. PROJECTS SCORING (0-10) - Based on count and detail
  const projectMatches = resumeText.match(/(?:project|github|portfolio|personal\s+project|side\s+project)[^.\n]*/gi) || [];
  const projectCount = projectMatches.length;
  let projectsScore = Math.min(10, 3 + projectCount * 2);
  const hasProjectDetails = /github\.com|\.io|built|developed|created|shipped/i.test(resumeText);
  if (hasProjectDetails) projectsScore = Math.min(10, projectsScore + 1.5);
  if (projectCount === 0) projectsScore = 2;
  
  // 3. EXPERIENCE SCORING (0-10) - Based on depth and variety
  const jobTitles = resumeText.match(/(?:engineer|developer|manager|analyst|coordinator|lead|architect|designer|specialist|consultant|director|supervisor)[^.\n]*/gi) || [];
  const jobCount = jobTitles.length;
  let experienceScore = Math.min(10, 2 + jobCount * 1.5);
  const dateMatches = resumeText.match(/\d{4}\s*[-–]\s*(?:\d{4}|present)/gi) || [];
  if (dateMatches.length > 0) experienceScore += 1;
  if (jobCount === 0) experienceScore = 2;
  
  // 4. COMMUNICATION SCORING (0-10) - Based on action verbs and depth
  const actionVerbs = resumeText.match(/\b(led|built|designed|developed|created|improved|optimized|delivered|managed|mentored|coordinated|collaborated|communicated|presented|architected|engineered|implemented)\b/gi) || [];
  let communicationScore = Math.min(10, 3 + actionVerbs.length * 0.5);
  const hasLeadership = /\b(led|managed|mentored|directed|oversaw|supervised)\b/i.test(resumeText);
  if (hasLeadership) communicationScore += 1;
  
  // 5. FORMATTING SCORING (0-10) - Based on structure quality
  let formattingScore = 0;
  const bulletPoints = resumeText.match(/^[\s]*[-•*]/gm) || [];
  const structuredSections = resumeText.match(/(?:^|\n)(experience|education|skills|projects|summary|objective|achievements|certifications|about)[:\s]*/gmi) || [];
  const consistentFonting = /\n/.test(resumeText); // Has line breaks
  
  formattingScore += bulletPoints.length > 0 ? 2 : 0; // Bullet points
  formattingScore += structuredSections.length >= 3 ? 2 : 1; // Sections
  formattingScore += dateMatches.length > 0 ? 2 : 0; // Dates formatted
  formattingScore += consistentFonting ? 2 : 1; // Structure
  formattingScore = Math.min(10, formattingScore);
  
  // 6. METRICS & IMPACT (affects overall) - Count actual numbers and impact words
  const metricsMatches = resumeText.match(/\d+%|\d+\s*(?:users|clients|customers|projects|team|people|hours|days|weeks|months|years)|increased|grown|improved|reduced|optimized/gi) || [];
  const metricCount = metricsMatches.length;
  
  // Calculate overall with proper weighting
  let overall = (skillsScore * 0.15 + projectsScore * 0.15 + experienceScore * 0.25 + communicationScore * 0.25 + formattingScore * 0.20);
  
  // Boost score if significant metrics found
  if (metricCount >= 3) overall += 0.5;
  if (metricCount >= 6) overall += 0.8;
  
  overall = Math.min(10, Math.max(2, parseFloat(overall.toFixed(1))));
  
  const wordCount = resumeText.split(/\s+/).length;
  const hasATS = /education|experience|skills|contact/i.test(resumeText);
  const hasVagueLang = resumeText.match(/worked on|helped with|responsible for|involved in|contributed to/gi) || [];

// INTELLIGENT FEEDBACK GENERATION
  const isTech = /javascript|python|java|react|node|sql|database|api|backend|frontend|c\+\+|rust|golang/i.test(resumeText);
  const hasBulletPoints = /^[\s]*[-•]/m.test(resumeText);
  
  // Generate DYNAMIC, RESUME-SPECIFIC suggestions
  const suggestions = [];
  
  // Personalized suggestions based on what's missing
  if (skillsScore < 5) {
    suggestions.push("📌 ADD KEY SKILLS: Your resume lacks a dedicated skills section. Create one with: Technical Skills, Languages, Tools, Frameworks");
  } else if (skillsScore < 8) {
    suggestions.push(`📌 EXPAND SKILLS: You have ${uniqueSkills.length} skills listed. Add 5-7 more technical or domain-specific skills`);
  }
  
  if (projectsScore < 5 && isTech) {
    suggestions.push("🎯 SHOWCASE PROJECTS: Tech roles require 3+ project examples. Add GitHub links, portfolio sites, or specific implementations you built");
  } else if (projectsScore < 8) {
    suggestions.push(`🎯 STRENGTHEN PROJECTS: You mention ${projectCount} projects. Add metrics: 'Built React app with 10K+ users', 'Developed backend API handling 1M requests/day'`);
  }
  
  if (metricCount === 0) {
    suggestions.push("📊 ADD METRICS: Replace vague statements with numbers. Example: 'Improved performance' → 'Reduced load time from 4s to 1.2s (70% improvement)'");
  } else if (metricCount < 5) {
    suggestions.push(`📊 MORE QUANTIFICATION: You have ${metricCount} metrics. Add ${5 - metricCount} more with percentages, counts, or time savings`);
  }
  
  if (actionVerbs.length < 5) {
    suggestions.push("💪 STRONGER ACTION VERBS: Replace passive language. Use: 'Led', 'Built', 'Engineered', 'Optimized', 'Architected', 'Delivered'");
  } else if (actionVerbs.length < 10) {
    suggestions.push("💪 INCREASE IMPACT VERBS: You have " + actionVerbs.length + " action verbs. Aim for 10+ across all bullet points");
  }
  
  if (jobCount === 0) {
    suggestions.push("📅 DETAIL EXPERIENCE: Add job titles, companies, dates, and specific achievements from each role");
  } else if (jobCount < 3) {
    suggestions.push(`📅 EXPAND EXPERIENCE: You list ${jobCount} position(s). If you have more, include them with impact metrics`);
  }
  
  if (wordCount > 1000) {
    suggestions.push(`⚠️ LENGTH: Resume is ${wordCount} words. Trim to 600-800 words by removing repetitive descriptions`);
  } else if (wordCount < 400) {
    suggestions.push(`⚠️ SUBSTANCE: Resume is ${wordCount} words. Expand to 500-800 words with more specific achievements and details`);
  }
  
  if (hasVagueLang.length > 2) {
    suggestions.push("🔍 REMOVE VAGUE LANGUAGE: Eliminate 'Responsible for', 'Helped with', 'Involved in'. Use 'Led', 'Owned', 'Drove'");
  }
  
  if (!hasBulletPoints) {
    suggestions.push("📋 USE BULLET POINTS: Format all achievements as bullet points for scannability and ATS optimization");
  }
  
  // Generate SPECIFIC pros based on ACTUAL resume content
  const pros = [];
  if (uniqueSkills.length >= 5) pros.push(`✅ Strong Technical Foundation: ${uniqueSkills.slice(0, 3).join(', ')} are well-positioned`);
  if (hasBulletPoints) pros.push("✅ Well-formatted with bullet points - easy to scan");
  if (dateMatches.length >= 3) pros.push("✅ Clear date ranges for experiences");
  if (actionVerbs.length >= 8) pros.push(`✅ Strong impact language (${actionVerbs.length} action verbs used)`);
  if (structuredSections.length >= 4) pros.push("✅ Organized with clear sections");
  if (metricCount >= 4) pros.push(`✅ Quantifiable results (${metricCount} metrics found)`);
  if (!pros.length) pros.push("Resume has basic structure");
  
  // Generate SPECIFIC cons based on ACTUAL gaps
  const cons = [];
  if (metricCount === 0) cons.push("❌ No quantifiable achievements - no numbers, percentages, or measurable results");
  if (projectCount === 0 && isTech) cons.push("❌ No projects mentioned - essential for demonstrating technical capability");
  if (wordCount > 1000) cons.push(`❌ Resume exceeds recommended length (${wordCount} words, target: 600-800)`);
  if (hasVagueLang.length > 0) cons.push("❌ Uses vague language instead of strong action verbs");
  if (dateMatches.length === 0) cons.push("❌ Missing clear dates - impacts ATS parsing");
  if (jobCount === 0) cons.push("❌ Work experience not clearly detailed");
  if (skillsScore < 5) cons.push("❌ Lacks dedicated skills section");
  if (!cons.length) cons.push("Some improvement areas available");
  
  return {
    resumeType: isTech ? "Tech" : "Non-Tech",
    score: {
      skills: parseFloat(skillsScore.toFixed(1)),
      projects: parseFloat(projectsScore.toFixed(1)),
      experience: parseFloat(experienceScore.toFixed(1)),
      communication: parseFloat(communicationScore.toFixed(1)),
      formatting: parseFloat(formattingScore.toFixed(1)),
      overall: overall,
    },
    summary: overall >= 7.5
      ? `🌟 Strong resume! Good structure, clear achievements, and relevant experience. Enhance further by adding 1-2 more metrics and ensuring every bullet has quantifiable impact.`
      : overall >= 6
      ? `👍 Solid foundation with good potential. Focus on: adding specific metrics, expanding projects/skills section, and using stronger action verbs throughout.`
      : overall >= 4.5
      ? `📝 Resume needs refinement. Priority improvements: add quantifiable results, create dedicated skills section, include key projects, and convert vague descriptions to specific achievements.`
      : `⚠️ Resume requires significant revision. Add structure (clear sections), include metrics/numbers, detail work experience with dates, and showcase 2-3 key projects.`,
    pros: pros,
    cons: cons,
    suggestions: suggestions.slice(0, 6), // Top 6 personalized suggestions
    formattingTips: [
      hasBulletPoints ? "Maintain consistent bullet point formatting (- or •) throughout" : "Convert all experience descriptions to bullet points for ATS compatibility",
      structuredSections.length > 0 ? "Keep consistent spacing between sections" : "Add clear section headers: Summary, Experience, Skills, Education, Projects",
      "Use standard fonts (Arial, Calibri, Helvetica) for ATS compatibility",
      "Avoid tables, graphics, and special characters - use simple text formatting",
      "Keep margins at 0.5-1 inch on all sides",
      wordCount > 900 ? "Condense content to fit on one page (aim for 600-800 words)" : "Consider expanding weak sections while staying under 800 words"
    ],
    keywordsToAdd: isTech 
      ? ["Full-stack", "Agile/Scrum", "CI/CD Pipeline", "REST API", "Database Design", "Version Control", "Cloud Architecture", "Microservices", "API Integration"]
      : ["Leadership", "Project Management", "Stakeholder Management", "Process Improvement", "Cross-functional", "Strategic Planning"],
    wordsToRemove: ["Responsible for", "Helped with", "Worked on", "Involved in", "Assisted", "Various", "Some", "Etc", "Etc.", "And more"],
  };
};

export const getOpenAIResponse = async (prompt) => {
  try {
    console.log("🤖 Calling Gemini API for text response...");
    
    if (!GEMINI_API_KEY) {
      console.log("⚠️ No Gemini API key, using intelligent fallback");
      return generateSmartCustomization(prompt);
    }
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 3000,
        },
      }
    );

    const result = response.data.candidates[0].content.parts[0].text.trim();
    console.log("✅ Gemini response received, length:", result.length);
    return result;
  } catch (error) {
    console.error("❌ Gemini API error:", error.response?.data?.error?.message || error.message);
    console.log("⚠️ Using intelligent fallback customization");
    return generateSmartCustomization(prompt);
  }
};

// Smart customization generator that extracts job requirements and provides tailored suggestions
const generateSmartCustomization = (prompt) => {
  // Extract job description from prompt
  const jobDescMatch = prompt.match(/JOB DESCRIPTION:\s*"""\s*([\s\S]*?)\s*"""/i);
  const jobDesc = jobDescMatch ? jobDescMatch[1] : "";
  
  // Extract resume from prompt
  const resumeMatch = prompt.match(/ORIGINAL RESUME[\s\S]*?"""\s*([\s\S]*?)\s*"""/i);
  const resumeText = resumeMatch ? resumeMatch[1] : "";
  
  // Extract key requirements from job description
  const skills = jobDesc.match(/(?:require|require[sd]|skills?)[:\s]+([^.\n]+)/gi) || [];
  const experience = jobDesc.match(/(\d+\s*\+?\s*years?)/gi) || [];
  const tools = jobDesc.match(/(?:python|java|javascript|react|node|sql|aws|azure|gcp|docker|kubernetes|git)/gi) || [];
  
  // Extract what resume already has
  const resumeSkills = resumeText.match(/(?:skills?)[:\s]+([^.\n]+)/i)?.[1] || "";
  const resumeExperience = resumeText.match(/\d{4}\s*[-–]\s*\d{4}|\d{4}\s*[-–]\s*present/gi) || [];
  
  // Identify gaps
  const missingSkills = skills.slice(0, 3);
  const hasRelevantExp = resumeExperience.length > 0;
  
  const suggestions = [];
  
  if (missingSkills.length > 0) {
    suggestions.push(`1. EMPHASIZE KEY REQUIREMENTS:\n   The job requires: ${missingSkills.join(', ')}\n   - Highlight these explicitly in your summary\n   - Add them to your skills section\n   - Use them in your achievement descriptions`);
  }
  
  if (tools.length > 0) {
    const uniqueTools = [...new Set(tools.map(t => t.toLowerCase()))].slice(0, 5);
    suggestions.push(`2. TECHNICAL STACK:\n   Job mentions: ${uniqueTools.join(', ')}\n   - Add any of these you have experience with to your technical skills\n   - In project descriptions, mention which of these tools you used`);
  }
  
  if (experience.length > 0) {
    suggestions.push(`3. EXPERIENCE LEVEL:\n   Required: ${experience[0]}\n   - Highlight projects matching this seniority level\n   - Lead with achievements from similar scope of work`);
  }
  
  suggestions.push(`4. KEYWORD OPTIMIZATION:\n   Use the job description language:\n   - Copy 5-7 key phrases from the job posting\n   - Naturally incorporate them into your experience bullets\n   - Match their terminology (e.g., if they say "full-stack", use that exact term)`);
  
  suggestions.push(`5. ACHIEVEMENT ALIGNMENT:\n   Reorder your bullets to highlight:\n   - Projects most similar to the job scope\n   - Technical decisions that match their needs\n   - Metrics that prove capability (scale, performance, user impact)`);
  
  if (hasRelevantExp) {
    suggestions.push(`6. EXPERIENCE PRESENTATION:\n   Your timeline shows relevant background.\n   - Lead with the most recent and relevant role\n   - Quantify impact: "Led team of X", "Improved Y by Z%", "Shipped feature to N users"`);
  }
  
  return `PERSONALIZED RESUME CUSTOMIZATION GUIDE FOR THIS ROLE\n\n${suggestions.join('\n\n')}\n\nAPPLYING THESE CHANGES:\n- Update your summary to include 2-3 key job requirements\n- Reorganize your experience to lead with most relevant work\n- Convert 5-7 achievements to use job posting language/keywords\n- Add metrics: "Increased X by Y%", "Reduced Z from A to B", "Delivered for N users"\n\nThis targeted approach significantly improves ATS matching and recruiter engagement.`;
};

export const getAIReview = async (resumeText) => {
  try {
    console.log("📤 Attempting Gemini API for resume review...");
    console.log("Resume text length:", resumeText.length);
    
    if (!GEMINI_API_KEY) {
      console.log("⚠️ No Gemini API key, using fallback review");
      return generateFallbackReview(resumeText);
    }
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an AI Resume Strategist. Analyze this resume and respond ONLY with valid JSON, no markdown.

Resume:
"""
${resumeText}
"""

Return ONLY this exact JSON structure:
{
  "resumeType": "Tech or Non-Tech",
  "score": {"skills": 7, "projects": 6, "experience": 7, "communication": 8, "formatting": 9, "overall": 7.4},
  "summary": "Brief review",
  "pros": ["Pro 1", "Pro 2"],
  "cons": ["Con 1", "Con 2"],
  "suggestions": ["Suggestion 1", "Suggestion 2"],
  "formattingTips": ["Tip 1", "Tip 2"],
  "keywordsToAdd": ["keyword1"],
  "wordsToRemove": ["word1"]
}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 1500,
        },
      }
    );

    const result = response.data.candidates[0].content.parts[0].text.trim();
    const cleaned = result
      .replace(/^```json\s*/, "")
      .replace(/^```\s*/, "")
      .replace(/```$/, "")
      .trim();

    console.log("🧠 Raw AI Response (first 200 chars):\n", result.substring(0, 200));

    try {
      const parsed = JSON.parse(cleaned);
      console.log("✅ AI Review from Gemini parsed successfully");
      return parsed;
    } catch (err) {
      console.error("⚠️ Gemini JSON parsing failed, using fallback review:", err.message);
      return generateFallbackReview(resumeText);
    }
  } catch (error) {
    console.error("❌ Gemini API error:", error.response?.data?.error?.message || error.message);
    console.log("⚠️ Using fallback AI review (pattern-based analysis)");
    return generateFallbackReview(resumeText);
  }
};
