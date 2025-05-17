import React from "react";

interface FeatureCardProps {
  title: string;
  subtitle: string;
}

export const FeatureCard = ({ title, subtitle }: FeatureCardProps) => {
  return (
    <div className="rounded-2xl bg-mybg1 py-5 flex flex-col items-center justify-center border border-secondary">
      <div className="text-2xl font-bold mb-4">{title}</div>
      <div className="gradient-text text-lg">{subtitle}</div>
    </div>
  );
};
