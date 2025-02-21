import { useQuery } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { Mock, beforeEach, describe, expect, test, vi } from "vitest";

import AnswersPage from "../answers/[id]/page";

const mockPush = vi.fn();
const mockParams = { id: "test-id" };

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useParams: () => mockParams,
}));

const mockQuestions = [
  { id: "1", question: "What is your name?", type: "text" },
  { id: "2", question: "Select your hobbies", type: "multiple" },
  { id: "3", question: "Describe yourself", type: "text" },
];

const mockAnswers = [
  { id: "1", answer: "John Doe" },
  { id: "2", answer: ["Reading", "Swimming"] },
  { id: "3", answer: "I am a software developer" },
];

const setupMockQuery = (overrides = {}) => {
  const defaultResponse = {
    isLoading: false,
    error: null,
    ...overrides,
  };

  return (useQuery as Mock).mockImplementation((options: { queryKey: string[] }) => {
    const [queryType] = options.queryKey;

    if (queryType === "questions") {
      return { ...defaultResponse, data: { questions: mockQuestions } };
    }
    if (queryType === "answers") {
      return { ...defaultResponse, data: { answers: mockAnswers } };
    }
    return defaultResponse;
  });
};

describe("AnswersPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setupMockQuery();
  });

  test("renders loading state while fetching data", () => {
    setupMockQuery({ isLoading: true });
    render(<AnswersPage />);
    expect(screen.getByTestId("loading-animation")).toBeInTheDocument();
  });

  test("handles navigation actions correctly", async () => {
    render(<AnswersPage />);

    const takeAnotherBtn = screen.getByText("Take Another Questionnaire");
    const restartBtn = screen.getByText("Restart Questionnaire");

    fireEvent.click(takeAnotherBtn);
    expect(mockPush).toHaveBeenCalledWith("/questionnaire");

    fireEvent.click(restartBtn);
    expect(mockPush).toHaveBeenCalledWith(`/questionnaire/${mockParams.id}`);
  });
});
