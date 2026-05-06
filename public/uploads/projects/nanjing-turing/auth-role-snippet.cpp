// Public excerpt from the Seamly2D internship add-on.
// It shows the local role model only; full source and build outputs are not republished here.

namespace AuthUtils {

enum class Role {
    User,
    Admin
};

Role roleOf(const QString& username)
{
    if (username.compare(QStringLiteral("admin"), Qt::CaseInsensitive) == 0) {
        return Role::Admin;
    }

    QSettings settings;
    settings.beginGroup(QStringLiteral("Auth/users/%1").arg(username));
    const QString role = settings.value(QStringLiteral("role")).toString();
    settings.endGroup();

    if (role.compare(QStringLiteral("admin"), Qt::CaseInsensitive) == 0) {
        return Role::Admin;
    }

    return Role::User;
}

}
