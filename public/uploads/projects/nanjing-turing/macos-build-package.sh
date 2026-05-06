#!/usr/bin/env zsh
set -euo pipefail

#################################################################
# 基本路径——按需改动
#################################################################
QT_ROOT=~/Qt/6.5.3/macos                          # Qt 安装目录
SOURCE_DIR=~/Desktop/Nanjing/code/Seamly2D        # 项目根
BUILD_DIR=$SOURCE_DIR/build/Qt_6_5_3_for_macOS-Release
APP_NAME="Seamly2D.app"

#################################################################
# 推导 & 工作目录
#################################################################
STAGE=~/PackagingTest                 # 临时输出目录
APP="$STAGE/$APP_NAME"
DMG="$STAGE/Seamly2D_nosign.dmg"      # 最终 dmg 名

#################################################################
# 1) 准备临时目录 & 拷贝 .app
#################################################################
echo "=== 清理旧输出 ==="
rm -rf "$STAGE"
mkdir -p "$STAGE"

echo "=== 拷贝 Release 生成的 .app ==="
cp -R "$BUILD_DIR/src/app/seamly2d/bin/$APP_NAME" "$STAGE"

#################################################################
# 2) macdeployqt 收集 Qt 依赖
#################################################################
echo "=== macdeployqt 收集依赖 ==="
"$QT_ROOT/bin/macdeployqt" "$APP" \
  -qmldir="$SOURCE_DIR/src" \
  -always-overwrite -verbose=2 -no-strip

#################################################################
# 3) 生成压缩 DMG（无签名）
#################################################################
echo "=== 生成压缩 DMG ==="
# -fs HFS+   : 生成兼容 dmg
# -format UDZO : 压缩格式
hdiutil create \
  -volname Seamly2D \
  -srcfolder "$APP" \
  -fs HFS+ \
  -format UDZO \
  "$DMG"

echo ""
echo "✅ 完成！DMG 位于：$DMG"
echo "   * 本机双击可直接安装/运行"
echo "   * 拷到其它 Mac 时，首次打开需要："
echo "       右键 → 打开 → 再点『打开』绕过 GateKeeper"
echo "     或让对方在『系统设置 › 隐私与安全 › 安全性』里临时允许。"

