import { useEffect } from 'react'
import { useState } from 'react'
import Button from '@mui/material/Button';
import { OutlinedInput } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


function App() {
  const [tempProducts, setTempProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      const call = await fetch(`https://reactapi.pautinaweb.ru/objects.php`);
      const response = await call.json();
      setProducts(response);
      setTempProducts(response);
    }
    fetchProducts();
  }, []);

  function sort(type = 'asc') {
    setTempProducts([...tempProducts.sort((a, b) => type === 'asc' ? a.price - b.price : type === 'desc' ? b.price - a.price : '')]);
  }

  useEffect(() => {
    setTempProducts([...products.filter((item) => item.name.toLowerCase().includes(search))])
  }, [search]) 


  return (
    <>
    <header className='px-5 container mx-auto pt-10 flex justify-between items-center '>
      <h1 className='text-3xl font-bold text-blue-600'>SAFQ</h1>
      <div className='flex justify-center items-center gap-5'>
      <a href='#' className='text-blue-600/75'>Главная</a>
      <a href='#' className='text-blue-600/75'>Каталог</a>
      <a href='#' className='text-blue-600/75'>О нас</a>
      </div>
      
    </header>
    <section className='px-5 container mx-auto pt-10'>
      <div className='mt-4'>
        <div className='flex items-center justify-between gap-1'>
          <div className='flex items-center gap-1'>
          <OutlinedInput className='h-10' value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>

          <div className='flex gap-2'>
            <Button variant="outlined" onClick={() => sort('desc')}>
              По убыванию
            </Button>
            <Button variant="outlined" onClick={() => sort()}>
              По возрастанию
            </Button>
        </div>
        </div>
        <div className='mt-4 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4'>
        {tempProducts.map((item) => {
          return (
            <article className='p-3 rounded-xl bg-white border-4 border-indigo-500/50 ' key={item.id}>
              <h2 className='text-xl font-bold underline'>{item.name} </h2>
              <p className='mt-2 text-sm italic'>{item.description}</p>
              <p className='mt-8 font-semibold text-blue-600/75'>{item.price} руб.</p>
              <p>{item.sclad} шт.</p>
            </article>
          )
        })}
        </div>
      </div>
    </section>
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className='p-20'
    >
      <SwiperSlide>Продукт 1</SwiperSlide>
      <SwiperSlide>Продукт 2</SwiperSlide>
      <SwiperSlide>Продукт 3</SwiperSlide>
      <SwiperSlide>Продукт 4</SwiperSlide>
    </Swiper>
    </>
  )
}

export default App
 