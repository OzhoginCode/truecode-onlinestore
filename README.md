# TrueCode-onlinestore

Fullstack-приложение для просмотра и управления товарами

## Доступные команды

Для работы приложения требуется склонировать репозиторий и перейти в рабочую директорию:

```bash
git clone https://github.com/OzhoginCode/truecode-onlinestore
cd truecode-onlinestore
```

Для выполнения этой команды требуется Docker и [make](https://www.gnu.org/software/make/):

* `make build` - запуск приложения в режиме production

Для выполнения следующих команд требуется установленный Node.JS версии 18 и выше, npm, а также Make.

* `make install` - установка зависимостей
* `make lint` - запуск линтера
* `make dev` - запуск приложения в режиме development
* `make drop-database` - само за себя:)

> другие команды можно найти в корневом package.json

## Описание

Стек: TypeScript, React, Next.JS, ANT Design, Docker, npm workspaces, eslint

Проект организован как монорепозиторий и упакован в Docker Compose. Настроены сборки двух разных образов: для разработки и для прода.

В проекте используется npm workspaces, так как с помощью него удобно организовать JS-монорепозиторий и, например, шарить типы между фронтом и бэком
