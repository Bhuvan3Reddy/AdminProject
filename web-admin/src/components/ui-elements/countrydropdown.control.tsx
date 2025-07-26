import Select from "react-select";
import { Label } from "flowbite-react";
import { useEffect, useState } from "react";

interface Props {
  value: string;
  error?: string;
  onChange: (value: string) => void;
}
export interface CountryCodeOption {
  label: string;
  value: string;
}
export const countryCodes: CountryCodeOption[] = [
  { label: 'Australia (+61)', value: '+61' },
  { label: 'Canada (+1)', value: '+1' },
  { label: 'France (+33)', value: '+33' },
  { label: 'Germany (+49)', value: '+49' },
  { label: 'India (+91)', value: '+91' },
  { label: 'Saudi Arabia (+966)', value: '+966' },
  { label: 'Singapore (+65)', value: '+65' },
  { label: 'UAE (+971)', value: '+971' },
  { label: 'United Kingdom (+44)', value: '+44' },
  { label: 'United States (+1)', value: '+1' },
];

const CountryCodeSelect = ({ value, error, onChange }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode via class on <html> or <body>
  useEffect(() => {
    const checkDark = () =>
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const selectedOption = countryCodes.find((option) => option.value === value);

  return (
    <div className="col-span-1">
      <div className="mb-2">
        <Label htmlFor="countrycode">
          Country Code <span className="text-red-500">*</span>
        </Label>
      </div>
      <Select
        options={countryCodes}
        value={selectedOption || null}
        onChange={(selected) => onChange(selected?.value || "")}
        isClearable
        placeholder="Select Country Code"
        styles={{
          control: (base) => ({
            ...base,
            minHeight: '42px',
            borderColor: isDarkMode ? 'var(--color-darkborder)' : '#D1D5DB', 
            backgroundColor: isDarkMode ? 'var(--color-darkgray)' : '#fff', 
            color: isDarkMode ? '#F9FAFB' : '#111827', // text color
            borderRadius: '9px',
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: isDarkMode ? '#1F2937' : '#fff',
            color: isDarkMode ? '#F9FAFB' : '#111827',
          }),
          option: (base, { isFocused }) => ({
            ...base,
            backgroundColor: isFocused
              ? isDarkMode ? '#374151' : '#E5E7EB'
              : 'transparent',
            color: isDarkMode ? '#F9FAFB' : '#111827',
          }),
          singleValue: (base) => ({
            ...base,
            color: isDarkMode ? '#F9FAFB' : '#111827',
          }),
        }}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default CountryCodeSelect;
