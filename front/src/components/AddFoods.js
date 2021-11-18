import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Select,
  MenuItem,
  List,
  ListItem,
  Modal,
  Box,
  ThemeProvider
} from "@mui/material";
import axios from "axios";

import { API_ROOT } from "../lib/const";


const AddFoods = (props) => {
  const [open, handleOpen] = useState(false);
  const modalOpen = () => handleOpen(true);
  const modalClose = () => handleOpen(false);
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  const createToken = () => {
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 40;
    return Array.from(Array(N)).map(
      () => S[Math.floor(Math.random() * S.length)]
    ).join('');
  }

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
      });
    } else {
      return ({
        "name": "",
        "store": 1,
        "unit": "",
        "ignore": false,
        "token": createToken(),
        "user_id": props.user.id,
        "created_at": Date(),
        "updated_at": Date(),
      });
    }
  }

  const foodForm = (food, index) => {
    return (
      <React.Fragment>
        <Table className="foods-table">
          <TableBody>
            <TableRow key={`name-${food.token}`}>
              <TableCell>食材名</TableCell>
              <TableCell>
                <TextField
                  lavel="食材名"
                  variant="standard"
                  value={props.foods[index]["name"]}
                  data-index={index}
                  data-column={"name"}
                  onChange={(event) => props.handleFoodInfo(
                    event, false, false
                  )}
                  className="food-input"
                  color="food_green"
                />
              </TableCell>
            </TableRow>
            <TableRow key={`store-${food.token}`}>
              <TableCell>数量</TableCell>
              <TableCell>
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
                  className="food-input no-spin"
                  color="food_green"
                />
              </TableCell>
            </TableRow>
            <TableRow key={`unit-${food.token}`}>
              <TableCell>単位</TableCell>
              <TableCell>
                <Select
                  id={`unit-select-${index}`}
                  label="単位"
                  value={props.foods[index]["unit"]}
                  data-index={index}
                  data-column={"unit"}
                  onChange={(event) => props.handleFoodInfo(event)}
                  className="food-input"
                  color="food_green"
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
              </TableCell>
            </TableRow>
            <TableRow key={`search-${food.token}`}>
              <TableCell>レシピの検索対象</TableCell>
              <TableCell>
                <Select
                  id={`ignore-select-${index}`}
                  label="検索対象"
                  value={props.foods[index]["ignore"]}
                  onChange={(event) => props.handleFoodInfo(event)}
                  className="food-input"
                  color="food_green"
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
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="food-delete">
          <Button
            data-index={index}
            onClick={(event) => props.deleteFood(event)}
            fullWidth
            variant="contained"
            color="delete"
          >{props.foods[index]["name"]}を削除</Button>
        </div>
      </React.Fragment>
    );
  };

  const createFoodsForm = () => {
    return props.foods.map((food, index) => {
      if (food["store"] !== 0) {
        return foodForm(food, index);
      }
    });
  }

  const addFood = (event) => {
    event.preventDefault();
    props.addFoods(foodData(false));
  }

  const validateFoods = () => {
    const keyToColumn = {
      "name": "食材名",
      "unit": "単位",
      "store": "数量",
      "ignore": "検索対象にふくめるか",
    }
    const keys = ["name", "unit", "store", "ignore"];
    let sentFoods = props.foods.slice();

    for (var i = 0; i < props.foods.length; i++) {
      for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        if (props.foods[i][key] === "") {
          console.log('OUT.')
          return [false, `${keyToColumn[key]}は空欄ではいけません`]
        }
        if (key === "store" ) {
          sentFoods[i][key] = Number(props.foods[i][key]);
        }
      }
    }

    props.setFoods(sentFoods);
    return [true, null];
  }

  const sendFoods = async (event) => {
    props.setIsLoading(true);
    event.preventDefault();
    const valids = validateFoods();
    if (!valids[0]) {
      props.setIsLoading(false);
      alert(valids[1]);
      return
    }

    const data = {attributes: props.foods};
    try {
      await axios.post(
        `${API_ROOT}/foods`,
        data,
        {headers: props.headers()}
      );
    } catch (e) {
      console.error(e);
    } finally {
      props.setIsLoading(false);
    }
  }

  const addPastFood = (event) => {
    event.preventDefault();

    const index = event.target.dataset.index;
    let foods = props.foods.slice();
    foods[index].store = 1;
    props.setFoods(foods);
    modalClose();
  }

  const pastFoodList = () => {
    return props.foods.map((food, index) => {
      if (food["store"] == 0) {
        return (
          <ListItem
            key={food.token}
            className="past-food-list"
          >
            <p className="past-food-name">{food.name}</p>
            <Button
              data-index={index}
              onClick={(event) => addPastFood(event)}
              variant="contained"
              color="button"
            >追加</Button>
          </ListItem>
        );
      }
    });
  }

  return (
    <React.Fragment>
      <h1>食材管理</h1>
      <ThemeProvider theme={props.theme}>
        {createFoodsForm()}
        <div className="food-buttons">
          <Button
            onClick={addFood}
            variant="contained"
            color="food_green"
            size="large"
          >食材を追加</Button>
          <Button
            onClick={modalOpen}
            variant="contained"
            color="food_green"
            size="large"
          >過去の食材を追加</Button>
          <Button
            onClick={(event) => sendFoods(event)}
            variant="contained"
            color="button"
            size="large"
          >登録</Button>
        </div>
        <Modal
          open={open}
          onClose={modalClose}
        >
          <Box sx={modalStyle}>
            <h3>過去の食材一覧</h3>
            <List className="past-food-list">{pastFoodList()}</List>
            <Button
              onClick={modalClose}
              variant="contained"
              fullWidth
              className="modal-close"
            >閉じる</Button>
          </Box>
        </Modal>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default AddFoods;
