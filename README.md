# Mealist

![top](https://user-images.githubusercontent.com/72122101/142732224-de059f62-0f9e-4cb8-b6d1-6b54aca3c863.png)

*Opps... I forgot what I should buy.*
*Hmm, I have no idea for dinner.*
[This application](https://mealist.net) would solve these problems.

If you add foods which are in your fridge to this application, you can recieve meals' details for dinner chosen by this application from [Rakuten Recipe](https://recipe.rakuten.co.jp/).
These meals made of some foods in your fridge at that time.
And, since you register foods in your fridge, you can access to it anytime anywhere. So you would not worry when you go to market!

***Mealist*** is the best solution.
This service in on [Mealist](https://mealist.net)!

## Tech

I used these techniques below.

### Backend
- [`Ruby on Rails`](https://github.com/rails/rails) - with API mode.
- [`Nginx`](https://nginx.org/) - as a reverse proxy.
- [`MySQL`](https://www.mysql.com) - Database.
- [`Rspec`](https://rspec.info/) - as a API test module.
- [`Devise token auth`](https://devise-token-auth.gitbook.io/devise-token-auth) - as a authentication module.

### Frontend
- [`React`](https://github.com/rails/rails) - with frontend.
- [`Nginx`](https://nginx.org/) - as a reverse proxy.
- [`material UI`](https://mui.com/) - as a UI design. This page's disign is terrible? I'm sorry... I'm not good at this.
- [`Logo`](https://mui.com/) - logo creater.

### Recipe Getter
- [`Python`](https://www.python.org) - hits API requests to Rakuten Web Service.

### Container
- [`Docker, Docker compose`](https://www.docker.com/) - run 6 containers, which area for each service above.

## Versions
| | version |
----|----
| `Ruby` | `2.6.2` |
| `Ruby on Rails` | `6.1.4` |
| `Python` | `3.10.0` |
| `React` | `17.0.2` |
| `Nginx` | `1.20.1` |
| `MySQL` | `5.7` |
| `Docker` | `20.10.9` |
| `Docker compose` | `1.27.4` |

If you want to see more details about packages or these versions, check `package.json`, `Gemfile`, and `requirements.txt` out.

## Entity Relationship
![ER](https://user-images.githubusercontent.com/72122101/142730441-e27aece2-8f3e-418c-a93d-c2a23bb761ed.png)
Write on [draw.io](https://app.diagrams.net/).

## Simple Start
1. Clone this repo.

```sh
git clone
```

2. Create `.env` files and set them on `cook/`, `cook/server/api/`, `cook/frontend/front/` and `cook/py/`.

```python
# Envritonment. This must be "develop", "test", or "production."
DOCKER_ENV=

# MySQL connection info.
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_ROOT_PASSWORD=
MYSQL_PASSWORD=
MYSQL_HOST=
# Mail authentication like Gmail address and application password.
MAIL_USER_NAME=
MAIL_PASSWORD=

MYSQL_CHARSET=utf8mb4

# Rakuten Web Service API Key.
APP_ID=
# How many APIs you want to hit in 3 mins.
QUERY_NUM=

```

3. Build containers.
```sh
cd cook
docker-compose up --build
```

4. *You can experience my application.*

## How to Use

1. Sign up with your email address, name and passsword for free.
![signup](https://user-images.githubusercontent.com/72122101/142730364-1fe6fb22-eea9-4102-9359-76f0e244b794.png)
2. Sign in with email and password.
![signin](https://user-images.githubusercontent.com/72122101/142730378-51ca5359-5a95-412e-b5dc-85ece6a9bff6.png)
3. Add foods you already have in your fridge.
![addfoods](https://user-images.githubusercontent.com/72122101/142746393-4c4acb3e-c2d8-4b80-acc1-7a6746ff45eb.png)
If you want to add foods you used to have, click '過去の食材を追加' and add them.
![addpastfoods](https://user-images.githubusercontent.com/72122101/142746403-91710666-1ae8-4d75-84b5-5ae78c6b1620.png)
4. You would recieve email which contains recipes this application choose everyday at 16:30 Asia/Tokyo.
![recipeemail](https://user-images.githubusercontent.com/72122101/142731996-1980f27a-1750-4c55-a9ef-1a7e7923e8d5.jpg)
5. You can see all foods you have and meals you have recieved for the past 7 days.
![top](https://user-images.githubusercontent.com/72122101/142732224-de059f62-0f9e-4cb8-b6d1-6b54aca3c863.png)

## License

MIT

## Credientail

Logo made by [DesignEvo free logo creator](https://www.designevo.com/).
Every Recipe is driven by [Rakutenレシピ](https://recipe.rakuten.co.jp/) and [Rakuten Webservice](https://webservice.rakuten.co.jp/)

**Thank you for visiting my repo!**
