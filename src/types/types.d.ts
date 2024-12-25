export interface HeaderProps {
  pathTitle: string;
  pathDescription: string[];
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  header: HeaderProps;
  subItems?: NavItem[];
}

export interface PageSubTitleProps {
  title: string;
}

export interface IBook {
  id: string;
  author_id: number;
  name: string;
  isbn: string;
  language: string;
  page_count: number;
  format: string;
  store_id?: number;
}

export interface IAuthor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  nationality: string;
}

export interface IStore {
  id: number;
  name: string;
  address_1: string;
  address_2: string | null;
  city: string;
  state: string;
  zip: string;
  books?: IBook[];
}
