import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import axios from "axios";

import { API_ROOT } from "../lib/const";


const AddFoods = (props) => {
  const createToken = () => {
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 40;
    return Array.from(Array(N)).map(
      () => S[Math.floor(Math.random() * S.length)]
    ).join('');
  };

  const foodData = (food) => {
    if (food) {
      return ({
        "name": food.name,
        "store": food.store,
        "unit": food.unit,
        "ignore": food.ignore,
        "token": food.token,
        "user_id": props.user.id,
        "created_at": food.created_at,
        "updated_at": food.updated_at,
      })
    } else {
      return ({
        "name": "",
        "store": "",
        "unit": "",
        "ignore": false,
        "token": createToken(),
        "user_id": props.user.id,
        "created_at": Date(),
        "updated_at": Date(),
      })
    }
  }

  const foodForm = (food, index) => {
    return (
      <ListItem key={food.token}>
        <TextField
          lavel="食材名"
          variant="standard"
          value={props.foods[index]["name"]}
          data-index={index}
          data-column={"name"}
          onChange={(event) => props.handleFoodInfo(
            event, false, false
          )}
        />
        <TextField
          type="number"
          lavel="在庫"
          variant="standard"
          value={props.foods[index]["store"]}
          data-index={index}
          data-column={"store"}
          onChange={(event) => props.handleFoodInfo(
            event, false, true
          )}
        />
        <InputLabel
          id={`unit-select-label-${index}`}
        >単位</InputLabel>
        <Select
          labelId={`unit-select-label-${index}`}
          id={`unit-select-${index}`}
          label="単位"
          value={props.foods[index]["unit"]}
          data-index={index}
          data-column={"unit"}
          onChange={(event) => props.handleFoodInfo(event)}
        >
          <MenuItem
            data-index={index}
            data-column={"unit"}
            value={"個"}
          >個</MenuItem>
          <MenuItem
            data-index={index}
            data-column={"unit"}
            value={"ml"}
          >ml</MenuItem>
          <MenuItem
            data-index={index}
            data-column={"unit"}
            value={"%"}
          >%</MenuItem>
        </Select>
        <InputLabel
          id={`ignore-select-label-${index}`}
        >検索対象</InputLabel>
        <Select
          labelId={`ignore-select-label-${index}`}
          id={`ignore-select-${index}`}
          label="検索対象"
          value={props.foods[index]["ignore"]}
          onChange={(event) => props.handleFoodInfo(event)}
        >
          <MenuItem
            data-index={index}
            data-column={"ignore"}
            value={false}
          >含める</MenuItem>
          <MenuItem
            data-index={index}
            data-column={"ignore"}
            value={true}
          >含めない</MenuItem>
        </Select>
      </ListItem>
    );
  }

  const createFoodsForm = () => {
    return props.foods.map((food, index) => {
      return foodForm(food, index);
    });
  }

  const addFood = (event) => {
    event.preventDefault();
    props.addFoods(foodData(false));
  }

  const sendFoods = async (event) => {
    event.preventDefault();
    const data = {attributes: props.foods};
    try {
      await axios.post(
        `${API_ROOT}/foods`,
        data,
        {headers: props.headers()}
      );
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <React.Fragment>
      <h1>Add Foods</h1>
      <List className="food-list">{createFoodsForm()}</List>
      <Button
        onClick={(event) => addFood(event)}
      >食材を追加</Button>
      <Button
        onClick={(event) => sendFoods(event)}
      >登録</Button>
    </React.Fragment>
  );
}

export default AddFoods;
