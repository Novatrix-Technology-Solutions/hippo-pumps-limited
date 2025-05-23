import { useState, createContext, useContext, Fragment } from 'react';
import { Link } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useUrl } from '@/hooks/use-url';

const DropDownContext = createContext<{
    open: boolean;
    setOpen: (open: boolean) => void;
    toggleOpen: () => void;
}>({
    open: false,
    setOpen: () => {},
    toggleOpen: () => {},
});

interface DropdownProps {
    children: React.ReactNode;
}

interface TriggerProps {
    children: React.ReactNode;
}

interface ContentProps {
    align?: 'left' | 'right';
    width?: string;
    contentClasses?: string;
    children: React.ReactNode;
}

interface LinkProps {
    href: string;
    method?: string;
    as?: string;
    className?: string;
    children: React.ReactNode;
}

const Dropdown = ({ children }: DropdownProps) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }: TriggerProps) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div onClick={toggleOpen}>{children}</div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({ align = 'right', width = '48', contentClasses = 'py-1 bg-white', children }: ContentProps) => {
    const { open, setOpen } = useContext(DropDownContext);
    const { getAbsoluteUrl } = useUrl();

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'origin-top-left left-0';
    } else if (align === 'right') {
        alignmentClasses = 'origin-top-right right-0';
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-48';
    }

    return (
        <>
            <Transition
                as={Fragment}
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <div
                    className={`absolute z-50 mt-2 rounded-md shadow-lg ${alignmentClasses} ${widthClasses}`}
                    onClick={() => setOpen(false)}
                >
                    <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>
                        {children}
                    </div>
                </div>
            </Transition>
        </>
    );
};

const DropdownLink = ({ href, method = 'post', as = 'a', className = '', children }: LinkProps) => {
    const { getAbsoluteUrl } = useUrl();
    
    return (
        <Link
            href={getAbsoluteUrl(href)}
            method={method}
            as={as}
            className={
                'block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out ' +
                className
            }
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown; 