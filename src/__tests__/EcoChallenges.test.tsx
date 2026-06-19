import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EcoChallenges from "../components/EcoChallenges";

describe("EcoChallenges Component", () => {
  const onCompleteChallengeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders eco challenges and categories successfully", () => {
    render(<EcoChallenges onCompleteChallenge={onCompleteChallengeMock} />);
    
    // Check header
    expect(screen.getByText("Active Eco Challenges")).toBeInTheDocument();
    
    // Check categories are present
    expect(screen.getByText("Bike to Work Week")).toBeInTheDocument();
    expect(screen.getByText("No Single-Use Plastic")).toBeInTheDocument();
  });

  test("claiming a completed challenge triggers callback and updates interface state", () => {
    render(<EcoChallenges onCompleteChallenge={onCompleteChallengeMock} />);
    
    // Find all 'Claim Done' buttons
    const claimButtons = screen.getAllByRole("button", { name: "Claim Done" });
    expect(claimButtons.length).toBeGreaterThan(0);
    
    // Claim the first challenge
    fireEvent.click(claimButtons[0]);
    
    // Callback should be fired with correct XP
    expect(onCompleteChallengeMock).toHaveBeenCalledWith(250); // XP for "Bike to Work Week"
    
    // Button text changes to "Completed"
    expect(screen.getByRole("button", { name: "Completed" })).toBeInTheDocument();
  });
});
