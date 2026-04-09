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

# 爬取单个页面的数据
def crawl_single_page(url, headers):
    try:
        # 尝试多次请求
        for i in range(3):
            try:
                response = requests.get(url, headers=headers, timeout=15)
                response.encoding = 'utf-8'
                
                if response.status_code == 200:
                    return BeautifulSoup(response.text, 'html.parser')
                else:
                    print(f'请求失败，状态码: {response.status_code}')
                    continue
            except Exception as e:
                print(f'请求异常: {e}')
                continue
        return None
    except Exception as e:
        print(f'爬取页面失败: {e}')
        return None

# 提取生肖运势
def extract_zodiac_fortune(soup, name):
    try:
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
                
                # 提取幸运信息
                try:
                    lucky_info = {}
                    # 查找开运数字
                    lucky_number_elem = soup.find('div', string=lambda text: '开运数字' in text if text else False)
                    if lucky_number_elem and lucky_number_elem.next_sibling:
                        lucky_info['luckyNumber'] = lucky_number_elem.next_sibling.text.strip()
                    
                    # 查找开运颜色
                    lucky_color_elem = soup.find('div', string=lambda text: '开运颜色' in text if text else False)
                    if lucky_color_elem and lucky_color_elem.next_sibling:
                        lucky_info['luckyColor'] = lucky_color_elem.next_sibling.text.strip()
                    
                    # 查找开运方向
                    lucky_direction_elem = soup.find('div', string=lambda text: '开运方向' in text if text else False)
                    if lucky_direction_elem and lucky_direction_elem.next_sibling:
                        lucky_info['luckyDirection'] = lucky_direction_elem.next_sibling.text.strip()
                    
                    # 查找生肖贵人
                    lucky_贵人_elem = soup.find('div', string=lambda text: '生肖贵人' in text if text else False)
                    if lucky_贵人_elem and lucky_贵人_elem.next_sibling:
                        lucky_info['luckyPerson'] = lucky_贵人_elem.next_sibling.text.strip()
                    
                    fortune.update(lucky_info)
                except Exception as e:
                    print(f'提取幸运信息失败: {e}')
                
                return fortune
    except Exception as e:
        print(f'提取{name}运势失败: {e}')
    return None

# 提取红黑榜
def extract_rankings(soup):
    red_list = []
    black_list = []
    
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
    
    return red_list, black_list

