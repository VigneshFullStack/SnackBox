export interface SubitemDto {
    subitem_id: number;
    subitem_name: string;
    available: boolean;
}

export interface MenuItemDto {
    item_id: number;
    ItemType: string;
    Items: SubitemDto[];
}

export interface CategoryDto {
    category_id: number;
    category_name: string;
    MenuItems: MenuItemDto[];
}