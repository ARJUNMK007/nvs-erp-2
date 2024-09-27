import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChartLine, faShoppingCart, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { PerformanceChart } from './PerformanceChart';

const DashboardPage = () => {
  return (
    <div className="w-full h-full p-6">
      {/* Search Bar */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search here..."
          className="w-1/3 p-2 border rounded-full text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Sales and Summary */}
      <h1 className="text-xl font-semibold mb-4">Sales and summary</h1>
      
      <div className="grid grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
          <FontAwesomeIcon icon={faCalendar} className="text-purple-500 text-4xl mb-4" />
          <div className="text-xl font-semibold">$ 250,423</div>
          <div className="text-sm text-gray-500">Yearly Total Sales</div>
        </div>
        
        {/* Card 2 */}
        <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
          <FontAwesomeIcon icon={faChartLine} className="text-blue-500 text-4xl mb-4" />
          <div className="text-xl font-semibold">56</div>
          <div className="text-sm text-gray-500">Current Order</div>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
          <FontAwesomeIcon icon={faShoppingCart} className="text-orange-500 text-4xl mb-4" />
          <div className="text-xl font-semibold">$ 150,423</div>
          <div className="text-sm text-gray-500">Stock Purchase Cost</div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
          <FontAwesomeIcon icon={faBagShopping} className="text-pink-500 text-4xl mb-4" />
          <div className="text-xl font-semibold">256</div>
          <div className="text-sm text-gray-500">Upcoming Order</div>
        </div>
      </div>
      {/* <div class="flex">
  <div class="w-1/2"><PerformanceChart performance='performance'/></div>
  <div class="w-1/2"><PerformanceChart performance='finance'/></div>
</div> */}
    </div>
  );
};

export default DashboardPage;
