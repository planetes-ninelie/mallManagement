### 项目简介

悦购商城后台管理前端项目，用于管理员工的用户信息和职责分配以及设置权限，实现用户信息、角色信息和权限信息的增删查改，以及用户登录退出；同时也用于管理品牌和商品。

线上地址：http://8.138.108.50:2309

后端项目源码地址：https://github.com/planetes-ninelie/mallManagementServer.git

### 技术栈

- 前端框架： Vue3 + TS + Axios
- 构建工具： Vite
- 代码工具：ESlint + prettier
- 状态管理： Pinia
- 组件库： Element-plus + ECharts

### 工程结构解析

```
├── .husky                    	# Git Hooks
├── .vscode                   	# VS Code 插件 + 设置
├── mock                     	# mock数据
├── public						# 静态文件
├── scripts						# scripts 配置
├── src                       	# 源代码
│   ├── api							# 所有请求
│   ├── assets						# 静态文件
│   ├── components            		# 全局组件
│   ├── directive           		# 自定义v-指令
│   ├── layout						# 主页面布局
│       ├── logo						# 左侧菜单logo子组件
│       ├── main						# 右侧内容展示区域
│       ├── menu						# 菜单组件
│       ├── tabbar						# 顶部tabbar组件
│       ├── index.vue					# 主页面
│   ├── router						# 全局路由
│   ├── store                		# 全局 pinia store
│       ├── modules             		# 模块
│       └── index.ts            		# store 入口
│   ├── styles						# 全局样式
│   ├── utils                  		# 全局方法
│   ├── views						# 内容页面
│       ├── 404							# 无法访问后跳转的页面
│       ├── acl							# 管理管理页
│       ├── home						# 首页
│       ├── login						# 登录页
│       ├── product						# 产品管理页
│       ├── screen						# 数据大屏
│   ├── App.vue                		# 入口页面
│   ├── main.ts                		# Vue初始化入口文件
│   ├── permission.ts				# 路由鉴权
│   ├── settings.ts					# logo|标题配置
│   └── vite-env.d.ts				# vite 环境配置
├── .env.deveplopment			# 开发环境配置
├── .env.production				# 生成环境配置
├── .env.test					# 测试环境配置
├── .eslintignore				# eslint 忽略文件
├── .eslintrc.cjs              	# eslint 配置
├── .gitignore                 	# git 忽略文件
├── .prettierignore				# prettier 忽略文件
├── .prettierrc.json           	# prettier 配置
├── .stylelintignore     		# stylelint 忽略文件
├── .stylelintrc.cjs			# stylelint 配置
├── commitlint.config.cjs		# commit 配置
├── index.html                	# 首页入口文件
├── package.json               	# package.json 依赖
├── pnpm-lock.yaml				# pnpm 配置
├── tsconfig.json              	# typescript 配置
├── tsconfig.node.json			# typescript 配置
└── vite.config.ts             	# vite 配置
```

### 目前已知问题：

前端：

- CSS样式没有做多端适配，目前只有在电脑浏览器上体验相对良好

后端：

- 分页查询有问题，会有重复的数据显示（数据库没问题）
- sku管理模块和sku管理模块有不少bug
- 登录用户权限分配有bug

### 未来计划：

tip：相对容易达到，但最近较忙

- 实现一个免登录访问（游客访问），但是无权限对已有的数据进行修改和删除，不过可以自行增加数据
- 新增登录验证码
- 新增用户头像增删改（后端接口已写好，差前端页面显示）
- 角色管理列表新增角色拥有的权限值显示（后端接口已写好，差前端页面显示）
- 角色管理列表新增“描述”字段（后端接口已写好，差前端页面显示）
- 角色管理列表新增“用户所属”字段，用于查看每一个角色下有哪些用户（后端接口已写好，差前端页面显示）
- 权限（菜单）管理提供一个权限值参考表格查看，因为前端页面每个按钮都是固定的权限值，权限值对不上按钮是无法使用的
- 新增图片管理模块，用于管理用户头像、品牌图标、sku商品图片列表（没搞错的话，后端接口基本写好，差前端页面显示）
- 新增商品分类管理模块，用于增删查改分类（没搞错的话，后端接口基本写好，差前端页面显示）
- 新增操作日志模块，用于查看不同用户对数据库的操作记录，包括操作时间、调用的接口、状态码、以及接口返回的信息（没弄过，不知道好不好弄，试试看吧）

遥远的计划：

- 对图片管理进行优化，因为目前是不管图片是否最终使用，都会先存入数据库，感觉这种做法很笨，应该利用缓存会好些（也就是Redis？目前对这一块不了解，只是往这方面思考了，以后修改的时候再看看吧）
- 实现一个用户账号只能同时在一个设备上登录

### 结语：

该项目只是我的一些练习成果，还有许多需要优化的地方，也有我暂未发现的问题，欢迎大家批评指正！

最后，希望这些代码也能帮助需要帮助的伙伴，祝大家玩的开心！

本人qq：1870370674
