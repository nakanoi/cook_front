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
      return <React.Fragment></React.Fragment>;
    });
  }

  const returnStrDate = (day) => {
    var y = day.getFullYear();
    var m = day.getMonth() + 1;
    var d = day.getDate() + 1;
    return `${y}-${m}-${d}`;
  }

  const groupBy = (array, getKey) =>
    array.reduce((obj, cur, idx, src) => {
        const key = getKey(cur, idx, src);
        (obj[key] || (obj[key] = [])).push(cur);
        return obj;
    }, {});

  const dailyMenu = (histories, day) => {
    return histories.map(history => {
      return (
        <ListItem
          key={`${day}-${history.id}`}
          className="history-menu"
        >
          <p className="menu-img">
            <img src={history.menu.img} alt={history.menu.name} />
          </p>
          <a href={history.menu.url}>{history.menu.name}</a>
        </ListItem>
      );
    });
  }

  const menuHistory = () => {
    const groupedHistories = groupBy(
      props.histories,
      h => h.day
    );
    let day = new Date();

    return [...Array(7)].map((_, i) => {
      day.setDate(day.getDate() - 1);
      var strDay = returnStrDate(day);

      if (groupedHistories[strDay]) {
        return (
          <ListItem key={strDay} className="daily-history">
            <h3>{strDay} {groupedHistories[strDay][0].food}</h3>
            <List
              className="history-menus"
            >
              {dailyMenu(groupedHistories[strDay], strDay)}
            </List>
          </ListItem>
        );
      }
      return <React.Fragment></React.Fragment>;
    });
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

export default Home;
