import { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoIosArrowForward } from 'react-icons/io';
import { BiArrowBack } from 'react-icons/bi';

// Sample nested options (can be reused for any parent-child structure)
const options = {
  Group1: ['Option A1', 'Option A2', 'Option A3'],
  Group2: ['Option B1', 'Option B2'],
  Group3: ['Option C1', 'Option C2', 'Option C3'],
};

const topLevelKeys = Object.keys(options);

export default function InputWithOptions() {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [expandedKey, setExpandedKey] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [iconVisible, setIconVisible] = useState(true);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getAllItems = () => {
    const all = [];
    for (const key of topLevelKeys) {
      all.push({ label: key, type: 'group' });
      for (const child of options[key]) {
        all.push({ label: child, type: 'item', parent: key });
      }
    }
    return all;
  };

  const handleMainChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);
    setExpandedKey(null);
    if (!value) setSelectedValue('');
    const searchValue = value.toLowerCase();
    const allItems = getAllItems();

    const results = searchValue
      ? allItems.filter((item) =>
        item.label.toLowerCase().includes(searchValue)
      )
      : topLevelKeys.map((key) => ({ label: key, type: 'group' }));

    setFiltered(results);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowDropdown(true);
    setExpandedKey(null);
    setFiltered(topLevelKeys.map((label) => ({ label, type: 'group' })));
    setIconVisible(true);
  };

  const handleIconClick = (e, key) => {
    e.stopPropagation();
    setExpandedKey(key);
    setFiltered(
      options[key].map((label) => ({
        label,
        type: 'item',
        parent: key,
      }))
    );
    setQuery('');
    setIconVisible(true);
  };

  const handleBackClick = () => {
    setExpandedKey(null);
    setFiltered(topLevelKeys.map((label) => ({ label, type: 'group' })));
  };

  const handleSelect = (item) => {
    if (item.type === 'group') {
      setExpandedKey(item.label);
      setFiltered(
        options[item.label].map((label) => ({
          label,
          type: 'item',
          parent: item.label,
        }))
      );
      setQuery('');
      setSelectedValue('');
      setIconVisible(false);
    } else {
      setQuery(item.label);
      setSelectedValue(item.label);
      setIconVisible(false);
      setShowDropdown(false);
      setExpandedKey(null);
    }
  };


  return (
    <div className="relative w-72" ref={wrapperRef}>
      {iconVisible && isFocused && !query && !selectedValue && (
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      )}

      <input
        type="text"
        value={query || selectedValue}
        onChange={handleMainChange}
        onFocus={handleFocus}
        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
        placeholder="Search..."
      />

      {showDropdown && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-xl max-h-64 overflow-auto divide-y divide-gray-100">
          {expandedKey && (
            <li className="flex items-center px-4 py-2 bg-gray-50">
              <button
                onClick={handleBackClick}
                className="flex items-center text-blue-600 text-sm font-medium hover:text-blue-800"
              >
                <BiArrowBack className="text-base mr-1" />
                Back
              </button>
            </li>
          )}

          {(filtered.length > 0
            ? filtered
            : [{ label: 'No matches', type: 'info' }]
          ).map((item, index) => (
            <li
              key={index}
              onClick={() => item.type !== 'info' && handleSelect(item)}
              className={`flex items-center justify-between px-4 py-2 text-sm ${item.type !== 'info'
                  ? 'hover:bg-blue-50 cursor-pointer'
                  : 'text-gray-400 cursor-default'
                }`}
            >
              <div className="flex flex-col">
                <span className={`${item.type === 'group' ? 'font-medium' : ''}`}>
                  {item.label}
                </span>
                {item.type === 'item' && (
                  <span className="text-xs text-gray-400 mt-0.5">
                    {item.parent}
                  </span>
                )}
              </div>
              {item.type === 'group' && (
                <IoIosArrowForward
                  className="text-gray-400 hover:text-blue-500"
                  onClick={(e) => handleIconClick(e, item.label)}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>

  );
}
