import FilterCheckbox from './FilterCheckbox';

const FilterCheckboxes = ({ options, selected, onToggle }) => {
  return (
    <div className="flex flex-col gap-3.5">
      {options.map((option) => (
        <FilterCheckbox
          key={option.value}
          label={option.label}
          detail={option.detail}
          isChecked={selected.includes(option.value)}
          onToggle={() => onToggle(option.value)}
        />
      ))}
    </div>
  );
};

export default FilterCheckboxes;
