import { useState } from "react";
import { Theme } from "@/interfaces";
import { ThemeCard } from "../ThemeCard/ThemeCard";
import { ThemeDetails } from "./ThemeDetails/ThemeDetails";

export interface OwnThemePresentationProps {
  theme: Theme;
}

export const OwnThemePresentation = ({ theme }: OwnThemePresentationProps) => {
  const [showThemeDetails, setShowThemeDetails] = useState(false);

  return (
    <>
      <ThemeCard theme={theme} onClick={() => setShowThemeDetails(true)} />
      <ThemeDetails
        open={showThemeDetails}
        onOpenChange={setShowThemeDetails}
        theme={theme}
      />
    </>
  );
};
