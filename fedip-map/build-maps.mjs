// build-maps.mjs
import fs from "fs";

// Paste your roles between the backticks (one per line)
const rolesText = `
Head of Clinical Coding
Clinical Coding Manager
Clinical Coding Trainer
Clinical Coding Team Leader
Clinical Coding Auditor
Qualified Clinical Coder
Trainee Clinical Coder
Lead Data Governance Manager
Senior Data Governance Manager
Lead Machine Learning Engineer
Data Governance Manager
Senior Machine Learning Engineer
Senior Analytics Engineer
Analytics Engineer
Head of Analytics Engineering
Lead Analytics Engineer
Head of Data Ethics
Data Ethics Lead
Records and Information Manager
Assistant Records and Information Manager
`.trim(); // 👈 keep adding the rest of your roles here

// Turn into an array
const roles = rolesText.split("\n").map(r => r.trim()).filter(Boolean);

// Create both mappings
const jobRoleRecommendations = {};
const detailedFedipMapping = {};

roles.forEach(role => {
  jobRoleRecommendations[role] = "BCS, The Chartered Institute for IT";

  if (/associate/i.test(role)) {
    detailedFedipMapping[role] = "FEDIP Associate Practitioner";
  } else if (/trainee/i.test(role)) {
    detailedFedipMapping[role] = "FEDIP Associate Practitioner";
  } else if (/junior/i.test(role)) {
    detailedFedipMapping[role] = "FEDIP Associate Practitioner";
  } else if (/senior/i.test(role)) {
    detailedFedipMapping[role] = "FEDIP Senior Practitioner";
  } else if (/lead/i.test(role)) {
    detailedFedipMapping[role] = "FEDIP Advanced Practitioner";
  } else if (/principal/i.test(role)) {
    detailedFedipMapping[role] = "FEDIP Leading Practitioner";
  } else if (/head/i.test(role)) {
    detailedFedipMapping[role] = "FEDIP Leading Practitioner";
  } else {
    detailedFedipMapping[role] = "FEDIP Practitioner";
  }
});

// Write the files
fs.writeFileSync("jobRoleRecommendations.json", JSON.stringify(jobRoleRecommendations, null, 2));
fs.writeFileSync("detailedFedipMapping.json", JSON.stringify(detailedFedipMapping, null, 2));

console.log(`✅ Wrote ${roles.length} roles to:
 - jobRoleRecommendations.json
 - detailedFedipMapping.json`);
