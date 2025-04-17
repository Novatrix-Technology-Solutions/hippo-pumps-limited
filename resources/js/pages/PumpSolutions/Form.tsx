import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Textarea } from '@/Components/ui/textarea';
import { Switch } from '@/Components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import InputError from '@/Components/InputError';

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
    const { data, setData, post, put, processing, errors } = useForm<PumpSolution>({
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
        <form onSubmit={submit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    required
                />
                <InputError message={errors.title} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    required
                    rows={5}
                />
                <InputError message={errors.description} />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                    id="image"
                    type="file"
                    onChange={e => setData('image', e.target.files?.[0] || null)}
                    accept="image/*"
                />
                <InputError message={errors.image} />
            </div>

            <div className="space-y-2">
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
            </div>

            <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                    id="order"
                    type="number"
                    value={data.order}
                    onChange={e => setData('order', parseInt(e.target.value))}
                    required
                />
                <InputError message={errors.order} />
            </div>

            <div className="flex items-center space-x-2">
                <Switch
                    id="is_featured"
                    checked={data.is_featured}
                    onCheckedChange={(checked) => setData('is_featured', checked)}
                />
                <Label htmlFor="is_featured">Featured Solution</Label>
                <InputError message={errors.is_featured} />
            </div>

            <div className="flex justify-end space-x-4">
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
            </div>
        </form>
    );
} 