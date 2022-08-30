import SelectInput from "components/ui/select";
import { LANGUAGES, UNITS } from "constants/settings";
import { useState } from "react";

const Preferences = () => {
  const [language, setLanguage] = useState("en");
  const [unit, setUnit] = useState("metric");

  return (
    <div>
      <h3>Preferences</h3>

      {/* Languages */}
      <h4>Language</h4>
      <SelectInput
        options={LANGUAGES}
        value={LANGUAGES.find(option => option.value === language)}
        onChange={setLanguage}
        aria-label="Select a language"
      />

      {/* Units */}
      <h4>Units</h4>
      <SelectInput
        options={UNITS}
        value={UNITS.find(option => option.value === unit)}
        onChange={setUnit}
        aria-label="Select a unit"
      />
    </div>
  );
};

export default Preferences;
