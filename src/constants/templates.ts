export const templates = [
  {
    id: "blank",
    label: "Blank Document",
    imageUrl: "/blank-document.svg",
    initialContent: "",
  },
  {
    id: "software-proposal",
    label: "Software Development Proposal",
    imageUrl: "/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      <h2>Project Overview</h2>
      <p>Describe the project goals, scope, and deliverables.</p>
      <h2>Timeline</h2>
      <p>Outline the estimated timeline for each phase.</p>
      <h2>Budget</h2>
      <p>Provide a breakdown of costs.</p>
      <h2>Team</h2>
      <p>List key team members and their roles.</p>
      <h2>Contact</h2>
      <p>Include contact information for further discussion.</p>
    `,
  },
  {
    id: "business-letter",
    label: "Business Letter",
    imageUrl: "/business-letter.svg",
    initialContent: `
      <div style="text-align:left;">
        <p><strong>Your Name</strong><br>
        Your Address<br>
        City, State ZIP Code<br>
        Date</p>
        <p>
        <strong>Recipient Name</strong><br>
        Recipient Title<br>
        Recipient Company<br>
        Recipient Address</p>
        <p>Dear <strong>[Recipient Name]</strong>,</p>
        <p>[Body of the letter]</p>
        <p>Sincerely,<br>
        [Your Name]</p>
      </div>
    `,
  },
  {
    id: "cover-letter",
    label: "Cover Letter",
    imageUrl: "/cover-letter.svg",
    initialContent: `
      <div style="text-align:left;">
        <p><strong>Your Name</strong><br>
        Your Address<br>
        City, State ZIP Code<br>
        Date</p>
        <p>
        <strong>Employer Name</strong><br>
        Company<br>
        Company Address</p>
        <p>Dear <strong>[Employer Name]</strong>,</p>
        <p>I am writing to apply for the <strong>[Position]</strong> at <strong>[Company]</strong>.<br>
        [Body of the cover letter]</p>
        <p>Sincerely,<br>
        [Your Name]</p>
      </div>
    `,
  },
  {
    id: "letter",
    label: "letter",
    imageUrl: "/letter.svg",
    initialContent: `
      <div style="text-align:left;">
        <p>Date</p>
        <p>Dear <strong>[Recipient Name]</strong>,</p>
        <p>[Body of the letter]</p>
        <p>Best regards,<br>
        [Your Name]</p>
      </div>
    `,
  },
  {
    id: "resume",
    label: "resume",
    imageUrl: "/resume.svg",
    initialContent: `
      <h1>[Your Name]</h1>
      <h2>Contact Information</h2>
      <ul>
        <li>Email: <a href="mailto:your.email@example.com">your.email@example.com</a></li>
        <li>Phone: [Your Phone Number]</li>
        <li>Address: [Your Address]</li>
      </ul>
      <h2>Summary</h2>
      <p>Brief summary of your skills and experience.</p>
      <h2>Experience</h2>
      <ul>
        <li><strong>[Job Title]</strong>, [Company], [Dates]
          <ul>
            <li>[Responsibilities]</li>
          </ul>
        </li>
      </ul>
      <h2>Education</h2>
      <ul>
        <li>[Degree], [Institution], [Year]</li>
      </ul>
      <h2>Skills</h2>
      <ul>
        <li>[Skill 1]</li>
        <li>[Skill 2]</li>
      </ul>
    `,
  },
  {
    id: "project-proposal",
    label: "project proposal",
    imageUrl: "/project-proposal.svg",
    initialContent: `
      <h1>Project Proposal</h1>
      <h2>Introduction</h2>
      <p>Brief description of the project.</p>
      <h2>Objectives</h2>
      <ul>
        <li>Main objective 1</li>
        <li>Main objective 2</li>
      </ul>
      <h2>Methodology</h2>
      <p>Describe the approach and methods.</p>
      <h2>Timeline</h2>
      <p>Provide a project timeline.</p>
      <h2>Budget</h2>
      <p>Outline the estimated budget.</p>
      <h2>Conclusion</h2>
      <p>Summarize the proposal.</p>
    `,
  },
];
