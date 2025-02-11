# Dynamic Questionnaire

A full stack Next.js application that allows you to create dynamic questionnaires based on a JSON schema, supports conditional logic and validation.

## Features

- [x] Dynamic questionnaire based on a JSON schema
- [x] Multiple question types
- [x] Progress Tracking
- [x] Partial Response Saving


## Tech Stack

- Next.js
- Tailwind CSS
- TypeScript
- Shadcn UI
- React Query
- Zustand
- Vitest

## Installation
- Clone the project
- Navigate to the folder `dynamic-questionnaire`
- Install dependencies `npm install`
- Use the following command to start the dev servert `npm run dev`

## Architecture
### Questionnaire Schema
```
export interface Questionnaire {
  id: string;
  title: string;
  questions: Question[];
}
```
The schema is defined as a Questionnaire object with the following top-level properties:

- `id:` A unique identifier for the questionnaire. In this case, it is `questions-for-doctors`.

- `title:` A title to the questionnaire. Here, it is "Questions You May Have for Your Doctor".

- `questions:` An array of question objects. Each object in this array represents a single question with its specific configuration.

### Question Schema
- `id:` A unique identifier for the question (e.g., "health-concern"). This helps in referencing and handling responses for the specific question.

- `type:` Specifies the main type of the answer. Supported types include:
  ```
  TEXT = "text",
  SINGLE_CHOICE = "single_choice",
  MULTIPLE_CHOICE = "multiple_choice",
  ```
- `sub_type:` Further refines the type of answers:

  ```
  export enum TextSubType {
    NUMBER_TEXT = "number_text",
    SHORT_TEXT = "short_text",
    LONG_TEXT = "long_text",
  }
  ```

  ```
  export enum SingleChoiceSubType {
    RADIO = "radio",
    SELECT = "select",
  }
  ```

  ```
  export enum MultipleChoiceSubType {
    CHECKBOX = "checkbox",
  }
  ```

- `question:` The text prompt that is shown to the user. It clearly describes what information is being requested.

- `options (optional):` Only applicable for questions of type SINGLE_CHOICE. This is an array of option objects, each containing:
  - `id:` A unique identifier for the option.
  - `label:` The text displayed to the user for that option.
  - `value:` The underlying value that will be submitted if the option is selected.
## Question Types
- [x] Text
  - [x] ShortText
  - [x] NumberText
  - [x] LongText
- [x] Single Choice
  - [x] Radio
  - [x] Select
- [x] Multiple Choice
  - [x] Checkbox

## API Endpoints
### POST /api/response
  - **Purpose:** Retrieve a single answer by question ID or fetch all answers.
  - **Query Parameters:**
    - `id (string, required)` The unique identifier of the question for which the answer is being submitted.
  - **Request Body:**
    - JSON payload with the following property:
    - `answers (string | string[]):` The answer to be saved for the question.
 - **Sucessfull Responses**
   ```
   {
     "message": "Answer saved successfully",
     "status": "success"
   }
   ```
- **Error Responses:**
  ```
  {
    "error": "Question ID and answer are required"
  }
  ```


### GET /api/response
  - **Purpose:** Retrieve a single answer by question ID or fetch all answers.
  - **Query Parameters:**
    - `id (string, required):`
      - If `id=all`, returns all answers stored.
      - Otherwise, returns the answer associated with the specified question ID.
  - **Successfull Responses:**
  - `id=all`
    ```
    {
      "answers": [ /* Array of answer objects */ ],
      "total": 3,
      "status": "success"
    }
    ```
  - Id specific
    ```
    {
      "answer": "I have a persistent cough and mild fever.",
      "status": "success"
    }
    ```
- **Error Responses:**
  ```
  {
    "error": "Failed to fetch answers"
  }
  ```
### GET /api/question
 - **Purpose:** Retrieve all questionnaires available in the system
 - **Successfull Responses:**
   ```
   {
     "questionnaires": [
       // Array of questionnaire objects defined in QUESTIONNAIRE_LIST
    ],
     "status": "success"
   }
   ```
- **Error Responses:**
  ```
  {
  "error": "Failed to fetch questionnaires"
  }
  ```
### GET /api/question/[id]

- **Path Parameters:**
  - `id (string, required):` The unique identifier of the questionnaire.
- **Query Parameters:**
  - `all(optional)` the API returns all questions for the questionnaire.
  - `limit(optional)` When not fetching all questions, defines the maximum number of questions to return (default is `5`).
  - `offset (optional, number)` When not fetching all questions, defines the starting index for the questions to return (default is `0`).
