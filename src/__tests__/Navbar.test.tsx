import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Navbar Component", () => {
  const setActiveSectionMock = jest.fn();
  const mockUserStats = { xp: 820, level: 4 };

  test("renders navbar logo and stats correctly", () => {
    render(
      <Navbar
        activeSection="home"
        setActiveSection={setActiveSectionMock}
        userStats={mockUserStats}
      />
    );

    // Verify logo
    expect(screen.getByText("EcoPulse")).toBeInTheDocument();

    // Verify links
    expect(screen.getByText("Calculator")).toBeInTheDocument();
    expect(screen.getByText("AI Coach")).toBeInTheDocument();

    // Verify stats
    expect(screen.getByText("LVL 4")).toBeInTheDocument();
    expect(screen.getByText("820 XP")).toBeInTheDocument();
  });

  test("clicking toggle theme button runs successfully", () => {
    render(
      <Navbar
        activeSection="home"
        setActiveSection={setActiveSectionMock}
        userStats={mockUserStats}
      />
    );

    const themeButton = screen.getByLabelText("Toggle light/dark theme");
    expect(themeButton).toBeInTheDocument();
    fireEvent.click(themeButton);
  });
});
