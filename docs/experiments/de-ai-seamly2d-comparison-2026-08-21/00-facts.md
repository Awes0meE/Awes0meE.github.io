# 五路共用事实材料包

本文件只给五个候选提供事实、归属和证据边界，不规定标题、结构、语气、篇幅、标点、节奏或作品集文风。每套工具可自由取舍、重排和重写整篇文章，但不能把未发生、未验证或属于他人的工作写成作者亲历。

## 人物、时间与起点

- 时间是 2025 年 8 月。作者在南京参加完 2025 年全国大学生电子设计竞赛后，于第二周进入研究院，连续三周全职、线下实习。
- 作息是早上 8 点到、下午 5 点离开。带教工程师每天布置清晰任务，作者完成后汇报。
- 作者进入实习时只掌握学校层级的一些 C/C++ 语法，没有 Qt、GUI、大型开源仓库或协作式 Git 的实际经验。
- 项目基于开源纸样设计软件 Seamly2D。作者先查看上游分支，再进入公司为实习生准备的开发线。

## 第一周：环境与 Qt 构建

- 开发环境包括 Git、MSVC v142、Windows SDK、CDB、Qt Creator 和 Qt Kit。
- Qt Online Installer 连接海外服务器下载约 3 小时后只有约 10%。作者当时不知道镜像，以为大型软件就需要这么久，等待了大半天。
- 第二天带教工程师告知清华 TUNA 镜像。切换后剩余安装用时略多于 1 小时。
- 最初选择 Qt 5.15.2。`core5compat` 让 qmake 报错；作者把它改成条件加载，清理并重跑后看到 `qmake_all finished successfully`。
- qmake 通过后，完整构建仍出现 30 多个错误。源码已经使用 `QStringConverter`、Qt 6 头文件和 Qt 6 风格调用；qmake 通过只代表 `.pro` 被处理，不代表源码兼容 Qt 5。
- 最终路线是 Qt 6.5.3 MSVC2019 64-bit、Qt 5 Compatibility Module 与 v142 编译器。作者删除旧 build 目录和 `Seamly2D.pro.user`，重新配置 Kit，之后 qmake 与完整构建通过。
- 可以写成作者由此理解版本、编译器和架构共同决定二进制兼容；不能写成作者已经全面掌握 Qt 或跨平台构建。

## 第一至第二周：本地账户与角色

- 作者在 Seamly2D 主界面前增加本地注册和登录流程，并在 `main()` 附近整理注册、登录和进入主程序的顺序。
- 第一版用 `QSettings` 保存用户信息，密码最初是明文存储和字符串比较；后来改为密码哈希存储与校验，并遮蔽密码输入。
- 用户已存在、用户不存在、密码错误分别有提示。
- 实际修过的界面问题包括：回车默认触发取消、用户名输入弹联想、密码框在中文输入法状态下发生过闪退。
- `QSettings` 只承担本机持久化。本项目没有数据库、服务器、在线认证或后端账户系统；这些不在三周实习范围内。
- 首次注册用户名必须是 `admin`。角色包括普通用户和管理员；只有管理员可见用户管理。
- 删除需要二次确认，且只针对普通用户；升级也只针对普通用户；降级只能由 `admin` 执行，避免其他管理员互相降级。
- 公开代码只保留 `Role::User`、`Role::Admin` 和本地角色查询，不公开完整账户源码。

## 第三周：Release 与 Windows 部署

- 第三周从 Develop 转向 Release。此前作者已能在 Qt Creator 中运行带账户入口的程序。
- `windeployqt` 找不到的问题卡了约 3 天：可执行文件存在于 Qt 安装目录，但部署步骤找不到命令。作者记得重装、查路径和重新配置的过程很烦，但不再记得每次尝试的准确顺序。候选稿不得补造精确排错时间线。
- 当时文档保留的最终方案：Qt Creator 的 Build Environment 需要看到 Qt `bin`；两个 `.pro` 的 post-link 规则通过 `QT_INSTALL_BINS` 定位 `windeployqt`，并只在 Release 配置执行。
- `windeployqt` 收集 Qt 库、插件、翻译和运行时文件，不自动覆盖额外第三方库。
- 部署目录已有大量 DLL 后，程序仍缺 `xerces-c_3_2.dll`，作者手动补入。Seamly2D 用 XML 保存纸样数据，Xerces-C++ 是单独的 XML 依赖。
- 作者读过 `.sm2d` 与 `.smis` XML 样例，理解纸样点、线、曲线与量体变量最终需要解析库读取。
- 作者同期学习 CMake、Ninja、编译器、链接器、生成器、Qt 包发现和运行时依赖，但 Seamly2D 始终使用 qmake；作者没有把项目迁移到 CMake。

