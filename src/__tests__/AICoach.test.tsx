import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AICoach from "../components/AICoach";

describe("AICoach Component", () => {
  test("renders chatbot header and initial message", () => {
    render(<AICoach />);
    
    expect(screen.getByText("AI Sustainability Coach")).toBeInTheDocument();
    expect(screen.getByText(/I am your AI Eco Coach/)).toBeInTheDocument();
    expect(screen.getByText("How can I reduce my transportation emissions?")).toBeInTheDocument();
  });

  test("sending a query displays user message and updates logs", async () => {
    render(<AICoach />);
    
    const inputField = screen.getByPlaceholderText("Ask about reducing emissions (e.g. diet swaps, flight offsets)...");
    const sendButton = screen.getByLabelText("Send message to AI Coach");

    // Type a query
    fireEvent.change(inputField, { target: { value: "Test emissions query" } });
    fireEvent.click(sendButton);

    // Verify user message appears in log
    expect(screen.getByText("Test emissions query")).toBeInTheDocument();
    
    // Check if input field resets
    expect(inputField).toHaveValue("");
  });
});
