# ☀ Vue全家桶+服务器渲染SSR+KOA2 高仿美团App 



### 项目笔记（有点小乱，私密访问CSDN）

- [美团项目 -- 项目搭建1（搭建环境及一些错误处理）](https://blog.csdn.net/Umbrella_Um/article/details/98756072)
- [美团项目 -- 首页开发2（首页分析与简述实现）](https://blog.csdn.net/Umbrella_Um/article/details/98863755)
- [美团项目 -- 登陆注册3（数据库配置、Redis配置、邮箱验证配置）](https://blog.csdn.net/Umbrella_Um/article/details/99018052)
- [美团项目 -- 注册、登录、退出4（实现基本验证及其SSR）](https://blog.csdn.net/Umbrella_Um/article/details/99670111)
- [美团项目 -- 定位服务及切换城市5（线上线下数据库打通，使用Postman测试接口）](https://blog.csdn.net/Umbrella_Um/article/details/99711310)
- [美团项目 -- 搜索栏及推荐6（巩固积累）](https://blog.csdn.net/Umbrella_Um/article/details/99892269)
- [美团项目 -- 切换城市7（借助E-UI布局，完成二级联动及搜索排序等）](https://blog.csdn.net/Umbrella_Um/article/details/100191306)
- [美团项目 -- 产品列表页8（使用高德地图API完成景点定位功能）](https://blog.csdn.net/Umbrella_Um/article/details/100587803)
- [美团项目 -- 产品详情页9（待更新...）](https://blog.csdn.net/Umbrella_Um/article/details/100611164)

上面都是自己的小小笔记，不算很全（(┬＿┬)可能看起来不好看）

## 部署运行步骤

① Fock项目到自己的Github，然后下载代码到本地，可以使用git工具将依赖 install 好

```
# install dependencies
$ npm run install
```

② 在运行前还需要部署好MongoDB数据库和robomongo数据库可视化辅助工具（Robo 3T），还有登录模块要用到的Redis

因为项目多数使用线上接口请求数据，而使用MongoDB线下的数据库操作比较少，但是还是有，所以还得部署一个MongoDB，我们通过命令行启动MongoDB后，然后打开下载好的辅助工具Robo 3T，此时会检测本机运行的MongoDB，然后你连接后，创建一个库名为student（注意了，这里如果要定义其他名字的话，要对应改连接数据库的相关代码，如果自己可以驾驭可以试试，不行的话就先起这个名字）；

此时就是把导入这些写好的数据库表【项目中的dbs文件夹中的9个】，然后通过下面命令导入即可；

```
mongoimport -d dbs -c pois pois.dat
```

其中 dbs 是你的数据库名称，pois是集合名，pois.dat是对应的数据源文件。离线数据文件夹中共9个文件，需要逐个导入。

完成后，你就里成功差一步了，此时在把下载好的Redis也进行启动 → 关于下载的版本和如何启动可以看 [美团项目 -- 项目搭建1（搭建环境及一些错误处理）](https://blog.csdn.net/Umbrella_Um/article/details/98756072) 介绍了下载版本和一些报错处理 以及 [美团项目 -- 登陆注册3（数据库配置、Redis配置、邮箱验证配置）](https://blog.csdn.net/Umbrella_Um/article/details/99018052)中的第九专题介绍了启动方法

③ 完成上面步骤，且没有报错的话，此时就可以进行开发运行 和 线上打包等操作了

```
# serve with hot reload at localhost:8888
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```



项目使用的Nuxtjs，比较喜欢它的创建即路由的特性，还可以配合SSR和KOA2打造高效率的开发

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).