import React, { memo } from "react";

type CategoriesProps = {
  value: number;
  //Типизация стрелочной функции
  onChangeCategory: (i: number) => void;
};

const categories = ["Все", "Nike", "Jordan", "Adidas", "Puma", "New Balance", "Converse"];

//Отключение перерисовки компонента
const Categories: React.FC<CategoriesProps> = memo(({ value, onChangeCategory }) => {
  // Вывод списка категорий и активная кнопка
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onChangeCategory(i)} className={value === i ? "active" : ""}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
