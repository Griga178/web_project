
def define_domain(link_list: list):
    '''    Определение домена из списка ссылок    '''
    domains = set()
    protocols = {'http', 'https', 'ftp'}
    for link in link_list:
        split_link = link.split("/")
        current_protocol = split_link[0][:-1]
        if current_protocol in protocols:
            domains.add(split_link[2])

    if len(domains) != 1:
        return False
    else:
        return ''.join(domains)
