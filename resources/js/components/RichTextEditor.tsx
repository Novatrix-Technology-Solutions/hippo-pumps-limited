import React, { useRef } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    error?: string | null;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label, error }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    const formatText = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
            </label>
            
            <div className="border rounded-md dark:border-gray-600 bg-white dark:bg-gray-800">
                <div className="p-2 border-b dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => formatText('bold')}
                            className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                            title="Bold"
                        >
                            <strong>B</strong>
                        </button>
                        <button
                            type="button"
                            onClick={() => formatText('italic')}
                            className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                            title="Italic"
                        >
                            <em>I</em>
                        </button>
                        <button
                            type="button"
                            onClick={() => formatText('underline')}
                            className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                            title="Underline"
                        >
                            <u>U</u>
                        </button>
                        <select
                            onChange={(e) => formatText('fontSize', e.target.value)}
                            className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                        >
                            <option value="">Font Size</option>
                            <option value="1">Small</option>
                            <option value="3">Medium</option>
                            <option value="5">Large</option>
                            <option value="7">Extra Large</option>
                        </select>
                        <select
                            onChange={(e) => formatText('foreColor', e.target.value)}
                            className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                        >
                            <option value="">Text Color</option>
                            <option value="red">Red</option>
                            <option value="blue">Blue</option>
                            <option value="green">Green</option>
                            <option value="black">Black</option>
                        </select>
                        <select
                            onChange={(e) => formatText('hiliteColor', e.target.value)}
                            className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                        >
                            <option value="">Highlight Color</option>
                            <option value="yellow">Yellow</option>
                            <option value="lightblue">Light Blue</option>
                            <option value="lightgreen">Light Green</option>
                        </select>
                        <button
                            type="button"
                            onClick={() => formatText('insertUnorderedList')}
                            className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                            title="Bullet List"
                        >
                            • List
                        </button>
                        <button
                            type="button"
                            onClick={() => formatText('insertOrderedList')}
                            className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                            title="Numbered List"
                        >
                            1. List
                        </button>
                    </div>
                </div>
                
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    className="p-4 min-h-[200px] focus:outline-none text-gray-800 dark:text-gray-200"
                    dangerouslySetInnerHTML={{ __html: value }}
                />
            </div>
            
            {error && (
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            )}
        </div>
    );
};

export default RichTextEditor; 