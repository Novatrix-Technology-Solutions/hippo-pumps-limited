import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import AnimatedPage from '@/components/Animated/AnimatedPage';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/InputError';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/Utils/animations';

interface PumpSolution {
    id?: number;
    title: string;
    slug?: string;
    description: string;
    category: string;
    q_max: string;
    h_max: string;
    rated_q: string;
    rated_h: string;
    motor: string;
    price_zmw_no_vat: string;
    vat_rate: string;
    nett_price_zmw_incl_vat: string;
    is_featured: boolean;
    order: number;
}

type PumpSolutionFormData = PumpSolution & {
    [key: string]: string | number | boolean | File | null | Record<string, string> | undefined;
}

interface Props {
    pumpSolution?: PumpSolution;
    isEditing?: boolean;
}

const categories = [
    'Building Services',
    'Irrigation',
    'Mining',
    'Industrial'
];

export default function PumpSolutionForm({ pumpSolution, isEditing = false }: Props) {
    const { data, setData, post, put, processing, errors } = useForm<PumpSolutionFormData>({
        title: pumpSolution?.title || '',
        description: pumpSolution?.description || '',
        category: pumpSolution?.category || categories[0],
        q_max: pumpSolution?.q_max || '',
        h_max: pumpSolution?.h_max || '',
        rated_q: pumpSolution?.rated_q || '',
        rated_h: pumpSolution?.rated_h || '',
        motor: pumpSolution?.motor || '',
        price_zmw_no_vat: pumpSolution?.price_zmw_no_vat || '',
        vat_rate: pumpSolution?.vat_rate || '',
        nett_price_zmw_incl_vat: pumpSolution?.nett_price_zmw_incl_vat || '',
        is_featured: pumpSolution?.is_featured || false,
        order: pumpSolution?.order || 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (isEditing && pumpSolution?.id) {
            put(route('pump-solutions.update', pumpSolution.id));
        } else {
            post(route('pump-solutions.store'));
        }
    };

    return (
        <AnimatedPage>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="py-6"
            >
                <form onSubmit={submit} className="space-y-6">
                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            required
                        />
                        <InputError message={errors.title} />
                    </motion.div>

                    <motion.div variants={staggerItem}>
                        <RichTextEditor
                            label="Description"
                            value={data.description}
                            onChange={(value) => setData('description', value)}
                            error={errors.description ?? null}
                        />
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={data.category}
                            onValueChange={(value) => setData('category', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.category} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="q_max">Q.Max (m/hr)</Label>
                        <Input
                            id="q_max"
                            value={data.q_max}
                            onChange={e => setData('q_max', e.target.value)}
                            required
                        />
                        <InputError message={errors.q_max} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="h_max">H.Max (m)</Label>
                        <Input
                            id="h_max"
                            value={data.h_max}
                            onChange={e => setData('h_max', e.target.value)}
                            required
                        />
                        <InputError message={errors.h_max} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="rated_q">RatedQ (m/hr)</Label>
                        <Input
                            id="rated_q"
                            value={data.rated_q}
                            onChange={e => setData('rated_q', e.target.value)}
                            required
                        />
                        <InputError message={errors.rated_q} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="rated_h">RatedH (m)</Label>
                        <Input
                            id="rated_h"
                            value={data.rated_h}
                            onChange={e => setData('rated_h', e.target.value)}
                            required
                        />
                        <InputError message={errors.rated_h} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="motor">MOTOR</Label>
                        <Input
                            id="motor"
                            value={data.motor}
                            onChange={e => setData('motor', e.target.value)}
                            required
                        />
                        <InputError message={errors.motor} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="price_zmw_no_vat">Price ZMW No VAT</Label>
                        <Input
                            id="price_zmw_no_vat"
                            value={data.price_zmw_no_vat}
                            onChange={e => setData('price_zmw_no_vat', e.target.value)}
                            required
                        />
                        <InputError message={errors.price_zmw_no_vat} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="vat_rate">VAT Rate</Label>
                        <Input
                            id="vat_rate"
                            value={data.vat_rate}
                            onChange={e => setData('vat_rate', e.target.value)}
                            required
                        />
                        <InputError message={errors.vat_rate} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="nett_price_zmw_incl_vat">Nett Price ZMW Incl VAT</Label>
                        <Input
                            id="nett_price_zmw_incl_vat"
                            value={data.nett_price_zmw_incl_vat}
                            onChange={e => setData('nett_price_zmw_incl_vat', e.target.value)}
                            required
                        />
                        <InputError message={errors.nett_price_zmw_incl_vat} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="space-y-2">
                        <Label htmlFor="order">Display Order</Label>
                        <Input
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={e => setData('order', parseInt(e.target.value))}
                            required
                        />
                        <InputError message={errors.order} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="flex items-center space-x-2">
                        <Switch
                            id="is_featured"
                            checked={data.is_featured}
                            onCheckedChange={(checked) => setData('is_featured', checked)}
                        />
                        <Label htmlFor="is_featured">Featured Solution</Label>
                        <InputError message={errors.is_featured} />
                    </motion.div>

                    <motion.div variants={staggerItem} className="flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700"
                            disabled={processing}
                        >
                            {isEditing ? 'Update' : 'Create'} Pump Solution
                        </Button>
                    </motion.div>
                </form>
            </motion.div>
        </AnimatedPage>
    );
} 