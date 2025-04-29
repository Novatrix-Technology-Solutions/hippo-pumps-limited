import { useForm } from '@inertiajs/react';

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
                    <label className="block text-sm font-medium text-gray-700">Price ZMW (No VAT)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.price_zmw || ''}
                        onChange={(e) => setData('price_zmw', e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">VAT Rate (%)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.vat_rate || ''}
                        onChange={(e) => setData('vat_rate', e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Net Price ZMW (Incl. VAT)</label>
                    <input
                        type="number"
                        step="0.01"
                        value={data.net_price_zmw || ''}
                        onChange={(e) => setData('net_price_zmw', e.target.value ? parseFloat(e.target.value) : null)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
            </div>
        </div>
    );
} 