import React from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  List,
  ListItem,
} from "@mui/material";


const FlashMessage = (props) => {

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
            <Table className="food-table">
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
              <List className="history">{menuHistory()}</List>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h1>ホーム</h1>
        <h2>Mealistへようこそ</h2>
        <p>サインアップ後、あなたの家の冷蔵庫にある食材を登録してください</p>
        <p>毎日16:30に、<a className="blue-link" href="https://recipe.rakuten.co.jp/" target="_blank" rel="noreferrer" title="Rakuten">Rakutenレシピ</a>よりあなたの冷蔵庫にある食材からレシピを提案します</p>
      </React.Fragment>
    )
  }
}

export default FlashMessage;
