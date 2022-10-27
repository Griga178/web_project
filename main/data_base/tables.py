from sqlalchemy import *
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# association_table = Table(
#     "association_table",
#     Base.metadata,
#     Column("kkn_id", ForeignKey("kknparts.id")),
#     Column("link_id", ForeignKey("links.id")),
# )

# https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html#association-object
class Association_table(Base):
    __tablename__ = "association_table"
    kkn_id = Column(ForeignKey("kknparts.id"), primary_key = True)
    link_id = Column(ForeignKey("links.id"), primary_key = True)
    # extra_data = Column(String(50))
    # child = relationship("Child")

class Links(Base):
    'Ссылки'
    __tablename__ = 'links'
    id = Column(Integer, primary_key = True)
    link = Column(String(255), nullable = False)
    id_domain = Column(Integer, ForeignKey('domains.id'))
    # id_model = Column(Integer, ForeignKey('models.id'))
    # id_kkn = Column(Integer, ForeignKey('kkns.id'))
    content = relationship("Parsing", backref = 'links')
    # kknparts_mtm = relationship("KKNPart", secondary = association_table, back_populates = "links_mtm")
    kknparts_mtm = relationship("Association_table")

class Domains(Base):
    'Домены'
    __tablename__ = 'domains'
    id = Column(Integer, primary_key = True)
    name = Column(String(255), nullable = False)
    net_link = relationship("Links", backref = 'domains')
    net_link_sett = relationship("Domain_settings", backref = 'domains')

class Domain_settings(Base):
    'Настройки для парсинга'
    __tablename__ = 'domain_settings'
    id = Column(Integer, primary_key = True)
    id_domain = Column(Integer, ForeignKey('domains.id'))
    setting_name = Column(Text)
    setting_content = Column(Text)

class Parsing(Base):
    'Результаты парсинга'
    __tablename__ = 'parsing'
    id = Column(Integer, primary_key = True)
    id_link = Column(Integer, ForeignKey('links.id'), nullable = False)
    price = Column(FLOAT)
    parsing_date = Column(Text)
    product_name = Column(Text)
    product_avaliable = Column(Boolean) # подумать
    user_changed = Column(Boolean)  # user_accept

class KKNPart(Base):
    "Часть из справочника ККН"
    __tablename__ = 'kknparts'
    id = Column(Integer, primary_key = True)
    name = Column(String(255), nullable = False)
    # links_mtm = relationship("Links", secondary = association_table, back_populates = "kknparts_mtm")
    links_mtm = relationship("Association_table")
