<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="/public/css/reset.css"> 
  <link rel="stylesheet" href="/public/css/index.css"> 
  <title>Document</title>
</head>
<body>
{% for item in list%}
  <li>
    <p>标题:{{item.title}}</p>
    <p>
      <span>作者:{{item.username}}</span>
      <span>时间:{{item.dateline}}</span>
    </p>
  </li> 
{% endfor %}
<ul>

</ul>
</body>
</html>