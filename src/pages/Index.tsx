import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Product {
  id: number;
  title: string;
  category: string;
  originalPrice: number;
  sellingPrice: number;
  discount: number;
  condition: string;
  location: string;
  seller: string;
  image: string;
  description: string;
  originalSource: string;
  views: number;
  likes: number;
}

const products: Product[] = [
  {
    id: 1,
    title: 'iPhone 14 Pro 256GB Space Black',
    category: 'Электроника',
    originalPrice: 120000,
    sellingPrice: 89000,
    discount: 26,
    condition: 'Отличное',
    location: 'Москва',
    seller: 'Александр',
    image: '/placeholder.svg',
    description: 'iPhone 14 Pro в идеальном состоянии. Куплен 6 месяцев назад, все чеки сохранены. Комплект полный.',
    originalSource: 'Ozon',
    views: 342,
    likes: 28,
  },
  {
    id: 2,
    title: 'Nike Air Max 90 размер 43',
    category: 'Одежда',
    originalPrice: 15000,
    sellingPrice: 9500,
    discount: 37,
    condition: 'Новое',
    location: 'Санкт-Петербург',
    seller: 'Мария',
    image: '/placeholder.svg',
    description: 'Оригинальные кроссовки Nike. Не подошел размер, бирки на месте.',
    originalSource: 'Wildberries',
    views: 156,
    likes: 12,
  },
  {
    id: 3,
    title: 'PlayStation 5 Digital Edition',
    category: 'Электроника',
    originalPrice: 50000,
    sellingPrice: 42000,
    discount: 16,
    condition: 'Отличное',
    location: 'Казань',
    seller: 'Дмитрий',
    image: '/placeholder.svg',
    description: 'PS5 в отличном состоянии. Пользовались аккуратно, все работает идеально. 2 джойстика в комплекте.',
    originalSource: 'Яндекс Маркет',
    views: 521,
    likes: 45,
  },
  {
    id: 4,
    title: 'Dyson V11 Absolute беспроводной пылесос',
    category: 'Для дома',
    originalPrice: 45000,
    sellingPrice: 32000,
    discount: 29,
    condition: 'Хорошее',
    location: 'Екатеринбург',
    seller: 'Елена',
    image: '/placeholder.svg',
    description: 'Мощный пылесос Dyson. Все насадки в комплекте, работает отлично.',
    originalSource: 'Ozon',
    views: 234,
    likes: 19,
  },
  {
    id: 5,
    title: 'Apple MacBook Air M2 16GB 512GB',
    category: 'Электроника',
    originalPrice: 150000,
    sellingPrice: 125000,
    discount: 17,
    condition: 'Отличное',
    location: 'Москва',
    seller: 'Игорь',
    image: '/placeholder.svg',
    description: 'MacBook Air M2 в идеальном состоянии. Куплен 4 месяца назад, гарантия действует.',
    originalSource: 'Apple Store',
    views: 678,
    likes: 54,
  },
  {
    id: 6,
    title: 'Кофемашина DeLonghi Magnifica S',
    category: 'Для дома',
    originalPrice: 55000,
    sellingPrice: 38000,
    discount: 31,
    condition: 'Отличное',
    location: 'Новосибирск',
    seller: 'Анна',
    image: '/placeholder.svg',
    description: 'Автоматическая кофемашина в отличном состоянии. Регулярно проводилась чистка.',
    originalSource: 'Wildberries',
    views: 189,
    likes: 15,
  },
];

