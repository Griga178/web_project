# from flask_sqlalchemy import SQLAlchemy
#
# db = SQLAlchemy()
#
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#
# class Links(db.Model):
#     'Ссылки'
#     __tablename__ = 'links'
#     id = Column(Integer, primary_key = True)
#     link = Column(String(255), nullable = False)
#     id_domain = Column(Integer, ForeignKey('domains.id'))
#     # id_model = Column(Integer, ForeignKey('models.id'))
#     # id_kkn = Column(Integer, ForeignKey('kkns.id'))
#     content = relationship("Parsing", backref = 'links')
#     # kknparts_mtm = relationship("KKNPart", secondary = association_table, back_populates = "links_mtm")
#     kknparts_mtm = relationship("Association_table")
#
# class Domains(db.Model):
#     'Домены'
#     __tablename__ = 'domains'
#     id = Column(Integer, primary_key = True)
#     name = Column(String(255), nullable = False)
#     net_link = relationship("Links", backref = 'domains')
#     net_link_sett = relationship("Domain_settings", backref = 'domains')
#
# class Domain_settings(db.Model):
#     'Настройки для парсинга'
#     __tablename__ = 'domain_settings'
#     id = Column(Integer, primary_key = True)
#     id_domain = Column(Integer, ForeignKey('domains.id'))
#     setting_name = Column(Text)
#     setting_content = Column(Text)
