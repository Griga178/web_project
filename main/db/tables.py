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

class Kkn_part(Base):
    __tablename__ = 'kkn_part'
    id = Column(Integer, primary_key = True)
    name = Column(Text)
    kkns = relationship("Kkn", backref = 'kkn_part')
    @property
    def to_dict(self):

        for kkn_obj in self.kkns: # список ккнов этой части
            file_kkn_obj_list = kkn_obj.file_kkn_links # список файлов (+ ссылок) ккн-а
            file_id_set = {file_kkn_obj.id_file for file_kkn_obj in file_kkn_obj_list}

        kkn_part_obj = {
            'id': self.id,
            'name': self.name,
            'kkns': [kkn.id for kkn in self.kkns],
            'files_id_list': list(file_id_set)
        }
        return kkn_part_obj

class Kkn(Base):
    __tablename__ = 'kkn'
    id = Column(Integer, primary_key = True)
    kkn_name = Column(Text)

    id_okpd_2 = Column(ForeignKey("okpd_2.id"))
    detalization = Column(Integer)
    id_kkn_part = Column(ForeignKey("kkn_part.id"))
    # chars = relationship("Parsing", backref = 'links')
    file_kkn_links = relationship("File_kkn_link", backref = 'kkn')

class File_kkn_link(Base):
    __tablename__ = 'file_kkn_link'
    id = Column(Integer, primary_key = True)
    id_file = Column(ForeignKey("file.id"))
    id_link = Column(ForeignKey("link.id"))
    id_kkn = Column(ForeignKey("kkn.id"))
    id_source_type = Column(ForeignKey("source_type.id"))
    source_date = Column(DateTime)
    source_number = Column(Text)

class Source_type(Base):
    __tablename__ = 'source_type'
    id = Column(Integer, primary_key = True)
    name = Column(String(25), nullable = False)
    file_kkn_links = relationship("File_kkn_link", backref = 'source_type')

class Link(Base):
    __tablename__ = 'link'
    id = Column(Integer, primary_key = True)
    link = Column(String(255), nullable = False)
    id_domain = Column(Integer, ForeignKey('domain.id'))
    file_kkn_links = relationship("File_kkn_link", backref = 'link')
    parsing_results = relationship("Parsing", backref = 'link')
    @property
    def to_dict(self):
        link_obj = {
            'id': self.id,
            'link': self.link,
            'files': [file.file.to_dict for file in self.file_kkn_links],
            'pars_results_ammount': len({parsing_results.id for parsing_result in self.parsing_results})
        }
        return link_obj

class Domain(Base):
    __tablename__ = 'domain'
    id = Column(Integer, primary_key = True)
    name = Column(String(255), nullable = False)
    id_company = Column(Integer, ForeignKey('company.id'))
    links = relationship("Link", backref = 'domain')
    domain_setts = relationship("Domain_settings", backref = 'domain')
    @property
    def to_dict(self):
        # Ищем id файлов, связанных с доменом
        # берем список ссылок
        # из каждой ссылки берем список связей с файлами
        # из каждой связи с файлом берем id файла
        links_file_kkn_list = []
        for my_link_obj in self.links:
            links_file_kkn_list.append(my_link_obj.file_kkn_links)

        files_id_set = set()
        kkn_part_id_set = set() # + Ищем id частей ккн, связанных с доменом
        for file_kkn_obj_list in links_file_kkn_list:
            for file_kkn_obj in file_kkn_obj_list:
                files_id_set.add(file_kkn_obj.id_file)
                kkn_part_id_set.add(file_kkn_obj.kkn.id_kkn_part)


        dom_dict = {
            'id': self.id,
            'name': self.name,
            'company': self.company.name,
            'links_ammount': len(self.links),
            'domain_setts_ammount': len(self.domain_setts),
            'files_id_list': list(files_id_set),
            'parts_id_list': list(kkn_part_id_set)
        }
        return dom_dict

class Domain_settings(Base):
    __tablename__ = 'domain_settings'
    id = Column(Integer, primary_key = True)
    id_domain = Column(Integer, ForeignKey('domain.id'))
    setting_name = Column(Text)
    setting_content = Column(Text)
    @property
    def to_dict(self):
        set_dict = {
            'id': self.id,
            'setting_name': self.setting_name,
            'setting_content': self.setting_content
        }
        return set_dict

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
    file_kkn_links = relationship("File_kkn_link", backref = 'file')
    @property
    def to_dict(self):
        file_dict = {
            'id': self.id,
            'name': self.name,
            'upload_date': self.upload_date.strftime('%Y-%m-%d'),
            'parts_id_list': list({file_kkn_obj.kkn.id_kkn_part for file_kkn_obj in self.file_kkn_links}) # части ккн в этом файле
        }
        return file_dict

class Parsing(Base):
    'Результаты парсинга'
    __tablename__ = 'parsing'
    id = Column(Integer, primary_key = True)
    id_link = Column(Integer, ForeignKey('link.id'), nullable = False)
    price = Column(FLOAT)
    parsing_date = Column(Text)
    product_name = Column(Text)
    product_avaliable = Column(Boolean) # подумать
    user_changed = Column(Boolean)  # user_accept

# class Parsing(Base):
