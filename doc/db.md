# Schema

```sql
mysql> DESC `card`;
+---------------+---------------+------+-----+---------+----------------+
| Field         | Type          | Null | Key | Default | Extra          |
+---------------+---------------+------+-----+---------+----------------+
| id            | int           | NO   | PRI | NULL    | auto_increment |
| asset         | varchar(255)  | YES  | UNI | NULL    |                |
| assetLongname | varchar(255)  | YES  |     | NULL    |                |
| assetgroup    | varchar(255)  | YES  |     | NULL    |                |
| name          | varchar(255)  | YES  |     | NULL    |                |
| issuer        | varchar(255)  | YES  |     | NULL    |                |
| imgur         | varchar(255)  | YES  |     | NULL    |                |
| description   | varchar(2000) | YES  |     | NULL    |                |
| status        | varchar(100)  | NO   |     | good    |                |
| tag           | varchar(255)  | NO   |     |         |                |
| cid           | varchar(255)  | NO   |     | NULL    |                |
| ver           | varchar(255)  | NO   |     | 1       |                |
| txHash        | varchar(255)  | NO   |     | NULL    |                |
| txIndex       | bigint        | YES  |     | NULL    |                |
| registTime    | bigint        | YES  |     | NULL    |                |
| updateTime    | bigint        | YES  |     | NULL    |                |
+---------------+---------------+------+-----+---------+----------------+
```
