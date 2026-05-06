#!/usr/bin/env zsh
set -euo pipefail
autoload -Uz colors && colors

#################################################################
# ============ ❶ 仅修改这里 (其余保持不动) ======================
#################################################################
SOURCE_DIR=~/Desktop/Nanjing/code/Seamly2D                 # 源码
BUILD_DIR=$SOURCE_DIR/build/Qt_6_5_3_for_macOS-Release     # .app 产出
APP_NAME="Seamly2D.app"                                    # .app 名
QMLDIR="$SOURCE_DIR/src"                                   # 没 QML 则留空

IDENTITY_NAME="Seamly2D Code Signing"        # 叶子证书名 (login)
LOGIN_KC="$HOME/Library/Keychains/login.keychain-db"
SYSTEM_KC="/Library/Keychains/System.keychain"

QT_ROOT=~/Qt/6.5.3/macos                                   # Qt 根
#################################################################

# ============ ❷ 自动推导 =============================
STAGE=~/Packaging
APP="$STAGE/$APP_NAME"
DMG_OUT="$STAGE/Seamly2D.dmg"
MACDEPLOY="$QT_ROOT/bin/macdeployqt"

# 让 codesign 先搜 login, 再搜 System
security list-keychains -s "$LOGIN_KC" "$SYSTEM_KC"

print "${fg[cyan]}=== 0) 检查证书链 & 获取 identity ===${reset_color}"
# ── 检查根 CA ───────────────────────────────────────────
if ! security find-certificate -c "Seamly2D Test CA" "$SYSTEM_KC" >/dev/null 2>&1 ; then
  print "${fg[red]}✖ 未在 System.keychain 找到『Seamly2D Test CA』${reset_color}"
  exit 1
fi
# ── 检查 login 中是否同时有证书 + 私钥 ───────────────────
if ! security find-key -l -c "$IDENTITY_NAME" "$LOGIN_KC" >/dev/null 2>&1 ; then
  print "${fg[red]}✖ 在 login.keychain 里找不到『$IDENTITY_NAME』的私钥${reset_color}"
  exit 1
fi
IDENTITY=$(security find-identity -v -p codesigning "$LOGIN_KC" | \
           awk "/$IDENTITY_NAME/{print \$2; exit}")
print "✔ 使用 identity: $IDENTITY ($IDENTITY_NAME)"

# ── 1)-8) 打包流程 ─────────────────────────────────────
print "${fg[cyan]}=== 1) 清理旧输出 ===${reset_color}"
rm -rf "$STAGE"; mkdir -p "$STAGE"

print "${fg[cyan]}=== 2) 拷贝 Release 生成的 .app ===${reset_color}"
cp -R "$BUILD_DIR/src/app/seamly2d/bin/$APP_NAME" "$STAGE"

print "${fg[cyan]}=== 3) macdeployqt 收集依赖 ===${reset_color}"
args=(-always-overwrite -verbose=2 -no-strip)
[[ -n "$QMLDIR" ]] && args+=(-qmldir="$QMLDIR")
"$MACDEPLOY" "$APP" "${args[@]}"

print "${fg[cyan]}=== 4) 去除旧签名 / 扩展属性 ===${reset_color}"
codesign --remove-signature "$APP" 2>/dev/null || true
find "$APP" \( -name "*.framework" -o -name "*.dylib" -o -perm -111 \) \
     -exec codesign --remove-signature {} + 2>/dev/null || true
find "$APP" -exec xattr -c {} + 2>/dev/null || true

print "${fg[cyan]}=== 5-a) 重签可执行和 dylib ===${reset_color}"
find "$APP" -type f \( -perm -111 -o -name "*.dylib" \) | while read -r f; do
  codesign --force --options runtime --timestamp=none \
           --keychain "$LOGIN_KC" --sign "$IDENTITY" "$f"
done

print "${fg[cyan]}=== 5-b) 重签各 Framework 目录 ===${reset_color}"
find "$APP/Contents/Frameworks" -maxdepth 1 -name "*.framework" | while read -r f; do
  codesign --force --options runtime --timestamp=none \
           --keychain "$LOGIN_KC" --sign "$IDENTITY" "$f"
done

print "${fg[cyan]}=== 6) 深度重签 .app 外壳 ===${reset_color}"
codesign --force --options runtime --timestamp=none --deep \
         --keychain "$LOGIN_KC" --sign "$IDENTITY" "$APP"

print "${fg[cyan]}=== 7) 校验签名 ===${reset_color}"
codesign --verify --deep --strict --verbose=2 "$APP"
spctl   --assess --type execute --verbose=4 "$APP"

print "${fg[cyan]}=== 8) 生成压缩 DMG ===${reset_color}"
hdiutil create -volname Seamly2D -srcfolder "$APP" -fs HFS+ -format UDZO "$DMG_OUT"

print "${fg[green]}✅ 完成！DMG 位于：$DMG_OUT${reset_color}"