## Windows 打包、验收与后补测试

- 作者创建 Windows 自签名证书，用 Inno Setup 把部署目录制作成安装程序，并给应用和安装包签名。
- Release 构建、依赖收集、签名、打包、安装和启动在实习开发机上完整跑过。
- 正式验收时，带教工程师逐项检查了账户功能和 Windows 部署结果。
- 原始打包文档完成时没有另一台既无 Visual Studio、也无 Qt 的 Windows 机器，因此正式实习记录只能证明同一开发机上的安装与启动。
- README 当时写过“移植到任意电脑都可以运行”，这比当时已有证据更强。
- 实习结束约半个月后，作者在家中一台新装的 Windows 台式机补测。该机器没有 Qt 和 Visual Studio；作者运行 Inno Setup 安装程序，打开修改版应用并实际操作注册、登录和角色功能。
- 后补测试没有写回旧文档，也没有回公司让导师再次验收。它是作者亲自验证的结果，但不是公司正式验收的一部分。

## macOS 路线与未完成边界

- 作者把同一份源码迁到自己的 Mac。Homebrew Qt 与官方 Qt 的路径、架构不同，Windows Kit 也不会随仓库迁移。
- 作者重新跑通 Debug 和 Release，用 `macdeployqt` 收集 Qt framework 与插件，应用实际启动；无签名 DMG 已生成并在这台 Mac 上打开。带教工程师现场看过演示。
- 作者创建过自签名证书，并写过包含 `codesign`、`spctl` 和 DMG 顺序的脚本。
- 应用签名没有完成，notarization 没有尝试，也没有 Developer ID。不得写成可正式分发、已通过 Gatekeeper、已完成签名或公证。
- 一份公开脚本记录已跑通的无签名路线；另一份记录未完成的签名尝试。脚本存在不等于签名成功。

## Git、交接与最终理解

- 这是作者第一次把 Git 当协作工具实际使用，而不只是从 GitHub 下载代码。实践内容包括 clone、查看与切换上游分支、创建开发分支、commit、push、merge、pull request、fork 和 tag。
- 公司为实习生维护专用 `develop` 分支。最终源码改动、日志与交接材料提交到该分支。
- 作者离开后不知道公司是否继续采用或产品化这项工作。只能写到“交接”，不能补写后续落地、上线或采用。
- 正式验收覆盖注册登录、角色管理、Windows 安装和 Mac 演示。带教工程师明确肯定作者三周内从不知道 Qt 到推进大型项目的进步，作者当时很兴奋。
- 可以写作者确认自己能进入陌生大型代码库，沿着错误、分支和依赖推进并交接改动；不能写成已经成为 Qt 专家。
- 这篇笔记的核心经验是“能跑”的条件不断增加：分支、Qt 包、编译器、角色、构建类型、目标机器和平台信任都改变结果。绿色运行按钮只是更长验证过程中的一个节点。

## 可引用来源

- 当前公开原稿：`content/notes/turing-three-week-development-log.mdx`
- Qt 镜像：[TUNA Qt 镜像说明](https://mirrors.tuna.tsinghua.edu.cn/help/qt/)
- Qt 6.5 Windows 配置：[Supported Platforms](https://doc.qt.io/qt-6.5/windows.html)
- 本地设置：[QSettings](https://doc.qt.io/qt-6.5/qsettings.html)
- Windows 部署：[Qt for Windows - Deployment](https://doc.qt.io/qt-6.5/windows-deployment.html)
- macOS 部署：[macdeployqt](https://doc.qt.io/qt-6.5/macos-deployment.html)
- Apple 分发身份：[Developer ID](https://developer.apple.com/support/developer-id/)
- 站内原始记录与公开材料：`/notes/turing-qt-seamly2d-first-run`、`/notes/turing-sm2d-xml-data-format`、`/notes/turing-cmake-build-logic`、`/notes/turing-release-packaging-cross-platform`、`/uploads/projects/nanjing-turing/auth-role-snippet.cpp`、`/uploads/projects/nanjing-turing/week-2-development-log.txt`、`/uploads/projects/nanjing-turing/macos-build-package.sh`、`/uploads/projects/nanjing-turing/macos-build-package-sign.sh`

## 隐私与归属

- 候选稿只能使用当前公开原稿与本事实包中的公开层级信息。
- 不粘贴或推测公司未公开源码、账户实现细节、内部仓库内容或组织决策。
- 第一人称只用于作者本人完成、观察、经历或明确表达过的内容；带教工程师的指导和验收必须保留归属。
