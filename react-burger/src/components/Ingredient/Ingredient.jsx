import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import Price from "../Price/Price";
import style from "./Ingredient.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { setSelectedIngredient, delSelectedIngredient } from '../../services/actions/ingredient';

export default function Ingredient (props) {
  const ingredient = props.ingredient; 
  const [count, setCount] = useState(0);
  let tempCount = 0;
  const dispatch = useDispatch();
  const cart = useSelector(store => store.cart);
  const selectedIngredient = useSelector(store => store.ingredient);
  const openIngredientDetails = (ingredient) => {
    dispatch(setSelectedIngredient(ingredient));
  };
  const closeIngredientDetails = () => {
    dispatch(delSelectedIngredient());
  };

  useEffect(() => {
    if (cart.bun._id === ingredient._id) {
      ++tempCount;
    } else {
      cart.others.forEach(element => {
        if( element.ingredient._id === ingredient._id) {
          ++tempCount;
        }
      });
    };
    setCount(tempCount);
    tempCount = 0;
  }, [cart]);

  return (
    <>
      <li 
        className={style.Ingredient + " pl-4 pb-4 pr-4"} 
        key={ingredient.id} 
        id= {ingredient.id} 
        onClick={() => {openIngredientDetails(ingredient)}}
      >
        {count > 0 && <Counter className="IngredientCounter" count={count} size="default" extraClass="m-1" />}
        <img className={style.IngredientImage} src={ingredient.image} alt={ingredient.name} />
        <p className={style.IngredientTitle + " text text_type_main-default"}>{ingredient.name}</p>
        <Price price= {ingredient.price}/>
      </li>
      { selectedIngredient._id &&
          (<Modal title="Детали ингредиента" close={closeIngredientDetails}>
            <IngredientDetails />
          </Modal>)
        }
    </>
  );
};

Ingredient.propTypes = {
  ingredient: PropTypes.object
}; 