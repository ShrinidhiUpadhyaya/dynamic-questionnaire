import { MultipleChoiceSubType } from "@/app/questionnaire/components/(question-types)/(multiple-choice-question)/types";
import { SingleChoiceSubType } from "@/app/questionnaire/components/(question-types)/(single-choice-question)/types";
import { TextSubType } from "@/app/questionnaire/components/(question-types)/(text-question)/types";
import { QuestionType, Questionnaire } from "@/types/common";
import { RatingsSubType } from "@/app/questionnaire/components/(question-types)/(ratings-question)/types";
export const CYBER_SECURITY: Questionnaire = {
  id: "cyber-security",
  title: "Cyber Security Questions",
  questions: [
    {
      id: "cyber-team",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "Does your company currently have a dedicated cyber security team?",
      options: [
        { id: "cyber-team-yes", label: "Yes", value: "yes" },
        { id: "cyber-team-no", label: "No", value: "no" },
      ],
    },
    {
      id: "dummy-ratings",
      type: QuestionType.RATINGS,
      sub_type: RatingsSubType.SLIDER,
      question: "How important is work-life balance to you?",
      min: 1,
      max: 10,
      step: 1,
      defaultValue: 5,
    },
    {
      id: "cyber-concerns",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.CHECKBOX,
      question: "What are the main areas of concern regarding cyber security in your company?",
      options: [
        { id: "concern-phishing", label: "Phishing Attacks", value: "phishing" },
        { id: "concern-ransomware", label: "Ransomware", value: "ransomware" },
        { id: "concern-insider", label: "Insider Threats", value: "insider" },
        { id: "concern-databreach", label: "Data Breaches", value: "data-breaches" },
        { id: "concern-other", label: "Other", value: "other" },
      ],
    },
    {
      id: "cyber-other-details",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT,
      question: "Please specify your concerns if 'Other' was selected.",
      conditional: [
        {
          questionId: "cyber-concerns",
          operator: "contains",
          value: "other",
        },
      ],
    },
    {
      id: "training-frequency",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "How often does your company conduct cyber security training for employees?",
      options: [
        { id: "training-monthly", label: "Monthly", value: "monthly" },
        { id: "training-quarterly", label: "Quarterly", value: "quarterly" },
        { id: "training-annually", label: "Annually", value: "annually" },
        { id: "training-never", label: "Never", value: "never" },
      ],
    },
    {
      id: "incident-experience",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "Have you experienced a cyber security incident in the past year?",
      options: [
        { id: "incident-yes", label: "Yes", value: "yes" },
        { id: "incident-no", label: "No", value: "no" },
      ],
    },
    {
      id: "incident-description",
      type: QuestionType.TEXT,
      sub_type: TextSubType.LONG,
      question: "If yes, please describe the incident and its impact.",
      conditional: [
        {
          questionId: "incident-experience",
          operator: "equals",
          value: "yes",
        },
      ],
    },
    {
      id: "security-posture",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "How would you rate your company’s current cyber security posture?",
      options: [
        { id: "posture-excellent", label: "Excellent", value: "excellent" },
        { id: "posture-good", label: "Good", value: "good" },
        { id: "posture-fair", label: "Fair", value: "fair" },
        { id: "posture-poor", label: "Poor", value: "poor" },
      ],
    },
    {
      id: "security-measures",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.CHECKBOX,
      question: "What cyber security measures are currently implemented in your company?",
      options: [
        { id: "measures-firewalls", label: "Firewalls", value: "firewalls" },
        { id: "measures-ids", label: "Intrusion Detection Systems", value: "ids" },
        { id: "measures-antivirus", label: "Antivirus Software", value: "antivirus" },
        { id: "measures-training", label: "Employee Training", value: "training" },
        { id: "measures-encryption", label: "Encryption", value: "encryption" },
        { id: "measures-mfa", label: "Multi-factor Authentication", value: "mfa" },
      ],
    },
    {
      id: "future-investment",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question:
        "Does your company plan to invest in new cyber security technologies in the next 12 months?",
      options: [
        { id: "investment-yes", label: "Yes", value: "yes" },
        { id: "investment-no", label: "No", value: "no" },
        { id: "investment-not-sure", label: "Not Sure", value: "not_sure" },
      ],
    },
    {
      id: "investment-areas",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.CHECKBOX,
      question:
        "Which areas of cyber security do you intend to focus on for future investments? (Select all that apply)",
      options: [
        { id: "area-network", label: "Network Security", value: "network_security" },
        { id: "area-endpoint", label: "Endpoint Security", value: "endpoint_security" },
        { id: "area-cloud", label: "Cloud Security", value: "cloud_security" },
        { id: "area-iam", label: "Identity and Access Management", value: "iam" },
        { id: "area-incident", label: "Incident Response", value: "incident_response" },
        { id: "area-training", label: "Security Awareness Training", value: "security_training" },
      ],
      conditional: [
        {
          questionId: "future-investment",
          operator: "equals",
          value: "yes",
        },
        {
          questionId: "security-measures",
          operator: "notEquals",
          value: "firewalls",
        },
      ],
    },
  ],
};
export const HAIR_TRANSPLANT_QUESTIONNAIRE: Questionnaire = {
  id: "hair-transplant",
  title: "Hair Transplant Experience and Expectations",
  questions: [
    {
      id: "reason-for-hair-loss",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "What is the primary reason for your hair loss?",
      options: [
        { id: "reason-1", label: "Genetics", value: "genetics" },
        { id: "reason-2", label: "Stress", value: "stress" },
        { id: "reason-3", label: "Medical Condition", value: "medical-condition" },
        { id: "reason-4", label: "Other", value: "other" },
      ],
    },
    {
      id: "hair-loss-duration",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.SELECT,
      question: "How long have you been experiencing hair loss?",
      options: [
        { id: "duration-1", label: "Less than a year", value: "less-than-a-year" },
        { id: "duration-2", label: "1-3 years", value: "1-3-years" },
        { id: "duration-3", label: "More than 3 years", value: "more-than-3-years" },
      ],
    },
    {
      id: "previous-hair-treatments",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT,
      question: "Have you undergone any previous hair loss treatments? If yes, please specify.",
      conditional: [
        {
          questionId: "reason-for-hair-loss",
          operator: "equals",
          value: "medical-condition",
        },
      ],
    },
    {
      id: "transplant-expectations",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.CHECKBOX,
      question: "What are your expectations from a hair transplant?",
      options: [
        { id: "expectation-1", label: "Full Hair Restoration", value: "full-restoration" },
        { id: "expectation-2", label: "Improved Hairline", value: "improved-hairline" },
        { id: "expectation-3", label: "Thicker Hair", value: "thicker-hair" },
      ],
    },
    {
      id: "surgery-concerns",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.CHECKBOX,
      question: "What concerns do you have about the procedure?",
      options: [
        { id: "concern-1", label: "Cost", value: "cost" },
        { id: "concern-2", label: "Side Effects", value: "side-effects" },
        { id: "concern-3", label: "Recovery Time", value: "recovery-time" },
      ],
    },
    {
      id: "preferred-technique",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "Which hair transplant technique are you interested in?",
      options: [
        { id: "technique-1", label: "FUE (Follicular Unit Extraction)", value: "fue" },
        { id: "technique-2", label: "FUT (Follicular Unit Transplant)", value: "fut" },
      ],
    },
    {
      id: "desired-hair-density",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT,
      question: "What is your desired hair density after the procedure?",
      conditional: [
        {
          questionId: "transplant-expectations",
          operator: "contains",
          value: "full-restoration",
        },
      ],
    },
    {
      id: "pain-threshold",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "How comfortable are you with minor surgical pain?",
      options: [
        { id: "pain-1", label: "Not comfortable at all", value: "not-comfortable" },
        { id: "pain-2", label: "Moderately comfortable", value: "moderately-comfortable" },
        { id: "pain-3", label: "Very comfortable", value: "very-comfortable" },
      ],
      conditional: [
        {
          questionId: "preferred-technique",
          operator: "equals",
          value: "fut",
        },
      ],
    },
    {
      id: "post-surgery-care",
      type: QuestionType.TEXT,
      sub_type: TextSubType.LONG,
      question: "Do you have any concerns about post-surgery care?",
    },
    {
      id: "final-decision-timeline",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "When do you plan to make a decision regarding the transplant?",
      options: [
        { id: "timeline-1", label: "Within a month", value: "within-a-month" },
        { id: "timeline-2", label: "In 3-6 months", value: "3-6-months" },
        { id: "timeline-3", label: "In a year", value: "in-a-year" },
      ],
    },
  ],
};

