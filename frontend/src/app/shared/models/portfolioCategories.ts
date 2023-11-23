export interface PortfolioCategories {
    wkn: string;
    name: string;
    description: string;
    category: string;
    totalQuantity: number;
    averagePrice: number;
    totalPrice: number;
  }
    export const portfolioCategories = [
    {
      wkn: '123456',
      name: 'Allianz',
      description: 'Versicherungsgesellschaft',
      category: 'Aktie',
      totalQuantity: 0,
      averagePrice:0,
      totalPrice: 0
    
    },
    {
      wkn: '987654',
      name: 'BASF',
      description: 'Chemie Unternehmen',
      category: 'Aktie',
      totalQuantity: 0,
      averagePrice:0,
      totalPrice: 0
    },
    {
      wkn: 'BTC',
      name: 'Bitcoin',
      description: 'Kryptowährung',
      category: 'Crypto',
      totalQuantity: 0,
      averagePrice:0,
      totalPrice: 0

    }
]