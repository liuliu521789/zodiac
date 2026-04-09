import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

# 生肖对应关系
zodiac_map = {
    '鼠': 'rat',
    '牛': 'ox',
    '虎': 'tiger',
    '兔': 'rabbit',
    '龙': 'dragon',
    '蛇': 'snake',
    '马': 'horse',
    '羊': 'goat',
    '猴': 'monkey',
    '鸡': 'rooster',
    '狗': 'dog',
    '猪': 'pig'
}

# 爬取数据
def crawl_fortune():
    url = 'https://m.k366.com/sxys/'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Referer': 'https://www.k366.com/',
        'Connection': 'keep-alive'
    }
    
    try:
        # 尝试多次请求
        for i in range(3):
            try:
                response = requests.get(url, headers=headers, timeout=15)
                response.encoding = 'utf-8'
                
                if response.status_code == 200:
                    break
                else:
                    print(f'请求失败，状态码: {response.status_code}')
                    continue
            except Exception as e:
                print(f'请求异常: {e}')
                continue
        else:
            raise Exception('多次请求失败')
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 提取日期
        date_text = f'{datetime.now().year}年{datetime.now().month}月{datetime.now().day}日'
        
        # 提取红榜和黑榜
        red_list = []
        black_list = []
        
        # 尝试不同的选择器
        try:
            # 查找包含红榜的元素
            red_section = soup.find('div', string=lambda text: '红榜' in text if text else False)
            if red_section:
                red_parent = red_section.parent
                red_items = red_parent.find_all('span')
                red_list = [item.text.strip() for item in red_items if item.text.strip() in zodiac_map.keys()]
            
            # 查找包含黑榜的元素
            black_section = soup.find('div', string=lambda text: '黑榜' in text if text else False)
            if black_section:
                black_parent = black_section.parent
                black_items = black_parent.find_all('span')
                black_list = [item.text.strip() for item in black_items if item.text.strip() in zodiac_map.keys()]
        except Exception as e:
            print(f'提取红黑榜失败: {e}')
        
        # 如果没找到，使用默认红黑榜
        if not red_list:
            red_list = ['龙', '猴', '牛']
        if not black_list:
            black_list = ['马', '羊', '兔']
        
        # 提取每个生肖的运势
        fortune_data = {}
        
        # 尝试不同的方式查找生肖运势
        try:
            # 方法1: 查找所有包含生肖名称的元素
            for name, zodiac_id in zodiac_map.items():
                # 查找包含生肖名称的元素
                zodiac_section = soup.find('div', string=lambda text: name in text if text else False)
                if zodiac_section:
                    # 找到包含该元素的父容器
                    parent = zodiac_section.parent
                    while parent and not parent.find_all(['p', 'div']):
                        parent = parent.parent
                    
                    if parent:
                        fortune = {}
                        
                        # 提取各方面运势
                        paragraphs = parent.find_all('p')
                        if paragraphs:
                            # 假设前4个段落分别是财富、感情、健康、事业
                            if len(paragraphs) >= 4:
                                fortune['wealth'] = paragraphs[0].text.strip()
                                fortune['love'] = paragraphs[1].text.strip()
                                fortune['health'] = paragraphs[2].text.strip()
                                fortune['career'] = paragraphs[3].text.strip()
                            else:
                                # 如果段落不足，使用默认值
                                fortune['wealth'] = '财运平稳，宜理性消费'
                                fortune['love'] = '感情稳定，适合与伴侣增进感情'
                                fortune['health'] = '健康状况良好，注意休息'
                                fortune['career'] = '事业运一般，宜稳扎稳打'
                        else:
                            # 如果没有找到段落，使用默认值
                            fortune['wealth'] = '财运平稳，宜理性消费'
                            fortune['love'] = '感情稳定，适合与伴侣增进感情'
                            fortune['health'] = '健康状况良好，注意休息'
                            fortune['career'] = '事业运一般，宜稳扎稳打'
                        
                        # 生成综合运势和提示
                        if name in red_list:
                            fortune['overall'] = f"{name}宜积极进取，把握机遇"
                            fortune['tip'] = f"属{name}的朋友今日运势良好，宜主动出击"
                        elif name in black_list:
                            fortune['overall'] = f"{name}宜谨慎行事，稳扎稳打"
                            fortune['tip'] = f"属{name}的朋友今日宜保持低调，避免冲动"
                        else:
                            fortune['overall'] = f"{name}宜保持乐观，稳步前行"
                            fortune['tip'] = f"属{name}的朋友今日宜保持平常心，稳扎稳打"
                        
                        fortune_data[zodiac_id] = fortune
        except Exception as e:
            print(f'提取生肖运势失败: {e}')
        
        # 如果没有提取到任何运势数据，使用默认数据
        if not fortune_data:
            print('使用默认运势数据')
            for name, zodiac_id in zodiac_map.items():
                if name in red_list:
                    fortune_data[zodiac_id] = {
                        'overall': f"{name}宜积极进取，把握机遇",
                        'love': '感情升温，适合表达心意',
                        'career': '机会增多，宜积极争取',
                        'wealth': '财运不错，可能有额外收入',
                        'health': '健康状况良好，适当运动',
                        'tip': f"属{name}的朋友今日运势良好，宜主动出击"
                    }
                elif name in black_list:
                    fortune_data[zodiac_id] = {
                        'overall': f"{name}宜谨慎行事，稳扎稳打",
                        'love': '感情需理性思考',
                        'career': '需谨慎决策，避免冲动',
                        'wealth': '财运平稳，宜保守理财',
                        'health': '注意饮食规律，保持健康',
                        'tip': f"属{name}的朋友今日宜保持低调，避免冲动"
                    }
                else:
                    fortune_data[zodiac_id] = {
                        'overall': f"{name}宜保持乐观，稳步前行",
                        'love': '感情稳定，适合与伴侣增进感情',
                        'career': '事业运一般，宜稳扎稳打',
                        'wealth': '财运平稳，不宜大额投资',
                        'health': '健康状况良好，注意休息',
                        'tip': f"属{name}的朋友今日宜保持平常心，稳扎稳打"
                    }
        
        # 构建完整数据
        data = {
            'date': date_text,
            'red_list': red_list,
            'black_list': black_list,
            'zodiacs': fortune_data,
            'last_updated': datetime.now().isoformat()
        }
        
        # 保存到JSON文件
        with open('fortune_data.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print('数据爬取成功！')
        print(f'日期: {date_text}')
        print(f'红榜: {red_list}')
        print(f'黑榜: {black_list}')
        print(f'生肖数据: {list(fortune_data.keys())}')
        return data
    except Exception as e:
        print(f'爬取失败: {e}')
        # 生成默认数据
        default_data = {
            'date': f'{datetime.now().year}年{datetime.now().month}月{datetime.now().day}日',
            'red_list': ['龙', '猴', '牛'],
            'black_list': ['马', '羊', '兔'],
            'zodiacs': {},
            'last_updated': datetime.now().isoformat()
        }
        
        # 生成默认运势数据
        for name, zodiac_id in zodiac_map.items():
            if name in ['龙', '猴', '牛']:
                default_data['zodiacs'][zodiac_id] = {
                    'overall': f"{name}宜积极进取，把握机遇",
                    'love': '感情升温，适合表达心意',
                    'career': '机会增多，宜积极争取',
                    'wealth': '财运不错，可能有额外收入',
                    'health': '健康状况良好，适当运动',
                    'tip': f"属{name}的朋友今日运势良好，宜主动出击"
                }
            elif name in ['马', '羊', '兔']:
                default_data['zodiacs'][zodiac_id] = {
                    'overall': f"{name}宜谨慎行事，稳扎稳打",
                    'love': '感情需理性思考',
                    'career': '需谨慎决策，避免冲动',
                    'wealth': '财运平稳，宜保守理财',
                    'health': '注意饮食规律，保持健康',
                    'tip': f"属{name}的朋友今日宜保持低调，避免冲动"
                }
            else:
                default_data['zodiacs'][zodiac_id] = {
                    'overall': f"{name}宜保持乐观，稳步前行",
                    'love': '感情稳定，适合与伴侣增进感情',
                    'career': '事业运一般，宜稳扎稳打',
                    'wealth': '财运平稳，不宜大额投资',
                    'health': '健康状况良好，注意休息',
                    'tip': f"属{name}的朋友今日宜保持平常心，稳扎稳打"
                }
        
        with open('fortune_data.json', 'w', encoding='utf-8') as f:
            json.dump(default_data, f, ensure_ascii=False, indent=2)
        
        print('使用默认数据')
        return default_data

if __name__ == '__main__':
    crawl_fortune()