const titles = {
  "/servers/list": "Список серверов",
  "/servers/reports": "Отчеты серверов",
  "/services/list": "Мои сервисы",
  "/services/create": "Создать сервис",
  "/services/[0-9]+/edit": "Редактирование сервиса",
  "/services/[0-9]+": "Информация о сервисе",
  "/services/dependencies": "Зависимости"
};

export const makeTitle = (pathname: string) => {
  for (const key in titles) {
    const regExp = new RegExp(key);
    const res = regExp.test(pathname);
    if (res) {
      return (titles as any)[key];
    }
  }
};
