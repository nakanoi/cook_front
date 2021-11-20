import React from "react";


const Footer = (props) => {
  return (
    <React.Fragment>
      <footer>
        <div>©2021 nakanoi</div>
        <div>Logo made by <a className="blue-link" href="https://www.designevo.com/" target="_blank" rel="noreferrer" title="Free Online Logo Maker">DesignEvo free logo creator</a>.</div>
        <div>Every Recipe is driven by <a className="blue-link" href="https://recipe.rakuten.co.jp/" target="_blank" rel="noreferrer" title="Rakuten">Rakutenレシピ</a> & <a className="blue-link" href="https://webservice.rakuten.co.jp/" target="_blank" rel="noreferrer" title="Rakuten API">Rakuten Webservice</a>.</div>
      </footer>
    </React.Fragment>
  );
}

export default Footer;
