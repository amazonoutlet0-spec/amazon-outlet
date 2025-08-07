import React from "react";
import CategoryCard from "./CategoryCard";
import styles from "./category.module.css";

const categories = [
  {
    title: "Automotriz",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Bebé",
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Belleza y cuidado personal",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Computadoras",
    image:
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Electrodomésticos",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Equipaje",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Herramientas",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Mascotas",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Juguetes",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Moda para Niños",
    image:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Moda para Niñas",
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Moda para Hombre",
    image:
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Moda para Mujer",
    image:
      "https://images.unsplash.com/photo-1643825664857-7e6e4124f289?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Software",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Video Juegos",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Joyería",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    title: "Celulares",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
];

const Category = () => {
  return (
    <div className={styles.categoryWrapper}>
      {categories.map((cat, idx) => (
        <CategoryCard key={idx} title={cat.title} image={cat.image} />
      ))}
    </div>
  );
};

export { categories };

export default Category;
