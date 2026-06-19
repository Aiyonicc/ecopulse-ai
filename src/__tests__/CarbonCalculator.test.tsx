import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CarbonCalculator from "../components/CarbonCalculator";

describe("CarbonCalculator Component", () => {
  const onScoreChangeMock = jest.fn();
  const onXPChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component and initial step successfully", () => {
    render(<CarbonCalculator onScoreChange={onScoreChangeMock} onXPChange={onXPChangeMock} />);
    
    // Check main title
    expect(screen.getByText("Impact Calculator")).toBeInTheDocument();
    
    // Check first question is displayed
    expect(screen.getByText("What is your primary mode of daily commuting?")).toBeInTheDocument();
  });

  test("selecting an option changes carbon score and triggers callbacks", () => {
    render(<CarbonCalculator onScoreChange={onScoreChangeMock} onXPChange={onXPChangeMock} />);
    
    // Select option "Bicycle or Walking"
    const bikeOption = screen.getByText("Bicycle or Walking");
    fireEvent.click(bikeOption);
    
    // The score should be calculated and updated
    expect(onScoreChangeMock).toHaveBeenCalled();
  });

  test("clicking continue navigates to next step and grants XP", () => {
    render(<CarbonCalculator onScoreChange={onScoreChangeMock} onXPChange={onXPChangeMock} />);
    
    // Click option to reveal continue button
    const bikeOption = screen.getByText("Bicycle or Walking");
    fireEvent.click(bikeOption);
    
    // Find the "Continue" button and click it
    const continueBtn = screen.getByText("Continue");
    fireEvent.click(continueBtn);
    
    // Should grant XP and advance to Home Energy step
    expect(onXPChangeMock).toHaveBeenCalledWith(10);
    expect(screen.getByText("How is your household electricity primarily generated?")).toBeInTheDocument();
  });

  test("reset button reverts inputs back to the first step", () => {
    render(<CarbonCalculator onScoreChange={onScoreChangeMock} onXPChange={onXPChangeMock} />);
    
    const bikeOption = screen.getByText("Bicycle or Walking");
    fireEvent.click(bikeOption);
    
    const resetBtn = screen.getByText("Reset Calculator");
    fireEvent.click(resetBtn);
    
    // Should reset the score back to 0
    expect(onScoreChangeMock).toHaveBeenLastCalledWith(0);
  });
});
