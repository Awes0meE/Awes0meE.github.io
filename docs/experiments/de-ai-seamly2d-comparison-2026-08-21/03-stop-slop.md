# Seamly2D 三周实习里的错误与交接边界

实习结束约半个月后，我在家里一台没有 Qt 和 Visual Studio 的新装 Windows 台式机上运行 Inno Setup 安装程序。我打开修改版 Seamly2D，完成注册与登录，进入程序后操作角色功能。

我在 README 中看到 `移植到任意电脑都可以运行`。三周实习期间，我手边没有符合条件的测试机。我在开发机上完成安装和启动。我在家里的补测中确认了换机运行。我没有把结果写回旧文档。我没有回公司请带教工程师复验。公司正式验收不包含它。

我对齐分支与 Qt 包，进入源码构建。我选择编译器和构建类型，生成二进制。我用角色规则限制用户进入程序后的权限，根据目标机器与签名状态记录交付范围。

## Qt 安装器卡在 10%

2025 年 8 月第一周，我在南京参加全国大学生电子设计竞赛。第二周，我进入研究院做三周全职线下实习。每天早上 8 点到办公室，下午 5 点离开。带教工程师布置当天任务，我完成后汇报。

我带着学校课程里学过的一些 C/C++ 语法进入项目，没有 Qt 和 GUI 开发经验。我没有参与过大型开源仓库或协作式 Git。我参与的项目基于开源纸样设计软件 Seamly2D。我查看上游分支，把代码拉到公司为实习生准备的开发线。

第一天，我安装 Git、MSVC v142、Windows SDK 和 CDB。我配置 Qt Creator 与 Qt Kit。我用 Qt Online Installer 连接海外服务器，约 3 小时后看到进度停在 10% 左右。我以为大型软件需要这段时间，在电脑前等了大半天。

