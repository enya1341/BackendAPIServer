import bodyParser from 'body-parser';
import express, { Application, Request, Response } from 'express';
import mysql from 'mysql2';
const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3334;

export interface TodoObj {
  id: string;
  name: string;
  completed: boolean;
}

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'react_todo_app',
});

app.get('/', (req: Request, res: Response) => {
  res.send(req);
});

app.get('/api/get', (req: Request, res: Response) => {
  //getは何故かわからないがhttp://localhost:3000/api/getで叩けてしまっている(port=3001なのに何故…？)
  connection.query('SELECT * FROM todos', function (err, results) {
    if (err) {
      console.log('接続エラー');
      throw err;
    }
    res.json({ data: results });
    console.log(res.json);
  });
});

app.put('/api/put', (req: Request<TodoObj>, res: Response) => {
  connection.query(
    // Proxy error: Could not proxy request /api/put from localhost:3000 to http://localhost:3001.
    // こちらは叩いた時にproxyエラーが発生している。getでproxyエラーが発生していないのはputとgetの仕様の違いかな
    // 恐らくこれが叩けてないのはフロントが原因
    // また動作確認を取れてないのでこれ自体が正常に動くか不明
    `INSERT INTO todos (id, name, completed) VALUES (${req.params.id}, ${req.params.name},${req.params.completed})`,
    function (err, results) {
      if (err) {
        console.log(req);
        throw err;
      }
      res.json({ data: results });
      console.log(req);
    },
  );
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
