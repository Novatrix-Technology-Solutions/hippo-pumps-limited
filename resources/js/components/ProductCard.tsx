import React from 'react';

interface Specifications {
  qMax: number;
  hMax: number;
  ratedQ: number;
  ratedH: number;
  motor: number;
  price: number;
}

interface Props {
  title: string;
  description: string;
  category: string;
  specifications: Specifications;
}

export default function ProductCard({ title, description, category, specifications }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
          <Spec label="Q.Max (m³/hr)" value={specifications.qMax} />
          <Spec label="H.Max (m)" value={specifications.hMax} />
          <Spec label="Rated Q (m³/hr)" value={specifications.ratedQ} />
          <Spec label="Rated H (m)" value={specifications.ratedH} />
          <Spec label="Motor (HP)" value={specifications.motor} />
          <Spec
            label="Price (ZMW)"
            value={
              specifications.price
                ? `ZMW ${specifications.price.toLocaleString()}`
                : 'N/A'
            }
          />
        </div>
      </div>
    </div>
  );
}

const Spec = ({ label, value }: { label: string; value: number | string }) => (
  <div className="flex justify-between border-b py-1">
    <span className="font-medium">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);
