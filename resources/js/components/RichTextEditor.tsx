import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import CharacterCount from '@tiptap/extension-character-count';
import { 
    Bold, 
    Italic, 
    List, 
    ListOrdered, 
    Link as LinkIcon,
    Image as ImageIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Heading1,
    Heading2,
    Heading3,
    Undo,
    Redo,
    Code,
    Table as TableIcon,
    Palette,
    Hash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    error?: string;
    placeholder?: string;
    maxLength?: number;
}

const RichTextEditor = ({ 
    value, 
    onChange, 
    label, 
    error, 
    placeholder = 'Start typing...', 
    maxLength 
}: RichTextEditorProps) => {
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageAlt, setImageAlt] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: {
                    HTMLAttributes: {
                        class: 'rounded-md bg-gray-900 p-4 text-white',
                    },
                },
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                  },
                  orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                  },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 hover:text-blue-700 underline',
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-lg max-w-full',
                },
            }),
            Placeholder.configure({
                placeholder,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'border-collapse table-auto w-full border border-gray-300',
                },
            }),
            TableRow.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300',
                },
            }),
            TableCell.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 p-2',
                },
            }),
            TableHeader.configure({
                HTMLAttributes: {
                    class: 'border border-gray-300 bg-gray-100 p-2',
                },
            }),
            CharacterCount.configure({
                limit: maxLength ?? 1000,
            }),
            Color,
            TextStyle.configure({
                types: ['textStyle'],
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const addLink = () => {
        if (linkUrl) {
            editor.chain().focus().setLink({ href: linkUrl }).run();
            setLinkUrl('');
            setIsLinkModalOpen(false);
        }
    };

    const addImage = () => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run();
            setImageUrl('');
            setImageAlt('');
            setIsImageModalOpen(false);
        }
    };

    const addTable = () => {
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    };

    const characterCount = editor.storage.characterCount?.characters() ?? 0;

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            
            <div className="border rounded-lg overflow-hidden bg-white">
                <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive('bold') && "bg-gray-200"
                        )}
                    >
                        <Bold className="h-4 w-4" />
                    </Button>
                    
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive('italic') && "bg-gray-200"
                        )}
                    >
                        <Italic className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive('heading', { level: 1 }) && "bg-gray-200"
                        )}
                    >
                        <Heading1 className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive('heading', { level: 2 }) && "bg-gray-200"
                        )}
                    >
                        <Heading2 className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive('heading', { level: 3 }) && "bg-gray-200"
                        )}
                    >
                        <Heading3 className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive('bulletList') && "bg-gray-200"
                        )}
                    >
                        <List className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive('orderedList') && "bg-gray-200"
                        )}
                    >
                        <ListOrdered className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive({ textAlign: 'left' }) && "bg-gray-200"
                        )}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive({ textAlign: 'center' }) && "bg-gray-200"
                        )}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive({ textAlign: 'right' }) && "bg-gray-200"
                        )}
                    >
                        <AlignRight className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive('codeBlock') && "bg-gray-200"
                        )}
                    >
                        <Code className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={addTable}
                        className={cn(
                            "h-8 w-8 p-0",
                            editor.isActive('table') && "bg-gray-200"
                        )}
                    >
                        <TableIcon className="h-4 w-4" />
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <Palette className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 bg-white p-4 shadow-lg border border-gray-200">
                            <div className="grid grid-cols-8 gap-1">
                                {[
                                    '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef',
                                    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
                                    '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
                                ].map((color) => (
                                    <button
                                        type="button"
                                        key={color}
                                        className="w-6 h-6 rounded-md hover:ring-2 hover:ring-offset-2 hover:ring-gray-400"
                                        style={{ backgroundColor: color }}
                                        onClick={() => editor.chain().focus().setColor(color).run()}
                                    />
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-8 w-8 p-0",
                                    editor.isActive('link') && "bg-gray-200"
                                )}
                            >
                                <LinkIcon className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                <DialogTitle>Add Link</DialogTitle>
                                <DialogDescription>
                                    Enter the URL for the link
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Input
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    className="bg-white"
                                />
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" onClick={() => setIsLinkModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={addLink}>
                                        Add Link
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <ImageIcon className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                <DialogTitle>Add Image</DialogTitle>
                                <DialogDescription>
                                    Enter the URL and alt text for the image
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Input
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="Image URL"
                                    className="bg-white"
                                />
                                <Input
                                    value={imageAlt}
                                    onChange={(e) => setImageAlt(e.target.value)}
                                    placeholder="Alt text"
                                    className="bg-white"
                                />
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" onClick={() => setIsImageModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button onClick={addImage}>
                                        Add Image
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().undo().run()}
                        className="h-8 w-8 p-0"
                    >
                        <Undo className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => editor.chain().focus().redo().run()}
                        className="h-8 w-8 p-0"
                    >
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>

                <EditorContent 
                    editor={editor} 
                    className="prose max-w-none p-4 min-h-[200px] focus:outline-none bg-white"
                />

                <div className="flex justify-end px-4 py-2 border-t bg-gray-50 text-sm text-gray-500">
                    {maxLength ? (
                        <span>{characterCount} / {maxLength} characters</span>
                    ) : (
                        <span>{characterCount} characters</span>
                    )}
                </div>
            </div>

            {error && (
                <p className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default RichTextEditor; 