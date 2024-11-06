export type MenuType = {
    id: string;
    title:string;
    slug: string;
    desc?: string;
    img?: string;
    color: string;
}[];

export type ProductType = {
    _id: string;
    id:string;
    title:string;
    desc?: string;
    img?:string;
    price:number;
    catSlug:string;
    options?: {title:string, additionalPrice:number}[];
}

export type CategoryType = {
    _id: string;
    title:string;
    img?:string;
    desc?:string;
    slug:string;
    color?:string;
}

export type OrderType = {
    _id: string;
    userEmail:string;
    products: CartItemType[];
    status:string;
    totalAmount:number;
    createdAt: Date;
    intent_id?:string;
}

export type CartItemType = {
    _id: string;
    title:string;
    img?: string;
    price:number;
    optionTitle?: string;
    quantity:number;
}

export type CartType = {
    products: CartItemType[];
    totalItems: number;
    totalPrice: number;
}

export type ShowMoreProps = {
    pageNumber:number;
    isNext:boolean;
    setLimit: (limit:number) => void;
}

export type ActionTypes = {
    addToCart:(item: CartItemType) => void;
    removeFromCart : (item:CartItemType) => void;
    clearCart: () => void;
}