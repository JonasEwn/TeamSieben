// Portfolio model
export interface Portfolio {
  id: number;
  wkn: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  purchaseDate: string;
  totalPrice: number;
}
  export const portfolio = [
  {
    id: 1,
    name: 'Allianz',
    price: 100,
    wkn: '123456',
    quantity: 100,
    description: 'Versicherungsgesellschaft',
    category: 'Aktie',
    purchaseDate: '01.11.2023',
    totalPrice: 1
  },
  {
    id: 2,
    name: 'Allianz',
    price: 200,
    wkn: '123456',
    quantity: 200,
    description: 'Versicherungsgesellschaft',
    category: 'Aktie',
    purchaseDate: '02.11.2023',
    totalPrice: 1
  },
  {
    id: 3,
    name: 'BASF',
    price: 50,
    wkn: '987654',
    quantity: 50,
    description: 'Chemie Unternehmen',
    category: 'Aktie',
    purchaseDate: '02.11.2023',
    totalPrice: 1
  },
  {
    id: 4,
    name: 'BASF',
    price: 40,
    wkn: '987654',
    quantity: 100,
    description: 'Chemie Unternehmen',
    category: 'Aktie',
    purchaseDate: '02.11.2023',
    totalPrice: 1
  },
  {
    id: 5,
    name: 'BASF',
    price: 30,
    wkn: '987654',
    quantity: 200,
    description: 'Chemie Unternehmen',
    category: 'Aktie',
    purchaseDate: '03.11.2023',
    totalPrice: 1
  },
  {
    id: 6,
    name: 'Bitcoin',
    price: 32000,
    wkn: 'BTC',
    quantity: 1,
    description: 'Kryptowährung',
    category: 'Crypto',
    purchaseDate: '03.11.2023',
    totalPrice: 1
  },
  
  ];
