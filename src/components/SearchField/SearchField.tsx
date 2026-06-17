import { useCallback } from 'react';

type SearchFieldProps = {
  formClassName: string;
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
};

const SearchField = ({
  formClassName,
  value,
  onChange,
  onSubmit,
}: SearchFieldProps) => {
  const handleSubmit = useCallback(
    (e: React.SubmitEvent) => {
      e.preventDefault();
      onSubmit(value);
    },
    [onSubmit, value]
  );

  return (
    <form
      data-id="search-form"
      className={formClassName}
      onSubmit={handleSubmit}
    >
      <input
        className="form-control"
        placeholder="Поиск"
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
      />
    </form>
  );
};

export default SearchField;