const categories = ['Все товары', 'Электроника', 'Одежда', 'Для дома'];
const conditions = ['Все', 'Новое', 'Отличное', 'Хорошее'];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState('Все товары');
  const [selectedCondition, setSelectedCondition] = useState('Все');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'Все товары' || product.category === selectedCategory;
    const matchesCondition = selectedCondition === 'Все' || product.condition === selectedCondition;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceRange === 'low') matchesPrice = product.sellingPrice < 20000;
    if (priceRange === 'mid') matchesPrice = product.sellingPrice >= 20000 && product.sellingPrice < 70000;
    if (priceRange === 'high') matchesPrice = product.sellingPrice >= 70000;

    return matchesCategory && matchesCondition && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Icon name="ShoppingBag" className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold text-gray-900">ReMarket</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Каталог
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Продать
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Помощь
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Icon name="Heart" size={18} />
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Icon name="User" size={16} className="mr-2" />
                Войти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Выгодные покупки
            <br />
            <span className="text-blue-500">с маркетплейсов</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in">
            Товары от проверенных продавцов с реальными скидками
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Найти товар..."
                className="pl-12 h-14 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 px-4 bg-white border-y">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'hover:border-blue-500 hover:text-blue-500'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Состояние" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={(val: any) => setPriceRange(val)}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Цена" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все цены</SelectItem>
                  <SelectItem value="low">До 20 000 ₽</SelectItem>
                  <SelectItem value="mid">20 000 - 70 000 ₽</SelectItem>
                  <SelectItem value="high">От 70 000 ₽</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-6">
            <p className="text-gray-600">
              Найдено товаров: <span className="font-semibold text-gray-900">{filteredProducts.length}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover-scale animate-fade-in border-gray-200"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <Icon name="Package" size={64} className="text-gray-300" />
                  </div>
                  <Badge className="absolute top-3 right-3 bg-green-500 text-white font-bold px-3 py-1">
                    -{product.discount}%
                  </Badge>
                  <Badge className="absolute top-3 left-3 bg-blue-500 text-white">
                    {product.condition}
                  </Badge>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                    <Icon name="MapPin" size={12} />
                    {product.location}
                  </p>

                  <div className="mb-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.sellingPrice.toLocaleString()} ₽
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice.toLocaleString()} ₽
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Icon name="Eye" size={14} />
                        {product.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Heart" size={14} />
                        {product.likes}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {product.originalSource}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Package" size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Товары не найдены</h3>
              <p className="text-gray-600">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProduct.title}</DialogTitle>
              </DialogHeader>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Package" size={120} className="text-gray-300" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon name="Image" size={24} className="text-gray-400" />
                    </div>
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon name="Image" size={24} className="text-gray-400" />
                    </div>
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon name="Image" size={24} className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <Badge className="bg-green-500 text-white font-bold text-lg px-4 py-2">
                      -{selectedProduct.discount}%
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 px-3 py-2">
                      {selectedProduct.condition}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-2">
                      {selectedProduct.originalSource}
                    </Badge>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {selectedProduct.sellingPrice.toLocaleString()} ₽
                      </span>
                    </div>
                    <span className="text-lg text-gray-500 line-through">
                      {selectedProduct.originalPrice.toLocaleString()} ₽
                    </span>
                    <p className="text-sm text-green-600 font-semibold mt-1">
                      Экономия: {(selectedProduct.originalPrice - selectedProduct.sellingPrice).toLocaleString()} ₽
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="MapPin" size={18} className="text-blue-500" />
                      <span>Местоположение: <strong>{selectedProduct.location}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="User" size={18} className="text-blue-500" />
                      <span>Продавец: <strong>{selectedProduct.seller}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Icon name="Tag" size={18} className="text-blue-500" />
                      <span>Категория: <strong>{selectedProduct.category}</strong></span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Описание</h4>
                    <p className="text-gray-600">{selectedProduct.description}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-blue-500 hover:bg-blue-600 h-12 text-lg">
                      <Icon name="ShoppingCart" size={20} className="mr-2" />
                      Купить сейчас
                    </Button>
                    <Button variant="outline" size="icon" className="h-12 w-12">
                      <Icon name="Heart" size={20} />
                    </Button>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-blue-700">
                      <Icon name="Shield" size={18} />
                      <span>Безопасная сделка через платформу</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Icon name="ShoppingBag" className="text-white" size={20} />
                </div>
                <span className="text-xl font-bold">ReMarket</span>
              </div>
              <p className="text-gray-400 text-sm">
                Маркетплейс перепродажи товаров с выгодными ценами
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Электроника</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Одежда</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Для дома</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Как купить</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Связаться</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>support@remarket.ru</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>8 (800) 555-35-35</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 ReMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
