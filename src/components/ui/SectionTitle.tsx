import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      {subtitle && (
        <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
        {title}
      </h2>
      <div className="w-20 h-1 bg-blue-600 mx-auto rounded"></div>
    </div>
  );
};

export default SectionTitle;
