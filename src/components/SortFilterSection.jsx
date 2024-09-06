import React from 'react';
import '../styles/FilterSection.css';

const SortFilterSection = ({
  selectedFuel,
  setSelectedFuel,
  priceRange,
  setPriceRange,
  sortOrder,
  setSortOrder
}) => {
  const handleFuelChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSelectedFuel(prev =>
      prev.includes(value) ? prev.filter(fuel => fuel !== value) : [...prev, value]
    );
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const newValue = Number(value) * 100000;
    setPriceRange(prev => {
      const newRange = { ...prev, [name]: newValue };
      if (newRange.min > newRange.max) {
        alert('Min price cannot be greater than Max price.');
        return prev;
      }
      return newRange;
    });
  };

  return (
    <aside className="filter-section">
      <div className="filter-group">
        <h4>Fuel</h4>
        {['Petrol', 'Diesel', 'CNG', 'LPG', 'Electric', 'Hybrid'].map((fuel, index) => (
          <label key={fuel}>
            <input
              type="checkbox"
              value={index + 1}
              checked={selectedFuel.includes(index + 1)}
              onChange={handleFuelChange}
            />
            {fuel}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Price Range (in Lakhs)</h4>
        <input type="number" name="min" placeholder="Min" onBlur={handlePriceChange} /> - 
        <input type="number" name="max" placeholder="Max" onBlur={handlePriceChange} />
      </div>
    </aside>
  );
};

export default SortFilterSection;
