# 绿色三角亮了，Seamly2D 还没跑完

第三周，`windeployqt` 明明躺在 Qt 安装目录里，构建却说找不到。那三天我重装、查路径、重新配置，准确顺序已经记不清，只记得很烦。奇怪的是，带账户入口的 Seamly2D 早就在 Qt Creator 里启动过。绿色三角亮着，Release 仍然不知道去哪里找 Qt `bin`。

我那时才开始把「能跑」拆开。开发环境里启动成功是一条结论，收齐依赖、做成安装包、换台机器打开，又是几条各自需要验证的结论。三周里，这个词一次次变长。

## 先被下载进度教了一课

时间往前拨两周。2025 年八月第一周，我刚在南京参加完全国大学生电子设计竞赛，第二周便进入研究院，开始连续三周的全职线下实习。每天早上八点到，下午五点离开。带教工程师布置当天任务，我做完再汇报。项目是开源纸样设计软件 Seamly2D。我当时只会学校里学过的一些 C/C++ 语法，没有用过 Qt，也没做过 GUI、进过大型开源仓库，协作式 Git 同样没有实际用过。

第一天的任务很朴素，安装开发环境。Git、MSVC v142、Windows SDK、CDB、Qt Creator 和 Qt Kit 一项项排开，Qt Online Installer 却连着海外服务器跑了三个小时，进度大约 10%。我不知道镜像是什么，只觉得大软件可能就该这么慢，于是陪着它等了大半天。

