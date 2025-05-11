import { useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router';

function LocationSearchBox() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const keyword = searchParams.get('keyword') || '';

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = inputRef.current!.value.trim();
    if (value.length < 3) {
      setErrorMessage('City name must be at least 3 characters');
      inputRef.current!.focus();
      return;
    }
    setErrorMessage('');
    searchParams.set('keyword', value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          placeholder="Enter city name..."
          type="text"
          name="keyword"
          defaultValue={keyword}
          autoFocus
        />
        <button className="primary" type="submit">
          Search
        </button>
      </form>
      {errorMessage && (
        <div className="text-red-500 text-sm text-left mt-2">
          {errorMessage}
        </div>
      )}
    </>
  );
}

export default LocationSearchBox;
