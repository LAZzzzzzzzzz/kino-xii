import SessionDate from './SessionDate';

const SessionDatePicker = ({ options, selectedDate, onSelect }) => {
  return (
    <div
      aria-label="Session date"
      role="group"
      className="flex h-20 items-start gap-1.75"
    >
      {options.map((option) => (
        <SessionDate
          key={option.value}
          option={option}
          isSelected={option.value === selectedDate}
          onClick={() => onSelect(option.value)}
        />
      ))}
    </div>
  );
};

export default SessionDatePicker;
