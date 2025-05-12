export interface Product {
    id: number;
    title: string;
    slug: string;
    category: string;
    q_max: string | null;
    h_max: string | null;
    rated_q: string | null;
    rated_h: string | null;
    motor: string | null;
    price_zmw_no_vat: string | null;
    vat_rate: string | null;
    price_zmw_including_vat: string | null;
    is_featured: boolean;
    order: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
} 