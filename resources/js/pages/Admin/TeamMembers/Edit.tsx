import Form from './Form';

interface Props {
    teamMember: {
        id: number;
        name: string;
        position: string;
        bio: string;
        image: string | null;
        image_url: string | null;
        order: number;
    };
}

const Edit = ({ teamMember }: Props) => {
    return <Form teamMember={teamMember} isEdit={true} />;
};

export default Edit; 