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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <div className="space-y-2 text-gray-600">
            <p><span className="font-medium">Category:</span> {product.category}</p>
            {product.q_max && <p><span className="font-medium">Q Max:</span> {product.q_max}</p>}
            {product.h_max && <p><span className="font-medium">H Max:</span> {product.h_max}</p>}
            {product.rated_q && <p><span className="font-medium">Rated Q:</span> {product.rated_q}</p>}
            {product.rated_h && <p><span className="font-medium">Rated H:</span> {product.rated_h}</p>}
            {product.motor && <p><span className="font-medium">Motor:</span> {product.motor}</p>}
            {product.price_zmw_including_vat && (
              <p className="text-lg font-bold text-primary-600">
                ZMW {parseFloat(product.price_zmw_including_vat).toLocaleString()}
              </p>
            )}
          </div>
          <div className="mt-4">
            <Link
              href={route('products.show', product.slug)}
              className="inline-block bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
            >
              View Details
            </Link>
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
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-900 mb-4"
                  >
                    {product.title}
                  </Dialog.Title>

                  <div className="mt-2">
                    <p className="text-gray-600 mb-6">{product.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {product.q_max && <Spec label="Q.Max (m³/hr)" value={product.q_max} />}
                      {product.h_max && <Spec label="H.Max (m)" value={product.h_max} />}
                      {product.rated_q && <Spec label="Rated Q (m³/hr)" value={product.rated_q} />}
                      {product.rated_h && <Spec label="Rated H (m)" value={product.rated_h} />}
                      {product.motor && <Spec label="Motor (HP)" value={product.motor} />}
                      {product.price_zmw_including_vat && (
                        <Spec
                          label="Price"
                          value={formatPrice(parseFloat(product.price_zmw_including_vat))}
                        />
                      )}
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Close
                      </button>
                      <Link
                        href={route('find-us')}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
