from sqlalchemy import *
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Okpd_2(Base):
    __tablename__ = 'okpd_2'
    id = Column(Integer, primary_key = True)
    name = Column(Text)
    id_okpd_2_parent = Column(ForeignKey("okpd_2_part.id"))
    id_okpd_2_child = Column(ForeignKey("okpd_2_part.id"))
    parent = relationship("Okpd_2_part", foreign_keys = 'Okpd_2.id_okpd_2_parent')
    child = relationship("Okpd_2_part", foreign_keys = 'Okpd_2.id_okpd_2_child')
    Kkns = relationship("Kkn", backref = 'okpd_2')

class Okpd_2_part(Base):
    __tablename__ = 'okpd_2_part'
    id = Column(Integer, primary_key = True)
    symbol = Column(Text)

class Kkn_part(Base):
    __tablename__ = 'kkn_part'
    id = Column(Integer, primary_key = True)
    name = Column(Text)
    kkns = relationship("Kkn", backref = 'kkn_part')

class Kkn(Base):
    __tablename__ = 'kkn'
    id = Column(Integer, primary_key = True)
    kkn_name = Column(Text)

    id_okpd_2 = Column(ForeignKey("okpd_2.id"))
    detalization = Column(Integer)
    id_kkn_part = Column(ForeignKey("kkn_part.id"))
    # chars = relationship("Parsing", backref = 'links')


    links = relationship("Link", backref = 'kkn')
    # source_type
    # source_number
    # source_date

class Link(Base):
    __tablename__ = 'link'
    id = Column(Integer, primary_key = True)
    link = Column(String(255), nullable = False)
    id_domain = Column(Integer, ForeignKey('domain.id'))
    id_kkn = Column(ForeignKey("kkn.id"))

class Domain(Base):
    __tablename__ = 'domain'
    id = Column(Integer, primary_key = True)
    name = Column(String(255), nullable = False)
    links = relationship("Link", backref = 'domain')
    id_companies = Column(Integer, ForeignKey('company.id'))
    id_domain_sett = relationship("Domain_settings", backref = 'domain')

class Domain_settings(Base):
    __tablename__ = 'domain_settings'
    id = Column(Integer, primary_key = True)
    id_domain = Column(Integer, ForeignKey('domain.id'))
    setting_name = Column(Text)
    setting_content = Column(Text)

class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key = True)
    name = Column(String(255), nullable = False)
    inn = Column(Text)
    domains = relationship("Domain", backref = 'company')

class Upload_history(Base):
    __tablename__ = 'upload_history'
    id = Column(Integer, primary_key = True)
    upload_date = Column(DateTime)
    name = Column(Text)
    kkns = relationship("Kkn_upload", backref = 'upload_history')
    # parent = relationship("Okpd_2_part", foreign_keys = 'Okpd_2.id_okpd_2_parent')

class Kkn_upload(Base):
    __tablename__ = 'kkn_upload'
    id = Column(Integer, primary_key = True)
    id_upload_history = Column(ForeignKey("upload_history.id"))
    id_kkn = Column(ForeignKey("kkn.id"))

# class Chars(Base):
    # id = Column(Integer, primary_key = True)

# class Parsing(Base):
