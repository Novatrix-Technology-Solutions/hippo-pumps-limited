import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import PumpSpecificationsForm from '@/components/forms/PumpSpecificationsForm';
import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

interface Props {
    categories: string[];
}

export default function Create({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: categories[0],
        q_max: null,
        h_max: null,
        rated_q: null,
        rated_h: null,
        motor: null,
        price_zmw: null,
        vat_rate: null,
        net_price_zmw: null,
        is_featured: false,
        order: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.pump-solutions.store'));
    };

    return (
        <>
            <Head title="Create Pump Solution" />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">Create Pump Solution</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Fill in the details for the new pump solution.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={handleSubmit}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                name="title"
                                                id="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.title && (
                                                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                                            )}
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                rows={3}
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.description && (
                                                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                                            )}
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                                Category
                                            </label>
                                            <Listbox value={data.category} onChange={(value) => setData('category', value)}>
                                                <div className="relative mt-1">
                                                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg border border-gray-300 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                                                        <span className="block truncate">{data.category}</span>
                                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                            <ChevronUpDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                        {categories.map((category) => (
                                                            <Listbox.Option
                                                                key={category}
                                                                value={category}
                                                                className={({ active }) =>
                                                                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                                                                    cursor-default select-none relative py-2 pl-10 pr-4`
                                                                }
                                                            >
                                                                {({ selected, active }) => (
                                                                    <>
                                                                        <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                                                                            {category}
                                                                        </span>
                                                                        {selected ? (
                                                                            <span className={`${active ? 'text-amber-600' : 'text-amber-600'} absolute inset-y-0 left-0 flex items-center pl-3`}>
                                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                            </span>
                                                                        ) : null}
                                                                    </>
                                                                )}
                                                            </Listbox.Option>
                                                        ))}
                                                    </Listbox.Options>
                                                </div>
                                            </Listbox>
                                            {errors.category && (
                                                <p className="mt-2 text-sm text-red-600">{errors.category}</p>
                                            )}
                                        </div>

                                        <div className="col-span-6">
                                            <PumpSpecificationsForm data={data} setData={setData} />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="order" className="block text-sm font-medium text-gray-700">
                                                Order
                                            </label>
                                            <input
                                                type="number"
                                                name="order"
                                                id="order"
                                                value={data.order}
                                                onChange={(e) => setData('order', parseInt(e.target.value))}
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            />
                                            {errors.order && (
                                                <p className="mt-2 text-sm text-red-600">{errors.order}</p>
                                            )}
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    name="is_featured"
                                                    id="is_featured"
                                                    checked={data.is_featured}
                                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                />
                                                <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
                                                    Featured
                                                </label>
                                            </div>
                                            {errors.is_featured && (
                                                <p className="mt-2 text-sm text-red-600">{errors.is_featured}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}