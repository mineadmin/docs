# 更新版本

:::tip
MineAdmin是一个持续迭代版本、新增功能和修复BUG的系统，您可以参考此文档保持您的MineAdmin为最新版本。
:::

## 更新最新的代码
```sh
# 保存工作现场（将目前还不想提交的但是已经修改的代码保存至堆栈中）
git stash

# 从远程仓库获取最新代码并自动合并到本地
git pull

# pull 命令如果有冲突，先处理冲突（您新增的文件不会发生冲突，而框架文件我们更新同时您也更新了该文件才可能冲突）

# 恢复工作现场
git stash pop
```

## 更新依赖

### 更新后端
```sh
composer update -vvv
```

### 更新前端
```sh
yarn
```

## 升级数据库
```sh
php bin/hyperf.php mine:update
```

## 更新Redis缓存
进入到后台首页，点击头像下拉菜单弹出`清除缓存`即可