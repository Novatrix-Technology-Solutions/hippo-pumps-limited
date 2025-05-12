import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Product } from '@/types/product';

interface Specifications {
  qMax: number;
  hMax: number;
  ratedQ: number;
  ratedH: number;
  motor: number;
  price: number;
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(price));
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        onClick={() => setIsOpen(true)}
      >
        <div className="p-6">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-600 bg-primary-50 rounded-full">
              {product.category}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-4 text-gray-900">{product.title}</h2>
          <div className="space-y-3 text-gray-600">
            {product.q_max && (
              <div className="flex items-center">
                <span className="font-medium w-24">Q Max:</span>
                <span>{product.q_max}</span>
              </div>
            )}
            {product.h_max && (
              <div className="flex items-center">
                <span className="font-medium w-24">H Max:</span>
                <span>{product.h_max}</span>
              </div>
            )}
            {product.rated_q && (
              <div className="flex items-center">
                <span className="font-medium w-24">Rated Q:</span>
                <span>{product.rated_q}</span>
              </div>
            )}
            {product.rated_h && (
              <div className="flex items-center">
                <span className="font-medium w-24">Rated H:</span>
                <span>{product.rated_h}</span>
              </div>
            )}
            {product.motor && (
              <div className="flex items-center">
                <span className="font-medium w-24">Motor:</span>
                <span>{product.motor}</span>
              </div>
            )}
            {product.price_zmw_including_vat && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xl font-bold text-primary-600">
                  {formatPrice(product.price_zmw_including_vat)}
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 text-primary-600 font-medium">
            Click to view details →
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6 text-gray-900"
                    >
                      {product.title}
                    </Dialog.Title>
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-2">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex justify-between border-b py-2">
                        <span className="font-medium text-gray-700">Category</span>
                        <span className="text-gray-900">{product.category}</span>
                      </div>
                      {product.q_max && (
                        <div className="flex justify-between border-b py-2">
                          <span className="font-medium text-gray-700">Q Max</span>
                          <span className="text-gray-900">{product.q_max}</span>
                        </div>
                      )}
                      {product.h_max && (
                        <div className="flex justify-between border-b py-2">
                          <span className="font-medium text-gray-700">H Max</span>
                          <span className="text-gray-900">{product.h_max}</span>
                        </div>
                      )}
                      {product.rated_q && (
                        <div className="flex justify-between border-b py-2">
                          <span className="font-medium text-gray-700">Rated Q</span>
                          <span className="text-gray-900">{product.rated_q}</span>
                        </div>
                      )}
                      {product.rated_h && (
                        <div className="flex justify-between border-b py-2">
                          <span className="font-medium text-gray-700">Rated H</span>
                          <span className="text-gray-900">{product.rated_h}</span>
                        </div>
                      )}
                      {product.motor && (
                        <div className="flex justify-between border-b py-2">
                          <span className="font-medium text-gray-700">Motor</span>
                          <span className="text-gray-900">{product.motor}</span>
                        </div>
                      )}
                      {product.price_zmw_including_vat && (
                        <div className="flex justify-between border-b py-2">
                          <span className="font-medium text-gray-700">Price (Including VAT)</span>
                          <span className="text-gray-900 font-bold">
                            {formatPrice(product.price_zmw_including_vat)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex justify-end gap-4">
                      <Link
                        href={route('find-us')}
                        className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-colors"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const Spec = ({ label, value }: { label: string; value: number | string }) => (
  <div className="flex justify-between border-b py-2">
    <span className="font-medium text-gray-700">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
);
