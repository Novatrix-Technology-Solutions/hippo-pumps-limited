import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Link } from '@inertiajs/react';

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
      <div 
        className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
            <Spec label="Q.Max (m³/hr)" value={specifications.qMax} />
            <Spec label="H.Max (m)" value={specifications.hMax} />
            <Spec label="Motor (HP)" value={specifications.motor} />
            <Spec
              label="Price"
              value={specifications.price ? formatPrice(specifications.price) : 'N/A'}
            />
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
                    {title}
                  </Dialog.Title>

                  <div className="mt-2">
                    <p className="text-gray-600 mb-6">{description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Spec label="Q.Max (m³/hr)" value={specifications.qMax} />
                      <Spec label="H.Max (m)" value={specifications.hMax} />
                      <Spec label="Rated Q (m³/hr)" value={specifications.ratedQ} />
                      <Spec label="Rated H (m)" value={specifications.ratedH} />
                      <Spec label="Motor (HP)" value={specifications.motor} />
                      <Spec
                        label="Price"
                        value={specifications.price ? formatPrice(specifications.price) : 'N/A'}
                      />
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
                        href={route('contact')}
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
