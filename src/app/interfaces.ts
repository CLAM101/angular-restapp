export interface Res {
  user?: object;
  status: number;
  message?: string;
  response: boolean;
}

export interface ActiveOrderItem {
  userID: string;
  total: number;
  items: Array<object>;
  orderData: string;
  status: string;
  destination: object;
  _id: string;
  response?: boolean;
}

export interface Profile {
  _id?: string;
  title?: string;
  email?: string;
  rating?: number;
  imagePath?: string;
  description?: string;
}

export interface Applicant {
  storename: string;
  storeaddress: string;
  floorsuite?: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}

export interface SideItem {
  name?: string;
  price?: number;
  description?: string;
  image?: File;
  imageName?: string;
}

export interface MenuItem {
  name?: string;
  price?: string;
  description?: string;
  categories?: Array<string>;
  rating?: number;
  restaurantname?: string;
  image?: File;
  imageName?: string;
  relatedsides?: Array<SideItem>;
  addons?: Array<object>;
  itemType?: string;
}

export interface FetchedMenuItem {
  name?: string;
  price?: string;
  description?: string;
  categories?: Array<string>;
  rating?: number;
  restaurantname?: string;
  image?: {
    name?: string;
    imagePath?: string;
  };
  imageName?: string;

  relatedsides?: Array<SideItem>;
  addons?: Array<object>;
  itemType?: string;
}

export interface Menu {
  sidesmenu: Array<SideItem>;
  menu: Array<MenuItem>;
  menuByItemType: [
    {
      type: string;
      items: [MenuItem];
    }
  ];
  itemTypes: [string];
}

export interface Route {
  menuSelect?: string;
  main?: string;
  side?: string;
}

export interface Rest {
  addonmenu?: Array<{
    addonname?: string;
    addonoptions?: [{ option: string }];
  }>;
  categories?: [string];
  sidesmenu?: [
    {
      name: string;
      price: number;
      description: string;
    }
  ];
  itemtypes?: [string];
}
