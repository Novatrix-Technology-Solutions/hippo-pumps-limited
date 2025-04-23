import React, { useRef, useEffect } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    error?: string | null;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, label, error }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (editorRef.current && !editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    const formatText = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.execCommand('insertLineBreak');
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
                        {/* Text Style */}
                        <div className="flex gap-2 border-r dark:border-gray-600 pr-2">
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
                            <button
                                type="button"
                                onClick={() => formatText('strikeThrough')}
                                className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                                title="Strikethrough"
                            >
                                <s>S</s>
                            </button>
                        </div>

                        {/* Text Alignment */}
                        <div className="flex gap-2 border-r dark:border-gray-600 pr-2">
                            <button
                                type="button"
                                onClick={() => formatText('justifyLeft')}
                                className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                                title="Align Left"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M3 18h18M3 6h18" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => formatText('justifyCenter')}
                                className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                                title="Align Center"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M6 14h12M3 18h18M6 6h12" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => formatText('justifyRight')}
                                className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                                title="Align Right"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M9 14h12M3 18h18M9 6h12" />
                                </svg>
                            </button>
                        </div>

                        {/* Lists */}
                        <div className="flex gap-2 border-r dark:border-gray-600 pr-2">
                            <button
                                type="button"
                                onClick={() => formatText('insertUnorderedList')}
                                className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                                title="Bullet List"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => formatText('insertOrderedList')}
                                className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                                title="Numbered List"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Text Formatting */}
                        <div className="flex gap-2">
                            <select
                                onChange={(e) => formatText('formatBlock', e.target.value)}
                                className="px-2 py-1 text-sm bg-white dark:bg-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-500 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-500"
                            >
                                <option value="p">Paragraph</option>
                                <option value="h1">Heading 1</option>
                                <option value="h2">Heading 2</option>
                                <option value="h3">Heading 3</option>
                                <option value="h4">Heading 4</option>
                                <option value="h5">Heading 5</option>
                                <option value="h6">Heading 6</option>
                                <option value="pre">Preformatted</option>
                            </select>
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
                                <option value="black">Black</option>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="purple">Purple</option>
                                <option value="orange">Orange</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    onPaste={handlePaste}
                    onKeyDown={handleKeyDown}
                    className="p-4 min-h-[200px] focus:outline-none text-gray-800 dark:text-gray-200 whitespace-pre-wrap"
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