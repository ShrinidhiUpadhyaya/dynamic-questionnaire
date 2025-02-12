import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { Mock, beforeEach, describe, expect, test, vi } from "vitest";

import QuestionPage from "../questionnaire/[id]/page";
import { QuestionProvider } from "../questionnaire/context/question-context";
import { useQuestion } from "../questionnaire/hooks/useQuestion";

const mockRouter = { push: vi.fn() };
const mockParams = { id: "test-id" };

vi.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useParams: () => mockParams,
}));

vi.mock("@/app/locales/translation", () => ({
  t: (key: string) => key,
}));

vi.mock("@/app/questionnaire/hooks/useConditionalLogic", () => ({
  useConditionalLogic: () => ({ showQuestion: () => true }),
}));

vi.mock("@/app/questionnaire/hooks/useQuestion");
vi.mock("@/app/questionnaire/hooks/useResponse");

const createMockQuestionHook = (overrides = {}) => ({
  isLoading: false,
  error: null,
  currentQuestion: null,
  goToNextQuestion: vi.fn(),
  goToPreviousQuestion: vi.fn(),
  isFirstQuestion: false,
  isLastQuestion: false,
  ...overrides,
});

const renderWithProvider = (ui: ReactNode) => {
  return render(<QuestionProvider>{ui}</QuestionProvider>);
};

describe("QuestionPage", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test("renders loading state when fetching question", () => {
    const mockHook = createMockQuestionHook({ isLoading: true });
    (useQuestion as Mock).mockReturnValue(mockHook);

    renderWithProvider(<QuestionPage />);
    expect(screen.getByTestId("question-loading-card")).toBeInTheDocument();
  });

  test("displays error message when question fetch fails", () => {
    const errorMessage = "Failed to fetch question";
    const mockHook = createMockQuestionHook({
      error: new Error(errorMessage),
    });
    (useQuestion as Mock).mockReturnValue(mockHook);

    renderWithProvider(<QuestionPage />);
    expect(screen.getByText(new RegExp(`Error:\\s*${errorMessage}`, "i"))).toBeInTheDocument();
  });

  test("renders question card with correct content when data is loaded", () => {
    const mockQuestion = {
      id: "1",
      question: "What is React?",
      type: "text",
      sub_type: "short_text",
    };

    const mockHook = createMockQuestionHook({
      currentQuestion: mockQuestion,
    });
    (useQuestion as Mock).mockReturnValue(mockHook);

    renderWithProvider(<QuestionPage />);
    expect(screen.getByText(mockQuestion.question)).toBeInTheDocument();
  });

  test("navigation buttons visibility based on question position", () => {
    const mockFirstQuestion = createMockQuestionHook({
      currentQuestion: {
        id: "1",
        question: "First question",
        type: "text",
        sub_type: "short_text",
      },
      isFirstQuestion: true,
      isLastQuestion: false,
    });
    (useQuestion as Mock).mockReturnValue(mockFirstQuestion);

    const { rerender } = renderWithProvider(<QuestionPage />);
    expect(screen.queryByText("previous")).not.toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();

    const mockLastQuestion = createMockQuestionHook({
      currentQuestion: {
        id: "2",
        question: "Last question",
        type: "text",
        sub_type: "short_text",
      },
      isFirstQuestion: false,
      isLastQuestion: true,
    });
    (useQuestion as Mock).mockReturnValue(mockLastQuestion);

    rerender(
      <QuestionProvider>
        <QuestionPage />
      </QuestionProvider>,
    );
    expect(screen.getByText("previous")).toBeInTheDocument();
    expect(screen.getByText("submit")).toBeInTheDocument();
  });

  test("displays error UI for invalid question type", () => {
    const mockHook = createMockQuestionHook({
      currentQuestion: {
        id: "1",
        question: "Invalid question",
        type: "invalid_type",
        sub_type: "short_text",
      },
    });
    (useQuestion as Mock).mockReturnValue(mockHook);

    renderWithProvider(<QuestionPage />);
    expect(screen.getByText("Oops, something went wrong!")).toBeInTheDocument();
  });
});
