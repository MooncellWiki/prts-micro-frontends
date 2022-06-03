# prts-micro-frontends

## setup for development

```sh
git clone https://github.com/MooncellWiki/prts-micro-frontends.git
cd prts-micro-frontends
pnpm i
pnpm run dev
```

提交时运行

```sh
pnpm run commit
git push
```

## 新建项目
```sh
node .\cli\index.mjs widgetName username password
```
会自动创建对应的入口文件，和站内页面。

## 子应用列表
会逐步迁移一些没人会去搜，而且需要复杂 lua/smw 查询的模板过来

- 需求材料干员 [Widget:ItemDemand/dev](http://prts.wiki/w/Widget:ItemDemand/dev)
- 干员语音 [Widget:VoiceTable/dev](https://prts.wiki/w/Widget:VoiceTable/dev)