第二天，带教工程师问清情况，让我切到清华 TUNA 镜像。剩下的安装略多于一个小时便结束了。现在看 [TUNA 的 Qt 镜像说明](https://mirrors.tuna.tsinghua.edu.cn/help/qt/)，在线安装器的 `--mirror` 用法写得很清楚；我当时晚一天才知道，先交了一笔新人学费。原以为进研究院会立刻碰复杂 UI，第一份有效经验却是下载源也属于开发环境。

## qmake 的成功只到 `.pro` 为止

环境装好后，我 clone Seamly2D，查看上游分支，再进入公司为实习生准备的开发线。最初选 Qt 5.15.2，是因为安装和 Kit 看起来已经齐了。工程里的 `core5compat` 先让 qmake 报错，我把它改成条件加载，清理后重跑，终于看到 `qmake_all finished successfully`。

完整构建随即冒出三十多个错误。

当前源码已经使用 `QStringConverter`、Qt 6 头文件和 Qt 6 风格调用。qmake 没有骗我，它只回答了 `.pro` 是否处理成功，源码能否由 Qt 5 编译根本不归这句成功负责。继续走 Qt 5，就要给一批源码补条件编译。对刚接触 Qt、实习只有三周的我来说，这条路太慢，也偏离了任务。

我改装 Qt 6.5.3 MSVC2019 64-bit 与 Qt 5 Compatibility Module，选择 v142 编译器，删除旧 build 目录和 `Seamly2D.pro.user`，重新配 Kit。qmake 和完整构建这才通过。[Qt 6 首跑记录](/notes/turing-qt-seamly2d-first-run)保留了这些修改。Qt 6.5 的 [Windows 支持配置](https://doc.qt.io/qt-6.5/windows.html)也把 Windows、x86-64 与 MSVC 2019 放在同一组条件里。版本、编译器和架构会一起决定二进制能不能接上，我直到这次排查才把安装界面里的三项信息连起来。

## 密码框先撞开了权限问题

第一周后半段，我在 Seamly2D 主界面前加了本地注册与登录。第一版用 `QSettings` 保存用户信息，密码明文存储后直接做字符串比较；后来改为哈希值存储与校验，密码框也换成遮蔽显示。用户已经存在、用户不存在、密码错误，各自有明确提示。我还在 `main()` 附近整理了注册、登录和进入主程序的顺序。

权限规则还没变复杂，窗口先出了状况。回车键默认触发取消，用户名输入会弹联想，密码框遇到中文输入法还发生过闪退。我逐项修正输入行为。中文输入法崩溃完全不像权限问题，却能在任何角色判断发生以前把入口关掉。

`QSettings` 只承担本机持久化。Qt 官方也把 [`QSettings`](https://doc.qt.io/qt-6.5/qsettings.html)定义为跨平台应用设置抽象。这个项目没有数据库、服务器、在线认证或后端账户系统，那些内容不在三周实习范围里。这里做的是一层本地入口。

第二周，账户继续长出角色。首次注册的用户名必须是 `admin`，角色分为普通用户和管理员，只有管理员看得到用户管理。删除需要二次确认，目标只能是普通用户；升级也只对普通用户开放；降级只能由 `admin` 执行，避免其他管理员互相降级。周日志里的查看、删除、升级、降级，看上去像四个菜单动作。代码每走一步，都要同时看当前用户、目标用户、目标角色和允许的下一状态。

[公开角色摘录](/uploads/projects/nanjing-turing/auth-role-snippet.cpp)只留下 `Role::User`、`Role::Admin` 与本地角色查询，没有公开完整账户源码。[第二周开发日志](/uploads/projects/nanjing-turing/week-2-development-log.txt)则按当时顺序记着整组限制。

## 文件都在，构建环境看不见

回到第三周的 `windeployqt`。当时文档留下的可用方案是，让 Qt Creator 的 Build Environment 看见 Qt `bin`；两个 `.pro` 文件里的 post-link 规则改用 `QT_INSTALL_BINS` 定位 `windeployqt`，并且只在 Release 配置执行。工具躺在硬盘上，启动构建任务的进程拿不到对应环境，它就和不存在差不多。

Qt 6.5 的 [Windows 部署说明](https://doc.qt.io/qt-6.5/windows-deployment.html)写明，`windeployqt` 会扫描 `.exe`，收集 Qt 库、插件、翻译与运行时文件，额外的第三方库不由它处理。部署目录已经铺满 DLL，程序仍然缺 `xerces-c_3_2.dll`。Seamly2D 用 XML 保存纸样数据，Xerces-C++ 是单独的 XML 依赖，我把它手动补进目录。

第三周前面，我读过 `.sm2d` 与 `.smis` XML 样例，里面的纸样点、线、曲线和量体变量，最后都要交给解析库读取。[XML 数据格式笔记](/notes/turing-sm2d-xml-data-format)留着这些结构。我也在 [CMake 与编译逻辑笔记](/notes/turing-cmake-build-logic)里分辨编译器、链接器、生成器、Ninja、Qt 包发现和运行时依赖。Seamly2D 始终使用 qmake，我没有把它迁移到 CMake。

## 两台 Windows，结论不能混用

依赖补齐后，我创建 Windows 自签名证书，用 Inno Setup 把部署目录做成安装程序，再给应用和安装包签名。Release 构建、依赖收集、签名、打包、安装、启动，这条链在实习开发机上完整跑过。正式验收时，带教工程师逐项检查了账户功能与 Windows 部署结果。

当时的[跨平台打包记录](/notes/turing-release-packaging-cross-platform)没有假装证据更多。手边没有另一台同时缺少 Visual Studio 和 Qt 的 Windows 设备，正式实习记录的结论只能停在开发机上的安装与启动。README 那句「移植到任意电脑都可以运行」写快了。

实习结束约半个月后，我回到家，在一台新装的 Windows 台式机上补测。那台机器没有 Qt，也没有 Visual Studio。我运行 Inno Setup 生成的安装程序，打开修改版应用，实际操作注册、登录和角色功能。这个结果没有写回旧文档，也没有带回公司让导师重新验收。它是我亲自完成的换机验证，不属于公司正式验收。

## DMG 打开了，信任身份还没有

Windows 路线完成后，我把同一份源码搬到自己的 Mac。Homebrew Qt 与官方 Qt 的路径和架构不同，Windows Kit 也不会跟着仓库迁移。我重新跑通 Debug、Release，用 `macdeployqt` 收集 Qt framework 和插件，应用实际启动，无签名 DMG 也生成并在这台 Mac 上打开过。带教工程师现场看了演示。

签名停在下一步。我创建过自签名证书，还写了一份包含 `codesign`、`spctl` 和 DMG 生成顺序的脚本。应用签名始终没有完成，notarization 没有尝试，也没有 Developer ID。Qt 的 [`macdeployqt` 文档](https://doc.qt.io/qt-6.5/macos-deployment.html)解决 framework 与插件的收集，Apple 的 [Developer ID 说明](https://developer.apple.com/support/developer-id/)解释分发者身份与公证检查，它们管的是两件事。

[无签名打包脚本](/uploads/projects/nanjing-turing/macos-build-package.sh)记录已经跑通的路线，[签名尝试脚本](/uploads/projects/nanjing-turing/macos-build-package-sign.sh)保留没有完成的部分。DMG 能在我的 Mac 上打开，不能推出应用已经完成签名、公证、通过 Gatekeeper 或具备正式分发条件。脚本可以记住命令顺序，不能替我拿到 Developer ID。

## 代码交到 `develop`，记录停在交接

实习前，Git 在我手里主要用于下载 GitHub 代码。这三周里，我实际做过 clone、查看和切换上游分支、创建开发分支、commit、push、merge、pull request、fork 和 tag。公司为实习生维护专用 `develop` 分支，最终源码改动、日志与交接材料都提交到了那里。我离开以后，公司是否继续采用或产品化这项工作，我不知道，文章也只能写到交接。

正式验收覆盖注册登录、角色管理、Windows 安装和 Mac 演示。验收结束时，带教工程师特意提到，我三周前还完全不知道 Qt，现在已经能把一个大型项目推进到这个程度。他夸了很久，我当时也确实兴奋。Qt 专家还谈不上。面对一套陌生的大型代码，我第一次有把握沿着错误、分支和依赖走进去，再把自己的修改交出去。

三周前，命令行程序给出正确输出，我大概就会叫它「能跑」。现在这两个字后面多了条件。分支要对，Qt 包与编译器要接得上；角色转换不能越界，Release 要收齐依赖；换台 Windows 得重新验证，到了 macOS 还要处理平台信任。Qt Creator 的绿色三角没有失效。它只是亮在一条更长验证链的起点。
