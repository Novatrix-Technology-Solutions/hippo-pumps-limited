import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import RichTextEditor from '@/components/RichTextEditor';
import { X, Plus } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface PumpSolution {
    id: number;
    category: string;
    title: string;
    slug: string;
    q_max: string;
    h_max: string;
    rated_q: string;
    rated_h: string;
    motor: string;
    price_zmw_no_vat: string;
    vat_rate: string;
    price_zmw_including_vat: string;
    is_featured: boolean;
    order: number;
}

interface Props {
    pumpSolution?: PumpSolution;
    isEdit?: boolean;
}

export default function Form({ pumpSolution, isEdit = false }: Props) {
    const { data, setData, post, put, errors, processing } = useForm({
        category: pumpSolution?.category || '',
        title: pumpSolution?.title || '',
        q_max: pumpSolution?.q_max || '',
        h_max: pumpSolution?.h_max || '',
        rated_q: pumpSolution?.rated_q || '',
        rated_h: pumpSolution?.rated_h || '',
        motor: pumpSolution?.motor || '',
        price_zmw_no_vat: pumpSolution?.price_zmw_no_vat || '',
        vat_rate: pumpSolution?.vat_rate || '',
        price_zmw_including_vat: pumpSolution?.price_zmw_including_vat || '',
        is_featured: pumpSolution?.is_featured || false,
        order: pumpSolution?.order || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && pumpSolution) {
            put(route('admin.pump-solutions.update', pumpSolution.slug));
        } else {
            post(route('admin.pump-solutions.store'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                            Add the core details about the product.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <select
                                id="category"
                                value={data.category}
                                onChange={(e) => setData('category', e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option value="">Select Category</option>
                                <option value="SOLAR PUMPS">SOLAR PUMPS</option>
                                <option value="SOLAR PUMPS MAX">SOLAR PUMPS MAX</option>
                                <option value="SEWAGE PUMPS">SEWAGE PUMPS</option>
                                <option value="SUBMERSIBLE PUMPS">SUBMERSIBLE PUMPS</option>
                                <option value="BOOSTER PUMPS">BOOSTER PUMPS</option>
                                <option value="SPRINKLER PUMPS">SPRINKLER PUMPS</option>
                                <option value="SOLAR PANEL">SOLAR PANEL</option>
                                <option value="SOLAR LIGHT">SOLAR LIGHT</option>
                                <option value="WIRE ROPE">WIRE ROPE</option>
                            </select>
                            {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Enter product title"
                            />
                            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="order">Display Order</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value))}
                                    placeholder="Enter display order"
                                />
                                {errors.order && <div className="text-red-500 text-sm">{errors.order}</div>}
                            </div>

                            <div className="space-y-2">
                                <Label className="block mb-4">Settings</Label>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_featured"
                                        checked={data.is_featured}
                                        onCheckedChange={(checked) => setData('is_featured', checked as boolean)}
                                    />
                                    <label
                                        htmlFor="is_featured"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Featured Product
                                    </label>
                                </div>
                                {errors.is_featured && <div className="text-red-500 text-sm">{errors.is_featured}</div>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Specifications</CardTitle>
                        <CardDescription>
                            Add the product's specifications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="q_max">Q.Max (m³/hr)</Label>
                                <Input
                                    id="q_max"
                                    type="text"
                                    value={data.q_max}
                                    onChange={(e) => setData('q_max', e.target.value)}
                                    placeholder="Enter Q.Max (m³/hr)"
                                />
                                {errors.q_max && <div className="text-red-500 text-sm">{errors.q_max}</div>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="h_max">H.Max (m)</Label>
                                <Input
                                    id="h_max"
                                    type="text"
                                    value={data.h_max}
                                    onChange={(e) => setData('h_max', e.target.value)}
                                    placeholder="Enter H.Max (m)"
                                />
                                {errors.h_max && <div className="text-red-500 text-sm">{errors.h_max}</div>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="rated_q">RatedQ (m³/hr)</Label>
                                <Input
                                    id="rated_q"
                                    type="text"
                                    value={data.rated_q}
                                    onChange={(e) => setData('rated_q', e.target.value)}
                                    placeholder="Enter RatedQ (m³/hr)"
                                />
                                {errors.rated_q && <div className="text-red-500 text-sm">{errors.rated_q}</div>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="rated_h">RatedH (m)</Label>
                                <Input
                                    id="rated_h"
                                    type="text"
                                    value={data.rated_h}
                                    onChange={(e) => setData('rated_h', e.target.value)}
                                    placeholder="Enter RatedH (m)"
                                />
                                {errors.rated_h && <div className="text-red-500 text-sm">{errors.rated_h}</div>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="motor">MOTOR (HP)</Label>
                            <Input
                                id="motor"
                                type="text"
                                value={data.motor}
                                onChange={(e) => setData('motor', e.target.value)}
                                placeholder="Enter MOTOR (HP)"
                            />
                            {errors.motor && <div className="text-red-500 text-sm">{errors.motor}</div>}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Price Information</CardTitle>
                        <CardDescription>
                            Add the product's price information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="price_zmw_no_vat">Price ZMW (No VAT)</Label>
                            <Input
                                id="price_zmw_no_vat"
                                type="text"
                                value={data.price_zmw_no_vat}
                                onChange={(e) => setData('price_zmw_no_vat', e.target.value)}
                                placeholder="Enter Price ZMW (No VAT)"
                            />
                            {errors.price_zmw_no_vat && <div className="text-red-500 text-sm">{errors.price_zmw_no_vat}</div>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="vat_rate">VAT Rate</Label>
                            <Input
                                id="vat_rate"
                                type="text"
                                value={data.vat_rate}
                                onChange={(e) => setData('vat_rate', e.target.value)}
                                placeholder="Enter VAT Rate"
                            />
                            {errors.vat_rate && <div className="text-red-500 text-sm">{errors.vat_rate}</div>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price_zmw_including_vat">Price ZMW Including VAT</Label>
                            <Input
                                id="price_zmw_including_vat"
                                type="text"
                                value={data.price_zmw_including_vat}
                                onChange={(e) => setData('price_zmw_including_vat', e.target.value)}
                                placeholder="Enter Price ZMW Including VAT"
                            />
                            {errors.price_zmw_including_vat && <div className="text-red-500 text-sm">{errors.price_zmw_including_vat}</div>}
                        </div>
                    </CardContent>
                </Card>

                <CardFooter className="flex justify-end space-x-4 px-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={processing}>
                        {isEdit ? 'Update Product' : 'Create Product'}
                    </Button>
                </CardFooter>
            </div>
        </form>
    );
} 