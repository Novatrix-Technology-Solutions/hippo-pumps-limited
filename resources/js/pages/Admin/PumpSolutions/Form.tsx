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
    title: string;
    slug: string;
    description: string;
    features: string[];
    specifications: string[];
    applications: string[];
    is_featured: boolean;
    order: number;
    media: { id: number; original_url: string }[];
}

interface Props {
    pumpSolution?: PumpSolution;
    isEdit?: boolean;
}

export default function Form({ pumpSolution, isEdit = false }: Props) {
    const { data, setData, post, put, errors, processing } = useForm({
        title: pumpSolution?.title || '',
        description: pumpSolution?.description || '',
        features: pumpSolution?.features || [''],
        specifications: pumpSolution?.specifications || [''],
        applications: pumpSolution?.applications || [''],
        is_featured: pumpSolution?.is_featured || false,
        order: pumpSolution?.order || 0,
        image: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        pumpSolution?.media && pumpSolution.media.length > 0
            ? pumpSolution.media[0].original_url
            : null
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && pumpSolution) {
            put(route('admin.pump-solutions.update', pumpSolution.slug));
        } else {
            post(route('admin.pump-solutions.store'));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addListItem = (field: 'features' | 'specifications' | 'applications') => {
        setData(field, [...data[field], '']);
    };

    const removeListItem = (field: 'features' | 'specifications' | 'applications', index: number) => {
        setData(
            field,
            data[field].filter((_, i) => i !== index)
        );
    };

    const updateListItem = (field: 'features' | 'specifications' | 'applications', index: number, value: string) => {
        const newItems = [...data[field]];
        newItems[index] = value;
        setData(field, newItems);
    };

    const renderListEditor = (field: 'features' | 'specifications' | 'applications', title: string) => {
        return (
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label>{title}</Label>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addListItem(field)}
                        className="flex items-center"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                    </Button>
                </div>
                {data[field].map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            value={item}
                            onChange={(e) => updateListItem(field, index, e.target.value)}
                            placeholder={`Enter ${title.toLowerCase()} item`}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeListItem(field, index)}
                            className="h-10 w-10 text-red-500 hover:text-red-600"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                {errors[field] && <div className="text-red-500 text-sm">{errors[field]}</div>}
            </div>
        );
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Enter product title"
                            />
                            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <RichTextEditor
                                id="description"
                                value={data.description}
                                onChange={(value) => setData('description', value)}
                                placeholder="Enter product description"
                            />
                            {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
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
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>
                            Add details about the product's features, specifications, and applications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {renderListEditor('features', 'Features')}
                        {renderListEditor('specifications', 'Specifications')}
                        {renderListEditor('applications', 'Applications')}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Image</CardTitle>
                        <CardDescription>
                            Upload a high-quality image of the product.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4">
                            {imagePreview && (
                                <div className="border rounded-md overflow-hidden w-40 h-40 mb-4">
                                    <img
                                        src={imagePreview}
                                        alt="Product preview"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            )}
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
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