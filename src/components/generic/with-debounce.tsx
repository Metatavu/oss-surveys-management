import { ChangeEvent, FC, useEffect, useState } from "react";

/**
 * Component properties
 */
interface Props {
  className?: string;
  component: (props: DebounceProps) => React.ReactElement;
  optionKey?: string | number;
  disabled?: boolean;
  name?: string;
  label?: string;
  debounceTimeout?: number;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, previousOption?: string) => Promise<void>;
  placeholder: string;
  type?: string;
  fullWidth?: boolean;
  previousOption?: string;
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
  onChange: (event: React.ChangeEvent<HTMLInputElement>, previousOption?: string) => void;
  className?: string;
  placeholder: string;
  type?: string;
  fullWidth?: boolean;
  previousOption?: string;
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
  optionKey,
  onChange,
  component,
  placeholder,
  type,
  fullWidth,
  previousOption
}) => {
  const [ inputValue, setInputValue ] = useState(value);
  const [ debounceTimer, setDebounceTimer ] = useState<number>();

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

    const newDebounceTimer = previousOption ?
      window.setTimeout(() => onChange(event, previousOption), debounceTimeout ?? 1000)
      : window.setTimeout(() => onChange(event), debounceTimeout ?? 1000);

    setDebounceTimer(newDebounceTimer);
    setInputValue(event.target.value);
  };

  return component({
    name: name,
    disabled: disabled,
    value: inputValue,
    className: className,
    key: optionKey,
    label: label,
    onChange: onInputChange,
    placeholder: placeholder,
    type: type ?? "text",
    fullWidth: fullWidth
  });
};

export default WithDebounce;