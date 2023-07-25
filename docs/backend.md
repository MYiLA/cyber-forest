# Структура backend

```
┌ <projectRoot>
│
├─ swagger <- сгенерированная документация Swagger
├─ uploads <- папка для сохранения загруженных пользователем файлов
└─┬─ src
  ├─ config     <- константы / типы / подключение к ДБ  
  ├─ exceptions <- обработчики исключений  
  ├─┬─ features  <- "Ручки" API
  │ ├─ auth      <- авторизация
  │ ├─ chats     <- чат
  │ ├─┬─ forum   <- форум
  │ │ ├─ comment    <- комментарии к топикам
  │ │ ├─ emoji      <- эмодзи для топиков
  │ │ ├─ reaction   <- реакции для комментариев и ответов
  │ │ ├─ reply      <- ответы на комментарии
  │ │ └─ topic      <- топики
  │ ├─ leaderboard  <- таблица рекордов
  │ ├─ resources    <- ресурсы (загрузка файлов)
  │ └┬ user         <- пользователь
  │  ├─ user-controller.ts  <- контроллер
  │  ├─ user-model.ts       <- модель в БД
  │  ├─ user-router.ts      <- роутер методов
  │  ├─ user-service.ts     <- логика
  │  └─ user-validator.ts   <- валидация входных параметров
  ├─┬ middlewares   <- middlewares
  │ ├─ auth-middleware.ts   <- проверка авторизации
  │ ├─ error-middleware.ts  <- обработка ошибок
  │ └─ upload-middlewre.ts  <- загрузка файла
  ├─ api-router.ts  <- основной роутер
  └─ index.ts       <- START
  
```
Для реализации API используется следующий стэк:
- [Node.js](https://nodejs.org/en/docs)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Sequelize-Typescript](https://www.npmjs.com/package/sequelize-typescript)
- [Tsoa](https://tsoa-community.github.io/docs/)
- [PostgreSQL](https://www.postgresql.org/)

Разработка API с использованием баз данных невозможно без визуального контроля состояния моделей в БД. 
Для работы PostgreSQL используется инструмент [pgAdmin](https://www.pgadmin.org/)

Необходим `Docker` с запущенным `PostgreSQL`, для этого нужно сделать следующее:
- `docker-compose build postgres` - если еще не создавали контейнер ранее
- `docker-compose up postgres -d` - будет запущен `PostgreSQL` с локальным портом `5433` (используйте его в `pgAdmin`)

Для остановки `PostgreSQL` используйте следующую команду
- `docker-compose stop postgres`

```
Если будут проблемы с запуском PostgreSQL - удалите все из папки /tmp, саму папку не удаляйте! 
```

Настройки для подключения к `PostgreSQL` должны находиться в файле `.env` Скопируйте туда настройки из `.env.sample`

Чтобы запустить API:
- `yarn run dev:server`

Для тестирования и проверки API используйте инструменты [Postman](https://www.postman.com/) или [Insomnia](https://insomnia.rest/) 
или можно прямо из Swagger (http://localhost:3001/api/docs)

После запуска приложения, API доступно на `http://localhost:3001/api`

Документация Swagger: `http://localhost/3001/api/docs`

### 1. Старт API
`index.ts` - Настройка и запуск сервера. Здесь все настроено и в дальнейшем ничего менять / добавлять не требуется

### 2. Основной роутер

```typescript
// src/api-router.ts

export const apiRouter = Router()

// определение статических путей
apiRouter.use(express.static('swagger'))
apiRouter.use('/resources', AuthMiddleware, express.static('uploads'))

// путь для документации Swagger
apiRouter.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/api/swagger.json',
    },
  })
)

// Подключение "ручек"
// AuthMiddleware - применяется только для "ручек" требующих авторизации
apiRouter.use('/auth', authRouter)
apiRouter.use('/chats', AuthMiddleware, chatsRouter)
apiRouter.use('/leaderboard', AuthMiddleware, leaderboardRouter)
apiRouter.use('/user', AuthMiddleware, userRouter)
apiRouter.use('/resources', resourcesRouter)
apiRouter.use('/forum', AuthMiddleware, forumRouter)
// Добавление новых "ручек" производится аналогичным образом 

// для несуществубщих путей выдается ошибка BadRequest
apiRouter.use('*', () => {
  throw ApiError.BadRequest()
})

// ErrorMiddleware должен устанавливаться самым последним
// сюда прилетают все ошибки для дальнейшей обработки
apiRouter.use(ErrorMiddleware)

```

### 3. Роутер "ручки" (на примере User)

```typescript
// src/features/user/user-router.ts

// Здесь происходит роутинг по методам GET, POST, PUT, DELETE

export const userRouter = Router()

// метод PUT - изменение профиля пользователя
// req - описание запроса
// данные находятся в req.body в формате JSON
userRouter.put(
    // обработка пути /user/profile
    '/profile',
    // Валидатор по необходимости
    UserValidator.userProfile,
    async (req: CustomRequest, res: Response, next: NextFunction) => {
        // блок try-catch обязателен, чтобы не рухнуло приложение
        try {
            // получение результата от контроллера  	
            const response = await UserController.updateProfile(req.body, req)
            // отправка результата клиенту  
            return res.send(response)
        } catch (e) {
            // отправка ошибки (если есть)	
            return next(e)
        }
    }
)

userRouter.put('/profile/avatar', ...)

userRouter.put('/password', ...)

userRouter.get('/:id', ...)

userRouter.post('/search', ...)

```

### 4. Валидация входных параметров (на примере User)

```typescript
// src/features/user/user-validator.ts

// Здесь производится базовая проверка входных данных до того, как управление перейдет контроллеру
// в случае несоответствия, клиенту отправляется соответствующая ошибка

const userProfile = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!Object.keys(req.body).length) {
        next(ApiError.BadRequest())
    }
    for (const [key, value] of Object.entries<string>(req.body)) {
        if (updateProfileRules[key] && !value.match(updateProfileRules[key].rule)) {
            next(new ApiError(400, updateProfileRules[key].message))
        }
    }
    next()
}
const userPassword = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => { ... }

const userInfo = (req: CustomRequest, res: Response, next: NextFunction) => { ... }

const userSearch = (req: CustomRequest, res: Response, next: NextFunction) => { ... }

export default { userProfile, userPassword, userInfo, userSearch }

```

### 5. Контроллер "ручки" (на примере User)

```typescript
// src/features/user/user-controller.ts

// Функция контроллера заключается в передаче необходимых параметров в сервисы
// в сервисах уже производится вся логика
// в контроллерах логики быть не должно
// в нашем случае функционал API минимальный, поэтому может показаться что контроллер в этой цепочке лишний

class UserController extends Controller {
    // Данный формат комментариев используется для генерации документации Swagger     
    /**
    * Достаточно передавать только те поля, по которым требуются изменения
    *
    * например для изменения настроек пользователя (допустим темы) достаточно передать поле settings
    * @summary Изменение профиля пользователя */
    @Put('/profile')
    public async updateProfile(
    @Body() body: UserUpdateProfileRequest,
    @Request() req: CustomRequest
    ): Promise<UserDto> {
        // получение Id юзера из запроса для передачи в сервис  
        const userId = req.userId || 0
        // вызов сервиса по обработке функционала изменения данных профиля клиента  
        return UserService.updateProfile(body, userId)
    }
    
    /** @summary Изменение аватара пользователя */
    @Put('/profile/avatar')
    public async updateAvatar( ... )
    
    /** @summary Изменение пароля пользователя */
    @Put('/password')
    @Produces('text/plain')
    @Example(OK)
    public async updatePassword( ... )
    
    /** @summary Получение профиля пользователя */
    @Get('/{id}')
    public async getProfile( ... )
    
    /** @summary Поиск пользователей по логину (макс 10) */
    @Post('/search')
    public async search( ... )
}

export default new UserController()

```

### 6. Сервисы (на примере User)

```typescript
// src/features/user/user-service.ts

// Здесь производится все необходимые операции с полученными даными от контроллера и возврат результата обратно

class UserService {
    public async updateProfile(
    dto: UserUpdateProfileRequest,
    userId: number
    ): Promise<UserDto> {
        const update = await User.update({ ...dto }, { where: { id: userId } })
        if (!update) {
            throw ApiError.SomethingWrong()
        }
        
        const user = await User.findOne({
            where: { id: userId },
            attributes: { exclude: ['id', 'authCookie', 'password'] },
        })
        if (!user) {
            throw ApiError.NotFound()
        }
        return user
    }
    
    public async updateAvatar( ... )
    
    public async updatePassword( ... )
    
    public async getProfile( ... )
    
    public async search( ... )
}

export default new UserService()

```

### 7. Описание модели БД (на примере User)

```typescript
// src/features/user/user-model.ts

// Описание необходимых интерфесов / типов
export interface UsersSearchRequest {
    readonly login: string
}

export interface UserChanePasswordRequest {
    readonly oldPassword: string
    readonly newPassword: string
}

export interface UserUpdateProfileRequest {
    readonly first_name: string
    readonly second_name: string
    readonly display_name: string
    readonly login: string
    readonly email: string
    readonly phone: string
    readonly settings: DataObject
}

export interface UserCreateRequest {
    readonly first_name: string
    readonly second_name: string
    readonly login: string
    readonly email: string
    readonly password: string
    readonly phone: string
}

export interface UserDto extends UserCreateRequest {
    readonly id: number
    readonly display_name: string
    readonly avatar: string
    /** поле для хранения настроек пользователя, в том числе темы */
    readonly settings: DataObject
}

export interface UserLoginRequest {
    readonly login: string
    readonly password: string
}

export interface UserCreateResponse {
    readonly id: number
    readonly authCookie: string
}

export type AuthorDto = Omit<UserDto, 'password' | 'settings' | 'authCookie'>

// Описание самой модели в БД
@Scopes(() => ({
    author: {
        attributes: { exclude: ['password', 'settings', 'authCookie'] },
    },
}))
@Table({
    tableName: 'users',
    timestamps: false,
})
export class User extends Model<User, UserCreateRequest> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    declare id: number
    
    @Column({ type: DataType.STRING })
    declare first_name: string
    
    @Column({ type: DataType.STRING })
    declare second_name: string
    
    @Column({ type: DataType.STRING })
    declare display_name: string
    
    @Column({ type: DataType.STRING })
    @Index
    declare login: string
    
    @Column({ type: DataType.STRING })
    @Index
    declare email: string
    
    @Column({ type: DataType.STRING })
    @Index
    declare password: string
    
    @Column({ type: DataType.STRING })
    @Index
    declare phone: string
    
    @Column({ type: DataType.STRING })
    declare avatar: string
    
    @Column(DataType.JSON)
    declare settings: DataObject
    
    @Column({ type: DataType.STRING })
    declare authCookie: string
}

```

### 8. Добавление модели
Добавление ручки / метода производится в соответствии со структурой описанной выше

Сама модель добавляется в БД в файле `src/config/db.ts`

```typescript
// src/config/db.ts

...

const db = new Sequelize({
    dialect: 'postgres',
    host: db_host,
    port: db_port,
    database: db_name,
    username: db_user,
    password: db_password,
    logging: false,
    models: [
        User,
        Leaderboard,
        Topic,
        Comment,
        Reply,
        ReactionComment,
        ReactionReply,
        // cюда необходимо добавить новую модель
    ],
})

export default db

```
