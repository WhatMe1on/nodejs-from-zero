#!/bin/sh

# 设置默认的 commit message
DEFAULT_MSG="默认提交"

# 判断第一个参数
if [ -z "$1" ]; then
    # 如果没有提供参数，则执行 git add、commit 和 push
    COMMIT_MSG="$DEFAULT_MSG"
    git add . 
    git commit -m "$COMMIT_MSG"
    git push
elif [ "$1" = "commit" ]; then
    # 如果第一个参数是 commit，则只执行 git commit
    COMMIT_MSG="${2:-$DEFAULT_MSG}"
    git commit -m "$COMMIT_MSG"
else
    echo "无效参数: $1"
    echo "用法: $0 [commit] [commit_message]"
    exit 1
fi