- **Sucessfull Responses:**
  - When Fetching All Questions:
    ```
    {
      "questions": { 
        // The complete questionnaire object including all questions
      },
      "total": 10,
      "status": "success"
    }
    ```
  - When Fetching Paginated Questions:
    ```
    {
    "questions": [
      // Array of question objects based on pagination (e.g., first 5 questions)
    ],
    "total": 10,
    "status": "success"
    }
    ```
- **Error Responses**
  - 400 Bad Request
    ```
    {
      "error": "Questionnaire ID is required"
    }
    ```
  - 404 Not Found
    ```
    {
      "error": "Questionnaire not found"
    }
    ```
  - 500 Internal Server
    ```
    {
      "error": "Failed to fetch questionnaire"
    }
    ```
### Adding a New Component Sub Component to a existing Component Type
Lets a Toggle Button Component in `multi-choice-question`
- Install the toggle component from `shadcn\ui`
  ```
  npx shadcn@latest add toggle
  ```
- create a new file called `ToggleButton` in `(multiple-choice)`
- add the type `TOGGLE = "toggle"` to `MultipleChoiceSubType` in `question.ts`
  ```
  export enum MultipleChoiceSubType {
    CHECKBOX = "checkbox",
    TOGGLE = "toggle",
  }
  ```
- Register the component in component Registery
```
const MULTI_CHOICE_COMPONENTS: ComponentRegistry<MultipleChoiceSubType> = {
  [MultipleChoiceSubType.CHECKBOX]: DCheckbox,
  [MultipleChoiceSubType.TOGGLE]: ToggleButton,
};
```
- Include data in `questions.ts`
```
 {
      id: "important-work-values",
      type: QuestionType.MULTIPLE_CHOICE,
      sub_type: MultipleChoiceSubType.TOGGLE,
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
```
```
export type MultipleChoiceQuestionComponentProps =
  | DCheckboxProps
  | ToggleButtonProps;
```

### Adding a new Question Type
Lets create a new question type called ratings
-  add a new type called ratings in `QuestionType` in types
```
export enum QuestionType {
  TEXT = "text",
  SINGLE_CHOICE = "single_choice",
  MULTIPLE_CHOICE = "multiple_choice",
  RATINGS = "ratings",
}
```
- lets create a `slider` sub type under Ratings
```
export enum RatingsSubType {
  SLIDER = "slider",
}
```
- add the types for a Ratings question like `min`, `max`, `step`, `defaultValue` 
```
export interface RatingsBaseType extends BaseQuestion {
  type: QuestionType.RATINGS;
  sub_type: RatingsSubType;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}
```
- Dont forget to export it
```
export interface SliderQuestionType extends RatingsBaseType {}

export type RatingsQuestionType = SliderQuestionType;
```
- add the `RatingsQuestionType` to type `Question`
```
export type Question =
  | TextQuestionType
  | SingleChoiceQuestionType
  | MultipleChoiceQuestionType
  | RatingsQuestionType;
```
- Now lets create the component, create a new folder called `(ratings-question)` under `(question-types)`
- create a new file `types.ts`, this will include all the types related to ratings component
```
export interface DSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export type RatingsQuestionComponentProps = DSliderProps;
```
- Install the `Slider` component from `shadcn\ui` `npx shadcn@latest add slider`

- create a new file called `DSlider.tsx`
```
import { Slider } from "@/components/ui/slider";
import { DSliderProps } from "./types";

const DSlider = ({
  min = 0,
  max = 10,
  step = 1,
  defaultValue = 4,
}: DSliderProps) => {
  return (
    <Slider
      min={min}
      max={max}
      step={step}
      defaultValue={[defaultValue]}
      className="h-8"
    />
  );
};

export default DSlider;
```
- create a new file called `index.tsx` for exporting the Ratings Components
```
import { ComponentRegistry } from "@/types/components";
import { QuestionComponent } from "../../QuestionComponent";
import { RatingsSubType } from "@/types/question";
import DSlider from "./DSlider";

const RATINGS_COMPONENTS: ComponentRegistry<RatingsSubType> = {
  [RatingsSubType.SLIDER]: DSlider,
};

export const RatingsQuestion = QuestionComponent({
  components: RATINGS_COMPONENTS,
});

export default RatingsQuestion;
```
