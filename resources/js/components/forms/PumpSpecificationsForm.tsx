import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Props {
    data: {
        q_max?: number | null;
        h_max?: number | null;
        rated_q?: number | null;
        rated_h?: number | null;
        motor?: number | null;
        price_zmw?: number | null;
        vat_rate?: number | null;
        net_price_zmw?: number | null;
    };
    setData: (key: string, value: any) => void;
}

export default function PumpSpecificationsForm({ data, setData }: Props) {
    // Calculate net price when price or VAT rate changes
    useEffect(() => {
        if (data.price_zmw !== null && data.vat_rate !== null) {
            const vatAmount = (data.price_zmw * data.vat_rate) / 100;
            setData('net_price_zmw', data.price_zmw + vatAmount);
        } else if (data.price_zmw !== null) {
            setData('net_price_zmw', data.price_zmw);
        }
    }, [data.price_zmw, data.vat_rate]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Q.Max (m³/hr)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.q_max || ''}
                        onChange={(e) => setData('q_max', e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">H.Max (m)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.h_max || ''}
                        onChange={(e) => setData('h_max', e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Rated Q (m³/hr)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.rated_q || ''}
                        onChange={(e) => setData('rated_q', e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Rated H (m)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.rated_h || ''}
                        onChange={(e) => setData('rated_h', e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Motor (HP)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.motor || ''}
                        onChange={(e) => setData('motor', e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Price (ZMW)</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">ZMW</span>
                        </div>
                        <input
                            type="number"
                            step="0.01"
                            value={data.price_zmw || ''}
                            onChange={(e) => setData('price_zmw', e.target.value ? parseFloat(e.target.value) : null)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 rounded-md border-gray-300"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">VAT Rate (%)</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                            type="number"
                            step="0.01"
                            value={data.vat_rate || ''}
                            onChange={(e) => setData('vat_rate', e.target.value ? parseFloat(e.target.value) : null)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md border-gray-300"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">%</span>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Net Price (ZMW)</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">ZMW</span>
                        </div>
                        <input
                            type="number"
                            step="0.01"
                            value={data.net_price_zmw || ''}
                            readOnly
                            className="bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-12 rounded-md border-gray-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
} 