- ## 项目简介

  商城后台管理项目，用于管理员工的用户信息和职责分配以及设置权限，实现用户信息、角色信息和权限信息的增删查改，以及用户登录退出；同时也用于管理品牌和商品。

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
