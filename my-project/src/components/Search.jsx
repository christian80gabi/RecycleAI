import { useState } from 'react';


function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');
  const handleChange = (event) => {
    console.log('Typing...', event.target.value);
    const searchTerm = event.target.value.trim();
    setTerm(searchTerm);
    onSearch(searchTerm);
  }

  return (
    <div className='flex items-center justify-center bg-background mt-8'>
    <div className='flex border border-background rounded outline-none p-4 w-40'>
   <img src='images/icons8-search-25.png' alt='search icon' className='mr-4'/>
    <input
      className="flex-grow outline-none"
      type="text"
      placeholder="Search"
      value={term}
      onChange={handleChange}
    />
    <img src='images/icons8-menu-25.png' alt='menu icon' className='ml-2'/>
    </div>
    </div>
  );
}

export default SearchBar;
