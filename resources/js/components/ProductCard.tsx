import React from 'react';

interface ProductCardProps {
  modelName: string;
  flowRate: string;
  maxHead: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ modelName, flowRate, maxHead }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-lg font-semibold text-gray-800">{modelName}</h3>
      <p className="text-gray-600">Flow Rate: {flowRate}</p>
      <p className="text-gray-600">Max Head: {maxHead}</p>
    </div>
  );
};

export default ProductCard;