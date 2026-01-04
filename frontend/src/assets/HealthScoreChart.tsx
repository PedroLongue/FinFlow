import type { SVGProps } from "react";

interface HealthScoreChartProps extends SVGProps<SVGSVGElement> {
  score?: number;
  isEmpty?: boolean;
  size?: number;
  showGradient?: boolean;
}

export const HealthScoreChart = ({
  score = 0,
  isEmpty = false,
  size = 100,
  showGradient = true,
  className,
  ...props
}: HealthScoreChartProps) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <svg
      className={`w-full h-full -rotate-90 ${className || ""}`}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      {...props}
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="currentColor"
        strokeWidth="8"
        fill="none"
        className="text-muted/30"
      />

      {isEmpty && (
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          strokeDasharray="10 8"
          className="text-muted/20"
        />
      )}

      {!isEmpty && score > 0 && (
        <>
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={showGradient ? "url(#scoreGradient)" : "currentColor"}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />

          {showGradient && (
            <defs>
              <linearGradient
                id="scoreGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
                <stop offset="100%" stopColor="hsl(160, 84%, 39%)" />
              </linearGradient>
            </defs>
          )}
        </>
      )}
    </svg>
  );
};
