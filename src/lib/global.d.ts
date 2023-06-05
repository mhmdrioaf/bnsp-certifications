type Tab = {
  id: string;
  name: string;
  route: string;
};

type Tabs = {
  tabs: Tab[];
};

type Book = {
  id: string;
  title: string;
  publisherId: string;
  publisherName?: string;
  price: number;
  stock: number;
};

type Publisher = {
  id: string;
  name: string;
  address: string;
  city: string;
  phone_number: string;
};
