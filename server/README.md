# blog_server

> 基于koa2的RESTFUL API后端

## 服务端配置

> 在config目录的index文件中进行相关的配置

配置项：

- `server`
  - `port` : 服务器端口号
- `user`   
  - `name` : 管理员用户名
  - `passowrd` : 管理员密码(使用默认密码服务器将拒绝启动)
  - `displayName` : 管理员昵称
- `jwt`
  - `secret` : tokenSecret
  - `expires` : token过期时间
- `qiniu`
  - `accessKey` :  七牛账号的公钥
  - `secretKey` : 七牛账号的私钥
  - `options`
    - `scope` : 七牛Bucket的名称
    - `expires` : 上传token过期时间
- `db` : mongodb相关配置
  - `host` 
  - `port`  
  - `user`
  - `password`
  - `database`
- `redis` : redis相关配置
  - `host`
  - `port`
  - `password` 
## 运行

```bash
npm install  安装依赖项
npm dev      调试
npm start    运行
```