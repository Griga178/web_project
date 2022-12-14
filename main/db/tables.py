from sqlalchemy import *
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Okpd_2(Base):
    __tablename__ = 'okpd_2'
    id = Column(Integer, primary_key = True)
    description = Column(Text)
    id_parent_connection = Column(Integer, default = 0)
    symbol = Column(Text)
    Kkns = relationship("Kkn", backref = 'okpd_2')

    # @property
    # def get_okpd_2(self):
    #     return f'{self.id_parent_connection}.{self.symbol}'


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
    links = relationship("Kkn_link", backref = 'kkn')

class Kkn_link(Base):
    __tablename__ = 'kkn_link'
    id = Column(Integer, primary_key = True)
    id_link = Column(ForeignKey("link.id"))
    id_kkn = Column(ForeignKey("kkn.id"))
    id_source_type = Column(ForeignKey("source_type.id"))
    source_date = Column(DateTime)
    source_number = Column(Text)

class Source_type(Base):
    __tablename__ = 'source_type'
    id = Column(Integer, primary_key = True)
    name = Column(String(25), nullable = False)

class Link(Base):
    __tablename__ = 'link'
    id = Column(Integer, primary_key = True)
    link = Column(String(255), nullable = False)
    id_domain = Column(Integer, ForeignKey('domain.id'))
    kkns = relationship("Kkn_link", backref = 'link')
    files = relationship("File_link", backref = 'link')

class Domain(Base):
    __tablename__ = 'domain'
    id = Column(Integer, primary_key = True)
    name = Column(String(255), nullable = False)
    id_company = Column(Integer, ForeignKey('company.id'))
    links = relationship("Link", backref = 'domain')
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

class File(Base):
    __tablename__ = 'file'
    id = Column(Integer, primary_key = True)
    upload_date = Column(DateTime)
    name = Column(Text)
    # kkns = relationship("File_link", backref = 'file')
    links = relationship("File_link", backref = 'file')


class File_link(Base):
    __tablename__ = 'file_link'
    id = Column(Integer, primary_key = True)
    id_file = Column(ForeignKey("file.id"))
    id_link = Column(ForeignKey("link.id"))

# class Chars(Base):
    # id = Column(Integer, primary_key = True)

# class Parsing(Base):
