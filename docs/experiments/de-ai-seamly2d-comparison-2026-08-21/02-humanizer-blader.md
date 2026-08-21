# Seamly2D 跑起来的条件

## 下载进度停在 10%

2025 年八月第一周，我刚在南京打完全国大学生电子设计竞赛，第二周就进了研究院，开始连续三周的全职线下实习。每天早上八点到、下午五点走，带教工程师布置当天任务，我做完再去汇报。项目基于开源纸样设计软件 Seamly2D。我先查看上游分支，再进入公司为实习生准备的开发线。那时我只会学校里学过的一些 C/C++ 语法，没有用过 Qt，也没有做过 GUI、进过大型开源仓库，Git 在我手里基本还只是下载 GitHub 代码的工具。

第一天先装环境。Git、MSVC v142、Windows SDK、CDB、Qt Creator 和 Qt Kit 都列在清单里，Qt Online Installer 最耗时间。它连着海外服务器跑了三个小时，进度大约 10%。我不知道还有镜像这回事，只觉得大软件大概就该这么慢，于是陪着进度条等了大半天。第二天，带教工程师问清情况，让我切到清华 TUNA 镜像，剩下的安装略多于一个小时就结束了。现在看 [TUNA 的 Qt 镜像说明](https://mirrors.tuna.tsinghua.edu.cn/help/qt/)，在线安装器的 `--mirror` 用法写得很直接；我当时晚一天才知道，先交了一点新人学费。

## qmake 只管到 `.pro`

最初装的是 Qt 5.15.2。工程里的 `core5compat` 先让 qmake 报错，我把它改成条件加载，清理后重跑，终于看到 `qmake_all finished successfully`。紧接着，完整构建冒出三十多个错误。当前源码已经用了 `QStringConverter`、Qt 6 头文件和 Qt 6 风格的调用，qmake 成功只说明 `.pro` 被处理过，编译器并没有因此获得兼容 Qt 5 的代码。

继续走 Qt 5，就得给一批源码补条件编译。以我当时对 Qt 的熟悉程度，这既慢，也偏离三周实习的任务。我改装 Qt 6.5.3 MSVC2019 64-bit 和 Qt 5 Compatibility Module，仍选 v142 编译器，删掉旧 build 目录与 `Seamly2D.pro.user`，重新配置 Kit。再跑 qmake 和完整构建，源码与工具链才接上。[Qt 6 首跑记录](/notes/turing-qt-seamly2d-first-run)留着这些修改，也留着那种每解决一个错误，才发现前一个成功只管了一小段的推进方式。

Qt 6.5 的 [Windows 支持配置](https://doc.qt.io/qt-6.5/windows.html)把 Windows、x86-64 和 MSVC 2019 放在同一组条件里。版本、编译器和架构原来会一起决定两个二进制世界能否相接，我是到这次排查才把安装界面里的三项信息连起来。

## 登录窗口把问题带到了状态转换

第一周后半段，我在 Seamly2D 主界面前加了本地注册与登录。第一版用 `QSettings` 保存用户信息，直接把密码以明文存下，再做字符串比较；后来改成哈希值存储与校验，密码框也换成遮蔽显示。用户已存在、用户不存在和密码错误，各自都有提示。我还在 `main()` 附近整理了注册、登录以及进入主程序的顺序。

窗口上的小问题比权限规则更早拦住用户。回车键默认触发取消，用户名输入会弹联想，密码框碰到中文输入法还发生过闪退。我逐项修正输入行为。尤其是中文输入法崩溃，它看起来和账户权限毫无关系，却足以让入口直接消失。

`QSettings` 负责本机持久化。Qt 官方也把它写成一种[跨平台应用设置抽象](https://doc.qt.io/qt-6.5/qsettings.html)。这三周没有数据库、服务器、在线认证或后端账户系统，那些工作不在实习范围里；我验证的是现有 C++ 桌面程序能否先加上一层可靠的本地入口。

第二周，账户功能继续做到角色管理。首次注册的用户名必须是 `admin`，角色分为普通用户和管理员，只有管理员看得到用户管理。删除操作需要二次确认，而且只能删除普通用户；升级同样只对普通用户开放，降级只能由 `admin` 执行，免得其他管理员互相改回普通用户。写进周日志时，它们只是查看、删除、升级、降级几项功能。落到代码里，每一步都要同时看当前用户、目标用户、目标角色和允许的下一状态。

[公开角色摘录](/uploads/projects/nanjing-turing/auth-role-snippet.cpp)只留下 `Role::User`、`Role::Admin` 与本地角色查询，没有公开完整账户源码。[第二周开发日志](/uploads/projects/nanjing-turing/week-2-development-log.txt)则按当时的顺序记下了这组限制。

## Release 卡在 `windeployqt`

第三周，构建目标从 Develop 转向 Release。带账户入口的程序此前已经能从 Qt Creator 启动，我原以为把它导出来就行，`windeployqt` 却让我停了大约三天。部署步骤一直说找不到命令，可执行文件明明就在 Qt 安装目录。我记得自己重装过、查过路径，也重新配过环境，过程确实很烦，至于每次尝试的准确顺序，现在已经记不清了。

当时的文档保留了最后可用的方案。Qt Creator 的 Build Environment 要能看到 Qt `bin`，两个 `.pro` 文件里的 post-link 规则也改用 `QT_INSTALL_BINS` 定位 `windeployqt`，并且只在 Release 配置下执行。系统设置里写过一条环境变量还不够，启动构建任务的进程得实际拿到它。

Qt 6.5 的 [Windows 部署说明](https://doc.qt.io/qt-6.5/windows-deployment.html)说明，`windeployqt` 会扫描 `.exe`，收集 Qt 库、插件、翻译和运行时文件，额外的第三方库不归它处理。部署目录已经铺满 DLL，程序仍然报缺少 `xerces-c_3_2.dll`，原因就在这里。Seamly2D 用 XML 保存纸样数据，Xerces-C++ 是单独的 XML 依赖，我把它手动补进部署目录。

第三周前面读过的 `.sm2d` 与 `.smis` 样例也在这时接了回来。纸样点、线、曲线和量体变量写在 XML 里，程序最终要靠实际解析库把它们读出来。[XML 数据格式笔记](/notes/turing-sm2d-xml-data-format)记录了这些结构。同期我还在 [CMake 与编译逻辑笔记](/notes/turing-cmake-build-logic)里分辨编译器、链接器、生成器、Ninja、Qt 包发现和运行时依赖。Seamly2D 一直使用 qmake，我没有把它迁移到 CMake。

## 另一台 Windows 补上了验证

依赖补齐后，我创建 Windows 自签名证书，用 Inno Setup 把部署目录做成安装程序，再给应用和安装包签名。Release 构建、依赖收集、签名、打包、安装和启动这条链在实习开发机上完整跑过。正式验收时，带教工程师也逐项检查了账户功能与 Windows 部署结果。

原始[跨平台打包记录](/notes/turing-release-packaging-cross-platform)完成时，我手边没有一台同时缺少 Visual Studio 和 Qt 的 Windows 机器。正式实习记录能证明的只有开发机本地安装与启动，README 当时写的「移植到任意电脑都可以运行」走在证据前面。

实习结束约半个月后，我回到家，在一台新装的 Windows 台式机上补测。那台机器没有 Qt，也没有 Visual Studio。我运行 Inno Setup 生成的安装程序，装好后打开修改版应用，实际操作了注册、登录和角色功能。这次测试没有写回旧文档，也没有回公司请导师重新验收。它是我亲自做过的换机验证，不属于公司正式验收。

## Mac 打开的仍是无签名 DMG

Windows 路线跑通后，我把同一份源码搬到自己的 Mac。Homebrew Qt 与官方 Qt 的路径和架构不同，Windows Kit 也不会跟着仓库迁移。我重新跑通 Debug 和 Release，用 `macdeployqt` 收集 Qt framework 与插件，应用实际启动，无签名 DMG 也成功生成，并在这台 Mac 上打开过。带教工程师现场看了演示。

我创建过自签名证书，还写了一份包含 `codesign`、`spctl` 与 DMG 生成顺序的脚本，但应用签名始终没有完成，notarization 也没有尝试，更没有 Developer ID。Qt 的 [`macdeployqt` 文档](https://doc.qt.io/qt-6.5/macos-deployment.html)处理 framework 和插件，Apple 的 [Developer ID 说明](https://developer.apple.com/support/developer-id/)讲的是分发者身份与公证检查，两件事不能由同一条打包命令代替。

[第一份脚本](/uploads/projects/nanjing-turing/macos-build-package.sh)记录了实际跑通的无签名路线，[第二份脚本](/uploads/projects/nanjing-turing/macos-build-package-sign.sh)留下没有完成的签名尝试。DMG 能在我的 Mac 上打开，仍不足以证明应用可以正式分发、已经通过 Gatekeeper、完成签名或公证。

## 代码交到了 `develop`

这三周也是我第一次把 Git 当作协作工具使用。我实际做过 clone、查看与切换上游分支、创建开发分支、commit、push、merge、pull request、fork 和 tag。公司为实习生维护了一条 `develop` 分支，最终源码改动、日志与交接材料都提交到那里。我离开以后，公司是否继续采用或产品化这项工作，我不知道，只能把记录停在交接。

正式验收覆盖注册登录、角色管理、Windows 安装和 Mac 演示。验收结束时，带教工程师明确肯定了我三周内从完全不知道 Qt，到能够推进一个大型项目的进步。他夸了很久，我当时也确实兴奋。三周后我仍然算不上 Qt 专家。面对一套陌生的大型代码，我可以沿着错误、分支与依赖慢慢走进去，最后把自己的改动交出去。这件事，我第一次有了把握。

实习以前，命令行程序给出正确输出，我大概就会说它「能跑」。三周以后，这个词后面多了不少条件：哪条分支、哪套 Qt、哪个编译器、什么角色、哪种构建、在哪台机器上，以及平台是否信任它。Qt Creator 的绿色三角仍然有用，只是它证明的事情比我最初以为的少。它留在一条更长验证链的起点。
