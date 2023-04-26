# Модули
## 1 БД
## 2 Загрузка данных из excel файла
## 3 Установка настроек для парсинга
## 4 Управление парсером
## 5 Просмотр результатов парсера
## * Выгрузка из БД
## * Общие функции

## 1 База данных

Таблицы: (main/db/tables.py)

1  ОКПД2
2  Часть ккн
3  ККН
4  История загрузки файлов (File_kkn_link)
5  (Source_type)

6  Ссылка
7  Домен
8  Настройки доменов
9  Компания

10 Файл
11 Результаты парсинга


## 2 Загрузка файла (раб. таблицы) --> insert_reestr(file) --> file_object
    1	отправить файл на сервер	(excel)  "f_app.upload_file()"
    2	прочитать файл	(excel --> list)   "file_manager.read_excel.excel_to_lists()"
    3	распознать данные	(list --> dict)  "file_manager.upload_reestr.read_reestr.read_reestr()"
    4	распределить данные в sql          "file_manager.upload_reestr.save_reestr.insert_reestr()"


## * Общие функции

  из строки получить список ссылок
  из списка ссылок получить домен

  из строки выделить цену

  счетчик процесса (элементы, время)


  ```mermaid
  erDiagram
       ||--o{ ORDER : places
      ORDER ||--|{ LINE-ITEM : contains
      CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
  ```
