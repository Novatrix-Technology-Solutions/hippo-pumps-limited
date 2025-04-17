import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

interface TeamMember {
    id: number;
    name: string;
    position: string;
    bio: string;
    image: string;
    order: number;
}

interface MeetTheTeamProps extends PageProps {
    teamMembers: TeamMember[];
}

export default function MeetTheTeam({ auth, teamMembers }: MeetTheTeamProps) {
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
                                    src={member.image ? `/storage/${member.image}` : "/images/placeholder.svg"}
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