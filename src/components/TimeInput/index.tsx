import { FiClock } from "react-icons/fi";
import MaskedInput from "react-text-mask";

import styles from './styles.module.scss';

const timeRegex = [/[0-5]/, /[0-9]/, ":", /[0-5]/, /[0-9]/];

interface ITimeInputProps {
  name: string;
  title: string;
  value: string;
  defaultValue?: string;
  error?: string;
  showError?: boolean;
  onChange: (...args:any[]) => void;
}

export const TimeInput = ({ title, name, value, defaultValue, error, showError, onChange  }: ITimeInputProps ) => {
  return (
    <div className="column-wrapper">
      <span>{title}</span>
      <div className={`row-wrapper ${styles.timeInput}`}>
        <MaskedInput
          mask={timeRegex}
          placeholder="00:00"
          value={value}
          defaultValue={defaultValue}
          name={name}
          onChange={onChange}
          type="text"
        />
        <div className="col-wrapper">
          <FiClock size={20} color="var(--text)" />
        </div>
      </div>
      {error && showError && (
        <span className="error">{error}</span>
      )}
    </div>
  );
}