export const PLASTIC_SURGERY_QUESTIONNAIRE: Questionnaire = {
  id: "plastic-surgery",
  title: "Plastic Surgery Consultation Questionnaire",
  questions: [
    {
      id: "surgery-interest",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.SELECT,
      question: "Which type of plastic surgery are you considering?",
      options: [
        { id: "surgery-1", label: "Rhinoplasty", value: "rhinoplasty" },
        {
          id: "surgery-2",
          label: "Breast Augmentation",
          value: "breast-augmentation",
        },
        { id: "surgery-3", label: "Liposuction", value: "liposuction" },
        { id: "surgery-4", label: "Facelift", value: "facelift" },
      ],
    },
    {
      id: "motivation-for-surgery",
      type: QuestionType.TEXT,
      sub_type: TextSubType.LONG,
      question: "What is your main motivation for considering surgery?",
    },
    {
      id: "surgery-risks",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "Are you aware of the potential risks involved?",
      options: [
        { id: "risk-1", label: "Yes", value: "yes" },
        { id: "risk-2", label: "No", value: "no" },
      ],
    },
    {
      id: "expected-recovery-time",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT,
      question: "What is your expected recovery time?",
    },
    {
      id: "preference-surgeon",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "Would you prefer a male or female surgeon?",
      options: [
        { id: "gender-1", label: "No preference", value: "no-preference" },
        { id: "gender-2", label: "Male", value: "male" },
        { id: "gender-3", label: "Female", value: "female" },
      ],
    },
    {
      id: "past-surgeries",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT,
      question: "Have you undergone any previous cosmetic surgeries?",
    },
    {
      id: "realistic-outcomes",
      type: QuestionType.TEXT,
      sub_type: TextSubType.LONG,
      question: "What are your realistic expectations for the outcome?",
    },
  ],
};