第二天，带教工程师告诉我清华 TUNA 镜像。我切换下载源，用略多于 1 小时完成剩余安装。我从 [TUNA 的 Qt 镜像说明](https://mirrors.tuna.tsinghua.edu.cn/help/qt/)查到在线安装器的 `--mirror` 参数。

## `qmake_all finished successfully` 与三十多个编译错误

我选择 Qt 5.15.2。我运行 qmake 时在 `core5compat` 处遇到错误。我把它改成条件加载，清理工程并重跑 qmake，在终端看到 `qmake_all finished successfully`。

我执行完整构建后收到三十多个错误。我在源码里找到 `QStringConverter` 和 Qt 6 头文件。我在其他位置读到 Qt 6 风格调用。我用 qmake 处理了 `.pro` 文件，进入编译阶段后遇到 Qt 6 代码。我没有继续给这批源码补 Qt 5 条件编译。我评估这条路线耗时，偏离三周任务。

我安装 Qt 6.5.3 MSVC2019 64-bit 和 Qt 5 Compatibility Module，在 Kit 中选用 v142 编译器。我删除旧 build 目录与 `Seamly2D.pro.user`，配置新 Kit。我用这套组合完成 qmake 和完整构建。读者可以从 [Qt6 首跑原始记录](/notes/turing-qt-seamly2d-first-run)查看修改过程。

我在 [Qt 6.5 支持配置](https://doc.qt.io/qt-6.5/windows.html)里查到 Windows、x86-64 和 MSVC 2019 的对应关系。我在这次排查中开始把版本、编译器和架构放在一起理解。我没有因此自称 Qt 或跨平台构建专家。

## 我把注册和登录接到主程序前面

第一周后半段，我在 Seamly2D 主界面前增加本地注册与登录，并在 `main()` 附近整理入口顺序。我在第一版中用 `QSettings` 保存用户信息，用明文存储和字符串比较处理密码。我把密码改成哈希存储与校验，把密码输入框设为遮蔽显示。

我为已有用户名和不存在用户名写了提示。我区分密码错误提示。我在界面测试中发现输入问题。我按回车时，界面触发取消；我输入用户名时，界面弹出联想。我用中文输入法操作密码框时遇到闪退。我修正回车和联想行为，处理密码框闪退。

我用 `QSettings` 承担本机持久化。我根据 [Qt 的 `QSettings` 文档](https://doc.qt.io/qt-6.5/qsettings.html)把它当作跨平台应用设置抽象。我没有接入数据库。三周内，我没有实现服务器与在线认证。

第二周，用户首次注册时必须使用 `admin` 作为用户名。我实现普通用户和管理员两种角色，把用户管理入口限制给管理员。我为删除操作增加二次确认，管理员的删除对象限于普通用户。管理员可以升级普通用户。`admin` 执行降级，其他管理员无权互相降级。

读者能在 [公开角色摘录](/uploads/projects/nanjing-turing/auth-role-snippet.cpp)中看到 `Role::User`、`Role::Admin` 和本地角色查询，从公开材料中看不到完整账户源码。读者可以从 [第二周原始日志](/uploads/projects/nanjing-turing/week-2-development-log.txt)查看这些限制条件。

## 我花三天让构建环境找到 `windeployqt`

第三周，我把工作切到 Release。我在 Qt Creator 中启动带账户入口的程序，执行部署步骤时收到 `windeployqt` 找不到命令的错误。我能在 Qt 安装目录里看到可执行文件。我在约三天里重装并检查路径。我改过配置。我为这段排错感到烦躁。我记不清每次尝试的次序，无法还原精确时间线。

我从当时文档确认两处修复。我把 Qt `bin` 加入 Qt Creator 的 Build Environment。我修改两个 `.pro` 文件的 post-link 规则，通过 `QT_INSTALL_BINS` 定位 `windeployqt`，并把规则限制在 Release 配置。

我查阅 [Qt 6.5 的 Windows 部署说明](https://doc.qt.io/qt-6.5/windows-deployment.html)，用 `windeployqt` 扫描 `.exe` 并收集 Qt 库和插件。我让它处理翻译与运行时文件，自己补入第三方库。

我把 Qt DLL 放进部署目录，启动程序时看到 `xerces-c_3_2.dll` 缺失。我把这个文件补进目录。我从 Seamly2D 源码和样例中看到软件用 XML 保存纸样数据，需要 Xerces-C++ 解析。我读过 `.sm2d` 与 `.smis` 样例，看到纸样点和线怎样进入 XML。我从样例中读到曲线与量体变量，也在源码里查看程序怎样通过解析库读取这些数据。

读者可以从 [XML 样例笔记](/notes/turing-sm2d-xml-data-format)查看这部分数据结构。我学习 CMake 和 Ninja，梳理编译器与链接器的职责。我查了生成器、Qt 包发现和运行时依赖，读者可以从 [CMake 与编译逻辑笔记](/notes/turing-cmake-build-logic)查看这条学习线。我在 Seamly2D 项目中沿用 qmake，没有把项目迁移到 CMake。

## 公司验收与换机补测分开记录

我补齐依赖后创建 Windows 自签名证书，用 Inno Setup 把部署目录制作成安装程序。我给应用和安装包签名。我在实习开发机完成 Release 构建与依赖收集，在同一台机器上打包、安装并启动程序。

带教工程师在正式验收中检查账户功能和 Windows 部署结果。读者可以从 [打包流程文档](/notes/turing-release-packaging-cross-platform)看到测试机器限制。我在实习记录中写下开发机安装成功，把家中台式机的换机结果归入实习结束后的个人补测。

## Mac 交付停在无签名 DMG

Windows 路线完成后，我把同一份源码迁到自己的 Mac。我发现 Homebrew Qt 与官方 Qt 的路径和架构不同。我无法沿用 Windows Kit。我配置 Mac 环境，跑通 Debug 和 Release，用 `macdeployqt` 收集 Qt framework 与插件。我启动应用，生成无签名 DMG 并在这台 Mac 上打开。带教工程师看过现场演示。

我创建自签名证书，写了一份包含 `codesign`、`spctl` 和 DMG 生成顺序的脚本。我没有完成应用签名。我没有尝试 notarization。我没有 Developer ID。

我查阅 Qt 的 [`macdeployqt` 文档](https://doc.qt.io/qt-6.5/macos-deployment.html)了解应用包中的 framework 与插件，从 Apple 的 [Developer ID 说明](https://developer.apple.com/support/developer-id/)核对分发者身份和公证要求。我用 [第一份脚本](/uploads/projects/nanjing-turing/macos-build-package.sh)记录跑通的无签名路线，用 [第二份脚本](/uploads/projects/nanjing-turing/macos-build-package-sign.sh)记录未完成的签名尝试。

## 我把改动交到 `develop`

我第一次在这次实习中用 Git 参与协作。我 clone 仓库，查看并切换上游分支。我创建开发分支，提交并推送改动。我用过 merge 和 pull request。我用过 fork 与 tag。

公司为实习生维护 `develop` 分支。我把源码改动和日志提交到这条分支，把交接材料放进同一分支。离开研究院后，我不知道公司是否采用或产品化这些改动。我记录了交接，没有补写后续采用结论。

带教工程师在正式验收中检查注册登录和角色管理，检查 Windows 安装并看了 Mac 演示。他说我三周前不了解 Qt，三周后能够推进这套大型项目，取得了大幅进步。我听到这段评价时感到兴奋。

三周结束时，我能沿着错误和分支进入陌生代码库，处理依赖并交出改动。我没有完成 Mac 应用签名。我没有尝试 notarization。我不知道公司后续是否采用这些改动。

我把 Qt Creator 的绿色运行按钮记作当前开发环境的一次启动。我在交付记录中列出分支与工具链、构建类型、目标机器和平台信任状态。
