import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SortFilterSection from './components/SortFilterSection';
import ProductCard from './components/ProductCard';
import './styles/App.css';


import { stocks } from "./dummy/data/cars.json";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Number.MAX_SAFE_INTEGER });
  const [sortOrder, setSortOrder] = useState('asc');  

  useEffect(() => {
    const fetchData = async () => {
      // *************************** DUMMY DATA TO BE REMOVED LATER ***************************
      
      setProducts(stocks)

      // **************************************************************************************
      /*
      console.log(productsResponse.data.stocks);
      
      
      console.log(productsResponse);
      console.log(productsResponse.data);
      console.log(productsResponse.data.stocks);
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        // https://stg.carwale.com/api/stocks?fuel=1+2
        // axios.get('https://dummyjson.com/products'),
        // axios.get('https://dummyjson.com/c/2ddb-0dd0-4899-aef2'),
        // axios.get('https://stg.carwale.com/api/stocks?fuel=1+2+3+4+5+6&budget=0-'),
        axios.get('/api/stocks'),
        axios.get('https://dummyjson.com/products/categories')
      ]);
 
      setProducts(productsResponse.data.stocks);
 
 
      setFilteredProducts(productsResponse.data.stocks);
      setCategories(categoriesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
      */
      console.log(productsResponse);
    };
    fetchData();
  }, []);

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedFuel.length > 0) {
      filtered = filtered.filter(product => selectedFuel.includes(product.fuel));
    }

    filtered = filtered.filter(
      product => parseInt(product.priceNumeric) >= priceRange.min && parseInt(product.priceNumeric) <= priceRange.max
    );

    filtered.sort((a, b) => (sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating));
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFuel, priceRange, sortOrder, products]);

  return (
    <main className="app-main">
      <SortFilterSection
        selectedFuel={selectedFuel}
        setSelectedFuel={setSelectedFuel}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <section>
        <div className="sort-section">
          <h3>Sort by Rating</h3>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div className="products-list">
          {filteredProducts.map(product => (
            <ProductCard key={product.profileId} {...product} />
          ))}
        </div>
        <div className="results-count">{filteredProducts.length} results</div>
      </section>
    </main>
  );
};

export default App;