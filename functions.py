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
    less_str = less_str.replace('<p>', '<p style="color:blue">')
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
    less_str = less_str.replace('<p style="font-size:12pt;" class="q-text">', '<p style="color:blue">')
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
    less_str = less_str.replace('<p>', '<p style="color:blue">')
    #answer = answer.replace('<p>', '<p style="color:blue">')
    return less_str
    #return answer
