import {
  QuestionType,
  Questionnaire,
  TextSubType,
  SingleChoiceSubType,
  MultipleChoiceSubType,
} from "@/types/question";

export const INITIAL_QUESTIONS: Questionnaire = {
  id: "compliance-questionnaire",
  title: "Organizational Compliance Assessment",
  questions: [
    {
      id: "1",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT_TEXT,
      question: "What is your full name?",
      minLength: 1,
      maxLength: 20,
    },
    {
      id: "2",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT_TEXT,
      question: "What is your email address?",
      validation: {
        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
        errorMessage: "Please enter a valid email address.",
      },
    },
    {
      id: "3",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "What is your age group?",
      options: [
        { id: "3-1", label: "Under 18", value: "under_18" },
        { id: "3-2", label: "18-24", value: "18_24" },
        { id: "3-3", label: "25-34", value: "25_34" },
        { id: "3-4", label: "35-44", value: "35_44" },
        { id: "3-5", label: "45 and above", value: "45_above" },
      ],
    },
    {
      id: "4",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "Do you have any dietary restrictions?",
      options: [
        { id: "4-1", label: "Yes", value: "yes" },
        { id: "4-2", label: "No", value: "no" },
      ],
    },
    {
      id: "5",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.CHECKBOX,
      question: "If yes, please select your dietary restrictions.",
      options: [
        { id: "5-1", label: "Vegetarian", value: "vegetarian" },
        { id: "5-2", label: "Vegan", value: "vegan" },
        { id: "5-3", label: "Gluten-Free", value: "gluten_free" },
        {
          id: "5-4",
          label: "Lactose Intolerant",
          value: "lactose_intolerant",
        },
        { id: "5-5", label: "Other", value: "other" },
      ],
      conditional: {
        questionId: "4",
        operator: "equals",
        value: "yes",
      },
    },
    {
      id: "6",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT_TEXT,
      question: "If you selected 'Other', please specify.",
      conditional: {
        questionId: "5",
        operator: "equals",
        value: "other",
      },
    },
    {
      id: "7",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "Do you have any prior coding experience?",
      options: [
        { id: "7-1", label: "Yes", value: "yes" },
        { id: "7-2", label: "No", value: "no" },
      ],
    },
    {
      id: "8",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.CHECKBOX,
      question: "Which programming languages have you worked with?",
      options: [
        { id: "8-1", label: "JavaScript", value: "javascript" },
        { id: "8-2", label: "Python", value: "python" },
        { id: "8-3", label: "Java", value: "java" },
        { id: "8-4", label: "C++", value: "c++" },
        { id: "8-5", label: "Other", value: "other" },
      ],
      conditional: {
        questionId: 7,
        value: "yes",
      },
    },
    {
      id: "9",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT_TEXT,
      question: "If you selected 'Other', please specify.",
      conditional: {
        questionId: 8,
        value: "other",
      },
    },
    // {
    //   id: 10,
    //   type: "QuestionType.INFO",
    //   message:
    //     "Thank you for your responses so far! The next section is about your preferences.",
    //   conditional: {
    //     questionId: 3,
    //     value: "18_24",
    //   },
    // },
    {
      id: "11",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.CHECKBOX,
      question: "Do you prefer online or in-person events?",
      options: [
        { id: "11-1", label: "Online", value: "online" },
        { id: "11-2", label: "In-Person", value: "in_person" },
      ],
    },
    {
      id: "12",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT_TEXT,
      question: "What is your preferred mode of communication?",
    },
    {
      id: "13",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "Would you like to receive updates via email?",
      options: [
        { id: "13-1", label: "Yes", value: "yes" },
        { id: "13-2", label: "No", value: "no" },
      ],
    },
    // {
    //   id: 14,
    //   type: QuestionType.INFO",
    //   message: "You're almost done! Just a few more questions.",
    //   conditional: {
    //     questionId: 13,
    //     value: "yes",
    //   },
    // },
    {
      id: "15",
      type: QuestionType.TEXT,
      sub_type: TextSubType.LONG_TEXT,
      question: "Any additional comments or feedback?",
    },
  ],
};

// Schema 1: Job Application Questionnaire
export const JOB_APPLICATION_QUESTIONNAIRE: Questionnaire = {
  id: "job-application",
  title: "Software Developer Position Application",
  questions: [
    {
      id: "name",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT_TEXT,
      question: "What is your full name?",
      required: true,
      validation: {
        minLength: 2,
        maxLength: 100,
      },
    },
    {
      id: "phone",
      type: QuestionType.TEXT,
      sub_type: TextSubType.SHORT_TEXT,
      question: "What is your phone number?",
      required: true,
      validation: {
        pattern: "^[+]?[(]?[0-9]{3}[)]?[-\\s.]?[0-9]{3}[-\\s.]?[0-9]{4,6}$",
        errorMessage: "Please enter a valid phone number",
      },
    },
    {
      id: "resume",
      type: QuestionType.FILE,
      question: "Please upload your resume",
      required: true,
      validation: {
        allowedTypes: ["pdf", "doc", "docx"],
        maxSize: 5000000, // 5MB
      },
    },
  ],
};

// Schema 2: Product Feedback Survey
export const PRODUCT_FEEDBACK_QUESTIONNAIRE: Questionnaire = {
  id: "product-feedback",
  title: "Product Usage and Satisfaction Survey",
  questions: [
    {
      id: "product-used",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.DROPDOWN,
      question: "Which of our products do you use the most?",
      required: true,
      options: [
        { id: "prod-1", label: "Mobile App", value: "mobile" },
        { id: "prod-2", label: "Web Platform", value: "web" },
        { id: "prod-3", label: "Desktop Software", value: "desktop" },
      ],
    },
    {
      id: "usage-frequency",
      type: QuestionType.SINGLE_CHOICE,
      sub_type: SingleChoiceSubType.RADIO,
      question: "How often do you use our product?",
      options: [
        { id: "freq-1", label: "Daily", value: "daily" },
        { id: "freq-2", label: "Weekly", value: "weekly" },
        { id: "freq-3", label: "Monthly", value: "monthly" },
        { id: "freq-4", label: "Rarely", value: "rarely" },
      ],
    },
  ],
};

export const QUESTIONNAIRE_LIST = [
  INITIAL_QUESTIONS,
  JOB_APPLICATION_QUESTIONNAIRE,
  PRODUCT_FEEDBACK_QUESTIONNAIRE,
];
