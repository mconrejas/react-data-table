import React from 'react';
import './Spinner.scss';

const Spinner: React.FC = () => (
  <div className="flex items-center justify-center h-40">
    <div className="w-16 h-16 border-4 border-dotted border-blue-400 rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
