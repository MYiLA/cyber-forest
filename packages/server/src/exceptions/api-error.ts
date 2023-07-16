export class ApiError extends Error {
  constructor(public status: number, message: string, public errors = []) {
    super(message)
  }

  public static BadRequest() {
    return new ApiError(400, 'Неверный запрос')
  }

  public static UnauthorizedError() {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  public static NotFound() {
    return new ApiError(404, 'Результатов не найдено')
  }

  public static SomethingWrong() {
    return new ApiError(500, 'Что-то пошло не так...')
  }
}
