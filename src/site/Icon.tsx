const paths = {
  "arrow-up-right": "M5 19 19 5M5 5h14v14",
  "arrow-right": "M4 12h16m-7-7 7 7-7 7",
  "arrow-down": "M12 4v16m-7-7 7 7 7-7",
  "arrow-up": "M12 20V4m-7 7 7-7 7 7",
  asterisk: "M12 3v18M3 12h18M5.6 5.6l12.8 12.8M5.6 18.4 18.4 5.6",
  waves: "M3 8c6-6 12 6 18 0M3 16c6-6 12 6 18 0",
  "waves-three": "M3 6c6-6 12 6 18 0M3 12c6-6 12 6 18 0M3 18c6-6 12 6 18 0",
  wave: "M3 15c3 0 3-6 6-6s3 6 6 6 3-6 6-6",
  smile: "M3 9a9 9 0 0 0 18 0",
  circle: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18",
  diamond: "M12 3 21 12 12 21 3 12Z",
  sparkle: "M12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9Z",
};

export type IconName = keyof typeof paths;

export function Icon({ name }: { name: IconName }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
