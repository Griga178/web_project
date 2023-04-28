'''схема:
https://app.diagrams.net/#G1bUm06TC-kHucXlWqnI9An6gVaQUQlGz3
'''

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
from sqlalchemy import Column, ForeignKey, Text, Integer, Float, DateTime

Base = declarative_base()

class Company(Base):
    __tablename__ = "company"
    id = Column(Integer, primary_key = True)
    inn = Column(Text)
    name = Column(Text, nullable = False)

    websites = relationship("Website", backref = 'company')
    def __str__(self):
        return f'{self.inn} {self.name}'

class Website(Base):
    __tablename__ = 'website'
    id = Column(Integer, primary_key = True)
    name = Column(Text, nullable = False)

    id_company = Column(Integer, ForeignKey('company.id'))

    settings = relationship("Setting", backref = 'website')
    links = relationship("Link", backref = 'website')

class Setting(Base):
    __tablename__ = 'setting'
    id = Column(Integer, primary_key = True)
    name = Column(Text, nullable = False)
    content = Column(Text, nullable = False)

    website_id = Column(Integer, ForeignKey('website.id'))
    def __str__(self):
        return f'{self.name} {self.content}'

class Link(Base):
    __tablename__ = 'link'
    id = Column(Integer, primary_key = True)
    name = Column(Text, nullable = False)

    website_id = Column(Integer, ForeignKey('website.id'))

    sources = relationship("Source_Link", backref = 'link')
    contents = relationship("Link_content", backref = 'link')

class Link_content(Base):
    __tablename__ = 'link_content'
    id = Column(Integer, primary_key = True)
    name = Column(Text, nullable = False)
    content = Column(Text, nullable = False)
    date = Column(DateTime, default = datetime.now())

    link_id = Column(Integer, ForeignKey('link.id'))
    def __str__(self):
        return f'{self.name} {self.content}'

class Source_Link(Base):
    __tablename__ = 'source_link'
    id = Column(Integer, primary_key = True)

    link_id = Column(Integer, ForeignKey('link.id'))
    source_id = Column(Integer, ForeignKey('source.id'))

class Source(Base):
    __tablename__ = 'source'
    id = Column(Integer, primary_key = True)
    type = Column(Text, nullable = False)

    kkn_id = Column(Integer, ForeignKey('kkn.id'))

    links = relationship("Source_Link", backref = 'source')
    work_tables = relationship("Work_table_Source", backref = 'source')

class Work_table_Source(Base):
    __tablename__ = 'work_table_source'
    id = Column(Integer, primary_key = True)

    source_id = Column(Integer, ForeignKey('source.id'))
    work_table_id = Column(Integer, ForeignKey('work_table.id'))

class Work_table(Base):
    __tablename__ = 'work_table'
    id = Column(Integer, primary_key = True)
    name = Column(Text, nullable = False)
    date = Column(DateTime(timezone = True), default = datetime.now())

    sources = relationship("Work_table_Source", backref = 'work_table')
    def __str__(self):
        return f'<work_table> {self.id}: {self.name} ({self.date.strftime("%H:%M %d.%m.%y")})'

class KKN(Base):
    __tablename__ = 'kkn'
    id = Column(Integer, primary_key = True)
    name = Column(Text, nullable = False)
    detalization = Column(Text)

    okpd_2_id = Column(Integer, ForeignKey('okpd_2.id'))
    kkn_part_id = Column(Integer, ForeignKey('kkn_part.id'))
    kkn_family_id = Column(Integer, ForeignKey('kkn_family.id'))
    ktru_id = Column(Integer, ForeignKey('ktru.id'))

    sources = relationship("Source", backref = 'kkn')
    def __str__(self):
        return f'<kkn> {self.id}: {self.name} {self.okpd_2} {self.detalization}'
    def __repr__(self):
        return f'{self.name}'

class KKN_Part(Base):
    __tablename__ = 'kkn_part'
    id = Column(Integer, primary_key = True)
    name = Column(Text, nullable = False)
    number = Column(Integer, nullable = False)

    kkns = relationship("KKN", backref = 'kkn_part')

class KKN_Family(Base):
    __tablename__ = 'kkn_family'
    id = Column(Integer, primary_key = True)
    name = Column(Text, nullable = False)

    kkns = relationship("KKN", backref = 'kkn_family')
    def __str__(self):
        return f'<kkn> {self.id}: {self.name}'
    def __repr__(self):
        return f'{self.name}'

class KTRU(Base):
    __tablename__ = 'ktru'
    id = Column(Integer, primary_key = True)
    symbol = Column(Text, nullable = False)
    description = Column(Text, nullable = False)
    parent_id = Column(Integer)

    kkns = relationship("KKN", backref = 'ktru')

class OKPD_2(Base):
    __tablename__ = 'okpd_2'
    id = Column(Integer, primary_key = True)
    symbol = Column(Text, nullable = False)
    description = Column(Text, nullable = False)
    parent_id = Column(Integer)

    kkns = relationship("KKN", backref = 'okpd_2')