# 爬取数据
def crawl_fortune():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Referer': 'https://www.k366.com/',
        'Connection': 'keep-alive'
    }
    
    try:
        # 爬取今日运势
        print('爬取今日运势...')
        today_soup = crawl_single_page('https://m.k366.com/sxys/today_sx_0.html', headers)
        
        # 爬取明日运势
        print('爬取明日运势...')
        tomorrow_soup = crawl_single_page('https://m.k366.com/sxys/ming_sx_0.html', headers)
        
        # 爬取本月运势
        print('爬取本月运势...')
        month_soup = crawl_single_page('https://m.k366.com/sxys/month_sx_0.html', headers)
        
        # 提取今日红黑榜
        today_red_list, today_black_list = extract_rankings(today_soup) if today_soup else (['龙', '猴', '牛'], ['马', '羊', '兔'])
        
        # 提取明日红黑榜
        tomorrow_red_list, tomorrow_black_list = extract_rankings(tomorrow_soup) if tomorrow_soup else (['龙', '猴', '牛'], ['马', '羊', '兔'])
        
        # 构建完整数据
        data = {
            'today': {
                'date': f'{datetime.now().year}年{datetime.now().month}月{datetime.now().day}日',
                'red_list': today_red_list,
                'black_list': today_black_list,
                'zodiacs': {}
            },
            'tomorrow': {
                'date': f'{datetime.now().year}年{datetime.now().month}月{datetime.now().day + 1}日',
                'red_list': tomorrow_red_list,
                'black_list': tomorrow_black_list,
                'zodiacs': {}
            },
            'month': {
                'date': f'{datetime.now().year}年{datetime.now().month}月',
                'zodiacs': {}
            },
            'last_updated': datetime.now().isoformat()
        }
        
        # 为每个生肖提取运势
        for name, zodiac_id in zodiac_map.items():
            # 今日运势
            today_fortune = extract_zodiac_fortune(today_soup, name) if today_soup else {
                'overall': f"{name}宜保持乐观，稳步前行",
                'love': '感情稳定，适合与伴侣增进感情',
                'career': '事业运一般，宜稳扎稳打',
                'wealth': '财运平稳，宜理性消费',
                'health': '健康状况良好，注意休息',
                'tip': f"属{name}的朋友今日宜保持平常心，稳扎稳打"
            }
            data['today']['zodiacs'][zodiac_id] = today_fortune
            
            # 明日运势
            tomorrow_fortune = extract_zodiac_fortune(tomorrow_soup, name) if tomorrow_soup else {
                'overall': f"{name}宜积极准备，迎接挑战",
                'love': '感情运势平稳，宜多沟通',
                'career': '事业运一般，宜提前规划',
                'wealth': '财运平稳，宜理性消费',
                'health': '健康状况良好，注意休息',
                'tip': f"属{name}的朋友明日宜提前准备，稳扎稳打"
            }
            data['tomorrow']['zodiacs'][zodiac_id] = tomorrow_fortune
            
            # 本月运势
            month_fortune = extract_zodiac_fortune(month_soup, name) if month_soup else {
                'overall': f"{name}本月运势平稳，宜稳步前行",
                'love': '感情运势平稳，适合与伴侣增进感情',
                'career': '事业运一般，宜稳扎稳打',
                'wealth': '财运平稳，宜理性消费',
                'health': '健康状况良好，注意休息',
                'tip': f"属{name}的朋友本月宜保持平常心，稳扎稳打"
            }
            data['month']['zodiacs'][zodiac_id] = month_fortune
        
        # 保存到JSON文件
        with open('fortune_data.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        print('数据爬取成功！')
        print(f'今日红榜: {today_red_list}')
        print(f'今日黑榜: {today_black_list}')
        print(f'明日红榜: {tomorrow_red_list}')
        print(f'明日黑榜: {tomorrow_black_list}')
        return data
    except Exception as e:
        print(f'爬取失败: {e}')
        # 生成默认数据
        default_data = {
            'today': {
                'date': f'{datetime.now().year}年{datetime.now().month}月{datetime.now().day}日',
                'red_list': ['龙', '猴', '牛'],
                'black_list': ['马', '羊', '兔'],
                'zodiacs': {}
            },
            'tomorrow': {
                'date': f'{datetime.now().year}年{datetime.now().month}月{datetime.now().day + 1}日',
                'red_list': ['龙', '猴', '牛'],
                'black_list': ['马', '羊', '兔'],
                'zodiacs': {}
            },
            'month': {
                'date': f'{datetime.now().year}年{datetime.now().month}月',
                'zodiacs': {}
            },
            'last_updated': datetime.now().isoformat()
        }
        
        # 生成默认运势数据
        for name, zodiac_id in zodiac_map.items():
            # 幸运信息
            lucky_colors = ['红色', '黄色', '绿色', '蓝色', '紫色', '金色', '橙色', '白色']
            lucky_numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            lucky_directions = ['正东方', '正南方', '正西方', '正北方', '东南方', '西南方', '东北方', '西北方']
            
            hash_value = sum(ord(c) for c in zodiac_id)
            lucky_color = lucky_colors[hash_value % len(lucky_colors)]
            lucky_number = lucky_numbers[hash_value % len(lucky_numbers)]
            lucky_direction = lucky_directions[hash_value % len(lucky_directions)]
            
            # 今日运势
            default_data['today']['zodiacs'][zodiac_id] = {
                'overall': f"{name}宜保持乐观，稳步前行",
                'love': '感情稳定，适合与伴侣增进感情',
                'career': '事业运一般，宜稳扎稳打',
                'wealth': '财运平稳，宜理性消费',
                'health': '健康状况良好，注意休息',
                'tip': f"属{name}的朋友今日宜保持平常心，稳扎稳打",
                'luckyColor': lucky_color,
                'luckyNumber': lucky_number,
                'luckyDirection': lucky_direction
            }
            
            # 明日运势
            default_data['tomorrow']['zodiacs'][zodiac_id] = {
                'overall': f"{name}宜积极准备，迎接挑战",
                'love': '感情运势平稳，宜多沟通',
                'career': '事业运一般，宜提前规划',
                'wealth': '财运平稳，宜理性消费',
                'health': '健康状况良好，注意休息',
                'tip': f"属{name}的朋友明日宜提前准备，稳扎稳打",
                'luckyColor': lucky_color,
                'luckyNumber': lucky_number,
                'luckyDirection': lucky_direction
            }
            
            # 本月运势
            default_data['month']['zodiacs'][zodiac_id] = {
                'overall': f"{name}本月运势平稳，宜稳步前行",
                'love': '感情运势平稳，适合与伴侣增进感情',
                'career': '事业运一般，宜稳扎稳打',
                'wealth': '财运平稳，宜理性消费',
                'health': '健康状况良好，注意休息',
                'tip': f"属{name}的朋友本月宜保持平常心，稳扎稳打",
                'luckyColor': lucky_color,
                'luckyNumber': lucky_number,
                'luckyDirection': lucky_direction
            }
        
        with open('fortune_data.json', 'w', encoding='utf-8') as f:
            json.dump(default_data, f, ensure_ascii=False, indent=2)
        
        print('使用默认数据')
        return default_data

if __name__ == '__main__':
    crawl_fortune()