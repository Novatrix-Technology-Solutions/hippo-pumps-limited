import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function MeetTheTeam({ auth }: PageProps) {
    const teamMembers = [
        {
            id: 1,
            name: "John Smith",
            position: "CEO",
            bio: "John has over 20 years of experience in the pump industry and leads Hippo with a vision for innovation and excellence.",
            image: "/images/placeholder.svg",
        },
        {
            id: 2,
            name: "Sarah Johnson",
            position: "Technical Director",
            bio: "Sarah oversees all technical aspects of our pump designs, ensuring they meet the highest standards of quality and efficiency.",
            image: "/images/placeholder.svg",
        },
        {
            id: 3,
            name: "Michael Chen",
            position: "Head of Manufacturing",
            bio: "Michael manages our state-of-the-art manufacturing facility in Lusaka, implementing lean processes for optimal production.",
            image: "/images/placeholder.svg",
        },
        {
            id: 4,
            name: "Elizabeth Mwanza",
            position: "Sales Director",
            bio: "Elizabeth leads our global sales team, developing strong relationships with customers across more than 20 countries.",
            image: "/images/placeholder.svg",
        },
        {
            id: 5,
            name: "David Banda",
            position: "Research & Development Manager",
            bio: "David drives innovation at Hippo, leading a team of engineers focused on developing the next generation of pump technologies.",
            image: "/images/placeholder.svg",
        },
        {
            id: 6,
            name: "Grace Mutale",
            position: "Quality Assurance Manager",
            bio: "Grace ensures that every pump leaving our facility meets our rigorous quality standards and customer specifications.",
            image: "/images/placeholder.svg",
        },
    ];

    return (
        <>
            <Head title="Meet the Team" />
            <div className="container mx-auto px-5 py-8">
                <h1 className="text-3xl font-bold text-[#1e4785] mb-5">Meet Our Team</h1>

                <p className="text-base text-[#333333] mb-8 max-w-4xl">
                    At Hippo, our success is driven by our dedicated team of professionals who bring expertise, passion, and
                    innovation to everything we do. Get to know the people behind our world-class pump solutions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                            <div className="h-64 bg-[#1e4785] relative">
                                <img
                                    src={member.image || "/images/placeholder.svg"}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-[#1e4785]">{member.name}</h2>
                                <p className="text-[#e63946] font-semibold mb-4">{member.position}</p>
                                <p className="text-[#333333]">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
} 