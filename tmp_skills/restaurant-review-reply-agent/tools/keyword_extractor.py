import re

def extract_review_issues(text):
    dishes = re.findall(r'(水煮鱼|酸菜鱼|毛血旺|烤肉|羊肉串|米饭|汤)', text)
    service = re.findall(r'(上菜慢|服务员|态度|叫半天|等很久)', text)
    return {"dishes": dishes, "service": service}
