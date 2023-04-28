from main.db_v3 import Query_Base

# w_t_sssn = Query_Base('work_table')
#
# # print(work_tables)
# qu = {"name": "Test-file2.xlsx"}
#
#
# # w_t = w_t_sssn.get(**qu)
# # new_wt = w_t_sssn.create(**qu)
# new_wt = w_t_sssn.create(name = "file2")
# print(new_wt)

# work_tables = w_t_sssn.get()

# sssn = Query_Base()
# for el in work_tables:
#     print(el)
#     sssn.delete(el)

# Table = w_t_sssn.tables['work_table']
# a = w_t_sssn.db_session.query(Table).all()

# print(a)
from main.file_manager.upload_v2 import upload_file

file_name = 'C:/Users/G.Tishchenko/Desktop/3 кв 23/3 Нормирование.xlsx'
mes = upload_file(file_name)

print(mes)

# kkn_sssn = Query_Base('kkn')
# for ke in kkn_sssn.get():
#     print(ke, ke.kkn_family.name)
#     kkn_sssn.delete(ke)
#
# kkn_fa_sssn = Query_Base('kkn_family')
# for ke in kkn_fa_sssn.get():
#     print([ke])
#     kkn_sssn.delete(ke)
