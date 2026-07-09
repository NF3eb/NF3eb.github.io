---
title: 基于Astro+Mizuki+GitHub Pages的自定义免费博客网站建站过程
published: 2026-07-08
description: "一个noob一步步探索建个人博客的记录和教程（？"
image: "./133535742_p0_master1200.jpg"
tags: ["记录", "教程"]
category: 教程
draft: false
---


<small>封面pid：133535742</small>

## 第零步：准备工作
---
- 安装Git<br>
<u>[Git官网](https://git-scm.com/install/)</u><br>
- 安装Node.js<br>
<u>[Node.js官网](https://nodejs.org/)</u><br>
- 创建一个GitHub账户<br>
<small>~~大概率需要魔法上网~~</small><br>
- 新建一个仓库<br>
可将仓库命名为<用户名>.github.io<br>
- （可选）安装GitHub Desktop<br>
如果使用GitBash执行指令push，pull，clone时出现这样的报错，大概率是Git的代理配置出了问题，可以用更改代理的方法解决，但是另一个更简单快捷的方法是使用 **GitHub Desktop**，GitHub Desktop会自动配制好我们的网络，而且图形化的操作窗口更加简单，适合新手使用。<br>
<u>[GitHub Desktop使用参考](https://blog.csdn.net/qq_53123067/article/details/138466344)</u><br>

```
Failed to connect to github.com port 443 after 21052 ms: Could not connect to server
```

我们需要安装Git，Nodejs，以及准备一个GitHub账号，并且创建一个自己的仓库用于存放我们的代码，这样我们的博客便托管在GitHub上（甚至服务器都借用的GitHub的不用自己掏钱了XD）。<br>
安装完成后，可以Win+R调出cmd输入以下指令查看git和nodejs是否正确安装。<br>

```cmd
git -v
node -v
npm -v
```

## 第一步：clone仓库到本地
---
在本地任意位置新建git文件夹，然后右键并选择“Open Git Bash here”，在窗口里输入指令：<br>

```bash
git init
```

<small>~~顺带一提git里面粘贴是`Shift+Insert`而不是`Ctrl+V`，同样地复制是`Ctrl+Insert`而不是`Ctrl+C`。~~</small><br>
之后这个文件夹就成为了你本地的git仓库。<br>
然后将Mizuki仓库clone到本地。<br>

```bash
git clone https://github.com/LyraVoid/Mizuki.git
```

<small>若出现443报错可安装Github Desktop解决</small><br>
此时Mizuki的仓库就已经clone到本地了，不过，在更改它的文件之前，我们还要先删除原来的.git信息，否则.git里面包含的提交url仍然是`https://github.com/LyraVoid/Mizuki.git`，进而导致我们之后push的时候就会默认push到Mizuki的仓库而不是我们自己的仓库导致访问被拒绝。<br>
具体地，按照以下步骤进行操作。<br>
进入Mizuki目录：<br>

```bash
cd Mizuki
```

删除原有的git信息：<br>

```bash
rm -rf .git
```

重新初始化：<br>

```bash
git init
git add .
git commit -m "Initial commit"
```

再连接到自己的仓库：<br>

```bash
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git branch -M main
```

现在这个仓库就完全属于我们自己了，后续的改动也不会受到原仓库的影响。<br>

## 第二步：○○，启动！
---
使用pnpm安装项目依赖：<br>

```bash
pnpm install
```

可以用`pnpm -v`检查是否安装完毕，随后执行指令<br>

```bash
pnpm dev
```

稍等片刻后，便可看到本地开发服务器成功启动，从返回的信息中可以看到服务器已经成功在本地`http://localhost:4321/`启动（实际的端口号可能因人而异，比如我电脑上实际上是在端口3000开放的），将其复制后粘贴进浏览器即可看见本地启动的网站。**（不要关闭GitBash窗口！！！）** <br>

## 第三步：配置你的网页
---
<big>参考Mizuki主题的<u>**[官网文档](https://docs.mizuki.mysqil.com/guide/intro/)**</u>进行配置。</big><br>
更改本地仓库的文件后进行保存，浏览器中的网页会自动刷新，即刻展示修改内容（文章修改可能会卡一会）。<br>
配置完后可以在Mizuki目录中使用以下指令检测是否有报错，确保网站上传后能正常运行。<br>

```bash
pnpm build
```

- tips1：官网文档里“基础布局”和“文章布局”栏目中包含的`src/config.ts`文件，实际上指的是`src\config`文件夹，`siteConfig`对象指的是这个文件夹中的文件`siteConfig.ts`，其他同理。此外，“文章布局”栏目中`toc`对象放在文件`siteConfig.ts`之中。<small>~~(好乱啊wwwww)~~</small><br>
- tips2：如果需要更改界面文字，可以到`\src\i18n\languages\zh_CN.ts`中更改。<br>
- 补：build阶段若出现以下的报错：<br>

```
16:36:51 [ERROR] [vite] ✗ Build failed in 3.93s
WebAssembly.Memory.grow(): Maximum memory size exceeded
```

有可能是修改了`\src\data\skills.ts`导致的。<br>
初步判断在`skills.ts`中`simple-icons:nginx`、`simple-icons:firebase`、`simple-icons:sqlite`、`simple-icons:express`这四个icon需要有至少一个icon**被包含在文件中**，才能正常运行。<br>
解决方式：在文件`skills.ts`开头加上以下的注释。<small>~~（这很诡异你知道吗）~~</small><br>

```TypeScript
// "simple-icons:sqlite"
```

## 第四步：提交到GitHub
---
在GitHub的仓库里打开 **Settings** ,在其中找到 **Pages** ，将**Build and deployment** 中的 **Deploy from a branch** 更改为 **Github Actions**。<br>
然后打开`\.github\workflow\deploy.yaml`，将其替换为以下代码：<br>

```yaml
name: Deploy to GitHub Pages
on:
  # 每次推送到 `main` 分支时触发这个“工作流程”
  # 如果你使用了别的分支名，请按需将 `main` 替换成你的分支名
  push:
    branches: [ main ]
  # 允许你在 GitHub 上的 Actions 标签中手动触发此“工作流程”
  workflow_dispatch:
# 允许 job 克隆 repo 并创建一个 page deployment
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v4
      - name: Install, build, and upload your site
        uses: withastro/action@v3
        with:
          # path: . # 存储库中 Astro 项目的根位置。（可选）
          node-version: 22 # 用于构建站点的特定 Node.js 版本，默认为 20。（可选）
          # package-manager: pnpm@latest # 应使用哪个 Node.js 包管理器来安装依赖项和构建站点。会根据存储库中的 lockfile 自动检测。（可选）
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

<small>官网文档中的代码node-version默认是20，但是实际上构建这个网站需要node-version至少22.13，这会导致GitHubActions的build过程中报错，因此我在此处直接将其改为22。</small><br>
运行以下指令，将你的网页代码提交到GitHub仓库中。<br>

```bash
git add .
git commit -m "Update message"
git push
```

<small>若出现443报错可安装Github Desktop解决</small><br>
提交完成之后，GitHub便会自动帮助我们build和deploy网站。<br>
build和deploy都成功后，我们便可以到<用户名>.github.io上去访问自己的个人网站啦。<br>
后续维护时，也只需执行以上三段指令，即可将本地的进度同步到GitHub Pages。<br>

## 后记
---
咕咕咕（还没开始写QAQ<br>