export const QUESTIONS_FOR_DOCTORS_QUESTIONNAIRE: Questionnaire = {
  id: "questions-for-doctors",
  title: "Questions You May Have for Your Doctor",
  questions: [
    {
      id: "health-concern",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT,
      question: "What is the primary health concern you want to discuss?",
    },
    {
      id: "preferred-communication",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "How do you prefer to communicate with your doctor?",
      options: [
        { id: "comm-1", label: "In-person", value: "in-person" },
        { id: "comm-2", label: "Phone", value: "phone" },
        { id: "comm-3", label: "Online", value: "online" },
      ],
    },
    {
      id: "medications",
      type: QuestionType.TEXT,
      sub_type: TextSubType.LONG,
      question: "Are you currently taking any medications or supplements? If so, please list them.",
    },
    {
      id: "symptom-duration",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "How long have you been experiencing your current symptoms?",
      options: [
        {
          id: "duration-1",
          label: "Less than a week",
          value: "less-than-a-week",
        },
        { id: "duration-2", label: "1-4 weeks", value: "1-4-weeks" },
        {
          id: "duration-3",
          label: "More than a month",
          value: "more-than-a-month",
        },
      ],
    },
  ],
};

export const JOB_SEEKERS_WORK_VALUES_QUESTIONNAIRE: Questionnaire = {
  id: "job-seekers-values",
  title: "Work Values and Career Priorities",
  questions: [
    {
      id: "important-work-values",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.CHECKBOX,
      question: "What work values are most important to you?",
      options: [
        {
          id: "value-1",
          label: "Work-Life Balance",
          value: "work-life-balance",
        },
        { id: "value-2", label: "Job Security", value: "job-security" },
        { id: "value-3", label: "Salary & Benefits", value: "salary-benefits" },
        { id: "value-4", label: "Career Growth", value: "career-growth" },
        { id: "value-5", label: "Company Culture", value: "company-culture" },
      ],
    },
    {
      id: "preferred-work-environment",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "What type of work environment do you prefer?",
      options: [
        { id: "env-1", label: "Remote", value: "remote" },
        { id: "env-2", label: "Hybrid (Remote & Office)", value: "hybrid" },
        { id: "env-3", label: "In-Office", value: "in-office" },
        { id: "env-4", label: "Flexible", value: "flexible" },
      ],
    },
    {
      id: "career-goals",
      type: QuestionType.TEXT,
      sub_type: TextSubType.LONG,
      question: "What are your long-term career goals?",
    },
    {
      id: "ideal-leadership-style",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "What leadership style do you thrive under?",
      options: [
        {
          id: "leader-1",
          label: "Supportive & Collaborative",
          value: "supportive",
        },
        {
          id: "leader-2",
          label: "Results-Oriented & Goal-Driven",
          value: "results-oriented",
        },
        { id: "leader-3", label: "Hands-Off & Autonomous", value: "hands-off" },
        {
          id: "leader-4",
          label: "Structured & Detail-Oriented",
          value: "structured",
        },
      ],
    },
    {
      id: "preferred-schedule",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "What work schedule do you prefer?",
      options: [
        { id: "schedule-1", label: "Standard 9-to-5", value: "9-to-5" },
        { id: "schedule-2", label: "Flexible Hours", value: "flexible" },
        { id: "schedule-3", label: "Shift Work", value: "shift-work" },
        {
          id: "schedule-4",
          label: "Freelance/Project-Based",
          value: "freelance",
        },
      ],
    },
    {
      id: "most-motivating-factor",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "What motivates you most in a job?",
      options: [
        {
          id: "motivation-1",
          label: "Recognition & Appreciation",
          value: "recognition",
        },
        {
          id: "motivation-2",
          label: "Financial Rewards",
          value: "financial-rewards",
        },
        {
          id: "motivation-3",
          label: "Challenging & Engaging Work",
          value: "challenging-work",
        },
        {
          id: "motivation-4",
          label: "Opportunities for Learning & Growth",
          value: "learning-growth",
        },
      ],
    },
    {
      id: "teamwork-vs-individual",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "Do you prefer working independently or in a team?",
      options: [
        { id: "work-style-1", label: "Independently", value: "independent" },
        { id: "work-style-2", label: "In a Team", value: "team" },
        { id: "work-style-3", label: "A mix of both", value: "mix" },
      ],
    },
    {
      id: "desired-company-size",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "What size company do you prefer working at?",
      options: [
        {
          id: "company-size-1",
          label: "Startup (1-50 employees)",
          value: "startup",
        },
        {
          id: "company-size-2",
          label: "Small (51-200 employees)",
          value: "small",
        },
        {
          id: "company-size-3",
          label: "Mid-sized (201-1000 employees)",
          value: "mid-sized",
        },
        {
          id: "company-size-4",
          label: "Large (1000+ employees)",
          value: "large",
        },
      ],
    },
  ],
};

export const QUESTIONNAIRE_LIST = [
  CYBER_SECURITY,
  HAIR_TRANSPLANT_QUESTIONNAIRE,
  PLASTIC_SURGERY_QUESTIONNAIRE,
  QUESTIONS_FOR_DOCTORS_QUESTIONNAIRE,
  JOB_SEEKERS_WORK_VALUES_QUESTIONNAIRE,
];
