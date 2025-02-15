#!/bin/sh

# 设置默认的 commit message
DEFAULT_MSG="默认提交"

# 解析第一个参数
ACTION="$1"
shift # 移除第一个参数，剩下的作为 commit message

# 使用传入的 commit message，否则使用默认值
COMMIT_MSG="${1:-$DEFAULT_MSG}"

# 翻译 commit message
english_text=$(trans -b :en "$COMMIT_MSG")

# 拼接中文和英文 commit message
COMMIT_MSG="$COMMIT_MSG - $english_text"

if [ "$ACTION" == "commit" ]; then
    git commit -m "$COMMIT_MSG"
elif [ -z "$ACTION" ]; then
    git add . && git commit -m "$COMMIT_MSG" && git push
else
    echo "无效的参数，使用方式："
    echo "  $0            # 执行 git add、commit、push"
    echo "  $0 commit     # 仅执行 git commit"
fi
