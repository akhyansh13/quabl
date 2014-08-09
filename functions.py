def show_less(string):
	str_arr = list(string)
	less_arr = []
	i=0
	VISIBLE = 0
	if len(str_arr)>100:
		VISIBLE = 100
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