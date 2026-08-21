# Seamly2D 能跑了，可条件越来越多

## Qt 安装器只走了 10%

2025 年 8 月，我刚在南京参加完全国大学生电子设计竞赛，第二周就进了研究院，开始连续三周的线下全职实习。每天早上 8 点到、下午 5 点走，带教工程师当天布置任务，我做完再汇报。那时我只学过一些学校课程里的 C/C++ 语法，没有做过 Qt、GUI 或大型开源项目，也没真正用 Git 和别人协作过。

第一天先装环境。Git、MSVC v142、Windows SDK、CDB、Qt Creator 和 Qt Kit 都列得很清楚，最磨人的是 Qt Online Installer。它连着海外服务器下了约 3 个小时，进度只有 10% 左右。我当时不知道还有镜像，以为大型软件就得这么慢，在那里等了大半天。第二天带教工程师问清情况，告诉我换清华 TUNA 镜像，剩下的安装用了一个多小时。[清华 TUNA 的 Qt 镜像说明](https://mirrors.tuna.tsinghua.edu.cn/help/qt/)现在仍列着在线安装器的 `--mirror` 用法。我在这份实习里学到的第一件实用小事，和 UI 没什么关系，是下载源也属于开发环境。

## qmake 的成功只管到 `.pro`

环境装好后，我第一次 clone 开源纸样设计软件 Seamly2D，查看上游分支，再把代码拉到公司给实习生准备的开发线上。起初我选了 Qt 5.15.2，因为安装项和 Kit 看起来都齐了。工程里的 `core5compat` 先让 qmake 报错，我把它改成条件加载，清理后重跑，终于看到 `qmake_all finished successfully`。

完整构建紧接着报出 30 多个错误。当前源码里已经有 `QStringConverter`、Qt 6 头文件和 Qt 6 风格的调用。qmake 成功只说明 `.pro` 已经被处理，没法替源码证明 Qt 5 兼容。继续沿用 Qt 5，就得给一批代码补条件编译；以我当时对 Qt 的熟悉程度和三周任务的范围，这条路不合适。

我改装 Qt 6.5.3 MSVC2019 64-bit 和 Qt 5 Compatibility Module，继续使用 v142 编译器，删掉旧 build 目录与 `Seamly2D.pro.user`，重新配置 Kit。之后 qmake 和完整构建才一起通过。[Qt6 首跑原始记录](/notes/turing-qt-seamly2d-first-run)留着这段修改过程。现在回看 [Qt 6.5 的 Windows 支持配置](https://doc.qt.io/qt-6.5/windows.html)，Windows、x86-64 和 MSVC 2019 本来就是一组相互关联的条件。那次排查让我开始把 Qt 版本、编译器和架构放在一起看，但三周实习还远不到全面掌握 Qt 或跨平台构建的程度。

## 登录窗口先暴露了三个小麻烦

第一周后半段，我在 Seamly2D 主界面前加了本地注册和登录。第一版用 `QSettings` 保存用户信息，密码直接明文存储并做字符串比较；后来我改成哈希值存储与校验，遮蔽密码输入，也分别处理用户已存在、用户不存在和密码错误的提示。

权限规则还没变复杂，窗口先出了问题。回车键默认触发取消，用户名输入会弹联想，密码框碰到中文输入法还闪退过。它们都发生在用户刚进入程序的时候，我逐项修正输入行为，又在 `main()` 附近整理注册、登录和进入主程序的顺序。

这里的账户始终是本地方案。[Qt 对 `QSettings` 的说明](https://doc.qt.io/qt-6.5/qsettings.html)把它定义为跨平台应用设置抽象，它在这次项目里只负责本机持久化。数据库、服务器、在线认证和后端账户系统都没有做，也不在三周实习范围内。

## 角色规则落在每一次状态变化上

第二周开始处理登录后的权限。首次注册的用户名必须是 `admin`，角色分为普通用户和管理员，只有管理员能看到用户管理。删除前需要二次确认，目标只能是普通用户；升级也只对普通用户开放；降级只能由 `admin` 执行，其他管理员不能互相降级。

写代码时，我需要同时看当前用户、目标用户、目标角色和下一状态，不能只看界面上有没有某个菜单。[公开角色摘录](/uploads/projects/nanjing-turing/auth-role-snippet.cpp)只保留了本地 `Role::User`、`Role::Admin` 和角色查询，没有公开完整账户源码；[第二周原始日志](/uploads/projects/nanjing-turing/week-2-development-log.txt)按当时顺序记录了这些限制。

## `windeployqt` 在硬盘里，构建环境却找不到

第三周从 Develop 转向 Release。带账户入口的程序已经能在 Qt Creator 里启动，我开始处理 Windows 部署，结果被 `windeployqt` 卡了约三天。可执行文件就在 Qt 安装目录，部署步骤却说找不到命令。我记得自己重装过、查过路径、重新配过环境，但已经记不清每次尝试的准确顺序。

当时留下的文档保存了最后有效的处理方式。Qt Creator 的 Build Environment 要能看到 Qt `bin`；两个 `.pro` 文件里的 post-link 规则改用 `QT_INSTALL_BINS` 定位 `windeployqt`，而且只在 Release 配置执行。环境变量写在系统设置里还不够，启动构建任务的进程也得拿到它。

[Qt 6.5 的 Windows 部署说明](https://doc.qt.io/qt-6.5/windows-deployment.html)写明，`windeployqt` 会扫描 `.exe`，收集 Qt 库、插件、翻译和运行时文件，额外的第三方库并不由它自动处理。部署目录已经铺满 DLL 后，程序仍提示缺少 `xerces-c_3_2.dll`，我又手动把它补进去。Seamly2D 用 XML 保存纸样数据，Xerces-C++ 是单独的 XML 依赖。

此前读过的 `.sm2d` 和 `.smis` 样例也在这里接上了。纸样点、线、曲线与量体变量写在 XML 里，程序仍要靠解析库把它们读出来。[XML 样例笔记](/notes/turing-sm2d-xml-data-format)记录了这些数据结构。我同期也在 [CMake 与编译逻辑笔记](/notes/turing-cmake-build-logic)里学习编译器、链接器、生成器、Ninja、Qt 包发现和运行时依赖，不过 Seamly2D 从头到尾都使用 qmake，我没有把它迁移到 CMake。

## 开发机装得上以后，我又换了一台 Windows

依赖补齐后，我创建 Windows 自签名证书，用 Inno Setup 把部署目录做成安装程序，再给应用和安装包签名。Release 构建、依赖收集、签名、打包、安装和启动都在实习开发机上走通了。正式验收时，带教工程师也逐项检查了账户功能和 Windows 部署结果。

当时没有另一台既没装 Visual Studio、也没装 Qt 的 Windows 机器。[打包流程文档](/notes/turing-release-packaging-cross-platform)只能证明同一台开发机上的安装和启动，README 里那句“移植到任意电脑都可以运行”比证据多走了一步。

实习结束约半个月后，我回到家，在一台新装的 Windows 台式机上补了测试。那台机器没有 Qt 和 Visual Studio。我运行 Inno Setup 生成的安装程序，打开修改版应用，实际操作了注册、登录和角色功能。这次结果没有补回旧文档，也没有再交给带教工程师复验，不属于公司正式验收，但换机运行确实是我亲自测过的。

## Mac 能打开无签名 DMG，签名还没完成

Windows 路线完成后，我把同一份源码搬到自己的 Mac。Homebrew Qt 和官方 Qt 的路径、架构不同，Windows Kit 也不会跟着仓库一起过来。我重新跑通 Debug 和 Release，用 `macdeployqt` 收集 Qt framework 与插件，应用实际启动，无签名 DMG 也生成并在这台 Mac 上打开过。带教工程师现场看了演示。

后面的签名没有完成。我创建过自签名证书，也写过包含 `codesign`、`spctl` 和 DMG 生成顺序的脚本，但没有完成应用签名，没有尝试 notarization，也没有 Developer ID。[`macdeployqt` 文档](https://doc.qt.io/qt-6.5/macos-deployment.html)处理的是应用包里的 framework 和插件；[Apple 的 Developer ID 说明](https://developer.apple.com/support/developer-id/)讲的是分发者身份与公证检查。生成 DMG 和取得平台信任是两件不同的事。

[无签名路线脚本](/uploads/projects/nanjing-turing/macos-build-package.sh)记录了已经跑通的步骤，[签名尝试脚本](/uploads/projects/nanjing-turing/macos-build-package-sign.sh)记录的仍是未完成工作。脚本存在，不能当作签名、Gatekeeper 或公证已经通过的证据，也不能支持正式分发的结论。

## 代码交进 `develop`，公司的后续仍是未知

这三周也是我第一次把 Git 当成协作工具来用。clone、查看和切换上游分支、创建开发分支、commit、push、merge、pull request、fork 和 tag，我都在项目里实际走过。公司为实习生维护了专用 `develop` 分支，最终源码改动、日志和交接材料都提交到了那里。离开以后，公司有没有继续采用或产品化这项工作，我不知道；现有材料只能写到交接。

正式验收覆盖注册登录、角色管理、Windows 安装和 Mac 演示。带教工程师明确肯定了我从三周前完全不知道 Qt，到能够推进这套大型项目的进步。我当时很兴奋，但这不等于三周后就成了 Qt 专家。它让我确认的是，面对陌生的大型代码库，我能沿着错误、分支和依赖继续往里走，最后把自己的改动交出去。

实习前，我说程序能跑，通常只是指它给出了正确输出。做完 Seamly2D 以后，这句话后面多了不少条件：分支、Qt 包、编译器、角色、构建类型、目标机器和平台信任都会改变结果。Qt Creator 里的绿色三角仍然有用，只是它现在代表一次验证的开始。
