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
    image?: File | null;
    category: string;
    specifications: Record<string, string>;
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
        image: null,
        category: pumpSolution?.category || categories[0],
        specifications: pumpSolution?.specifications || {},
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
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={e => setData('image', e.target.files?.[0] || null)}
                            accept="image/*"
                        />
                        <InputError message={errors.image} />
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