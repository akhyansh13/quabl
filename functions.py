def show_less(string):
    str_arr = list(string)
    less_arr = []
    i=0
    VISIBLE = 0
    if len(str_arr)>97:
        VISIBLE = 97
    else:
        VISIBLE = len(str_arr)
    for c in str_arr:
        if i<VISIBLE:
            less_arr.append(c)
        else:
            break
        i += 1
    less_str = ''.join(less_arr)
    return less_str

def show_less_post(post):
    str_arr = list(post)
    less_arr = []
    i=0
    VISIBLE = 0
    if len(str_arr)>137:
        VISIBLE = 137
    else:
        VISIBLE = len(str_arr)
    for c in str_arr:
        if i<VISIBLE:
            less_arr.append(c)
        else:
            less_arr.append('.')
            less_arr.append('.')
            less_arr.append('.')
            less_arr.append('</p>')
            break
        i += 1
    less_str = ''.join(less_arr)
    less_str = less_str.replace('<p>', '<p style="color:#428bca;">')
    return less_str

def show_less_ques(question):
    question = question.split('<br/>')[2].split('</div>')[0]
    str_arr = list(question)
    less_arr = []
    i=0
    VISIBLE = 0
    if len(str_arr)>137:
        VISIBLE = 137
    else:
        VISIBLE = len(str_arr)
    for c in str_arr:
        if i<VISIBLE:
            less_arr.append(c)
        else:
            less_arr.append('.')
            less_arr.append('.')
            less_arr.append('.')
            less_arr.append('</p>')
            break
        i += 1
    less_str = ''.join(less_arr)
    less_str = less_str.replace('<p style="font-size:12pt;" class="q-text">', '<p style="color:#428bca;">')
    return less_str

def show_less_ans(answer):
    str_arr = list(answer)
    less_arr = []
    i=0
    VISIBLE = 0
    if len(str_arr)>137:
        VISIBLE = 137
    else:
        VISIBLE = len(str_arr)
    for c in str_arr:
        if i<VISIBLE:
            less_arr.append(c)
        else:
            less_arr.append('.')
            less_arr.append('.')
            less_arr.append('.')
            less_arr.append('</p>')
            break
        i += 1
    less_str = ''.join(less_arr)
    less_str = less_str.replace('<p>', '<p style="color:#428bca;">')
    #answer = answer.replace('<p>', '<p style="color:blue">')
    return less_str
    #return answer

def hfilter(simpler, highlight):
    simpler = simpler.replace('_', ' ')
    simp1 = simpler.split(('value="' + highlight + '"').replace('_', ' '))[0].split('<span class=')[-2]
    simp2 = simpler.split(('value="' + highlight + '"').replace('_', ' '))[1].split('</span>')[1]
    arr1 = list(simp1)
    arr2 = list(simp2)
    if (highlight[0].isalpha() or highlight[0].isdigit()) and (highlight[-1].isalpha() or highlight[-1].isdigit()):
        if arr1[-1].isalpha() or arr1[-1].isdigit():
            return False
        if arr2[0].isalpha() or arr2[0].isdigit():
            return False
    return True
