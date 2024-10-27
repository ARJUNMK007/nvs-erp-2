import React, { useEffect, useState } from 'react';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faChartLine, faShoppingCart, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { dataRef } from '../utils/Firebabse'; 
import { PerformanceChart } from './PerformanceChart';
import { PolarArea } from 'react-chartjs-2'; // Import PolarArea
import {
  Chart as ChartJS,
  RadialLinearScale,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register the required components
ChartJS.register(RadialLinearScale, Tooltip, Legend, ArcElement);

const DashboardPage = () => {
  const PoNoRef = dataRef.child('PO');
  const [onProgressCount, setOnProgressCount] = useState(0);
  const [upcomingOrdersCount, setUpcomingOrdersCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0); // New state for completed orders

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await PoNoRef.once('value');
      const poData = snapshot.val();

      if (poData) {
        const onProgressCount = Object.keys(poData).filter(poKey => poData[poKey].status === "On Progress").length;
        const upcomingOrdersCount = Object.keys(poData).filter(poKey => !poData[poKey].status).length;
        const completedOrdersCount = Object.keys(poData).filter(poKey => poData[poKey].status === "Completed").length;

        setOnProgressCount(onProgressCount);
        setUpcomingOrdersCount(upcomingOrdersCount);
        setCompletedOrdersCount(completedOrdersCount);
      }
    };

    fetchData();
  }, [PoNoRef]);

  // Data for Polar Area Chart
  const polarData = {
    labels: ['On Progress', 'Upcoming', 'Completed'],
    datasets: [
      {
        label: 'Order Counts',
        data: [onProgressCount, upcomingOrdersCount, completedOrdersCount],
        backgroundColor: [
          'rgb(169, 169, 169)', // Color for "On Progress"
          'rgba(152,27,30,255)', // Color for "Upcoming"
          'rgba(249,161,27,255)', // Color for "Completed"
        ],
      },
    ],
  };

  return (
    <div className="w-full h-full p-6">
      {/* Search Bar */}
      {/* <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search here..."
          className="w-1/3 p-2 border rounded-full text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div> */}

      {/* Sales and Summary */}
      <h1 className="text-xl font-semibold mb-4">Sales and summary</h1>
      
      <div className="grid grid-cols-4 gap-4">

        {/* Card 2 */}
        <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
          <FontAwesomeIcon icon={faChartLine} className="text-blue-500 text-4xl mb-4" />
          <div className="text-xl font-semibold">{onProgressCount}</div>
          <div className="text-sm text-gray-500">Current Order</div>
        </div>

        {/* Card 4 */}
        <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
          <FontAwesomeIcon icon={faBagShopping} className="text-pink-500 text-4xl mb-4" />
          <div className="text-xl font-semibold">{upcomingOrdersCount}</div>
          <div className="text-sm text-gray-500">Upcoming Order</div>
        </div>

        {/* Card 1 */}
        <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
          <FontAwesomeIcon icon={faCalendar} className="text-purple-500 text-4xl mb-4" />
          <div className="text-xl font-semibold">{completedOrdersCount}</div>
          <div className="text-sm text-gray-500">Yearly Total Orders</div>
        </div>
        
      </div>
      
      {/* Polar Area Chart */}
     {/* Polar Area Chart */}
<div className="mt-6 flex justify-center">
  <div className="w-1/2 h-[100%]"> {/* Adjust width and height as needed */}
    <h2 className="text-lg font-semibold mb-2">Order Status Distribution</h2>
    <PolarArea data={polarData} options={{ responsive: true }} />
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
