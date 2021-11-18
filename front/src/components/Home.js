import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";


const Home = (props) => {
  const foodsTable = () => {
    return props.foods.map(food => {
      if (food.store !== 0) {
        return (
          <TableRow>
            <TableCell>{food.name}</TableCell>
            <TableCell>{food.store}{food.unit}</TableCell>
          </TableRow>
        );
      }
    });
  }

  const menuHistory = () => {
    console.log(props.histories);
    return
  }

  if (props.isLoggedIn && Object.keys(props.user)) {
    return (
      <React.Fragment>
        <h1>ホーム</h1>
        <div className="home-wrap">
          <div className="sidebar">
            <h3>基本情報</h3>
            <h4 className="black">名前</h4>
            <p className="black">{props.user.name}</p>
            <h4 className="black">メール</h4>
            <p className="black">{props.user.email}</p>
          </div>
          <div className="content">
            <h2>現在の食材一覧</h2>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>食材名</TableCell>
                  <TableCell>数量</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{foodsTable()}</TableBody>
            </Table>
            <h2>過去一週間のレシピ</h2>
            <div className="menu-history">
              <ul className="history">{menuHistory()}</ul>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h1>ホーム</h1>
      </React.Fragment>
    )
  }
}

export default Home;
