import { EPostRating } from '../../enums';
export interface IUnserializedPost {
    id: number;
    created_at: string;
    updated_at: string;
    file: {
        width: number;
        height: number;
        ext: string;
        size: number;
        md5: string;
        url: string;
    };
    preview: {
        width: number;
        height: number;
        url: string;
    };
    sample: {
        has: boolean;
        width?: number;
        height?: number;
        url?: string;
    };
    score: {
        up: number;
        down: number;
        total: number;
    };
    tags: {
        general: Array<string>;
        species: Array<string>;
        character: Array<string>;
        artist: Array<string>;
        invalid: Array<string>;
        lore: Array<string>;
        meta: Array<string>;
    };
    locked_tags: Array<string>;
    change_seq: number;
    flags: {
        pending: boolean;
        flagged: boolean;
        note_locked: boolean;
        status_locked: boolean;
        rating_locked: boolean;
        deleted: boolean;
    };
    rating: EPostRating;
    fav_count: number;
    sources: Array<string>;
    pools: Array<number>;
    relationships: {
        parent_id: number | null;
        has_children: boolean;
        has_active_children: boolean;
        children: Array<number>;
    };
    approver_id: number;
    uploader_id: number;
    description: string;
    comment_count: number;
}
