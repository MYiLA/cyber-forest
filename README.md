![Киберлес](https://github.com/MYiLA/cyber-forest/raw/dev/packages/client/src/assets/images/promo.png)

### Как запускать?
Рабочее приложение: [`https://cyberforest.ru`](https://cyberforest.ru)

Документация по API: [`https://cyberforest.ru/api/docs`](https://cyberforest.ru/api/docs)

1. Клонируйте репозиторий `git clone https://github.com/MYiLA/cyber-forest.git`
2. Перейдите в папку `cd cyber-forest`
3. Переключитесь в ветку dev `git checkout dev`
4. Выполните команду `yarn run bootstrap` - это обязательный шаг, без него ничего работать не будет :)
5. Выполните команду `yarn run dev:client`
6. Приложение будет запущено на `http://localhost:3000`
7. Приложение использует API [`https://cyberforest.ru/api`](https://cyberforest.ru/api/docs), локально backend запускать не нужно

Для запуска `backend`

5. Подключите и запустите PostgreSQL в Docker - `docker-compose up postgres -d`
6. Выполните команду `yarn run dev:server`
7. API будет доступно на `http://localhost:3001/api`, Swagger - `http://localhost:3001/api/docs`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то-же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

