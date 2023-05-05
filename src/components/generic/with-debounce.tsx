import { ChangeEvent, FC, useEffect, useState } from "react";

/**
 * Component properties
 */
interface Props {
  className?: string;
  component: (props: DebounceProps) => React.ReactElement;
  key?: string | number;
  disabled?: boolean;
  name?: string;
  label?: string;
  debounceTimeout?: number;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  fullWidth?: boolean;
}

/**
 * Interface representing debounce properties given to render function
 */
interface DebounceProps {
  key?: string | number;
  disabled?: boolean;
  name?: string;
  label?: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder: string;
  type?: string;
  fullWidth?: boolean;
}

/**
 * Component for applying debounce to any text input
 */
const WithDebounce: FC<Props> = ({
  name,
  disabled,
  label,
  value,
  className,
  debounceTimeout,
  key,
  onChange,
  component,
  placeholder,
  type,
  fullWidth
}) => {
  const [ inputValue, setInputValue ] = useState(value);
  const [ debounceTimer, setDebounceTimer ] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  /**
   * Event handler for text field value change
   *
   * @param event react change event
   */
  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    debounceTimer && clearTimeout(debounceTimer);

    const newDebounceTimer = window.setTimeout(() => onChange(event), debounceTimeout ?? 1000);

    setDebounceTimer(newDebounceTimer);
    setInputValue(event.target.value);
  };

  return component({
    name: name,
    disabled: disabled,
    value: inputValue,
    className: className,
    key: key,
    label: label,
    onChange: onInputChange,
    placeholder: placeholder,
    type: type ?? "text",
    fullWidth: fullWidth
  });
};

export default WithDebounce;